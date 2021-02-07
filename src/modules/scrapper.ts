import * as request from 'request';
import * as cheerio from 'cheerio';
import * as puppeteer from 'puppeteer';

type pupResponse_T = {
    title: string;
    platform: string;
    redirectURL: string;
    price: number;
};

const pupRequest = async (
    url,
    selector,
    childSelectorArr,
    platform,
    title,
    subscribedPrice
): Promise<pupResponse_T> => {
    const [TITLE, REDIRECT_URL, LOAD_SELECTOR] = [0, 1, 2];
    const browse = await puppeteer.launch();
    const page = await browse.newPage();
    await page.goto(url);
    await page.waitForSelector(childSelectorArr[LOAD_SELECTOR]);
    const content = await page.content();
    const $ = cheerio.load(content);
    const lists = [];
    $(selector).each((_, list) => {
        const title = $(list).find(childSelectorArr[TITLE]).text();
        const redirectURL = $(list)
            .find(childSelectorArr[REDIRECT_URL])
            .attr('href');
        lists.push({
            title,
            platform,
            redirectURL,
            price: subscribedPrice,
        });
    });
    browse.close();
    if (lists.length) {
        return lists.filter((item) => title.match(item.title))[0];
    }
    return;
};

const ridiSelect = async (title: string): Promise<pupResponse_T> => {
    const platform = 'RIDI';
    const subscribedPrice = 9900;
    const url =
        'https://select.ridibooks.com/search?q=' +
        encodeURI(title) +
        '&type=Books';
    const selector = '#app > main > ul> li';
    const childSelectorArr = ['div > div > a > h3 ', 'div > div > a', 'a h3'];
    const book = await pupRequest(
        url,
        selector,
        childSelectorArr,
        platform,
        title,
        subscribedPrice
    );
    return book;
};

const millie = async (title: string): Promise<pupResponse_T> => {
    const platform = 'MILLIE';
    const subscribedPrice = 15000;
    const url =
        'https://www.millie.co.kr/v3/search/result/' +
        encodeURI(title) +
        '?type=all&order=keyword&category=1';
    const selector =
        '#wrap > section > div > section.search-list > div > ul > li';
    const childSelectorArr = [
        'a > div.body > span.title',
        'a',
        'a div.body span.title',
    ];
    const book = await pupRequest(
        url,
        selector,
        childSelectorArr,
        platform,
        title,
        subscribedPrice
    );
    return book;
};

const yes24 = (title: string): Promise<pupResponse_T> =>
    new Promise((resolved, rejected) => {
        const platform = 'YES24';
        const subscribedPrice = 12000;
        const url =
            'https://bookclub.yes24.com/BookClub/Search?keyword=' +
            encodeURI(title) +
            '&OrderBy=01&pageNo=1';

        const options = {
            url,
            headers: { 'User-Agent': 'Mozilla/5.0' },
            encoding: null,
        };

        request.get(options, function (error, response, body) {
            if (error) {
                rejected(response.statusCode);
            }

            const $ = cheerio.load(body);
            const selector = '#ulGoodsList > li';
            const childSelectorArr = [
                'div > div > div > a',
                'div > p > span > a',
            ];
            let books = {};

            $(selector).each((_, list) => {
                const title = $(list).find(childSelectorArr[0]).text();
                const redirectURL = $(list)
                    .find(childSelectorArr[1])
                    .attr('href');
                books = {
                    title,
                    platform,
                    redirectURL: 'http://bookclub.yes24.com' + redirectURL,
                    price: subscribedPrice,
                };
            });
            resolved(books as pupResponse_T);
        });
    });

const kyoboBook = async (title: string): Promise<pupResponse_T> => {
    const platform = 'KYOBO';
    const subscribedPrice = 11000;
    const url =
        'https://search.kyobobook.co.kr/web/search?vPstrKeyWord=' +
        encodeURI(title) +
        '&orderClick=LEK&searchCategory=SAM%40DIGITAL&collName=DIGITAL&searchPcondition=1';
    const selector = '#search_list > tr';
    const childSelectorArr = [
        'td.detail > div.title > a > strong',
        'td.detail > div.title > a',
        'td.detail div.title a strong',
    ];
    const book = await pupRequest(
        url,
        selector,
        childSelectorArr,
        platform,
        title,
        subscribedPrice
    );
    return book;
};

//@todo Map 한글플랫폼 -> 영어 플랫폼으로 바꿔주기
const searchNaverBook = (
    bid: string
): Promise<
    Array<{
        platform: string;
        price: number;
        redirectURL: string;
    }>
> =>
    new Promise((resolved, rejected) => {
        const platformIdMap = new Map([
            ['리디북스', 'RIDI'],
            ['밀리의서재', 'MILLIE'],
            ['예스24', 'YES24'],
            ['인터넷 교보문고', 'KYOBO'],
            ['알라딘', 'ALADIN'],
            ['인터파크 도서', 'INTERPARK'],
            ['네이버 시리즈', 'NAVER'],
        ]);

        const url = 'https://book.naver.com/bookdb/book_detail.nhn?bid=' + bid;
        const options = {
            url,
            headers: { 'User-Agent': 'Mozilla/5.0' },
            encoding: null,
        };

        request.get(options, function (error, response, body) {
            if (error) {
                rejected(response.statusCode);
            }

            const $ = cheerio.load(body);
            const selector = '#productListLayer > ul > li';
            const books = [];

            $(selector).each((_, book) => {
                const isEbook = $(book).find('strong').text();
                const platform = $(book).find('div > a').text();
                const price = $(book).find('span > em').text();
                const redirectURL = $(book).find('div > a').attr('href');
                if (isEbook.match('ebook')) {
                    const platformName = platform.split('Naver')[0];
                    books.push({
                        platform: platformIdMap.get(platformName),
                        price: Number(price.split('원')[0]),
                        redirectURL,
                    });
                }
            });
            resolved(books);
        });
    });

export default { ridiSelect, millie, yes24, kyoboBook, searchNaverBook };
export { ridiSelect, millie, yes24, kyoboBook, searchNaverBook };
