import * as React from 'react';
import BurgerObj from '../classes/BurgerObj';
import './BurgerComp.css';

interface IProps
{
    burger: BurgerObj;
    orderPhase: number;
}

export default class BurgerComp extends React.Component<IProps>
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
        console.log('burger render...');
        return (
            <div className={'Burger'}>
                {this.burgerComp()}
            </div>
        );
    }

    private burgerComp(): JSX.Element[]
    {
        const comps: JSX.Element[] = [];
        Object.keys(this.props.burger).forEach(name =>
        {
            for (let xx = 0; xx < this.ingrCount(name); xx++) {
                comps.push(this.ingredientComp(name, xx));
            }
        });
        if (this.props.burger.totalIngredientCount === 0) {
            comps.splice(1, 0, <p key='NoIngs'>Please add ingredients...</p>);
        }
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
        else {
            return <div key={name + i} className={name} />;
        }
    }

    private ingrCount(name: string)
    {
        return this.props.burger.ingredientCount(name);
    }
}