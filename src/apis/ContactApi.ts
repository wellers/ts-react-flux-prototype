
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
    static contacts: Array<Contact> = [];
}