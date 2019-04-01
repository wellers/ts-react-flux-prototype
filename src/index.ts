import flux = require('flux');
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Route, Switch, Redirect, BrowserRouter as Router, Link } from 'react-router-dom';

import { Hello } from "./components/Hello";
import { Welcome } from "./components/Welcome";

import { AddContact } from "./components/AddContact";
import { ViewContacts } from "./components/ViewContacts";
import { AddContactStore } from "./stores/AddContactStore";
import { ViewContactsStore, NavigateToViewContactsAction } from "./stores/ViewContactsStore";

import Action = require('./Action');

const e = React.createElement;

var dispatcher = new flux.Dispatcher<Action>();
var addContactStore = new AddContactStore(dispatcher);
var viewContactStore = new ViewContactsStore(dispatcher);

ReactDOM.render(
    e('div', null,
        Hello({ compiler: "TypeScript", framework: "React" }),
        e(Router, null, 
            e('ul', null, 
                e('li', null, e(Link, { to: "/" }, "Home")),
                e('li', null, e(Link, { to: "/contacts", onClick: () => { dispatcher.dispatch(new NavigateToViewContactsAction()); } }, "View contacts")),
                e('li', null, e(Link, { to: "/addcontact" }, "Add a contact"))
            ),
            e('div', null,
                e(Switch, null, 
                    e(Route, { exact: true, path: "/" }, () => e(Welcome, { username: "Paul" })),
                    e(Route, { path: "/contacts", component: () => e(ViewContacts, { dispatcher: dispatcher, store: viewContactStore }) }),
                    e(Route, { path: "/addcontact", component: () => e(AddContact, { dispatcher: dispatcher, store: addContactStore }) }),
                    e(Redirect, { to: "/" })
                )
            )
        )
    ),
    document.getElementById("example")
);