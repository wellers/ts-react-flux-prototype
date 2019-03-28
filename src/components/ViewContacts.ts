import * as React from "react";

import { Contact } from "../apis/ContactApi";

const e = React.createElement;

export interface ViewContactsProps {    
    contacts: Array<Contact>;
}

export class ViewContacts extends React.PureComponent<ViewContactsProps> {
    render() {
        if (this.props.contacts.length == 0)
            return e('div', null, "There are currently no contacts.");

        return e('table', null,
            e('thead', null, 
                e('tr', null, 
                    e('th', null, "Title"),
                    e('th', null, "First name"),
                    e('th', null, "Surname")
                )),
            e('tbody', null, this.props.contacts.map((c) => { 
                return e('tr', null, 
                    e('td', null, c.title),
                    e('td', null, c.firstName),
                    e('td', null, c.surname),
                ); 
            }))
        );
    }
}