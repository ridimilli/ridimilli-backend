import { ServiceType_T, Platform_T } from '../types';
import { Platforms } from '../types';
export default class BookPrice {
    private _pid: Platform_T;
    private _price: Number;
    private _serviceType: ServiceType_T;

    constructor(
        platformName: Platform_T,
        price: Number,
        serviceType: ServiceType_T
    ) {
        this._pid = Platforms[platformName];
        this._price = price;
        this._serviceType = serviceType;
    }

    get pid(): Platform_T {
        return this._pid;
    }

    get price(): Number {
        return this._price;
    }

    get serviceType(): ServiceType_T {
        return this._serviceType;
    }
}
