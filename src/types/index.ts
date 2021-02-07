enum ServiceType {
    PURCHASE = 'purchase',
    SUBSCRIBE = 'subscribe',
}

type ServiceType_T = ServiceType.PURCHASE | ServiceType.SUBSCRIBE;

enum Platforms {
    RIDI = '리디북스',
    MILLIE = '밀리의서재',
    YES24 = '예스24',
    KYOBO = '인터넷 교보문고',
    KYOBO_BASIC = '인터넷 교보문고 BASIC',
    KYOBO_UNLIMITED = '인터넷 교보문고 UNLIMITED',
    ALADIN = '알라딘',
    INTERPARK = '인터파크 도서',
    NAVER = '네이버 시리즈',
}

enum SubscribePrice {
    RIDI = 1000,
    MILLIE = 2000,
    YES24 = 3000,
    KYOBO_BASIC = 4000,
    KYOBO_UNLIMITED = 5000,
    ALADIN = 6000,
    INTERPARK = 7000,
    NAVER = 8000,
}

type Platform_T =
    | Platforms.ALADIN
    | Platforms.MILLIE
    | Platforms.INTERPARK
    | Platforms.KYOBO
    | Platforms.NAVER
    | Platforms.RIDI
    | Platforms.YES24;

type NaverBook_T = {
    title: string;
    link: string;
    image: string;
    author: string;
    isbn: string;
    description: string;
    publisher: string;
    pubdate: Date;
};

/**
 * export Type
 */
export { ServiceType_T, Platform_T, NaverBook_T };

/**
 * export Enum
 */
export { Platforms, ServiceType, SubscribePrice };
