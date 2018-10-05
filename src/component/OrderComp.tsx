import * as React from 'react';
import { axiosObj } from '../AppClass';
import { Button, Modal, Spinner } from './MiscComps';
import { IPropsOrder } from '../classes/IProps';
import './OrderComp.css';

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
        const hasOrder = (this.props.orderPhase !== 1) && 
            (this.props.orderPhase !== 3) && (this.props.orderPhase !== 6);
        return (
            <Modal show={hasOrder} clicked={this.props.cancelled}>
                { this.props.orderPhase === 4 ? <Spinner/> : this.summary() }
            </Modal>
        );
    }

    private summary()
    {
        let btnPanel;
        if (this.props.orderPhase === 5) {
            btnPanel = <React.Fragment>
                <h3 className='Finish'>Your Order has been successfully submitted.</h3>
                <Button type='Success' clicked={this.props.finished}>Finish</Button>
            </React.Fragment>;
        } else {
            btnPanel = <React.Fragment>
                <h3>Your Order</h3>
                <p>A Delicious Burger
                    with the following ingredients</p>
                <ul> {this.props.burger.ingredientNames.map((name) =>
                    this.listItem(name))} </ul>
                <p>Total Price : {this.props.burger.calculateTotal} $ </p>
                <p>Continue to Checkout?</p>
                <Button type='Danger' clicked={this.props.cancelled}>Cancel</Button>
                <Button type='Success' clicked={this.orderContinue}>Continue</Button>
            </React.Fragment>;
        }
        return btnPanel;
    }

    private listItem(name: string): JSX.Element
    {
        return <li key={name}>{name + ' : ' +this.props.burger.ingredientCount(name)}</li>
    }

    private orderContinue = () =>
    {
        this.props.procesing();
        const order = {
            ingredients: this.props.burger.ingredientNames.map((name) =>
                (name + ': ' + this.props.burger.ingredientCount(name))),
            price: this.props.burger.calculateTotal,
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
                this.props.cancelled();
            }
        );
    }
}