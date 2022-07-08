import * as React from "react";
import { Dialog, DialogType, DialogFooter } from "@fluentui/react/lib/Dialog";
import { PrimaryButton, DefaultButton } from "@fluentui/react/lib/Button";
import {
	ChoiceGroup,
	IChoiceGroupOption,
} from "@fluentui/react/lib/ChoiceGroup";
import { useBoolean } from "@fluentui/react-hooks";
import { TextField } from "@fluentui/react";
import { actionType } from "../service/common";
import { Contact } from "../model/Contact";
import { updateRenderWhat } from "../mutators/updateRenderWhat";
import { getRenderWhat } from "./App";
import { store } from "../store/store";
import { renderContent } from "../model/renderContent";

const modelProps = {
	isBlocking: false,
	styles: { main: { maxWidth: 450 } },
};
const dialogContentProps = {
	type: DialogType.largeHeader,
	title: "Update your contact here",
	subText: "Input the contact and the phone number in the below two box",
};

interface dialogProps {
	itemId?: number;
	action: actionType;
	items: Contact[];
	setItems: React.Dispatch<React.SetStateAction<Contact[]>>;
}

export const ActionDialog: React.FunctionComponent<dialogProps> = (props) => {
	const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);
	const [nameValue, setNameValue] = React.useState("");
	const [phoneNumberValue, setPhoneNumberValue] = React.useState("");

	const onChangeNameValue = React.useCallback(
		(
			_: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
			newValue?: string
		) => {
			setNameValue(newValue || "");
		},
		[]
	);

	const onChangePhoneNumberValue = React.useCallback(
		(
			_: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
			newValue?: string
		) => {
			setPhoneNumberValue(newValue || "");
		},
		[]
	);

	const submitUpdatedValue = async () => {
		const token = localStorage.getItem("token");
		if (!token) {
			alert("token is null");
			return;
		}

		const rawResponse = await fetch(`/contacts/${props.itemId}`, {
			headers: {
				"Content-Type": "application/json",
				authorization: token,
			},
			method: "PUT",
			body: JSON.stringify({
				name: nameValue,
				number: phoneNumberValue,
			}),
		});
		const response = await rawResponse.json();
		// if token expired
		if (response.code === 403) {
			toggleHideDialog();
			alert(response.msg);
			setNameValue("");
			setPhoneNumberValue("");
			updateRenderWhat(renderContent.LogIn);
			localStorage.setItem("token", "");
			return;
		}
		// modify items
		const copy = [...props.items];
		for (let i = 0; i < copy.length; i++) {
			if (copy[i].id === props.itemId) {
				copy[i].name = nameValue;
				copy[i].phoneNumber = phoneNumberValue;
				break;
			}
		}
		props.setItems(copy);

		alert(response.msg);
		toggleHideDialog();
		setNameValue("");
		setPhoneNumberValue("");
	};

	const submitAddedValue = async () => {
		// check tokene
		const token = localStorage.getItem("token");
		if (!token) {
			alert("token is null");
			return;
		}
		// request delete
		const rawResponse = await fetch("/contacts", {
			headers: {
				"Content-Type": "application/json",
				authorization: token,
			},
			method: "POST",
			body: JSON.stringify({
				name: nameValue,
				number: phoneNumberValue,
			}),
		});

		const response = await rawResponse.json();

		// if token expired
		if (response.code === 403) {
			toggleHideDialog();
			alert(response.msg);
			setNameValue("");
			setPhoneNumberValue("");
			updateRenderWhat(renderContent.LogIn);
			localStorage.setItem("token", "");
			return;
		}
		// modify items
		const copy: Contact[] = [...props.items];
		copy.push({
			id: response.data.id,
			name: response.data.name,
			phoneNumber: response.data.phoneNumber,
		});
		props.setItems(copy);
		alert(response.msg);
		toggleHideDialog();
		setNameValue("");
		setPhoneNumberValue("");
	};

	const action =
		props.action === actionType.update
			? submitUpdatedValue
			: submitAddedValue;

	return (
		<>
			<DefaultButton
				secondaryText="Opens the Sample Dialog"
				onClick={toggleHideDialog}
				text={props.action === actionType.update ? "Update" : "Add"}
			/>
			<Dialog
				hidden={hideDialog}
				onDismiss={toggleHideDialog}
				dialogContentProps={dialogContentProps}
				modalProps={modelProps}
			>
				<TextField
					label="name"
					value={nameValue}
					onChange={onChangeNameValue}
				/>
				<TextField
					label="phone number"
					value={phoneNumberValue}
					onChange={onChangePhoneNumberValue}
				/>

				<DialogFooter>
					<PrimaryButton onClick={action} text="Done" />
					<DefaultButton onClick={toggleHideDialog} text="Cancel" />
				</DialogFooter>
			</Dialog>
		</>
	);
};
