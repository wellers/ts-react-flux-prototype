import flux = require('flux');
import * as React from "react";

import Action = require('../Action')
import { IHaveStore, StatefulComponent } from "../ComponentsBase";
import { TextInput } from "./TextInput";
import { SingleSelectBox, SingleSelectBoxViewModel } from "./SingleSelectBox";
import { AddContactStore, AddContactViewModel } from '../stores/AddContactStore';

export interface AddContactProps extends IHaveStore<AddContactStore> { 
    dispatcher: flux.Dispatcher<Action>; 
    store: AddContactStore; 
    onChange: (model: AddContactViewModel) => void; 
    onSubmit: (model: AddContactViewModel) => void;
}

export class AddContact extends StatefulComponent<AddContactProps, AddContactViewModel> {
    render() {
        if (this.state == null)
            return (<div>Loading. Please wait...</div>);
        
        return (
            <div>
                <h4>Add a contact</h4>
                {this.state.showValidationError ? <div className="error-message">You need to supply a Title, First name and Surname to submit a contact.</div> : null}
                <div>
                    <label className="textinput-label">Title</label>
                    <SingleSelectBox viewModel={this.state.title} onChange={(s: SingleSelectBoxViewModel<string>) => this.props.onChange({...this.state, title: s})} />
                </div>
                <TextInput labelText="First name" content={this.state.firstName} onChange={s => this.props.onChange({...this.state, firstName: s.currentTarget.value})} />
                <TextInput labelText="Surname" content={this.state.surname} onChange={s => this.props.onChange({...this.state, surname: s.currentTarget.value})} />
                <input type="submit" value="submit" onClick={() => this.submitContact()} />
            </div>
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