import * as React from 'react';
import BurgerObj from '../classes/BurgerObj';
import './BuilderComp.css';

interface IProps
{
    burger: BurgerObj;
    builderClick: (event: any) => void;
    orderClick: () => void;
    orderPhase: number;
}

export default class BuilderComp extends React.Component<IProps>
{
    constructor(props: IProps)
    {
        super(props);
    }

    public shouldComponentUpdate(nextProps: any, nextState: any)
    {
        return (nextProps.orderPhase === 1 || nextProps.orderPhase === 6);
    }

    public render()
    {
        console.log('builder render...');
        return (
            <div className='BuildControls'>
                <p>Current Price : {this.props.burger.calculateTotal} $ </p>
                {
                    this.props.burger.ingredientNames.map((name) => 
                        this.builderControl(name, this.disableLess(name)))
                }
                <button className='OrderButton' onClick={this.props.orderClick}
                    disabled={(this.props.burger.totalIngredientCount < 1)}>Order Now
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
        return (this.props.burger.ingredientCount(name) < 1);
    }
}