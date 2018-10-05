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

export interface IPropsBurger
{
    burger: BurgerObj;
    orderPhase: number;
}

export interface IPropsBuilder extends IPropsBurger
{
    builderClick: (event: any) => void;
    orderClick: () => void;
}

export interface IPropsOrder extends IPropsBurger
{
    cancelled: () => void;
    procesing: () => void;
    submitted: () => void;
    finished: () => void;
}