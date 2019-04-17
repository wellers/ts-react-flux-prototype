
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

export class ContactApi {
    static _contacts: Array<Contact> = [ new Contact("Mr", "Paul", "Welbourne") ];
    static get contacts() {
        return this._contacts;
    }

    static addContact(contact: Contact) {
        this._contacts.push(contact);
    }
}