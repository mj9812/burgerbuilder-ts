import * as React from 'react';
import { Button } from './MiscComps';
import { IPropsSummary } from 'src/classes/IProps';

export const SummaryForm = (props: IPropsSummary) => (
    <div className='SummaryDiv'>
        <h3>Your Order</h3>
        <p>A Delicious Burger with the following ingredients</p>
        <ul> {
            props.burger.ingredients.map((ingr: any) => 
            <li key={ingr.name}> {ingr.name + ' : ' + ingr.count} </li>) }
        </ul>
        <p>Total Price : {props.burger.priceTotal} $ </p>

        <h3>Your Details</h3>
        <p>{props.orderForm.InpName.label} : {props.orderForm.InpName.value}</p>
        <p style={{marginBottom: '0'}}>
        {props.orderForm.InpAddr.label} : {props.orderForm.InpAddr.value}</p>
        <p className='AddressP'>{props.orderForm.InpArea.value}</p>
        <p className='AddressP'>{props.orderForm.InpZipc.value}</p>
        <p>{props.orderForm.InpDelv.label} : {props.orderForm.InpDelv.value}</p>
        <p style={{ fontWeight: 'bold' }}>Continue to Checkout?</p>
        <Button type='Danger' clicked={props.cancelClick}>Cancel</Button>
        <Button type='Success' clicked={props.orderContinue}>CheckOut</Button>
    </div> );