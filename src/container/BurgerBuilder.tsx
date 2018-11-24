import * as React from 'react';
import { axiosObj } from '../AppClass';
import { connect } from 'react-redux';
import BurgerComp from '../component/BurgerComp';
import BuilderComp from '../component/BuilderComp';
import { Spinner, Modal, Button } from '../component/MiscComps';
import * as actions from '../store/actions';
import { InitialState } from 'src/store/reducer';
import { IPropsBurgerBuilder } from 'src/classes/IProps';
import './BurgerBuilder.css';

class BurgerBuilder extends React.Component<IPropsBurgerBuilder>
{
    public render()
    {
        if (this.props.initPhase) 
        {
            if(this.props.errMsg) { // init phase error, show the error message
                return (
                <Modal type='ErrorDsp' show={true}>
                    <div style={{textAlign: 'center'}}>
                        <p>Unable to Load Data from Server. {this.props.errMsg}</p>
                        <Button type='Danger' clicked={this.retryClicked}>Retry</Button>
                    </div>
                </Modal> );
            } else {            // init phase spinner while loading data
                return (
                <div className='InitSpinner'>
                    <Spinner/>
                </div> );
            }
        } else {                // loaded data from server, return the burger and builder
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
        if(this.props.initPhase) 
        {
            this.fetchData();
        }
    }
    
    private fetchData()
    {
        axiosObj.get('/ingredients.json').then(resp =>
        {
            const igObj = resp.data;
            this.props.burger.fullItems = Object.keys(igObj).map(key => igObj[key]);
            this.props.onDoneInit();
        }).catch(err => {
            console.log(err);
            this.props.onErrorInit(err.message);
        });
    }

    private retryClicked = () =>
    {
        this.props.onRetryInit();
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

const mapStateToProps = (state: InitialState) =>
{
    return {
        initPhase: state.initPhase,
        errMsg: state.errMsg,
        burger: state.burger
    };
}

const mapDispatchToProps = (dispatch: any) =>
{
    return {
        onDoneInit: () => dispatch({type: actions.DONE_INIT_PHASE}),
        onErrorInit: (err: string) => dispatch({type: actions.ERROR_INIT_PHASE, errMsg: err}),
        onRetryInit: () => dispatch({type: actions.RETRY_INIT_PHASE})
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);