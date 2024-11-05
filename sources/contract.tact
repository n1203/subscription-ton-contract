import "@stdlib/deploy";

// Subscription period enum
message SubscriptionPeriod {
    period: Int as uint32; // Subscription period in seconds
}

// Update price message
message UpdatePrice {
    newPrice: Int as coins; // New subscription price
}

// Update fee rate message
message UpdateFeeRate {
    newRate: Int as uint32; // New fee rate (0-10000)
}

// Withdraw message
message Withdraw {
    amount: Int as coins; // Withdrawal amount
}

// Subscribe message 
message Subscribe {}

// Refund message
message Refund {}

contract SubscriptionContract with Deployable {
    owner: Address; // Contract owner
    price: Int as coins; // Subscription price
    balance: Int as coins; // Contract balance
    feeRate: Int as uint32; // Fee rate for refunds (0-10000, where 10000 = 100%)
    
    // User subscription mapping
    subscriptions: map<Address, Int>; // address => expiry timestamp
    
    // Free trial period (one week)
    const TRIAL_PERIOD: Int = 7 * 24 * 60 * 60; // 7 days in seconds
    const MAX_FEE_RATE: Int = 10000; // Maximum fee rate (100%)
    
    init(owner: Address) {
        self.owner = owner;
        self.price = ton("1"); // Default 1 TON
        self.balance = 0;
        self.feeRate = 1000; // Default 10% fee
    }

    // Check if sender is contract owner
    fun requireOwner() {
        let ctx: Context = context();
        require(ctx.sender == self.owner, "Only owner can call");
    }

    // Update subscription price
    receive(msg: UpdatePrice) {
        self.requireOwner();
        require(msg.newPrice > 0, "Price must be greater than 0");
        self.price = msg.newPrice;
    }

    // Update fee rate
    receive(msg: UpdateFeeRate) {
        self.requireOwner();
        require(msg.newRate > 0 && msg.newRate <= self.MAX_FEE_RATE, "Invalid fee rate");
        self.feeRate = msg.newRate;
    }

    // Withdraw contract balance
    receive(msg: Withdraw) {
        self.requireOwner();
        require(msg.amount <= self.balance, "Balance is not enough");
        self.balance = self.balance - msg.amount;
        send(SendParameters{
            to: self.owner,
            value: msg.amount,
            mode: SendIgnoreErrors
        });
    }
    // Subscribe to service
    receive(msg: Subscribe) {
        let ctx: Context = context();
        let sender: Address = ctx.sender;
        
        // Check payment amount
        require(ctx.value >= self.price, "Payment amount is not enough");
        
        // Update contract balance
        self.balance = self.balance + ctx.value;
        
        // Get current timestamp
        let now: Int = now();
        
        // If new user who never used free trial
        if (self.subscriptions.get(sender) == null) {
            // Set trial period end time
            self.subscriptions.set(sender, now + self.TRIAL_PERIOD);
            self.reply("Free trial has started".asComment());
            return;
        }
        
        // Update subscription expiry time
        let currentExpiry: Int = self.subscriptions.get(sender)!!;
        
        // Calculate subscription duration based on payment amount
        let monthInSeconds: Int = 30 * 24 * 60 * 60; // 30 days in seconds
        let subscriptionPeriod: Int = (ctx.value * monthInSeconds) / self.price; // 根据支付金额计算订阅时长
        
        let newExpiry: Int = max(currentExpiry, now) + subscriptionPeriod;
        self.subscriptions.set(sender, newExpiry);
        
        self.reply("Subscription successful".asComment());
    }

    // Refund unused subscription time
    receive(msg: Refund) {
        let ctx: Context = context();
        let sender: Address = ctx.sender;
        let now: Int = now();
        
        // Check if user has active subscription
        let expiry: Int? = self.subscriptions.get(sender);
        require(expiry != null, "No active subscription");
        require(expiry!! > now, "Subscription already expired");
        
        // Calculate refund amount based on unused time
        let remainingTime: Int = expiry!! - now;
        let totalTime: Int = expiry!! - (now - remainingTime); // 总订阅时长
        
        // Calculate used amount with fee rate
        let usedAmount: Int = (self.price * (totalTime - remainingTime) * (10000 + self.feeRate)) / (totalTime * 10000);
        let finalRefundAmount: Int = max(0, self.price - usedAmount);
        
        require(finalRefundAmount <= self.balance, "Contract balance not enough for refund");
        
        // Update contract state
        self.balance = self.balance - finalRefundAmount;
        self.subscriptions.set(sender, now);
        
        // Send refund
        if (finalRefundAmount > 0) {
            send(SendParameters{
                to: sender,
                value: finalRefundAmount,
                mode: SendIgnoreErrors
            });
        }
        
        self.reply("Refund processed".asComment());
    }

    // Check user subscription status
    get fun checkSubscription(user: Address): Bool {
        let expiry: Int? = self.subscriptions.get(user);
        if (expiry == null) {
            return false;
        }
        return expiry!! > now();
    }

    // Get user subscription expiry time
    get fun expiryTime(user: Address): Int {
        let expiry: Int? = self.subscriptions.get(user);
        return expiry!!; // Fixed syntax error, using !! instead of ??
    }

    // Get current subscription price
    get fun price(): Int {
        return self.price;
    }

    // Get contract balance
    get fun balance(): Int {
        return self.balance;
    }

    // Get current fee rate
    get fun feeRate(): Int {
        return self.feeRate;
    }
}
