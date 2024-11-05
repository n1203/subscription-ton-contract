import { 
    Cell,
    Slice, 
    Address, 
    Builder, 
    beginCell, 
    ComputeError, 
    TupleItem, 
    TupleReader, 
    Dictionary, 
    contractAddress, 
    ContractProvider, 
    Sender, 
    Contract, 
    ContractABI, 
    ABIType,
    ABIGetter,
    ABIReceiver,
    TupleBuilder,
    DictionaryValue
} from '@ton/core';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    let sc_0 = slice;
    let _code = sc_0.loadRef();
    let _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadGetterTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    let builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type StdAddress = {
    $$type: 'StdAddress';
    workchain: bigint;
    address: bigint;
}

export function storeStdAddress(src: StdAddress) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.workchain, 8);
        b_0.storeUint(src.address, 256);
    };
}

export function loadStdAddress(slice: Slice) {
    let sc_0 = slice;
    let _workchain = sc_0.loadIntBig(8);
    let _address = sc_0.loadUintBig(256);
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

function loadTupleStdAddress(source: TupleReader) {
    let _workchain = source.readBigNumber();
    let _address = source.readBigNumber();
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

function loadGetterTupleStdAddress(source: TupleReader) {
    let _workchain = source.readBigNumber();
    let _address = source.readBigNumber();
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

function storeTupleStdAddress(source: StdAddress) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.workchain);
    builder.writeNumber(source.address);
    return builder.build();
}

function dictValueParserStdAddress(): DictionaryValue<StdAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStdAddress(src)).endCell());
        },
        parse: (src) => {
            return loadStdAddress(src.loadRef().beginParse());
        }
    }
}

export type VarAddress = {
    $$type: 'VarAddress';
    workchain: bigint;
    address: Slice;
}

export function storeVarAddress(src: VarAddress) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.workchain, 32);
        b_0.storeRef(src.address.asCell());
    };
}

export function loadVarAddress(slice: Slice) {
    let sc_0 = slice;
    let _workchain = sc_0.loadIntBig(32);
    let _address = sc_0.loadRef().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

function loadTupleVarAddress(source: TupleReader) {
    let _workchain = source.readBigNumber();
    let _address = source.readCell().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

function loadGetterTupleVarAddress(source: TupleReader) {
    let _workchain = source.readBigNumber();
    let _address = source.readCell().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

function storeTupleVarAddress(source: VarAddress) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.workchain);
    builder.writeSlice(source.address.asCell());
    return builder.build();
}

function dictValueParserVarAddress(): DictionaryValue<VarAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeVarAddress(src)).endCell());
        },
        parse: (src) => {
            return loadVarAddress(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Slice;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw.asCell());
    };
}

export function loadContext(slice: Slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef().asSlice();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell().asSlice();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadGetterTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell().asSlice();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounced);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw.asCell());
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
    };
}

export function loadSendParameters(slice: Slice) {
    let sc_0 = slice;
    let _bounce = sc_0.loadBit();
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _mode = sc_0.loadIntBig(257);
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadGetterTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function storeTupleSendParameters(source: SendParameters) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounce);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadGetterTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    }
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadGetterTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    }
}

export type FactoryDeploy = {
    $$type: 'FactoryDeploy';
    queryId: bigint;
    cashback: Address;
}

export function storeFactoryDeploy(src: FactoryDeploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1829761339, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.cashback);
    };
}

export function loadFactoryDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1829761339) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _cashback = sc_0.loadAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadTupleFactoryDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadGetterTupleFactoryDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.cashback);
    return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
        }
    }
}

export type SubscriptionPeriod = {
    $$type: 'SubscriptionPeriod';
    period: bigint;
}

export function storeSubscriptionPeriod(src: SubscriptionPeriod) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2005346073, 32);
        b_0.storeUint(src.period, 32);
    };
}

export function loadSubscriptionPeriod(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2005346073) { throw Error('Invalid prefix'); }
    let _period = sc_0.loadUintBig(32);
    return { $$type: 'SubscriptionPeriod' as const, period: _period };
}

function loadTupleSubscriptionPeriod(source: TupleReader) {
    let _period = source.readBigNumber();
    return { $$type: 'SubscriptionPeriod' as const, period: _period };
}

function loadGetterTupleSubscriptionPeriod(source: TupleReader) {
    let _period = source.readBigNumber();
    return { $$type: 'SubscriptionPeriod' as const, period: _period };
}

function storeTupleSubscriptionPeriod(source: SubscriptionPeriod) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.period);
    return builder.build();
}

function dictValueParserSubscriptionPeriod(): DictionaryValue<SubscriptionPeriod> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSubscriptionPeriod(src)).endCell());
        },
        parse: (src) => {
            return loadSubscriptionPeriod(src.loadRef().beginParse());
        }
    }
}

export type UpdatePrice = {
    $$type: 'UpdatePrice';
    newPrice: bigint;
}

export function storeUpdatePrice(src: UpdatePrice) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(612259693, 32);
        b_0.storeCoins(src.newPrice);
    };
}

export function loadUpdatePrice(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 612259693) { throw Error('Invalid prefix'); }
    let _newPrice = sc_0.loadCoins();
    return { $$type: 'UpdatePrice' as const, newPrice: _newPrice };
}

function loadTupleUpdatePrice(source: TupleReader) {
    let _newPrice = source.readBigNumber();
    return { $$type: 'UpdatePrice' as const, newPrice: _newPrice };
}

function loadGetterTupleUpdatePrice(source: TupleReader) {
    let _newPrice = source.readBigNumber();
    return { $$type: 'UpdatePrice' as const, newPrice: _newPrice };
}

function storeTupleUpdatePrice(source: UpdatePrice) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.newPrice);
    return builder.build();
}

function dictValueParserUpdatePrice(): DictionaryValue<UpdatePrice> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeUpdatePrice(src)).endCell());
        },
        parse: (src) => {
            return loadUpdatePrice(src.loadRef().beginParse());
        }
    }
}

export type Withdraw = {
    $$type: 'Withdraw';
    amount: bigint;
}

export function storeWithdraw(src: Withdraw) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(195467089, 32);
        b_0.storeCoins(src.amount);
    };
}

export function loadWithdraw(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 195467089) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadCoins();
    return { $$type: 'Withdraw' as const, amount: _amount };
}

function loadTupleWithdraw(source: TupleReader) {
    let _amount = source.readBigNumber();
    return { $$type: 'Withdraw' as const, amount: _amount };
}

function loadGetterTupleWithdraw(source: TupleReader) {
    let _amount = source.readBigNumber();
    return { $$type: 'Withdraw' as const, amount: _amount };
}

function storeTupleWithdraw(source: Withdraw) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserWithdraw(): DictionaryValue<Withdraw> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeWithdraw(src)).endCell());
        },
        parse: (src) => {
            return loadWithdraw(src.loadRef().beginParse());
        }
    }
}

export type Subscribe = {
    $$type: 'Subscribe';
}

export function storeSubscribe(src: Subscribe) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1550988333, 32);
    };
}

export function loadSubscribe(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1550988333) { throw Error('Invalid prefix'); }
    return { $$type: 'Subscribe' as const };
}

function loadTupleSubscribe(source: TupleReader) {
    return { $$type: 'Subscribe' as const };
}

function loadGetterTupleSubscribe(source: TupleReader) {
    return { $$type: 'Subscribe' as const };
}

function storeTupleSubscribe(source: Subscribe) {
    let builder = new TupleBuilder();
    return builder.build();
}

function dictValueParserSubscribe(): DictionaryValue<Subscribe> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSubscribe(src)).endCell());
        },
        parse: (src) => {
            return loadSubscribe(src.loadRef().beginParse());
        }
    }
}

export type SubscriptionContract$Data = {
    $$type: 'SubscriptionContract$Data';
    owner: Address;
    price: bigint;
    balance: bigint;
    subscriptions: Dictionary<Address, bigint>;
}

export function storeSubscriptionContract$Data(src: SubscriptionContract$Data) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeCoins(src.price);
        b_0.storeCoins(src.balance);
        b_0.storeDict(src.subscriptions, Dictionary.Keys.Address(), Dictionary.Values.BigInt(257));
    };
}

export function loadSubscriptionContract$Data(slice: Slice) {
    let sc_0 = slice;
    let _owner = sc_0.loadAddress();
    let _price = sc_0.loadCoins();
    let _balance = sc_0.loadCoins();
    let _subscriptions = Dictionary.load(Dictionary.Keys.Address(), Dictionary.Values.BigInt(257), sc_0);
    return { $$type: 'SubscriptionContract$Data' as const, owner: _owner, price: _price, balance: _balance, subscriptions: _subscriptions };
}

function loadTupleSubscriptionContract$Data(source: TupleReader) {
    let _owner = source.readAddress();
    let _price = source.readBigNumber();
    let _balance = source.readBigNumber();
    let _subscriptions = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.BigInt(257), source.readCellOpt());
    return { $$type: 'SubscriptionContract$Data' as const, owner: _owner, price: _price, balance: _balance, subscriptions: _subscriptions };
}

function loadGetterTupleSubscriptionContract$Data(source: TupleReader) {
    let _owner = source.readAddress();
    let _price = source.readBigNumber();
    let _balance = source.readBigNumber();
    let _subscriptions = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.BigInt(257), source.readCellOpt());
    return { $$type: 'SubscriptionContract$Data' as const, owner: _owner, price: _price, balance: _balance, subscriptions: _subscriptions };
}

function storeTupleSubscriptionContract$Data(source: SubscriptionContract$Data) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.owner);
    builder.writeNumber(source.price);
    builder.writeNumber(source.balance);
    builder.writeCell(source.subscriptions.size > 0 ? beginCell().storeDictDirect(source.subscriptions, Dictionary.Keys.Address(), Dictionary.Values.BigInt(257)).endCell() : null);
    return builder.build();
}

function dictValueParserSubscriptionContract$Data(): DictionaryValue<SubscriptionContract$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSubscriptionContract$Data(src)).endCell());
        },
        parse: (src) => {
            return loadSubscriptionContract$Data(src.loadRef().beginParse());
        }
    }
}

 type SubscriptionContract_init_args = {
    $$type: 'SubscriptionContract_init_args';
    owner: Address;
}

function initSubscriptionContract_init_args(src: SubscriptionContract_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner);
    };
}

async function SubscriptionContract_init(owner: Address) {
    const __code = Cell.fromBase64('te6ccgECHAEABHcAART/APSkE/S88sgLAQIBYgIDAubQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zxVE9s88uCCyPhDAcx/AcoAVTBQQyDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgH6Alj6AvQAye1UGQQCASAODwT2AZIwf+BwIddJwh+VMCDXCx/eIIIQJH5XbbqOozDTHwGCECR+V2268uCB+gABMVUw2zwyggDDdCTCAPL0QwB/4CCCEAuml1G6jzAw0x8BghALppdRuvLggfoAATFVMNs8gRT6U1K78vRRFKFSNXJ/VSBtbW3bPDBBMH/gBQUMBgAi+EFvJBAjXwMkgT61AscF8vQCnCCCEFxyNC26jpAw0x8BghBccjQtuvLggW0x4IIQlGqYtrqOp9MfAYIQlGqYtrry4IHTPwExyAGCEK/5D1dYyx/LP8n4QgFwbds8f+AwcAcLA/Iw+EFvJDAygTm+UyW+8vRQM6D4IyKBAQslgQEBQTP0Cm+hlAHXADCSW23ibo9IIoEBCyWBAQFBM/QKb6GUAdcAMJJbbeIgbvLQgIIIJ40AArYJAaCBAQtARIEBASFulVtZ9FkwmMgBzwBBM/RB4oj4QgF/bds84w1/CAsJADYAAAAAU3Vic2NyaXB0aW9uIHN1Y2Nlc3NmdWwCUoEBCwGCCAk6gKBBQIEBASFulVtZ9FkwmMgBzwBBM/RB4oj4QgF/bds8CgsANAAAAABGcmVlIHRyaWFsIGhhcyBzdGFydGVkATxtbSJus5lbIG7y0IBvIgGRMuIQJHADBIBCUCPbPDAMAcrIcQHKAVAHAcoAcAHKAlAFINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WUAP6AnABymgjbrORf5MkbrPilzMzAXABygDjDSFus5x/AcoAASBu8tCAAcyVMXABygDiyQH7CA0AmH8BygDIcAHKAHABygAkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDiJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4nABygACfwHKAALJWMwCASAQEQIBIBQVAhG56P2zzbPGxBgZEgJNuw0yDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjbPFUD2zxsQYGRMAAiIAOIEBCyICgQEBQTP0Cm+hlAHXADCSW23iIG7y0IACEbn1PbPNs8bEGBkWAgFIFxgAAiEAEbCvu1E0NIAAYAJNsp+INdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiNs8VQPbPGxBgGRoByu1E0NQB+GPSAAGOKvpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+gD6APQEVTBsFOD4KNcLCoMJuvLgifpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB0ds8GwBKgQELIgKBAQFBM/QKb6GUAdcAMJJbbeIgbpIwcOAgbvLQgPgjvAASbYIQO5rKAHBY');
    const __system = Cell.fromBase64('te6cckECHgEABIEAAQHAAQEFoN9VAgEU/wD0pBP0vPLICwMCAWIEDwLm0AHQ0wMBcbCjAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhUUFMDbwT4YQL4Yts8VRPbPPLggsj4QwHMfwHKAFUwUEMg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYB+gJY+gL0AMntVBsFBPYBkjB/4HAh10nCH5UwINcLH94gghAkfldtuo6jMNMfAYIQJH5Xbbry4IH6AAExVTDbPDKCAMN0JMIA8vRDAH/gIIIQC6aXUbqPMDDTHwGCEAuml1G68uCB+gABMVUw2zyBFPpTUrvy9FEUoVI1cn9VIG1tbds8MEEwf+AGBg0HACL4QW8kECNfAySBPrUCxwXy9AKcIIIQXHI0LbqOkDDTHwGCEFxyNC268uCBbTHgghCUapi2uo6n0x8BghCUapi2uvLggdM/ATHIAYIQr/kPV1jLH8s/yfhCAXBt2zx/4DBwCAwD8jD4QW8kMDKBOb5TJb7y9FAzoPgjIoEBCyWBAQFBM/QKb6GUAdcAMJJbbeJuj0gigQELJYEBAUEz9ApvoZQB1wAwkltt4iBu8tCAgggnjQACtgkBoIEBC0BEgQEBIW6VW1n0WTCYyAHPAEEz9EHiiPhCAX9t2zzjDX8JDAoANgAAAABTdWJzY3JpcHRpb24gc3VjY2Vzc2Z1bAJSgQELAYIICTqAoEFAgQEBIW6VW1n0WTCYyAHPAEEz9EHiiPhCAX9t2zwLDAA0AAAAAEZyZWUgdHJpYWwgaGFzIHN0YXJ0ZWQBPG1tIm6zmVsgbvLQgG8iAZEy4hAkcAMEgEJQI9s8MA0ByshxAcoBUAcBygBwAcoCUAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQA/oCcAHKaCNus5F/kyRus+KXMzMBcAHKAOMNIW6znH8BygABIG7y0IABzJUxcAHKAOLJAfsIDgCYfwHKAMhwAcoAcAHKACRus51/AcoABCBu8tCAUATMljQDcAHKAOIkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDicAHKAAJ/AcoAAslYzAIBIBAVAgEgERMCEbno/bPNs8bEGBsSAAIiAk27DTINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiNs8VQPbPGxBgbFAA4gQELIgKBAQFBM/QKb6GUAdcAMJJbbeIgbvLQgAIBIBYYAhG59T2zzbPGxBgbFwACIQIBSBkaABGwr7tRNDSAAGACTbKfiDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjbPFUD2zxsQYBsdAcrtRNDUAfhj0gABjir6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfoA+gD0BFUwbBTg+CjXCwqDCbry4In6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdHbPBwAEm2CEDuaygBwWABKgQELIgKBAQFBM/QKb6GUAdcAMJJbbeIgbpIwcOAgbvLQgPgjvP4jGtQ=');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initSubscriptionContract_init_args({ $$type: 'SubscriptionContract_init_args', owner })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const SubscriptionContract_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack underflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    11: { message: `'Unknown' error` },
    12: { message: `Fatal error` },
    13: { message: `Out of gas error` },
    14: { message: `Virtualization error` },
    32: { message: `Action list is invalid` },
    33: { message: `Action list is too long` },
    34: { message: `Action is invalid or not supported` },
    35: { message: `Invalid source address in outbound message` },
    36: { message: `Invalid destination address in outbound message` },
    37: { message: `Not enough TON` },
    38: { message: `Not enough extra-currencies` },
    39: { message: `Outbound message does not fit into a cell after rewriting` },
    40: { message: `Cannot process a message` },
    41: { message: `Library reference is null` },
    42: { message: `Library change action error` },
    43: { message: `Exceeded maximum number of cells in the library or the maximum depth of the Merkle tree` },
    50: { message: `Account state size exceeded limits` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid address` },
    137: { message: `Masterchain support is not enabled for this contract` },
    5370: { message: `Balance is not enough` },
    14782: { message: `Payment amount is not enough` },
    16053: { message: `Only owner can call` },
    50036: { message: `Price must be greater than 0` },
}

const SubscriptionContract_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"StdAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":8}},{"name":"address","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"VarAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":32}},{"name":"address","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"SubscriptionPeriod","header":2005346073,"fields":[{"name":"period","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"UpdatePrice","header":612259693,"fields":[{"name":"newPrice","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"Withdraw","header":195467089,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"Subscribe","header":1550988333,"fields":[]},
    {"name":"SubscriptionContract$Data","header":null,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"price","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"balance","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"subscriptions","type":{"kind":"dict","key":"address","value":"int"}}]},
]

const SubscriptionContract_getters: ABIGetter[] = [
    {"name":"checkSubscription","arguments":[{"name":"user","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"bool","optional":false}},
    {"name":"getExpiryTime","arguments":[{"name":"user","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"getPrice","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"getBalance","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
]

export const SubscriptionContract_getterMapping: { [key: string]: string } = {
    'checkSubscription': 'getCheckSubscription',
    'getExpiryTime': 'getGetExpiryTime',
    'getPrice': 'getGetPrice',
    'getBalance': 'getGetBalance',
}

const SubscriptionContract_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"UpdatePrice"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Withdraw"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Subscribe"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]

export class SubscriptionContract implements Contract {
    
    static async init(owner: Address) {
        return await SubscriptionContract_init(owner);
    }
    
    static async fromInit(owner: Address) {
        const init = await SubscriptionContract_init(owner);
        const address = contractAddress(0, init);
        return new SubscriptionContract(address, init);
    }
    
    static fromAddress(address: Address) {
        return new SubscriptionContract(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  SubscriptionContract_types,
        getters: SubscriptionContract_getters,
        receivers: SubscriptionContract_receivers,
        errors: SubscriptionContract_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: UpdatePrice | Withdraw | Subscribe | Deploy) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdatePrice') {
            body = beginCell().store(storeUpdatePrice(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Withdraw') {
            body = beginCell().store(storeWithdraw(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Subscribe') {
            body = beginCell().store(storeSubscribe(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getCheckSubscription(provider: ContractProvider, user: Address) {
        let builder = new TupleBuilder();
        builder.writeAddress(user);
        let source = (await provider.get('checkSubscription', builder.build())).stack;
        let result = source.readBoolean();
        return result;
    }
    
    async getGetExpiryTime(provider: ContractProvider, user: Address) {
        let builder = new TupleBuilder();
        builder.writeAddress(user);
        let source = (await provider.get('getExpiryTime', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getGetPrice(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('getPrice', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getGetBalance(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('getBalance', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
}