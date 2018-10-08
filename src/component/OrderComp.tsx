import * as React from 'react';
import { axiosObj } from '../AppClass';
import { Button, Modal, Spinner } from './MiscComps';
import { IPropsOrder } from '../classes/IProps';
import './OrderComp.css';
import IngrObj from '../classes/IngrObj';

export default class OrderComp extends React.Component<IPropsOrder>
{
    constructor(props: IPropsOrder)
    {
        super(props);
    }

    public shouldComponentUpdate(nextProps: any, nextState: any)
    {
        return (nextProps.orderPhase > 1);
    }

    public render()
    {
        console.log('order render... ');
        const orderPhase = this.props.orderPhase;
        const hasOrder = (orderPhase > 1) && (orderPhase !== 3) && (orderPhase !== 6);
        return (
        <Modal show={hasOrder} clicked={this.props.cancelled}>
            {orderPhase === 4 ? <Spinner/> : this.summary(orderPhase)}
        </Modal>);
    }

    private summary(orderPhase: number)
    {
        let btnPanel;
        if (orderPhase === 5) {
            btnPanel = <React.Fragment>
                <p className='Finish'>Your Order has been successfully submitted.</p>
                <Button type='Success' clicked={this.props.finished}>Finish</Button>
            </React.Fragment>;
        } else if (orderPhase === 7) {
            btnPanel = <React.Fragment>
                <p>Could not submit Your Order! {this.props.errorMsg}!!</p>
                <Button type='Danger' clicked={this.props.cancelled}>Close</Button>
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
                <p>Continue to Checkout?</p>
                <Button type='Danger' clicked={this.props.cancelled}>Cancel</Button>
                <Button type='Success' clicked={this.orderContinue}>Continue</Button>
            </React.Fragment>;
        }
        return btnPanel;
    }

    private listItem(ingr: IngrObj): JSX.Element
    {
        return <li key={ingr.name}> {ingr.name + ' : ' + ingr.count} </li>
    }

    private orderContinue = () =>
    {
        this.props.procesing();
        const burger = this.props.burger;
        const ingreds = {};
        burger.ingredients.forEach(ingr => ingreds[ingr.name] = ingr.count);
        const order = {
            ingredients: ingreds,
            price: burger.priceTotal,
            customer: {
                name: 'Johnson MA',
                address: {
                    street: '17/500 MLA Road',
                    place: 'Udayamperoor',
                    zipcode: '82307',
                    state: 'Kerala, IND'
                },
                email: 'tester@testing.com',
                deliveryMethod: 'fastest'
            }
        };

        axiosObj.post('/orders.json', order)
            .then(response =>
            {
                this.props.submitted();
            })
            .catch(err =>
            {
                this.props.aborted(err.message);
            }
        );
    }
}