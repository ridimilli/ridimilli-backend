// import * as _ from 'lodash';
// import { Platform_T, Platforms } from '../types';
// import {
//     ridiSelect,
//     millie,
//     yes24,
//     kyoboBook,
//     searchNaverBook,
// } from '../modules/scrapper';
// /**
//  * Singleton Class
//  */
// class Crawler {
//     private static instance: Crawler;

//     private constructor() {}

//     public static getInstance(): Crawler {
//         if (_.isNil(this.instance)) this.instance = new Crawler();
//         return this.instance;
//     }

//     public async crawling(
//         title: String
//     ): Promise<
//         Array<{
//             titleName: string;
//             platform: string;
//             redirectURL: string;
//             price: number;
//         }>
//     > {
//         console.log('test1');
//         // await puppeteer.launch();
//         // console.log('test2');
//         return await Promise.all([
//             ridiSelect(title),
//             millie(title),
//             yes24(title),
//             kyoboBook(title),
//         ]);
//     }
// }

// export default Crawler.getInstance();
