import { Address, contractAddress } from "@ton/core";
import { TonClient4 } from "@ton/ton";
import { SubscriptionContract } from "./output/sample_SubscriptionContract";

(async () => {
    const client = new TonClient4({
        endpoint: "https://sandbox-v4.tonhubapi.com", // 🔴 测试网 API 端点
    });

    // 参数 
    // kQD9T1cP_3me4qN8hJxAAZ6efsm47WAVIMaa8Ve2EqQwsoor
    // EQDIioEQrXZGDQ5SoLeG-iH7kgOmcgrqBEou6aoiPDuxjEv5
    let owner = Address.parse("0QDJ8JmwS2YN0xAbMARXWTJJK16blpri82vLEru7ITCA0006");
    let init = await SubscriptionContract.fromInit(owner);
    let contract_address = init.address;

    // 准备
    console.log("读取合约信息...");
    console.log("合约地址:", contract_address);

    // 输入合约地址
    let contract = SubscriptionContract.fromAddress(contract_address);
    let contract_open = client.open(contract);

    try {
        const balance = await contract_open.getGetBalance();
        console.log("合约余额:", balance);
    } catch (error) {
        console.log("合约余额:", "读取失败");
        console.log(error);
    }

    try {
        const price = await contract_open.getGetPrice();
        console.log("当前订阅价格:", price);
    } catch (error) {
        console.log("当前订阅价格:", "读取失败");
        console.log(error);
    }
})();
