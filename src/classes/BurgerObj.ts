import IngrObj from "./IngrObj";

export default class BurgerObj
{
    private fullItem: IngrObj[];
    private fullCopy: any[];
    private breds:IngrObj[] = [];
    private ingrs:IngrObj[] = [];
    private totalCount = 0;
    private totalPrice = 0;

    get fullItems()
    {
        return this.ingrs;
    }
    set fullItems(igs)
    {
        this.fullItem = igs;
        this.fullCopy = this.fullItem.map(ig => ({...ig}));
        this.breds = this.fullItem.filter(ig => ig.name.startsWith('Bread'));
        this.ingrs = this.fullItem.filter(ig => !ig.name.startsWith('Bread'));
        this.fullItem.forEach(ig => {
            this.totalCount += ig.count;
            this.totalPrice += (ig.price * ig.count);
        });
    }
    public resetItems()
    {
        this.totalCount = 0;
        this.totalPrice = 0;
        this.fullItems = this.fullCopy;
    }
    
    get breads()
    {
        return this.breds;
    }
    get ingredients()
    {
        return this.ingrs;
    }

    public increaseCount(ingName: string)
    {
        const ingr = this.ingrs.find(ig => (ig.name === ingName));
        if(ingr) {
            ingr.count += 1;
            this.totalCount += 1;
            this.totalPrice += ingr.price;
        }
    }
    public decreaseCount(ingName: string)
    {
        const ingr = this.ingrs.find(ig => (ig.name === ingName));
        if(ingr) {
            ingr.count -= 1;
            this.totalCount -= 1;
            this.totalPrice -= ingr.price;
        }
    }
    
    get countTotal()
    {
        return this.totalCount;
    }
    get priceTotal()
    {
        return this.totalPrice.toFixed(2);
    }
}