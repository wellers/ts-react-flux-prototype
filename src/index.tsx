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

import Action = require('./core/Action');

var dispatcher = new flux.Dispatcher<Action>();
var addContactStore = new AddContactStore(dispatcher);
var viewContactStore = new ListContactsStore(dispatcher);

ReactDOM.render(
    <div>
        <Hello compiler="TypeScript" framework= "React" />
        <Router>
            <ul>
                <li className="menu-item">
                    <Link to="/">Home</Link>
                </li>
                <li className="menu-item">
                    <Link to="/contacts" onClick={() => { dispatcher.dispatch(new NavigateToListContacts()) }}>List contacts</Link>
                </li>
                <li className="menu-item">
                    <Link to="/addcontact">Add contact</Link>
                </li>
            </ul>
            <div>
                <Switch>
                    <Route exact path="/" component={() => <Welcome username="Paul"></Welcome>}></Route>
                    <Route exact path="/contacts" component={() => 
                        <ListContacts 
                            dispatcher={dispatcher}
                            store={viewContactStore}>
                        </ListContacts>
                    }>
                    </Route>
                    <Route exact path="/addcontact" component={() => 
                        <AddContact 
                            dispatcher={dispatcher} 
                            store={addContactStore}
                            onChange={(model: AddContactViewModel) => { dispatcher.dispatch(new UserRequestedEdit(model)); }}
                            onSubmit={(model: AddContactViewModel) => { dispatcher.dispatch(new UserRequestedEdit({...model, saveRequested: true })); }}>
                        </AddContact>
                    }>
                    </Route>
                    <Redirect to="/" />
                </Switch>
            </div>
        </Router>       
        </div>,
    document.getElementById("example")
);