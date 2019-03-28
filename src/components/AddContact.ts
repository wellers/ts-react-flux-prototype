import flux = require('flux');
import * as React from "react";

import Action = require('../Action')
import { IHaveStore, StatefulComponent } from "../Base";
import { TextInput } from "./TextInput";
import { Contact } from "../apis/ContactApi";
import { AddContactStore } from '../stores/AddContactStore';

const e = React.createElement;

export interface AddContactProps extends IHaveStore<AddContactStore> { dispatcher: flux.Dispatcher<Action>; store: AddContactStore }

export class AddContact extends StatefulComponent<AddContactProps, Contact> {
    render() {
        if (this.state == null)
            return e("div", null, "Loading. Please wait...");

        return e("div", null, 
            TextInput({ 
                labelText: "Title", 
                content: this.state.title, 
                onChange: (s) => { 
                    this.setState(new Contact(s.currentTarget.value, this.state.firstName, this.state.surname)); 
                }
            }),
            TextInput({ 
                labelText: "First name", 
                content: this.state.firstName, 
                onChange: (s) => { 
                    this.setState(new Contact(this.state.title, s.currentTarget.value, this.state.surname)); 
                }
            }),
            TextInput({ 
                labelText: "Surname", 
                content: this.state.surname, 
                onChange: (s) => { 
                    this.setState(new Contact(this.state.title, this.state.firstName, s.currentTarget.value)); 
                }
            }),
            e('input', {type: 'submit', value: 'submit', onClick: () => {
                this.props.dispatcher.dispatch(
                    new ContactSubmittedAction(this.state)
                ); 
            } 
        }));
    }
}

export class ContactSubmittedAction extends Action {
    contact: Contact;
    constructor(contact: Contact) {
        super(Action.Source.View);
        this.contact = contact;
    }
}