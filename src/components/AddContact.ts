import flux = require('flux');
import * as React from "react";

import Action = require('../Action')
import { IHaveStore, StatefulComponent } from "../ComponentsBase";
import { TextInput } from "./TextInput";
import { Contact } from "../apis/ContactApi";
import { AddContactStore } from '../stores/AddContactStore';

const e = React.createElement;

export interface AddContactProps extends IHaveStore<AddContactStore> { 
    dispatcher: flux.Dispatcher<Action>; 
    store: AddContactStore; 
    onChange: (model: Contact) => void; 
    onSubmit: (model: Contact) => void;
}

export class AddContact extends StatefulComponent<AddContactProps, Contact> {
    render() {
        if (this.state == null)
            return e("div", null, "Loading. Please wait...");

        return e("div", null, 
            e('h4', null, "Add a contact"),
            TextInput({ 
                labelText: "Title", 
                content: this.state.title, 
                onChange: s => this.props.onChange(new Contact(s.currentTarget.value, this.state.firstName, this.state.surname))
            }),
            TextInput({ 
                labelText: "First name", 
                content: this.state.firstName,                
                onChange: s => this.props.onChange(new Contact(this.state.title, s.currentTarget.value, this.state.surname))
            }),
            TextInput({ 
                labelText: "Surname", 
                content: this.state.surname, 
                onChange: s => this.props.onChange(new Contact(this.state.title, this.state.firstName, s.currentTarget.value))                   
                
            }),
            e('input', { type: 'submit', value: 'submit', onClick: () => this.submitContact() })
        );
    }

    submitContact() {
        if (this.state.title == "" || this.state.firstName == "" || this.state.surname == "")
            return;

        this.props.onSubmit(this.state);        
    }
}