import { toNano } from "@ton/core";
import { Blockchain } from "@ton/sandbox";
import "@ton/test-utils";
import { SubscriptionContract } from "./output/sample_SubscriptionContract";

/**
 * 订阅合约测试用例
 */
describe("订阅合约测试", () => {
    /**
     * 测试基本合约功能
     * 1. 部署合约
     * 2. 检查初始余额
     * 3. 更新订阅价格
     * 4. 用户订阅(免费试用)
     * 5. 检查用户订阅状态
     * 6. 测试非所有者提现(应失败)
     * 7. 测试所有者提现(应成功)
     * 8. 测试费率更新和退款计算
     */
    it("应正确部署并执行基本功能", async () => {
        // 创建区块链沙箱环境
        let system = await Blockchain.create();
        // 创建两个测试账户:所有者和普通用户
        let owner = await system.treasury("owner");
        let user = await system.treasury("user");
        // 初始化合约实例
        let contract = system.openContract(await SubscriptionContract.fromInit(owner.address));

        // 部署合约并注入1 TON初始资金
        const deployResult = await contract.send(owner.getSender(), { value: toNano(1) }, { $$type: "Deploy", queryId: 0n });
        // 验证部署成功
        expect(deployResult.transactions).toHaveTransaction({
            from: owner.address,
            to: contract.address,
            deploy: true,
            success: true,
        });

        // 验证合约初始余额为0
        expect(await contract.getBalance()).toEqual(toNano(0));

        // 所有者更新订阅价格为2 TON
        await contract.send(owner.getSender(), { value: toNano(1) }, {
            $$type: "UpdatePrice",
            newPrice: toNano(2)
        });

        // 验证价格更新
        expect(await contract.getPrice()).toEqual(toNano(2));

        // 验证初始费率为10%
        expect(await contract.getFeeRate()).toEqual(1000n);

        // 更新费率为20%
        await contract.send(owner.getSender(), { value: toNano(1) }, {
            $$type: "UpdateFeeRate",
            newRate: 2000n
        });

        // 验证费率更新成功
        expect(await contract.getFeeRate()).toEqual(2000n);

        // 用户订阅30天服务(首次订阅激活免费试用)
        await contract.send(user.getSender(), { value: toNano(2) }, {
            $$type: "Subscribe"
        });

        // 验证用户订阅到期时间
        const expiryTime = await contract.getExpiryTime(user.address);
        // 大约7天(免费试用期)
        expect(expiryTime).toBeLessThanOrEqual(Date.now() / 1000 + 7 * 24 * 60 * 60);

        // 检查用户订阅状态
        expect(await contract.getCheckSubscription(user.address)).toBe(true);

        // 用户退款前余额
        const userBalanceBeforeRefund = await user.getBalance();
        const feeRate = await contract.getFeeRate();
        const contractBalanceBeforeRefund = await contract.getBalance();
        const targetRefundAmount = toNano(1) * (10000n - feeRate) / 10000n;
        // 多余部分
        const extraAmount = toNano(1) - targetRefundAmount;
        // 测试退款逻辑
        await contract.send(user.getSender(), { value: toNano(1) }, {
            $$type: "Refund"
        });

        // 验证用户余额变化
        const userBalanceAfterRefund = await user.getBalance();
        expect(userBalanceAfterRefund).toBeLessThan(userBalanceBeforeRefund + targetRefundAmount);

        // 验证合约余额变化
        const contractBalanceAfterRefund = await contract.getBalance();
        expect(contractBalanceAfterRefund).toBeGreaterThanOrEqual(contractBalanceBeforeRefund - targetRefundAmount);

        // 测试非所有者(普通用户)尝试提现,应失败
        const nonOwnerWithdraw = await contract.send(user.getSender(), { value: toNano(1) }, {
            $$type: "Withdraw",
            amount: toNano(1)
        });

        // 验证交易失败
        expect(nonOwnerWithdraw.transactions).toHaveTransaction({
            from: user.address,
            to: contract.address,
            success: false
        });

        // 测试所有者提现1 TON
        const ownerWithdraw = await contract.send(owner.getSender(), { value: toNano(1) }, {
            $$type: "Withdraw",
            amount: toNano(1) + extraAmount
        });

        // 验证交易成功
        expect(ownerWithdraw.transactions).toHaveTransaction({
            from: owner.address,
            to: contract.address,
            success: true
        });

        const balance = await contract.getBalance();
        console.log("contract balance", balance);

        // 验证合约余额为0
        expect(balance).toEqual(toNano(0));
    });
});
