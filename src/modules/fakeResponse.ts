const data = {
    success: true,
    message: '크롤링책 조회 성공',
    data: {
        subscribedBooks: [
            {
                title: '노인과 바다',
                platform: '리디북스',
                redirectURL:
                    'https://select.ridibooks.com/book/1242000811?q=%EB%85%B8%EC%9D%B8%EA%B3%BC%20%EB%B0%94%EB%8B%A4&s=search',
                serviceType: 'subscribe',
                price: 9900,
            },
            {
                title: '노인과 바다',
                platform: '밀리의서재',
                redirectURL:
                    'https://www.millie.co.kr/v3/bookDetail/179482334?nav_hidden=y',
                serviceType: 'subscribe',
                price: 9900,
            },
            {
                title: '노인과 바다',
                platform: '예스24',
                redirectURL:
                    'http://bookclub.yes24.com/BookClub/BcDetail?goodsNo=13517063',
                serviceType: 'subscribe',
                price: 5500,
            },
            {
                title: '노인과 바다',
                platform: 'sam베이직',
                redirectURL:
                    'http://digital.kyobobook.co.kr/digital/ebook/ebookDetail.ink?selectedLargeCategory=001&barcode=4801157270027&orderClick=LEK&Kc=',
                serviceType: 'subscribe',
                price: 7000,
            },
            {
                title: '노인과 바다',
                platform: 'sam무제한',
                redirectURL:
                    'http://digital.kyobobook.co.kr/digital/ebook/ebookDetail.ink?selectedLargeCategory=001&barcode=4808931924411&orderClick=LEK&Kc=',
                serviceType: 'subscribe',
                price: 7000,
            },
        ],
        purchaseBooks: [
            {
                platform: '예스24',
                price: 8640,
                redirectURL:
                    'http://www.yes24.com/Cooperate/Yes24Gateway.aspx?pid=180443&ReturnURL=http://www.yes24.com/Goods/FTGoodsView.aspx?goodsNo=96402447',
            },
            {
                platform: '알라딘',
                price: 8640,
                redirectURL:
                    'https://www.aladin.co.kr/part/wgate.aspx?k=fpTAq7WGN99LIH6nqyN5ZhAN9XuEnv&sk=641696&u=%2Fshop%2Fwproduct.aspx%3FISBN%3DE542538063',
            },
            {
                platform: '인터파크 도서',
                price: 8640,
                redirectURL:
                    'http://book.interpark.com/gate/ippgw.jsp?biz_cd=P14182&url=http://book.interpark.com/product/BookDisplay.do?_method=detail&sc.prdNo=344925071',
            },
            {
                platform: '인터넷 교보문고',
                price: 8640,
                redirectURL:
                    'http://www.kyobobook.co.kr/cooper/redirect_over.jsp?LINK=NVE&next_url=http://digital.kyobobook.co.kr/digital/ebook/ebookDetail.ink?LINK=NVE&category=001&barcode=4801190473508',
            },
            {
                platform: '리디북스',
                price: 9600,
                redirectURL:
                    'https://ridibooks.com/books/1157000214?referer=naver_book',
            },
            {
                platform: '네이버 시리즈',
                price: 9600,
                redirectURL:
                    'http://nstore.naver.com/ebook/detail.nhn?originalProductId=420594',
            },
        ],
    },
};

export default data;
