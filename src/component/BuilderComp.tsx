import * as React from 'react';
import { IPropsBuilder } from '../classes/IProps';
import './BuilderComp.css';
import IngrObj from '../classes/IngrObj';
import { Spinner } from './MiscComps';

export default class BuilderComp extends React.Component<IPropsBuilder>
{
    // private testRef:any;
    constructor(props: IPropsBuilder)
    {
        super(props);
        // this.testRef = React.createRef();
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
            <p>Current Price : {this.props.burger.priceTotal} $ </p>
            {this.props.burger.ingredients.map(ingr => this.builderControl(ingr))}
            <button className='OrderButton' disabled={this.disableOrder()}
                onClick={this.props.orderClick}> Order Now </button>
            {/* <input type='text' ref={this.testRef} />
            <button onClick={this.testRefClick}>Test Ref</button> */}
        </div>);
    }

    private builderControl(ingr: IngrObj): JSX.Element
    {
        return (
        <div key={ingr.name} className='BldControl'>
            <div className='BldLabel' > {ingr.name} </div>
            <button className='Less' disabled={(ingr.count < 1)}
                data-ingr={ingr.name} onClick={this.props.builderClick} >Less
            </button>
            <button className='More'
                data-ingr={ingr.name} onClick={this.props.builderClick} >More
            </button>
        </div>);
    }

    // private testRefClick = () =>
    // {
    //     console.log('test ref ' + this.testRef);
    //     console.log('test ref ' + this.testRef.current);
    //     console.log('test ref ' + this.testRef.current.value);
    // }

    private disableOrder(): boolean
    {
        return (this.props.burger.countTotal < 3);
    }
}