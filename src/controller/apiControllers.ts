import naverBookAPI from '../modules/naverBookApi';
import ut from '../modules/util';
import rm from '../modules/responseMessage';
import fakeResponse from '../modules/fakeResponse';
import { crawler } from '../modules/requestCrawler';

import { Request, Response } from 'express';

const naverAPI = async (req: Request, res: Response): Promise<Response> => {
    const { start, query }: { start?: number; query?: string } = req.query;

    try {
        if (!query || query === 'undefined') {
            return res.status(400).json(ut.fail(rm.NULL_VALUE));
        }
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

const crawling = async (req: Request, res: Response): Promise<Response> => {
    const { title, bid }: { title?: string; bid?: string } = req.query;

    if (title == 'undefined' || !bid || !title) {
        return res.status(400).json(ut.fail(rm.NULL_VALUE));
    }

    try {
        const result = await crawler(title, bid);
        res.status(200).json(ut.success(rm.GET_CRAWLING_BOOKS_SUCCESS, result));
    } catch (err) {
        res.status(500).json(ut.fail(rm.GET_CRAWLING_BOOKS_FAILED));
    }
};

const test = (req: Request, res: Response): any => {
    const data = fakeResponse;
    res.status(200).json(data);
};

export { naverAPI, crawling, test };
