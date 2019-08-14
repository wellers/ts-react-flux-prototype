import flux = require('flux');
import * as React from "react";

import Action = require('../core/Action')
import { IHaveStore, StatefulComponent } from "../core/ComponentsBase";

import { ListContactsStore, ListContactViewModel } from '../stores/ListContactsStore';

export interface ListContactsProps extends IHaveStore<ListContactsStore> { 
    dispatcher: flux.Dispatcher<Action>; 
    store: ListContactsStore 
}

export class ListContacts extends StatefulComponent<ListContactsProps, ListContactViewModel> {
    render() {
        if (this.state == null)
            return <div>Loading. Please wait...</div>;

        if (this.state.contacts.length == 0)
            return <div>There are currently no contacts.</div>;

        return (<table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>First name</th>
                    <th>Surname</th>
                </tr>
            </thead>
            <tbody>
                {this.state.contacts.map((c, i) => <tr key={i}><td>{c.title}</td><td>{c.firstName}</td><td>{c.surname}</td></tr>)}
            </tbody>
        </table>);        
    }
}