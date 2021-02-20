import * as cheerio from 'cheerio';
import * as puppeteer from 'puppeteer';

import { Platforms, ServiceType, Platform_T } from '../types';
import BookPrice from '../class/BookPrice';

/**
 * @TODO page.waitForSelector 이부분 성능개선 로직인데.. Timeout 해결해보자..
 */
const pupRequest = async (
    url: string,
    selector: string,
    childSelectorArr: Array<string>,
    platform: Platform_T,
    title: string,
    subscribedPrice: number,
    host?: string
): Promise<BookPrice> => {
    try {
        const [TITLE, REDIRECT_URL, LOAD_SELECTOR] = [0, 1, 2];
        const browse = await puppeteer.launch();
        const page = await browse.newPage();
        await page.goto(url, { waitUntil: 'networkidle0' });
        //await page.waitForSelector(childSelectorArr[LOAD_SELECTOR], {});
        const content = await page.content();
        const $ = cheerio.load(content);
        const lists = [];
        $(selector).each((_, list) => {
            const title = $(list).find(childSelectorArr[TITLE]).text().trim();
            let redirectURL = $(list)
                .find(childSelectorArr[REDIRECT_URL])
                .attr('href');
            if (host) redirectURL = encodeURI(host + redirectURL);
            console.log(title);
            lists.push(
                new BookPrice(
                    title,
                    platform,
                    redirectURL,
                    ServiceType.SUBSCRIBE,
                    subscribedPrice
                )
            );
        });
        browse.close();
        if (lists.length) {
            return lists.filter((item) => title.match(item.title))[0];
        }
        return;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

const kyoboPupRequest = async (
    url: string,
    selector: string,
    childSelectorArr: Array<string>,
    platform: Platform_T,
    title: string,
    subscribedPrice: number,
    host?: string
): Promise<Array<BookPrice>> => {
    const [TITLE, REDIRECT_URL, LOAD_SELECTOR, SAM_TYPE] = [0, 1, 2, 3];
    const browse = await puppeteer.launch();
    const page = await browse.newPage();
    await page.goto(url, {
        waitUntil: 'networkidle0',
    }); //여기서 모든 latency가 발견됨.
    //await page.waitForSelector(childSelectorArr[LOAD_SELECTOR], {});
    const content = await page.content();
    const $ = cheerio.load(content);
    const lists = [];
    $(selector).each((_, list) => {
        const title = $(list).find(childSelectorArr[TITLE]).text().trim();
        let redirectURL = $(list)
            .find(childSelectorArr[REDIRECT_URL])
            .attr('href');
        if (host) redirectURL = encodeURI(host + redirectURL);

        $(list)
            .find(childSelectorArr[SAM_TYPE])
            .each((_, item) => {
                if ($(item).attr('alt') === Platforms.KYOBO_BASIC) {
                    lists.push(
                        new BookPrice(
                            title,
                            Platforms.KYOBO_BASIC,
                            redirectURL,
                            ServiceType.SUBSCRIBE,
                            subscribedPrice
                        )
                    );
                } else if ($(item).attr('alt') === Platforms.KYOBO_UNLIMITED) {
                    lists.push(
                        new BookPrice(
                            title,
                            Platforms.KYOBO_UNLIMITED,
                            redirectURL,
                            ServiceType.SUBSCRIBE,
                            subscribedPrice
                        )
                    );
                }
            });
    });
    browse.close();
    if (lists.length) {
        return lists.filter((item) => title.match(item.title));
    }
    return;
};

export default { pupRequest, kyoboPupRequest };
export { pupRequest, kyoboPupRequest };
