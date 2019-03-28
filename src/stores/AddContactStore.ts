import flux = require('flux');
import Action = require('../Action');

import { Store } from "../Base";
import { ContactSubmittedAction } from "../components/AddContact";
import { ContactApi, Contact } from "../apis/ContactApi";

export class AddContactStore extends Store {
    constructor(dispatcher: flux.Dispatcher<Action>) {
        super();
        this.ViewModel = new Contact("", "", "");
        dispatcher.register((a) => {  
            if (a instanceof ContactSubmittedAction) {                              
                ContactApi.contacts.push(new Contact(a.contact.title, a.contact.firstName, a.contact.surname));   
                this.ViewModel = new Contact("", "", "");
                this.Change();
            }
        });
   }
}