import * as React from 'react';
import { axiosObj } from '../AppClass';
import './Orders.css';

export default class Orders extends React.Component
{
    private orders: any[] = [];

    public componentDidMount()
    {
        axiosObj.get('/orders.json').then(resp =>
            {
                const igObj = resp.data;
                Object.keys(igObj).forEach(key => {
                    console.log(igObj[key]);
                } );
                // this.props.burger.fullItems = Object.keys(igObj).map(key => igObj[key]);
            }).catch(err => {
                console.log(err);
            });
    }
    public render()
    {
        return this.orderInfoDiv('la');
    }

    private orderDivs = () =>
    {
        console.log('orders');
    }

    private orderInfoDiv = (order: any) =>
    {
        return (
            <div className='OrdersLayout'>
                <div className='OrderIngredients'>
                    Ingredients will come here...
                </div>
                <div className='OrderCustomerInfo'>
                    Customer info will come here...
                </div>
            </div>
        );
    }
}