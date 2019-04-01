
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
    static get Contacts() {
        return this._contacts;
    }

    static AddContact(contact: Contact) {
        this._contacts.push(contact);
    }
}