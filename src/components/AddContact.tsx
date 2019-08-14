import flux = require('flux');
import * as React from "react";

import Action = require('../core/Action')
import { EventHandler, IHaveStore, StatefulComponent } from "../core/ComponentsBase";
import { TextInput } from "./TextInput";
import { SingleSelectBox, SingleSelectBoxViewModel } from "./SingleSelectBox";
import { AddContactStore, AddContactViewModel } from '../stores/AddContactStore';

export interface AddContactProps extends IHaveStore<AddContactStore> { 
    dispatcher: flux.Dispatcher<Action>; 
    store: AddContactStore; 
    onChange: EventHandler<AddContactViewModel>; 
    onSubmit: EventHandler<AddContactViewModel>;
}

export class AddContact extends StatefulComponent<AddContactProps, AddContactViewModel> {
    readonly _titleOnChange: EventHandler<SingleSelectBoxViewModel<string>>;
    readonly _firstNameOnChange: EventHandler<React.ChangeEvent<HTMLInputElement>>;
    readonly _surnameOnChange: EventHandler<React.ChangeEvent<HTMLInputElement>>;

    constructor(props: AddContactProps) {
        super(props);
        this._titleOnChange = (s: SingleSelectBoxViewModel<string>) => this.props.onChange({...this.state, title: s});
        this._firstNameOnChange = (e: React.ChangeEvent<HTMLInputElement>) => this.props.onChange({...this.state, firstName: e.currentTarget.value});
        this._surnameOnChange = (e: React.ChangeEvent<HTMLInputElement>) => this.props.onChange({...this.state, surname: e.currentTarget.value});
    }

    render() {
        if (this.state == null)
            return (<div>Loading. Please wait...</div>);
        
        return (
            <div>
                <h4>Add a contact</h4>
                {this.state.showValidationError ? <div className="error-message">You need to supply a Title, First name and Surname to submit a contact.</div> : null}
                <div>
                    <label className="textinput-label">Title</label>
                    <SingleSelectBox viewModel={this.state.title} onChange={s => this._titleOnChange(s)} />
                </div>
                <TextInput labelText="First name" content={this.state.firstName} onChange={e => this._firstNameOnChange(e)} />
                <TextInput labelText="Surname" content={this.state.surname} onChange={e => this._surnameOnChange(e)} />
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