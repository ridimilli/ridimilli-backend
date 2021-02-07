import naverBookAPI from '../modules/naverBookApi';
import scrapper from '../modules/scrapper';
import ut from '../modules/util';
import rm from '../modules/responseMessage';
import { Request, Response } from 'express';
// import crawler from '../class/Crawler';

const naverAPI = async (req: Request, res: Response): Promise<Response> => {
    const { query, start }: { query?: string; start?: number } = req.query;
    try {
        if (!query) return res.status(400).json(ut.fail(rm.NULL_VALUE));

        const apiBooks = await naverBookAPI.callBookApi(
            query,
            start ? start : 1
        );
        const books = apiBooks.map((book) => {
            const bookTitle = JSON.stringify(book.title)
                .replace(/(<b>)|(<\/b>)/gi, '')
                .replace(/ *\([^)]*\) */g, '');
            const bookDescription = JSON.stringify(book.description).replace(
                /(<b>)|(<\/b>)/gi,
                ''
            );
            return {
                title: JSON.parse(bookTitle),
                bid: book.link.split('bid=')[1],
                image: book.image,
                author: book.author,
                isbn: book.isbn,
                description: JSON.parse(bookDescription),
                publisher: book.publisher,
                pubdate: book.pubdate,
            };
        });
        res.status(200).json(ut.success(rm.GET_NAVER_BOOK_SUCCESS, books));
    } catch (err) {
        console.log(err);
        res.status(500).json(ut.fail(rm.GET_NAVER_BOOK_FAIL));
    }
};

/**
 * @body = title, link
 * @return  json array
 */
const crawling = async (req: Request, res: Response): Promise<Response> => {
    const { title, bid }: { title?: string; bid?: string } = req.query;

    if (!title || !bid) {
        return res.status(400).json(ut.fail(rm.NULL_VALUE));
    }

    try {
        const purchaseBooks = await scrapper.searchNaverBook(bid);
        const dto = await Promise.all([
            scrapper.ridiSelect(title),
            // scrapper.millie(title),
            // scrapper.yes24(title),
            // scrapper.kyoboBook(title),
        ]);
        // const dto = await crawler.crawling(title);
        const subscribedBooks = dto.filter((item) => item !== undefined);
        res.status(200).json(
            ut.success(rm.GET_CRAWLING_BOOKS_SUCCESS, {
                subscribedBooks,
                purchaseBooks,
            })
        );
    } catch (err) {
        console.log(err);
        res.status(500).json(ut.fail(rm.GET_CRAWLING_BOOKS_FAILED));
    }
};

export { naverAPI, crawling };
