import "@stdlib/deploy";

// Subscription period enum
message SubscriptionPeriod {
    period: Int as uint32; // Subscription period in seconds
}

// Update price message
message UpdatePrice {
    newPrice: Int as coins; // New subscription price
}

// Withdraw message
message Withdraw {
    amount: Int as coins; // Withdrawal amount
}

// Subscribe message 
message Subscribe {}

contract SubscriptionContract with Deployable {
    owner: Address; // Contract owner
    price: Int as coins; // Subscription price
    balance: Int as coins; // Contract balance
    
    // User subscription mapping
    subscriptions: map<Address, Int>; // address => expiry timestamp
    
    // Free trial period (one week)
    const TRIAL_PERIOD: Int = 7 * 24 * 60 * 60; // 7 days in seconds
    
    init(owner: Address) {
        self.owner = owner;
        self.price = ton("1"); // Default 1 TON
        self.balance = 0;
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
        // Calculate subscription duration - 1 month (30 days)
        let subscriptionPeriod: Int = 30 * 24 * 60 * 60; // 30 days in seconds
        let newExpiry: Int = max(currentExpiry, now) + subscriptionPeriod;
        self.subscriptions.set(sender, newExpiry);
        
        self.reply("Subscription successful".asComment());
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
    get fun getExpiryTime(user: Address): Int {
        let expiry: Int? = self.subscriptions.get(user);
        return expiry!!; // Fixed syntax error, using !! instead of ??
    }

    // Get current subscription price
    get fun getPrice(): Int {
        return self.price;
    }

    // Get contract balance
    get fun getBalance(): Int {
        return self.balance;
    }
}
