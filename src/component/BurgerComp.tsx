import * as React from 'react';
import { IPropsBurger } from '../classes/IProps';
import './BurgerComp.css';

export default class BurgerComp extends React.Component<IPropsBurger>
{
    constructor(props: IPropsBurger)
    {
        super(props);
    }

    public shouldComponentUpdate(nextProps: any, nextState: any)
    {
        return (nextProps.orderPhase === 1 || nextProps.orderPhase === 6);
    }

    public render()
    {
        console.log('burger render...');
        return (
        <div className='Burger'>
            {this.burgerComp()}
        </div>);
    }

    private burgerComp(): JSX.Element[]
    {
        const breads = this.props.burger.breads;
        const comps: JSX.Element[] = [ this.ingredientComp(breads[0].name, 0) ];
        if (this.props.burger.countTotal === 2)
        {
            comps.push(<p key='NoIngr'>Please add ingredients...</p>);
        }
        else {
            this.props.burger.ingredients.forEach(ingr =>
                {
                    for (let xx = 0; xx < ingr.count; xx++) {
                        comps.push(this.ingredientComp(ingr.name, xx));
                    }
                }
            );
        }
        comps.push(this.ingredientComp(breads[1].name, 0));
        return comps;
    }

    private ingredientComp(name: string, i: number): JSX.Element
    {
        if (name === 'BreadTop') {
            return (
                <div key={name + i} className={name}>
                    <div className={'Seeds1'} />
                    <div className={'Seeds2'} />
                </div>
            );
        }
        else { return <div key={name + i} className={name} />; }
    }
}