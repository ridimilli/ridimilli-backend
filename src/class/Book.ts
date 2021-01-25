export default class Book {
    private _bid: String;
    private _title: String;
    private _author: String;
    private _publisher: String;
    private _description: String;
    private _image: String;
    private _isbn: Number;
    private _pubdate: Date;

    constructor(
        bid: String,
        title: String,
        author: String,
        publihser: String,
        description: String,
        image: String,
        isbn: Number,
        pubdate: Date
    ) {
        this._bid = bid;
        this._title = title;
        this._author = author;
        this._publisher = publihser;
        this._description = description;
        this._image = image;
        this._isbn = isbn;
        this._pubdate = pubdate;
    }

    get bid(): String {
        return this._bid;
    }

    get isbn(): Number {
        return this._isbn;
    }
}
