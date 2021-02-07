import { getParsedCommandLineOfConfigFile } from 'typescript';
import {
    ServiceType_T,
    Platform_T,
    SubscribePrice,
    ServiceType,
} from '../types';
import { Platforms } from '../types';
export default class BookPrice {
    private _title: string;
    private _pid: Platforms;
    private _price: Number;
    private _redirectURL: String;
    private _serviceType: ServiceType_T;

    constructor(
        title: string,
        platform: Platform_T,
        redirectURL: String,
        serviceType: ServiceType_T,
        price: Number
    ) {
        this._title = title;

        this._pid = platform;
        this._redirectURL = redirectURL;
        this._serviceType = serviceType;
        this._price = price;
    }

    get pid(): Platforms {
        return this._pid;
    }

    get price(): Number {
        return this._price;
    }

    get serviceType(): ServiceType_T {
        return this._serviceType;
    }
}
