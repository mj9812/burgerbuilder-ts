import * as React from 'react';
import BurgerObj from '../classes/BurgerObj';
import './BuilderComp.css';

interface IProps
{
    burger: BurgerObj;
    builderClick: (event: any) => void;
    orderClick: () => void;
    hasOrder: boolean;
}

export default class BuilderComp extends React.Component<IProps>
{
    private burger: BurgerObj;

    constructor(props: IProps)
    {
        super(props);
        this.burger = props.burger;
    }

    public shouldComponentUpdate(nextProps: any, nextState: any)
    {
        return (this.props.hasOrder === nextProps.hasOrder);
    }

    public render()
    {
        console.log('builder render...');
        return (
            <div className='BuildControls'>
                <p>Current Price : {this.burger.calculateTotal} $ </p>
                {
                    this.burger.ingredientNames.map((name) => 
                        this.builderControl(name, this.disableLess(name)))
                }
                <button className='OrderButton' onClick={this.props.orderClick}
                    disabled={(this.burger.totalIngredientCount < 1)}>Order Now
                </button>
            </div>
        );
    }

    private builderControl(label: string, disable: boolean): JSX.Element
    {
        return (
            <div key={label} className='BldControl'>
                <div className='BldLabel' > {label} </div>
                <button className='Less' disabled={disable}
                    data-ingr={label} onClick={this.props.builderClick} >Less
                </button>
                <button className='More'
                    data-ingr={label} onClick={this.props.builderClick} >More
                </button>
            </div>
        );
    }

    private disableLess(name: string): boolean
    {
        return (this.burger.ingredientCount(name) < 1);
    }
}