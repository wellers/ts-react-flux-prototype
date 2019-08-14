import * as React from "react";
import { EventHandler } from "../core/ComponentsBase";

export interface TextInputProps { 
    labelText: string; 
    content: string; 
    placeHolderText?: string; 
    onChange: EventHandler<React.ChangeEvent<HTMLInputElement>>;  
}

export const TextInput = (props: TextInputProps) => (
    <div> 
        <label className="textinput-label">{props.labelText}</label>
        <input className="textinput-input" type="text" value={props.content} placeholder={props.placeHolderText} onChange={props.onChange}></input>
    </div>);