import flux = require('flux');
import * as React from "react";

import Action = require('../Action')
import { IHaveStore, StatefulComponent } from "../Base";

import { Contact } from "../apis/ContactApi";
import { ViewContactsStore } from '../stores/ViewContactsStore';

const e = React.createElement;

export interface ViewContactsProps extends IHaveStore<ViewContactsStore> { dispatcher: flux.Dispatcher<Action>; store: ViewContactsStore }

export interface ViewContactsState { contacts: Array<Contact> }

export class ViewContacts extends StatefulComponent<ViewContactsProps, ViewContactsState> {
    render() {
        if (this.state == null)
            return e("div", null, "Loading. Please wait...");

        if (this.state.contacts.length == 0)
            return e('div', null, "There are currently no contacts.");

        return e('table', null,
            e('thead', null, 
                e('tr', null, 
                    e('th', null, "Title"),
                    e('th', null, "First name"),
                    e('th', null, "Surname")
                )),
            e('tbody', null, this.state.contacts.map((c, i) => { 
                return e('tr', { key: i }, 
                    e('td', null, c.title),
                    e('td', null, c.firstName),
                    e('td', null, c.surname),
                ); 
            }))
        );
    }
}