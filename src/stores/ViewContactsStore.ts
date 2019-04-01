import flux = require('flux');
import Action = require('../Action');

import { Store } from "../Base";
import { ContactApi, Contact } from "../apis/ContactApi";

export class ViewContactsStore extends Store {
    constructor(dispatcher: flux.Dispatcher<Action>) {
        super();
        this.ViewModel = { contacts: Array<Contact>() };
        dispatcher.register((a) => {  
            if (a instanceof NavigateToViewContactsAction) {
                this.ViewModel = { contacts: ContactApi.Contacts };
                this.Change();
            }
        });
   }
}

export class NavigateToViewContactsAction extends Action {
    constructor() {
        super(Action.Source.View);
    }
}