import flux = require('flux');
import * as React from "react";
import * as ReactDOM from "react-dom";

import { Hello } from "./components/Hello";
import { Welcome } from "./components/Welcome";

import { AddContact } from "./components/AddContact";
import { ViewContacts } from "./components/ViewContacts";
import { AddContactStore } from "./stores/AddContactStore";

import { ContactApi } from "./apis/ContactApi";

import Action = require('./Action');

const e = React.createElement;
var dispatcher = new flux.Dispatcher<Action>();
var store = new AddContactStore(dispatcher);

ReactDOM.render(
    e('div', null,
        Hello({ compiler: "TypeScript", framework: "React" }),
        e(Welcome, { username: "Paul" }),        
        e(AddContact, { dispatcher: dispatcher, store: store }),
        e(ViewContacts, { contacts: ContactApi.contacts })
    ),
    document.getElementById("example")
);