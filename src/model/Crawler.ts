import * as _ from 'lodash';
import { Platform_T, Platforms } from '../types';

/**
 * Singleton Class
 */
export class Crawler {
    private static instance: Crawler;

    private constructor() {}

    public static getInstance(): Crawler {
        if (_.isNil(this.instance)) this.instance = new Crawler();
        return this.instance;
    }

    /**
     * @param platform Platform type
     */
    public crawlByPlatfrom(platform: Platform_T): Promise<{}> {
        return new Promise((resolve, reject) => {
            // TODO
        });
    }
    public crawlByUrl(url: String): Promise<{ data: String }> {
        return new Promise((resolve, reject) => {
            // TODO
        });
    }

    public generateLink(platform: Platform_T, bookName: String): String {
        // TODO
        const url = 'https://';
        switch (platform) {
            case Platforms.ALADIN:
                break;
            case Platforms.INTERPARK:
                break;
            case Platforms.KYOBO:
                break;
            case Platforms.MILLI:
                break;
            case Platforms.NAVER:
                break;
            case Platforms.RIDI:
                break;
            case Platforms.YES24:
                break;
        }
        return url;
    }
}
