import IngrObj from "./IngrObj";

export default class BurgerObj
{
    private BreadTop: IngrObj = new IngrObj('BreadTop', 2.5);
    private Salad: IngrObj = new IngrObj('Salad', 0.5);
    private Bacon: IngrObj = new IngrObj('Bacon', 0.7);
    private Cheese: IngrObj = new IngrObj('Cheese', 0.4);
    private Meat: IngrObj = new IngrObj('Meat', 1.3);
    private BreadBottom: IngrObj = new IngrObj('BreadBottom', 1.5);

    constructor()
    {
        this.BreadTop.count = 1;
        this.BreadBottom.count = 1;
    }

    get ingredientNames()
    {
        return [this.Salad.name , this.Bacon.name , 
            this.Cheese.name , this.Meat.name];
    }

    public ingredientCount(ingName: string)
    {
        return this[ingName].count;
    }

    get totalIngredientCount()
    {
        return this.Bacon.count + this.Cheese.count + 
            this.Meat.count + this.Salad.count;
    }

    public decreaseCount(ingName: string)
    {
        if(this[ingName].count > 0) {
            this[ingName].count -= 1;
        }
    }

    public increaseCount(ingName: string)
    {
        this[ingName].count += 1;
    }

    get calculateTotal()
    {
        let totalPrice = 0;
        Object.keys(this).forEach( ingr => {
            if(this[ingr].count > 0) {
                totalPrice += (this[ingr].price * this[ingr].count);
            }
        });
        return totalPrice.toFixed(2);
    }
}