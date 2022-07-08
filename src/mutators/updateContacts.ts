import { store, storeContacts } from "../store/store";
import { mutatorAction } from "satcheljs";
import { fetchAllContacts } from "../service/common";
import { ContactStore } from "../store/schema/ContactsStore";

export const updateContacts = mutatorAction(
	"updateContacts",
	(contacts: ContactStore[]) => {
		storeContacts.contacts = contacts;
	}
);

// export const addContact = mutatorAction("addContact", async () => {});
