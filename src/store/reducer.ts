import * as actions from './actions';
import BurgerObj from '../classes/BurgerObj';
import { OrderFormObj } from 'src/component/OrderForm';

export class InitialState
{
    public initPhase: boolean;
    public errMsg: string;
    public burger: BurgerObj;
    public orderForm: OrderFormObj;

    constructor()
    {
        this.initPhase = true;
        this.errMsg = '';
        this.burger = new BurgerObj();
        this.orderForm = new OrderFormObj();
    }
}

const initState = new InitialState();

const reducer = (state = initState, action: any) =>
{
    switch(action.type)
    {
        case actions.DONE_INIT_PHASE:
            return {
                ...state,
                initPhase: false,
                errMsg: ''
            };
        case actions.ERROR_INIT_PHASE:
            return {
                ...state,
                initPhase: true,
                errMsg: action.errMsg
            };
        case actions.RETRY_INIT_PHASE:
            return {
                ...state,
                initPhase: true,
                errMsg: ''
            };
        case actions.RESET_CUST:
            return {
                ...state,
                orderForm: new OrderFormObj()
            };
        default:
            return state;
    }
}

export default reducer;