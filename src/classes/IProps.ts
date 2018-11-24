import BurgerObj from '../classes/BurgerObj';
import { OrderFormObj } from 'src/component/OrderForm';

export interface IPropsShow
{
    show?: boolean;
    clicked?: () => void;
}

export interface IPropsChild extends IPropsShow
{
    type: string;
    children?: any;
}

export interface IPropsRoute
{
    history?: any;
    location?: any;
    match?: any;
}

export interface IPropsBurger extends IPropsRoute
{
    burger: BurgerObj;
    checkOut?: boolean;
}

export interface IPropsBuilder extends IPropsBurger
{
    builderClick: () => void;
    orderClick: () => void;
}

interface IPropsError
{
    errMsg: string;
}

export interface IPropsBurgerBuilder extends IPropsBurger, IPropsError
{
    initPhase: boolean;
    onDoneInit: () => void;
    onErrorInit: (err: string) => void;
    onRetryInit: () => void;
}

export interface IPropsCheckout extends IPropsBurger
{
    orderForm: OrderFormObj;
    onFinish: () => void;
}

interface IPropsOrder
{
    burger: BurgerObj;
    orderForm: OrderFormObj;
}

export interface IPropsOrderForm extends IPropsOrder
{
    onblur: (event:any, key:string) => void;
    onfocus: (event:any, key:string) => void;
    onchange: (event: any, key:string) => void;
    orderClick: () => void;
    goBack: () => void;
}

export interface IPropsSummary extends IPropsOrder
{
    cancelClick: () => void;
    orderContinue: () => void;
}