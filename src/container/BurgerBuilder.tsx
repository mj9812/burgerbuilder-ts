import * as React from 'react';
import { axiosObj } from '../AppClass';
import BurgerComp from '../component/BurgerComp';
import BuilderComp from '../component/BuilderComp';
import { Spinner, Modal, Button } from '../component/MiscComps';
import { IPropsBurgerBldr } from 'src/classes/IProps';
import './BurgerBuilder.css';

export default class BurgerBuilder extends React.Component<IPropsBurgerBldr>
{
    public render()
    {
        if (this.props.initPhase) {
            if(this.props.errMsg) {
                return (
                <Modal show={true}>
                    <div style={{textAlign: 'center'}}>
                        <p>Unable to Load Data from Server. {this.props.errMsg}</p>
                        <Button type='Danger' clicked={this.retryClicked}>Retry</Button>
                    </div>
                </Modal> );
            } else {
                return (
                <div className='InitSpinner'>
                    <Spinner/>
                </div> );
            }
        } else {
            return (
            <React.Fragment>
                <BurgerComp burger={this.props.burger}
                checkOut={false} />
                <BuilderComp burger={this.props.burger}
                builderClick={this.moreLessClicked} 
                orderClick={this.orderClicked} />
            </React.Fragment> );
        }
    }

    public componentDidMount()
    {
        if(this.props.initPhase) {
            this.fetchData();
        }
    }
    
    private fetchData()
    {
        axiosObj.get('/ingredients.json').then(resp =>
        {
            const igObj = resp.data;
            this.props.burger.fullItems = Object.keys(igObj).map(key => igObj[key]);
            this.props.stateChange(false, '');
        }).catch(err => {
            console.log(err);
            this.props.stateChange(true, err.message);
        });
    }

    private retryClicked = () =>
    {
        this.props.stateChange(true, '');
        this.fetchData();
    }
    private moreLessClicked = () =>
    {
        this.setState({});
    }
    private orderClicked = () =>
    {
        this.props.history.push('/checkout');
    }
}