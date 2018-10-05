import * as React from 'react';
import BurgerObj from '../classes/BurgerObj';
import { BackDrop } from './Toolbar';
import './OrderComp.css';
import { axiosObj } from '../AppClass';
import Spinner from './Spinner';
import { Fragment } from 'react';

interface IProps
{
    burger: BurgerObj;
    orderPhase: number;
    cancelled: () => void;
    procesing: () => void;
    submitted: () => void;
    finished: () => void;
}

interface IPropsBtn
{
    btnType: string;
    clicked: () => void;
    children: string;
}

export default class OrderComp extends React.Component<IProps>
{
    constructor(props: IProps)
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
            <Fragment>
                <BackDrop show={hasOrder} clicked={this.props.cancelled} />
                <div className={'Modal' + (hasOrder ? ' ShowModal' : ' HideModal')} >
                    {((this.props.orderPhase === 4) ? <Spinner /> : this.summary())}
                </div>
            </Fragment>
        );
    }

    private summary()
    {
        let btnPanel;
        if (this.props.orderPhase === 5) {
            btnPanel = <Fragment>
                <p className='Finish'>Has been successfully submitted.</p>
                <Button btnType='Success' clicked={this.props.finished}>Finish</Button>
            </Fragment>;
        } else {
            btnPanel = <Fragment>
                <p>Continue to Checkout?</p>
                <Button btnType='Danger' clicked={this.props.cancelled}>Cancel</Button>
                <Button btnType='Success' clicked={this.orderContinue}>Continue</Button>
            </Fragment>;
        }
        return <Fragment>
            <h3>Your Order</h3>
            <p>A Delicious Burger
                with the following ingredients</p>
            <ul> {this.props.burger.ingredientNames.map((name) =>
                this.listItem(name))} </ul>
            <p>Total Price : {this.props.burger.calculateTotal} $ </p>
            { btnPanel }
        </Fragment>;
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
                    zipcode: '682307',
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

const Button = (props: IPropsBtn) => (<button onClick={props.clicked}
    className={'Button ' + props.btnType}> {props.children} </button>);