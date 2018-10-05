import * as React from 'react';
import { IPropsBuilder } from '../classes/IProps';
import './BuilderComp.css';

export default class BuilderComp extends React.Component<IPropsBuilder>
{
    constructor(props: IPropsBuilder)
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
                <button className='OrderButton' disabled={this.disableOrder()}
                    onClick={this.props.orderClick}> Order Now </button>
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

    private disableOrder(): boolean
    {
        return (this.props.burger.totalIngredientCount < 1);
    }
}