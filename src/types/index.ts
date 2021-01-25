type ServiceType_T = 'purchase' | 'subscribe';
type Platform_T =
    | '리디북스'
    | '밀리의서재'
    | '예스24'
    | '인터넷 교보문고'
    | '알라딘'
    | '인터파크 도서'
    | '네이버 시리즈';

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

enum Platforms {
    RIDI = '리디북스',
    MILLI = '밀리의서재',
    YES24 = '예스24',
    KYOBO = '인터넷 교보문고',
    ALADIN = '알라딘',
    INTERPARK = '인터파크 도서',
    NAVER = '네이버 시리즈',
}

/**
 * export Type
 */
export { ServiceType_T, Platform_T, NaverBook_T };

/**
 * export Enum
 */
export { Platforms };
