import { toNano } from "@ton/core";
import { Blockchain } from "@ton/sandbox";
import "@ton/test-utils";
import { SubscriptionContract } from "./output/sample_SubscriptionContract";

/**
 * Test cases for subscription contract
 */
describe("Subscription Contract Tests", () => {
    /**
     * Test basic contract functionality
     * 1. Deploy contract
     * 2. Check initial balance
     * 3. Update subscription price
     * 4. User subscribes (free trial)
     * 5. Check user subscription status
     * 6. Test non-owner withdrawal (should fail)
     * 7. Test owner withdrawal (should succeed)
     */
    it("should deploy and execute basic functions correctly", async () => {
        // Create blockchain sandbox environment
        let system = await Blockchain.create();
        // Create two test accounts: owner and regular user
        let owner = await system.treasury("owner");
        let user = await system.treasury("user");
        // Initialize contract instance
        let contract = system.openContract(await SubscriptionContract.fromInit(owner.address));

        // Deploy contract with 1 TON as initial funds
        const deployResult = await contract.send(owner.getSender(), { value: toNano(1) }, { $$type: "Deploy", queryId: 0n });
        // Verify deployment success
        expect(deployResult.transactions).toHaveTransaction({
            from: owner.address,
            to: contract.address,
            deploy: true,
            success: true,
        });

        // Verify contract initial balance is 0
        expect(await contract.getGetBalance()).toEqual(toNano(0));

        // Owner updates subscription price to 2 TON
        await contract.send(owner.getSender(), { value: toNano(1) }, {
            $$type: "UpdatePrice",
            newPrice: toNano(2)
        });

        // Verify price update
        expect(await contract.getGetPrice()).toEqual(toNano(2));

        // Print current contract balance
        console.log(await contract.getGetPrice());

        // User subscribes for 30 days service (first subscription activates free trial)
        await contract.send(user.getSender(), { value: toNano(2) }, {
            $$type: "Subscribe",
        });

        // Verify user's subscription expiry time
        const expiryTime = await contract.getGetExpiryTime(user.address);
        // Approximately 30 days
        expect(expiryTime).toBeLessThanOrEqual(Date.now() / 1000 + 30 * 24 * 60 * 60);

        // Test non-owner (regular user) attempting withdrawal, should fail
        const nonOwnerWithdraw = await contract.send(user.getSender(), { value: toNano(1) }, {
            $$type: "Withdraw",
            amount: toNano(1)
        });

        // Verify transaction failure
        expect(nonOwnerWithdraw.transactions).toHaveTransaction({
            from: user.address,
            to: contract.address,
            success: false
        });

        // Test owner withdrawing 2 TON
        const ownerWithdraw = await contract.send(owner.getSender(), { value: toNano(1) }, {
            $$type: "Withdraw",
            amount: toNano(2)
        });

        // Verify transaction success
        expect(ownerWithdraw.transactions).toHaveTransaction({
            from: owner.address,
            to: contract.address,
            success: true
        });

        // Verify contract balance is 0
        expect(await contract.getGetBalance()).toEqual(toNano(0));
    });
});
