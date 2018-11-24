import * as React from 'react';
import { InputFieldObj, InputField } from './InputField';
import BurgerComp from './BurgerComp';
import { IPropsOrderForm } from 'src/classes/IProps';

export class OrderFormObj
{
    private _InpName = new InputFieldObj('text', '', 'Name',
                        { placeholder: 'First & Last Name' }, { required: true, isName: true },
                        false, false);

    private _InpAddr = new InputFieldObj('text', '', 'Address',
                        { placeholder: 'Street Address' }, { required: true }, false, false);

    private _InpArea = new InputFieldObj('text', '', 'Area',
                        { placeholder: 'Main Area' }, { required: true }, false, false);

    private _InpZipc = new InputFieldObj('text', '', 'Zip Code',
                        { placeholder: 'Zip Code' }, {required: true, isNumeric: true,
                        minLength: 5, maxLength: 5}, false, false);

    private _InpEmal = new InputFieldObj('text', '', 'E-mail',
                        { placeholder: 'Email Address' }, { required: true, isEmail: true },
                        false, false);
                        
    private _InpDelv = new InputFieldObj('select', '', 'Deliver', { options: 
                        ['Fastest', 'Medium', 'Cheapest'] },{ required: true }, false, false);
    
    get InpName() { return this._InpName }
    get InpAddr() { return this._InpAddr }
    get InpArea() { return this._InpArea }
    get InpZipc() { return this._InpZipc }
    get InpEmal() { return this._InpEmal }
    get InpDelv() { return this._InpDelv }

    get isFormValid() : boolean
    {
        return Object.keys(this).every((key) => this[key].valid);
    }
}

export const OrderForm = (props: IPropsOrderForm) => 
{
    return (
        <div className='CheckOutLayoutMaster'>
            <div className='CheckOutLayout'>
                <BurgerComp burger={props.burger}
                    checkOut={true} />
            </div>
            <div className='CheckOutLayout'>
                <h4>Ingredients : </h4>
                <ul>
                    {
                        props.burger.ingredients.map((ingr: any) => 
                        <li key={ingr.name}> {ingr.name + ' : ' + ingr.count} </li>)
                    }
                </ul>
                <p>Price : {props.burger.priceTotal} $ </p>
            </div>

            <div className='CustInfoContianer'>
                <div className='CustInfo'>
                    {
                        Object.keys(props.orderForm).map((key) =>
                        {
                            const field: InputFieldObj = props.orderForm[key];
                            field.onfocus = (event: any) => props.onfocus(event, key);
                            field.onblur = (event: any) => props.onblur(event, key);
                            field.onchange = (event: any) => props.onchange(event, key);
                            return <InputField key={key} field={field} />;
                        }
                    )}
                </div>
                <div className='CustInfoBtnPanel'>
                    <button className='CustInfoBtn' disabled={!props.orderForm.isFormValid}
                        onClick={props.orderClick} >Submit</button>
                    <button className='CustInfoBtn' 
                        onClick={props.goBack} >Go Back</button>
                </div>
            </div>
        </div>
    );
}