import * as React from "react";

const e = React.createElement;

export interface TextInputProps { labelText: string; content: string; placeHolderText?: string; onChange: (event: React.MouseEvent<HTMLButtonElement>) => void;  }

export const TextInput = (props: TextInputProps) => e('div', null, 
    e('label', { style: { display: "inline-block", width: "100px", margin: "0 0 10px 0" }}, props.labelText), 
    e('input', { type: "text", value: props.content, placeholder: props.placeHolderText, onChange: props.onChange })
);