import * as React from 'react';
import './InputField.css';

export class InputFieldObj
{
    private _type: string;
    private _value: string;
    private _label: string;
    private _rules: any;
    private _config: any;
    private _valid: boolean;
    private _touched: boolean;
    private _onfocus: (event: any) => void;
    private _onblur: (event: any) => void;
    private _onchange: (event: any) => void;

    constructor(type: string, value: string, 
        label: string, config: any, rules: any, 
        valid: boolean, touched: boolean) 
    {
        this._type = type;
        this._value = value;
        this._label = label;
        this._config = config;
        this._rules = rules;
        this._valid = valid;
        this._touched = touched;
    }
    // Readonly fields
    public get label(): string { return this._label; }
    public get config(): any { return this._config; }
    public get rules(): any { return this._rules; }
    public get type(): string { return this._type; }
    // Mutable fields
    public get value(): string { return this._value; }
    public set value(value: string) { this._value = value; }

    public get valid(): boolean { return this._valid; }
    public set valid(valid: boolean) { this._valid = valid; }

    public get touched(): boolean { return this._touched; }
    public set touched(valid: boolean) { this._touched = valid; }
    
    public get onfocus(): (event: any) => void { return this._onfocus; }
    public set onfocus(func: (event: any) => void) { this._onfocus = func; }

    public get onblur(): (event: any) => void { return this._onblur; }
    public set onblur(func: (event: any) => void) { this._onblur = func; }

    public get onchange(): (event: any) => void { return this._onchange; }
    public set onchange(func: (event: any) => void) { this._onchange = func; }
}

interface IPropsField
{
    field: InputFieldObj;
}

export const InputField = (props: IPropsField) =>
{
    let element = null;
    const styleCls = (props.field.rules && props.field.touched && 
                     !props.field.valid) ? 'InputElement InputInvalid' : 'InputElement';

    switch(props.field.type) 
    {
        case('text'): // TEXTBOX Input Field
            element = <input type={props.field.type} 
                            className={styleCls}
                            onBlur={props.field.onblur} 
                            {...props.field.config}
                            onFocus={props.field.onfocus} 
                            defaultValue={props.field.value} />
        break;

        case('select'): // DROPDOWN Input Field
            element = (<select className={styleCls}
                            onBlur={props.field.onblur}
                            onFocus={props.field.onfocus}
                            onChange={props.field.onchange}
                            defaultValue={props.field.value} >
                            <option value='' disabled={true}>
                                Delivery Options
                            </option> 
                            { props.field.config.options.map((opt: string) => (
                            <option key={opt} value={opt}>
                                {opt}
                            </option>)) }
                        </select> );
        break;

        default:
            element = <input type='text' value=''/>
        break;
    }
    return (
    <div className='InputDiv'>
        <label className='InputLabel'>{props.field.label}</label>
        {element}
    </div>);
}