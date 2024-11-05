import * as fs from "fs";
import * as path from "path";
import { Address } from "@ton/core";
import { SubscriptionContract } from "./output/sample_SubscriptionContract";
import { prepareTactDeployment } from "@tact-lang/deployer";

(async () => {
    // 参数
    let testnet = true;
    let packageName = "sample_SubscriptionContract.pkg";
    let owner = Address.parse("0QDJ8JmwS2YN0xAbMARXWTJJK16blpri82vLEru7ITCA0006");
    let init = await SubscriptionContract.fromInit(owner);

    // 加载所需数据
    let address = init.address;
    let data = init.init!.data.toBoc();
    let pkg = fs.readFileSync(path.resolve(__dirname, "output", packageName));

    // 准备部署
    console.log("上传合约包...");
    let prepare = await prepareTactDeployment({ pkg, data, testnet });

    // 部署
    console.log("============================================================================================");
    console.log("合约地址");
    console.log("============================================================================================");
    console.log();
    console.log(address.toString({ testOnly: testnet }));
    console.log();
    console.log("============================================================================================");
    console.log("请按照部署链接进行操作");
    console.log("============================================================================================");
    console.log();
    console.log(prepare);
    console.log();
    console.log("============================================================================================");
})();
