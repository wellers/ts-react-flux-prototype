import * as React from "react";

export interface TextInputProps { 
    labelText: string; 
    content: string; 
    placeHolderText?: string; 
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;  
}

export const TextInput = (props: TextInputProps) => (
    <div> 
        <label className="textinput-label">{props.labelText}</label>
        <input className="textinput-input" type="text" value={props.content} placeholder={props.placeHolderText} onChange={props.onChange}></input>
    </div>);