import flux = require('flux');
import Action = require('../Action');

import { Store } from "../ComponentsBase";
import { ContactApi, Contact } from "../apis/ContactApi";

export class ListContactViewModel {
    contacts: Array<Contact>;
}

export class ListContactsStore extends Store<ListContactViewModel> {
    constructor(dispatcher: flux.Dispatcher<Action>) {
        super();
        this.viewModel = { contacts: Array<Contact>() };
        dispatcher.register((a) => {  
            if (a instanceof NavigateToListContacts) {
                this.viewModel = { contacts: ContactApi.contacts };
                this.change();
            }
        });
   }
}

export class NavigateToListContacts extends Action {
    constructor() {
        super(Action.Source.View);
    }
}