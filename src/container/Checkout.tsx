import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Modal, Spinner, Button } from 'src/component/MiscComps';
import { axiosObj } from 'src/AppClass';
import { InitialState } from 'src/store/reducer';
import { OrderForm } from '../component/OrderForm';
import { SummaryForm } from '../component/SummaryForm';
import * as actions from '../store/actions';
import { InputFieldObj } from 'src/component/InputField';
import { IPropsCheckout } from 'src/classes/IProps';
import './Checkout.css';

class Checkout extends React.Component<IPropsCheckout>
{
    private orderPhase: number;
    private errMsg: string;

    constructor(props: IPropsCheckout)
    {
        super(props);
        this.orderPhase = 0;
        this.errMsg = '';
    }

    public componentWillMount()
    {
        if (this.props.burger.countTotal < 3) 
        {
            this.goBack();
        }
    }
    public render()
    {
        if (this.props.burger.countTotal < 3) 
        {
            return <Redirect to='/' push={true} />
        }
        else {
            const showModal = (this.orderPhase !== 0 && this.orderPhase !== 2)
            return (
            <React.Fragment>
                <OrderForm burger={this.props.burger} goBack={this.goBack}
                    orderClick={this.orderClick} orderForm={this.props.orderForm}
                    onfocus={this.onFocusHandler} onblur={this.focusOutHandler}
                    onchange={this.changeHandler} />
                {
                    this.orderPhase === 1 ? ( // SHOW SUMMARY of Order and Cust Info
                    <Modal type='SummaryDsp' show={showModal}
                        clicked={this.cancelClick}>
                        <SummaryForm 
                        cancelClick={this.cancelClick}
                        burger={this.props.burger} orderForm={this.props.orderForm}
                        orderContinue={this.orderContinue} />
                    </Modal>) : this.orderPhase === 3 ? ( // Sending form to Server
                    <Modal type='SpinnerDsp' show={showModal} clicked={this.cancelClick}>
                        <Spinner />
                    </Modal>) : this.orderPhase === 4 ? ( // Completed Successfully
                    <Modal type='SpinnerDsp' show={showModal} clicked={this.cancelClick}>
                        <p className='Finish'>Your Order has been successfully submitted.</p>
                        <Button type='Success' clicked={this.finishClick}>Finish</Button>
                    </Modal>) : ( // Could not submit order
                    <Modal type='ErrorDsp' show={showModal} clicked={this.cancelClick}>
                        <p>Could not submit Your Order! {this.errMsg} !!</p>
                        <Button type='Danger' clicked={this.cancelClick}>Close</Button>
                    </Modal>)
                }
            </React.Fragment>);
        }
    }

    private onFocusHandler = (event: any, elemID: string) =>
    {
        const field: InputFieldObj = this.props.orderForm[elemID];
        field.touched = true;
    }

    private focusOutHandler = (event: any, elemID: string) =>
    {
        const field: InputFieldObj = this.props.orderForm[elemID];
        field.value = event.target.value;
        field.valid = this.validateField(field.value, field.rules);
        this.setState({});
    }

    private changeHandler = (event: any, elemID: string) =>
    {
        this.focusOutHandler(event, elemID);
    }

    private validateField = (value: string, rules: any) =>
    {
        let isValid = true;

        if(rules) 
        {
            if (rules.required) {
                isValid = value.trim() !== '' && isValid;
            }
            if (rules.isName) {
                const pattern = /^[^\s\d\W]+\s[^\s\d\W]+$/
                isValid = pattern.test(value) && isValid
            }
            if (rules.isNumeric) {
                const pattern = /^\d+$/;
                isValid = pattern.test(value) && isValid
            }
            if (rules.minLength) {
                isValid = value.length >= rules.minLength && isValid
            }
            if (rules.maxLength) {
                isValid = value.length <= rules.maxLength && isValid
            }
            if (rules.isEmail) {
                const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                isValid = pattern.test(value) && isValid
            }
        }
        return isValid;
    }

    private orderClick = () =>
    {
        this.orderPhase = 1;
        this.setState({});
    }
    private goBack = () =>
    {
        this.props.history.push('/');
    }
    private cancelClick = () =>
    {
        if (this.orderPhase !== 3) // checking if the spinner is running
        {                           // also disable backdrop click hiding the spinner
            this.orderPhase = 2;
            this.setState({});
        }
    }
    private orderContinue = () =>
    {
        this.orderPhase = 3;
        this.setState({});
        const ingreds = {};
        this.props.burger.ingredients.forEach((ingr: any) => ingreds[ingr.name] = ingr.count);
        const order = {
            ingredients: ingreds,
            price: this.props.burger.priceTotal,
            customer: {
                name: this.props.orderForm.InpName.value,
                address: {
                    street: this.props.orderForm.InpAddr.value,
                    place: this.props.orderForm.InpArea.value,
                    zipcode: this.props.orderForm.InpZipc.value
                },
                email: this.props.orderForm.InpEmal.value,
                deliveryMethod: this.props.orderForm.InpDelv.value
            }
        };
        axiosObj.post('/orders.json', order)
            .then(response =>
            {
                this.orderPhase = 4;
                this.setState({});
            })
            .catch(err =>
            {
                this.orderPhase = 5;
                this.errMsg = err.message;
                this.setState({});
            });
    }
    private finishClick = () =>
    {
        this.props.burger.resetItems();
        this.props.onFinish();
    }
}

const mapStateToProps = (state: InitialState) =>
{
    return { burger: state.burger, orderForm: state.orderForm };
}
const mapDispatchToProps = (dispatch: any) =>
{
    return {
        onFinish: () => dispatch({type: actions.RESET_CUST})
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);