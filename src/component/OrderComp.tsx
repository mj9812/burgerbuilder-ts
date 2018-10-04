import * as React from 'react';
import BurgerObj from '../classes/BurgerObj';
import { BackDrop } from './Toolbar';
import './OrderComp.css';

interface IProps
{
    burger: BurgerObj;
    hasOrder: boolean;
    cancelled: () => void;
}

interface IPropsBtn
{
    btnType: string;
    clicked: () => void;
    children: string;
}

export default class BurgerCom extends React.Component<IProps>
{
    private burger: BurgerObj;

    constructor(props: IProps)
    {
        super(props);
        this.burger = props.burger;
    }

    public shouldComponentUpdate(nextProps: any, nextState: any)
    {
        return (this.props.hasOrder !== nextProps.hasOrder);
    }

    public render()
    {
        console.log('order render...');
        const modalClsName = 'Modal' + (this.props.hasOrder ? ' ShowModal' : ' HideModal');
        return (
            <React.Fragment>
                <BackDrop show={this.props.hasOrder} clicked={this.props.cancelled} />
                <div className={modalClsName} >
                    <h3>Your Order</h3>
                    <p>A Delicious burger with the following ingredients</p>
                    <ul> { this.burger.ingredientNames.map((name) => this.listItem(name)) } </ul>
                    <p>Total Price : {this.burger.calculateTotal} $ </p>
                    <p>Continue to Checkout?</p>
                    <Button btnType='Danger' clicked={ this.props.cancelled }>Cancel</Button>
                    <Button btnType='Success' clicked={ this.orderContinue }>Continue</Button>
                </div>
            </React.Fragment>
        );
    }

    private listItem(name: string): JSX.Element
    {
        return <li key={name}>{name + ' : ' + this.burger.ingredientCount(name)}</li>
    }
    private orderContinue = () =>
    {
        console.log('order continue...');
    }
}

const Button = (props: IPropsBtn) => (<button onClick={props.clicked}
    className={'Button ' + props.btnType}> {props.children} </button>);