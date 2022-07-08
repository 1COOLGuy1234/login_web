import React from "react";
import { renderContent } from "../model/renderContent";
import { updateRenderWhat } from "../mutators/updateRenderWhat";
import { Contact } from "../model/Contact";

export const queryInfo = async (
	infoName: string,
	setInfo: (value: React.SetStateAction<string>) => void
) => {
	const token = localStorage.getItem("token")?.substring(7);
	if (!token) {
		alert("There is no token. Something went wrong.");
		return;
	}
	const response = await fetch("/user/getInfoByToken", {
		headers: {
			authorization: `Bearer ${token}`,
		},
		method: "GET",
	});
	const data = await response.json();
	if (data["code"] !== 400) {
		setInfo(data["data"][infoName]);
	} else {
		cleanToken(setInfo);
	}
};

const cleanToken = (setInfo: (value: React.SetStateAction<string>) => void) => {
	setInfo("");
	alert("Token has expired");
	localStorage.setItem("token", "");
	updateRenderWhat(renderContent.LogIn);
};

interface Response<T> {
	code: number;
	msg: string;
	data: T;
}

interface ContactData {
	id: number;
	name: string;
	phoneNumber: string;
}

interface ContactResponse extends Response<ContactData[]> {}

export const fetchAllContacts = async () => {
	const token = localStorage.getItem("token")?.substring(7);
	if (!token) {
		alert("There is no token. Something went wrong.");
		return;
	}
	const response = await fetch("/contacts", {
		headers: {
			authorization: `Bearer ${token}`,
		},
		method: "GET",
	});
	const responseJson: ContactResponse = await response.json();
	const data = responseJson.data; // array
	return data;
};

export const fetchOnePageContacts = async (
	pageIndex: number,
	capacity: number
) => {
	const token = localStorage.getItem("token")?.substring(7);
	if (!token) {
		// alert("There is no token. Something went wrong.");
		return;
	}
	const response = await fetch(
		`/contacts/getPagingContacts?pindex=${pageIndex}&capacity=${capacity}`,
		{
			headers: {
				authorization: `Bearer ${token}`,
			},
			method: "GET",
		}
	);
	const responseJson: ContactResponse = await response.json();
	if (responseJson.code === 403) {
		localStorage.setItem("token", "");
		return;
	}
	return responseJson.data; // array
};

export const fetchPageNumber = async (capacity: number) => {
	const token = localStorage.getItem("token")?.substring(7);
	if (!token) {
		alert("There is no token. Something went wrong.");
		return;
	}
	const rawResponse = await fetch(
		`/contacts/getPageNumber?capacity=${capacity}`,
		{
			headers: {
				authorization: `Bearer ${token}`,
			},
			method: "GET",
		}
	);
	const responseJson = await rawResponse.json();
	return responseJson.data;
};

export enum actionType {
	update,
	add,
}
