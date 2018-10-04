export default class IngrObj
{
    private _name: string;
    private _count: number;
    private _price: number;

    constructor(str: string, pr: number)
    {
        this._name = str;
        this._count = 0;
        this._price = pr;
    }

    get name()
    {
        return this._name;
    }
    get price()
    {
        return this._price;
    }
    get count()
    {
        return this._count;
    }
    set count(c: number)
    {
        this._count = c;
    }
}