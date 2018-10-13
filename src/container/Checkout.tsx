import * as React from 'react';
import BurgerComp from 'src/component/BurgerComp';
import { IPropsBurger } from 'src/classes/IProps';
import './Checkout.css';
import IngrObj from 'src/classes/IngrObj';
import { Button, Modal, Spinner } from 'src/component/MiscComps';
import { axiosObj } from 'src/AppClass';

export default class Checkout extends React.Component<IPropsBurger>
{

    private refName: any;
    private refAddr: any;
    private refArea: any;
    private refZipc: any;
    private refEmal: any;
    private refDelv: any;
    private orderPhase: number;
    private errMsg: string;

    constructor(props: IPropsBurger)
    {
        super(props);
        this.refName = React.createRef();
        this.refAddr = React.createRef();
        this.refArea = React.createRef();
        this.refZipc = React.createRef();
        this.refEmal = React.createRef();
        this.refDelv = React.createRef();
        this.orderPhase = 0;
        this.errMsg = '';
    }

    public componentWillMount()
    {
        if(this.props.burger.countTotal < 3)
        {
            this.props.history.push('/');
        }
    }
    public render()
    {
        if(this.props.burger.countTotal < 3)
        {
            return null;
        }
        else {
            return this.orderWithSummary();
        }
    }
    public componentDidMount()
    {
        if(this.refName.current) 
        {
            this.refName.current.focus();
        }
    }

    private orderWithSummary = () =>
    {
        const showModal = (this.orderPhase !== 0 && this.orderPhase !== 2)
        return (
        <React.Fragment>
            { this.orderForm() }
            <Modal show={showModal} clicked={this.cancelClick}>
                { this.orderPhase === 3 ? <Spinner/> : this.summaryForm() }
            </Modal> 
        </React.Fragment> );
    }
    private orderForm = () =>
    {
        return (
        <div className='CheckOutLayoutMaster'>
            <div className='CheckOutLayout'>
                <BurgerComp burger={this.props.burger}
                checkOut={true} />
            </div>
            <div className='CheckOutLayout'>
                <h4>Ingredients : </h4>
                <ul>
                    { this.props.burger.ingredients.map(ingr => this.listItem(ingr)) }
                </ul>
                <p>Total Price : {this.props.burger.priceTotal} $ </p>
            </div>
            <div className='CheckOutLayout CustInfo'>
                Name : <input type='text' ref={this.refName} />
                Address : <input type='text' ref={this.refAddr} />
                Area: <input type='text' ref={this.refArea} />
                Zip Code : <input type='number' ref={this.refZipc} />
                Email : <input type='email' ref={this.refEmal} />
                Delivery : <input type='text' ref={this.refDelv} />
            </div>
            <div className='CheckOutLayout CustInfoBtn'>
                <Button type='Success' clicked={this.orderClick} >Order Now</Button>
                <Button type='Danger' clicked={this.goBack} >Cancel</Button>
            </div>
        </div> );
    }
    private summaryForm = () =>
    {
        let btnPanel;
        if (this.orderPhase === 4) {
            btnPanel = <React.Fragment>
                <p className='Finish'>Your Order has been successfully submitted.</p>
                <Button type='Success' clicked={this.finishClick}>Finish</Button>
            </React.Fragment>;
        } else if (this.orderPhase === 5) {
            btnPanel = <React.Fragment>
                <p>Could not submit Your Order! {this.errMsg}!!</p>
                <Button type='Danger' clicked={this.cancelClick}>Close</Button>
            </React.Fragment>;
        } else {
            btnPanel = <React.Fragment>
                <h3>Your Order</h3>
                <p>A Delicious Burger
                    with the following ingredients
                </p>
                <ul>
                    {this.props.burger.ingredients.map(ingr => this.listItem(ingr))}
                </ul>
                <p>Total Price : {this.props.burger.priceTotal} $ </p>
                <h3>Your Details</h3>
                <p>Name : {this.refName.current ? this.refName.current.value : ''}</p>
                <p style={{marginBottom: '0'}}>Address 
                : {this.refAddr.current ? this.refAddr.current.value : ''}</p>
                {/* <p style={{textIndent: '30%'}}>
                    {this.refAddr.current ? this.refAddr.current.value : ''}</p> */}
                    <p className='AddressP'>
                    {this.refArea.current ? this.refArea.current.value : ''}</p>
                    <p className='AddressP'>
                    {this.refZipc.current ? this.refZipc.current.value : ''}</p>
                <p>Delivery : {this.refDelv.current ? this.refDelv.current.value : ''}</p>
                <p style={{fontWeight: 'bold'}}>Continue to Checkout?</p>
                <Button type='Danger' clicked={this.cancelClick}>Cancel</Button>
                <Button type='Success' clicked={this.orderContinue}>CheckOut</Button>
            </React.Fragment>;
        }
        return btnPanel;
    }
    private listItem(ingr: IngrObj): JSX.Element
    {
        return <li key={ingr.name}> {ingr.name + ' : ' + ingr.count} </li>
    }

    private orderClick = () =>
    {
        if(this.refName.current.value && this.refAddr.current.value 
            && this.refArea.current.value && this.refZipc.current.value 
            && this.refEmal.current.value && this.refDelv.current.value)
        {
            this.orderPhase = 1;
            this.setState({});
        }
        else 
        {
            alert('Please fill Customer and Delivery information to Complete Order.');
        }
    }
    private goBack = () =>
    {
        this.props.history.push('/');
    }
    private cancelClick = () =>
    {
        if(this.orderPhase !== 3) 
        {
            this.orderPhase = 2;
            this.setState({});
        }
    }
    private orderContinue = () =>
    {
        this.orderPhase = 3;
        this.setState({});
        const ingreds = {};
        this.props.burger.ingredients.forEach(ingr => ingreds[ingr.name] = ingr.count);
        const order = {
            ingredients: ingreds,
            price: this.props.burger.priceTotal,
            customer: {
                name: this.refName.current.value,
                address: {
                    street: this.refAddr.current.value,
                    place: this.refArea.current.value,
                    zipcode: this.refZipc.current.value
                },
                email: this.refEmal.current.value,
                deliveryMethod: this.refDelv.current.value
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
            }
        );
    }
    private finishClick = () =>
    {
        this.props.burger.resetItems();
        this.goBack();
    }
}