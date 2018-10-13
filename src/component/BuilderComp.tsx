import * as React from 'react';
import { IPropsBuilder } from '../classes/IProps';
import './BuilderComp.css';
import IngrObj from '../classes/IngrObj';

export default class BuilderComp extends React.Component<IPropsBuilder>
{
    private ingredients:IngrObj[];

    constructor(props: IPropsBuilder)
    {
        super(props);
        this.ingredients = this.props.burger.ingredients.map(ig => ({...ig} as IngrObj));
    }

    public render()
    {
        return (
        <div className='BuildControls'>
            <p>Current Price : {this.props.burger.priceTotal} $ </p>
            { this.ingredients.map(ingr => this.builderControl(ingr)) }
            <button className='OrderButton' disabled={this.disableOrder()}
                onClick={this.props.orderClick}> Order Now </button>
        </div>);
    }

    private builderControl(ingr: IngrObj): JSX.Element
    {
        return (
        <div key={ingr.name} className='BldControl'>
            <div className='BldLabel' > {ingr.name} </div>

            <button className='Less' disabled={(ingr.count < 1)}
                data-ingr={ingr.name} onClick={this.lessClicked} >Less
            </button>
            <button className='More'
                data-ingr={ingr.name} onClick={this.moreClicked} >More
            </button>
        </div>);
    }

    private disableOrder(): boolean
    {
        return (this.props.burger.countTotal < 3);
    }

    private lessClicked = (event: any) =>
    {
        const ingName = event.target.getAttribute('data-ingr');
        this.props.burger.decreaseCount(ingName);
        (this.ingredients.find(ig => (ig.name === ingName)) || {} as IngrObj).count -= 1;
        this.props.builderClick();
    }
    private moreClicked = (event: any) =>
    {
        const ingName = event.target.getAttribute('data-ingr');
        this.props.burger.increaseCount(ingName);
        (this.ingredients.find(ig => (ig.name === ingName)) || {} as IngrObj).count += 1;
        this.props.builderClick();
    }
}