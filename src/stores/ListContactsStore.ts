import flux = require('flux');
import Action = require('../Action');

import { Store } from "../ComponentsBase";
import { ContactApi, Contact } from "../apis/ContactApi";

class ListContactViewModel {
    contacts: Array<Contact>;
}

export class ListContactsStore extends Store<ListContactViewModel> {
    constructor(dispatcher: flux.Dispatcher<Action>) {
        super();
        this.ViewModel = { contacts: Array<Contact>() };
        dispatcher.register((a) => {  
            if (a instanceof NavigateToListContacts) {
                this.ViewModel = { contacts: ContactApi.Contacts };
                this.Change();
            }
        });
   }
}

export class NavigateToListContacts extends Action {
    constructor() {
        super(Action.Source.View);
    }
}