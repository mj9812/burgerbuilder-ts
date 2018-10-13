import BurgerObj from '../classes/BurgerObj';

export interface IPropsShow
{
    show?: boolean;
    clicked?: () => void;
}

export interface IPropsChild extends IPropsShow
{
    type?: string;
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

export interface IPropsBurgerBldr extends IPropsBurger
{
    initPhase: boolean;
    errMsg: string;
    stateChange: (iPh: boolean, er: string) => void;
}

export interface IPropsBuilder extends IPropsBurger
{
    builderClick: () => void;
    orderClick: () => void;
}

export interface IPropsOrder extends IPropsBurger
{
    cancelled: () => void;
    procesing?: () => void;
    submitted: () => void;
    finished?: () => void;
    aborted?: (erMsg: string) => void;
    errorMsg?: string;
}