// api types
export class Contact {
    title: string;
    firstName: string;
    surname: string;
    constructor(title: string, firstName: string, surname: string) {
        this.title = title;
        this.firstName = firstName;
        this.surname = surname;
    }
}

export interface LabelledItem {
    label: string;
    value: string;
}

// simulated api layer with mocked Contact data
export class ContactApi {
    static _contacts: Array<Contact> = [ new Contact("Mr", "Paul", "Welbourne") ];
    static _titles: Array<LabelledItem> = [
        { label: "None", value: "None" },
        { label: "Mr", value: "Mr" },
        { label: "Mrs", value: "Mrs" },
        { label: "Sir", value: "Sir" },
        { label: "Madam", value: "Madam" }
    ];

    static getContacts() {
        return this._contacts;
    }

    static getTitles() {
        return this._titles;
    }

    static addContact(contact: Contact) {
        this._contacts.push(contact);
    }    
}