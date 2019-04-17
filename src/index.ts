import flux = require('flux');
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Route, Switch, Redirect, BrowserRouter as Router, Link } from 'react-router-dom';

import { Hello } from "./components/Hello";
import { Welcome } from "./components/Welcome";

import { AddContact } from "./components/AddContact";
import { ListContacts } from "./components/ListContacts";
import { AddContactStore, UserRequestedEdit, AddContactViewModel } from "./stores/AddContactStore";
import { ListContactsStore, NavigateToListContacts } from "./stores/ListContactsStore";

import Action = require('./Action');

const e = React.createElement;

var dispatcher = new flux.Dispatcher<Action>();
var addContactStore = new AddContactStore(dispatcher);
var viewContactStore = new ListContactsStore(dispatcher);

ReactDOM.render(
    e('div', null,
        Hello({ compiler: "TypeScript", framework: "React" }),
        e(Router, null, 
            e('ul', null, 
                e('li', { className: "menu-item" }, 
                    e(Link, { to: "/" }, "Home")),
                e('li', { className: "menu-item" }, 
                    e(Link, { to: "/contacts", onClick: () => { dispatcher.dispatch(new NavigateToListContacts()); } }, "List contacts")),
                e('li', { className: "menu-item" }, 
                    e(Link, { to: "/addcontact" }, "Add a contact"))
            ),
            e('div', null,
                e(Switch, null, 
                    e(Route, { exact: true, path: "/" }, () => e(Welcome, { username: "Paul" })),
                    e(Route, { path: "/contacts", 
                        component: () => e(ListContacts, { 
                            dispatcher: dispatcher, 
                            store: viewContactStore 
                        }) 
                    }),
                    e(Route, { path: "/addcontact", 
                        component: () => e(AddContact, { 
                            dispatcher: dispatcher, 
                            store: addContactStore, 
                            onChange: (model: AddContactViewModel) => { dispatcher.dispatch(new UserRequestedEdit(model)); },
                            onSubmit: (model: AddContactViewModel) => { dispatcher.dispatch(new UserRequestedEdit({ ...model, saveRequested: true })); } 
                        })
                    }),
                    e(Redirect, { to: "/" })
                )
            )
        )
    ),
    document.getElementById("example")
);