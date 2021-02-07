import * as _ from 'lodash';
import { ridiSelect, millie, yes24, kyoboBook } from '../modules/scrapper';
/**
 * Singleton Class
 */
class Crawler {
    private static instance: Crawler;

    private constructor() {}

    public static getInstance(): Crawler {
        if (_.isNil(this.instance)) this.instance = new Crawler();
        return this.instance;
    }

    public async crawling(title: string) {
        return await Promise.all([
            ridiSelect(title),
            millie(title),
            yes24(title),
            kyoboBook(title),
        ]);
    }
}

export default Crawler.getInstance();
