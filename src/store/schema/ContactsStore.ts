export interface ContactStore {
	id: number;
	name: string;
	number: string;
}

export interface ContactsStore {
	contacts: ContactStore[];
}
