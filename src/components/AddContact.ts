import flux = require('flux');
import * as React from "react";

import Action = require('../Action')
import { IHaveStore, StatefulComponent } from "../ComponentsBase";
import { TextInput } from "./TextInput";
import { SingleSelectBox, SingleSelectBoxViewModel } from "./SingleSelectBox";
import { AddContactStore, AddContactViewModel } from '../stores/AddContactStore';

const e = React.createElement;

export interface AddContactProps extends IHaveStore<AddContactStore> { 
    dispatcher: flux.Dispatcher<Action>; 
    store: AddContactStore; 
    onChange: (model: AddContactViewModel) => void; 
    onSubmit: (model: AddContactViewModel) => void;
}

const stringSelectBox = SingleSelectBox as new () => SingleSelectBox<string>;

export class AddContact extends StatefulComponent<AddContactProps, AddContactViewModel> {
    render() {
        if (this.state == null)
            return e("div", null, "Loading. Please wait...");
        
        return e("div", null, 
            e('h4', null, "Add a contact"), 
            this.state.showValidationError 
                ? e('div', { className: "error-message" }, "You need to supply a Title, First name and Surname to submit a contact.")
                : null,
            e('div', null, 
                e('label', { style: { display: "inline-block", width: "100px", margin: "0 0 10px 0" } }, "Title"), 
                e(stringSelectBox, { 
                    viewModel: this.state.title, 
                    onChange: (s: SingleSelectBoxViewModel<string>) => this.props.onChange({...this.state, title: s})
                })
            ),            
            TextInput({ 
                labelText: "First name", 
                content: this.state.firstName,                
                onChange: s => this.props.onChange({...this.state, firstName: s.currentTarget.value})
            }),
            TextInput({ 
                labelText: "Surname", 
                content: this.state.surname, 
                onChange: s => this.props.onChange({...this.state, surname: s.currentTarget.value})                 
                
            }),
            e('input', { type: 'submit', value: 'submit', onClick: () => this.submitContact() })            
        );
    }

    submitContact() {
        if (this.state.title.selectedItem.value == "None" || this.state.firstName == "" || this.state.surname == ""){
            this.props.onChange({...this.state, showValidationError: true});
            return;
        }            

        this.props.onSubmit({...this.state, showValidationError: false});        
    }
}