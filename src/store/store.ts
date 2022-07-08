import { createStore } from "satcheljs";
import { renderContent } from "../model/renderContent";
import { create } from "domain";
import { RenderWhatStore } from "./schema/RenderWhatStore";
import { ContactsStore } from "./schema/ContactsStore";

const getRenderWhat: () => renderContent = () => {
	const token = localStorage.getItem("token")?.substring(7);
	if (token && token !== "undefined") {
		return renderContent.Contacts;
	} else {
		return renderContent.LogIn;
	}
};

export const initialStore: RenderWhatStore = {
	renderWhat: getRenderWhat(),
};

export const store = createStore<RenderWhatStore>(
	"renderWhatStore",
	Object.assign({}, initialStore)
)();

export const initialContactsStore: ContactsStore = {
	contacts: [],
};

export const storeContacts = createStore<ContactsStore>(
	"contactsStore",
	Object.assign({}, initialContactsStore)
)();
