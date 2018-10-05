import { Fragment } from 'react';
import * as React from 'react';
import BurgerObj from '../classes/BurgerObj';
import BurgerComp from '../component/BurgerComp';
import BuilderComp from '../component/BuilderComp';
import OrderComp from '../component/OrderComp';

export default class BurgerBuilder extends React.Component
{
    public state = { opPhase: 1 };
    private burger: BurgerObj = new BurgerObj();
    
    public render()
    {
        console.log('BurgerBuilder render...');
        return (
            <Fragment>
                <BurgerComp burger={this.burger}
                    orderPhase={this.state.opPhase}/>

                <BuilderComp burger={this.burger}
                    orderPhase={this.state.opPhase}
                    orderClick={this.orderClicked}
                    builderClick={this.moreLessClicked}/>

                <OrderComp burger={this.burger}
                    orderPhase={this.state.opPhase}
                    cancelled={this.orderCancelled}
                    procesing={this.orderProcesing}
                    submitted={this.orderSubmitted}
                    finished={this.orderFinished} />
            </Fragment>
        );
    }

    private moreLessClicked = (event: any) =>
    {
        const elmt = event.target;
        if (elmt.textContent === 'More') {
            this.burger.increaseCount(elmt.getAttribute('data-ingr'));
        } else {
            this.burger.decreaseCount(elmt.getAttribute('data-ingr'));
        }
        this.setState({opPhase: 1});
    }

    private orderClicked = () =>
    {
        this.setState({opPhase: 2});
    }
    private orderCancelled = () =>
    {
        this.setState({opPhase: 3});
    }
    private orderProcesing = () =>
    {
        this.setState({opPhase: 4});
    }
    private orderSubmitted = () =>
    {
        this.setState({opPhase: 5});
    }
    private orderFinished = () =>
    {
        this.burger = new BurgerObj();
        this.setState({opPhase: 6});
    }
}