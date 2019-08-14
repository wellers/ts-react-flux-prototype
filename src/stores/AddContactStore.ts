import flux = require('flux');
import Action = require('../core/Action');

import { Store } from "../core/ComponentsBase";
import { ContactApi, Contact } from "../apis/ContactApi";
import { SingleSelectBoxViewModel } from "../components/SingleSelectBox";

export class AddContactStore extends Store<AddContactViewModel> {
    constructor(dispatcher: flux.Dispatcher<Action>) {
        super();
        this.viewModel = this.getDefaultAddContactsViewModel();
        dispatcher.register((a) => {              
            if (a instanceof UserRequestedEdit) {
                this.fix(this.viewModel, a.viewModel);               
                this.change();
            }
        });
   }   

   getDefaultAddContactsViewModel(): AddContactViewModel {
        var dropdownItems = [
            { label: "None", value: "None" },
            { label: "Mr", value: "Mr" },
            { label: "Mrs", value: "Mrs" },
            { label: "Sir", value: "Sir" },
            { label: "Madam", value: "Madam" }
        ];
    
       return new AddContactViewModel(
            {  
               isDropDownOpen: false, 
               dropdownItems: dropdownItems, 
               selectedItem: dropdownItems[0], 
               disabled: false, 
               highlightedValue: dropdownItems[0].value
            },
            "",
            "",
            false,
            false);
   }

   fix(previousModel: AddContactViewModel, newModel: AddContactViewModel) {
        this.viewModel = {...this.viewModel, 
            title: newModel.title, 
            firstName: newModel.firstName, 
            surname: newModel.surname, 
            showValidationError: newModel.showValidationError
        };
        
        if (!previousModel.saveRequested && newModel.saveRequested) {            
            ContactApi.addContact(new Contact(this.viewModel.title.selectedItem.value, this.viewModel.firstName, this.viewModel.surname));
            this.viewModel = this.getDefaultAddContactsViewModel();
        }        
   }
}

export class AddContactViewModel {
    title: SingleSelectBoxViewModel<string>;
    firstName: string;
    surname: string;
    saveRequested: boolean;
    showValidationError: boolean;
    constructor(title: SingleSelectBoxViewModel<string>, firstName: string, surname: string, saveRequested: boolean, showValidationError: boolean) {
        this.title = title;
        this.firstName = firstName;
        this.surname = surname;
        this.saveRequested = saveRequested;
        this.showValidationError = showValidationError;
    }
}

export class UserRequestedEdit extends Action {
    viewModel: AddContactViewModel;
    constructor(viewModel: AddContactViewModel) {
        super(Action.Source.View);
        this.viewModel = viewModel;
    }
}