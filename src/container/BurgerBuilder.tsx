import * as React from 'react';
import { axiosObj } from '../AppClass';
import BurgerObj from '../classes/BurgerObj';
import BurgerComp from '../component/BurgerComp';
import BuilderComp from '../component/BuilderComp';
import OrderComp from '../component/OrderComp';
import { Spinner, Modal, Button } from '../component/MiscComps';

export default class BurgerBuilder extends React.Component
{
    public state = { opPhase: 0, errMsg: '' };
    private burger: BurgerObj = new BurgerObj();

    public render()
    {
        console.log('BurgerBuilder render...');
        if (this.state.opPhase === 0) {
            if(this.state.errMsg) {
                return (
                <Modal show={true}>
                    <div style={{textAlign: 'center'}}>
                        <p>Unable to Load Data from Server. {this.state.errMsg}</p>
                        <Button type='Danger' clicked={this.retryClicked}>Retry</Button>
                    </div>
                </Modal> );
            } else {
                return (
                <div style={{padding: '10px'}}>
                    <Spinner/>
                </div> );
            }
        } else {
            return (
            <React.Fragment>
                <BurgerComp burger={this.burger}
                orderPhase={this.state.opPhase} />

                <BuilderComp burger={this.burger}
                orderPhase={this.state.opPhase}
                orderClick={this.orderClicked}
                builderClick={this.moreLessClicked} />

                <OrderComp burger={this.burger}
                orderPhase={this.state.opPhase}
                cancelled={this.orderCancelled}
                procesing={this.orderProcesing}
                submitted={this.orderSubmitted}
                finished={this.orderFinished}
                aborted={this.orderAborted}
                errorMsg={this.state.errMsg} />
            </React.Fragment> );
        }
    }

    public componentDidMount()
    {
        this.fetchData();
    }

    private fetchData()
    {
        axiosObj.get('/ingredients.json').then(resp =>
        {
            const igObj = resp.data;
            this.burger.fullItems = Object.keys(igObj).map(key => igObj[key]);
            this.setState({ opPhase: 1 });
        }).catch(err => {
            console.log(err);
            this.setState({ opPhase: 0, errMsg: err.message });
        });
    }

    private retryClicked = () =>
    {
        this.setState({ opPhase: 0, errMsg: '' });
        this.fetchData();
    }

    private moreLessClicked = (event: any) =>
    {
        const elmt = event.target;
        if (elmt.textContent === 'More') {
            this.burger.increaseCount(elmt.getAttribute('data-ingr'));
        } else {
            this.burger.decreaseCount(elmt.getAttribute('data-ingr'));
        }
        this.setState({ opPhase: 1 });
    }

    private orderClicked = () =>
    {
        this.setState({ opPhase: 2, errMsg: '' });
    }
    private orderCancelled = () =>
    {
        this.setState({ opPhase: 3 });
    }
    private orderProcesing = () =>
    {
        this.setState({ opPhase: 4 });
    }
    private orderSubmitted = () =>
    {
        this.setState({ opPhase: 5 });
    }
    private orderFinished = () =>
    {
        this.burger.resetItems();
        this.setState({ opPhase: 6 });
    }
    private orderAborted = (erMsg: string) =>
    {
        this.setState({ opPhase: 7, errMsg: erMsg });
    }
}