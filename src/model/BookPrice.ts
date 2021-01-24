type ServiceType_T = 'purchase' | 'subscribe';
type Platform_T =
    | '리디북스'
    | '밀리의서재'
    | '예스24'
    | '인터넷 교보문고'
    | '알라딘'
    | '인터파크 도서'
    | '네이버 시리즈';

export enum Platforms {
    RIDI = '리디북스',
    MILLI = '밀리의서재',
    YES24 = '예스24',
    KYOBO = '인터넷 교보문고',
    ALADIN = '알라딘',
    INTERPARK = '인터파크 도서',
    NAVER = '네이버 시리즈',
}

export default class BookPrice {
    private _pid: Platforms;
    private _price: Number;
    private _serviceType: ServiceType_T;

    constructor(
        platfromName: Platform_T,
        price: Number,
        serviceType: ServiceType_T
    ) {
        this._pid = Platforms[platfromName];
        this._price = price;
        this._serviceType = serviceType;
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
