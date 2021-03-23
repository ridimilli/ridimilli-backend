import * as request from 'request';
import * as dotenv from 'dotenv';

dotenv.config();

const crawler = (title: string, bid: string): Promise<object> => {
    return new Promise((resolved, rejected) => {
        const api_url = `https://1py63w7227.execute-api.ap-northeast-2.amazonaws.com/dev/crawling?title=${encodeURI(
            title
        )}&bid=${encodeURI(bid)}`;
        const options = {
            url: api_url,
        };
        request.get(options, function (error, response, body) {
            if (!error) {
                resolved(JSON.parse(body));
            } else {
                console.log(error);
                rejected(response);
            }
        });
    });
};

export default { crawler };
export { crawler };
