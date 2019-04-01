import flux = require('flux');
import Action = require('../Action');

import { Store } from "../Base";
import { ContactApi, Contact } from "../apis/ContactApi";

export class AddContactStore extends Store {
    constructor(dispatcher: flux.Dispatcher<Action>) {
        super();
        this.ViewModel = new Contact("", "", "");
        dispatcher.register((a) => {  
            if (a instanceof ContactSubmittedAction) {
                ContactApi.AddContact(a.contact);
                this.ViewModel = new Contact("", "", "");
                this.Change();
            }
        });
   }
}

export class ContactSubmittedAction extends Action {
    contact: Contact;
    constructor(contact: Contact) {
        super(Action.Source.View);
        this.contact = contact;
    }
}