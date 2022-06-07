import React, { useState } from "react";
import {
	Stack,
	Text,
	Link,
	FontWeights,
	IStackTokens,
	IStackStyles,
	ITextStyles,
	TextField,
	ITextFieldStyles,
} from "@fluentui/react";
import "./App.css";
import { LogInButton } from "./LogInButton";
import { renderContent } from "./model";

export interface ILogInProps {
	jumpToFunc: (jumpTo: renderContent) => void;
}

const textFieldStyles: Partial<ITextFieldStyles> = {
	fieldGroup: { width: 300 },
};

const stackTokens = { childrenGap: 15 };

export const LogIn: React.FunctionComponent<ILogInProps> = (props) => {
	const [userNameValue, setUserNameValue] = useState("");
	const [passWordValue, setPassWordValue] = useState("");

	const onChangeFirstTextFieldValue = React.useCallback(
		(
			_: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
			newValue?: string
		) => {
			setUserNameValue(newValue || "");
		},
		[]
	);
	const onChangeSecondTextFieldValue = React.useCallback(
		(
			_: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
			newValue?: string
		) => {
			setPassWordValue(newValue || "");
		},
		[]
	);

	const logInAction = async () => {
		// check input
		if (userNameValue.length === 0 || passWordValue.length === 0) {
			alert("Your username or password is null");
			return;
		}

		// logic
		const raw = await fetch("/user/login", {
			headers: {
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify({
				name: userNameValue,
				password: passWordValue,
			}),
		});
		const data = await raw.json();
		const token = data["data"];

		if (data["code"] === 400) {
			alert("Log in failed. Your username or password is wrong"); // TODO: use fluent UI notification
		} else {
			alert("Log In successfully");
			localStorage.setItem("token", `Bearer ${token}`);
			props.jumpToFunc(renderContent.Operation);
		}
	};

	return (
		<Stack tokens={stackTokens}>
			<TextField
				label="username"
				value={userNameValue}
				onChange={onChangeFirstTextFieldValue}
				styles={textFieldStyles}
			/>
			<TextField
				label="password"
				value={passWordValue}
				onChange={onChangeSecondTextFieldValue}
				styles={textFieldStyles}
				canRevealPassword={true}
				type="password"
			/>
			<LogInButton onClickAction={logInAction}></LogInButton>
		</Stack>
	);
};
