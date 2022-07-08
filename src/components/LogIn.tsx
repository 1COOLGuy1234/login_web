import React, { useState } from "react";
import { Stack, TextField, ITextFieldStyles } from "@fluentui/react";
import "../App.css";
import { LogInButton } from "./LogInButton";
import { renderContent } from "../model/renderContent";
import { updateRenderWhat } from "../mutators/updateRenderWhat";
import { store } from "../store/store";
import { SuccessExample, ErrorExample } from "./MessageBar";

const textFieldStyles: Partial<ITextFieldStyles> = {
	fieldGroup: { width: 300 },
};

const stackTokens = { childrenGap: 15 };

export const LogIn: React.FunctionComponent = (props) => {
	const [userNameValue, setUserNameValue] = useState("");
	const [passWordValue, setPassWordValue] = useState("");
	const [isLogInSuccess, setIsLogInSuccess] = useState<boolean | undefined>(
		undefined
	);
	const [errorMsg, setErrorMsg] = useState("");

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
			setErrorMsg("Your username or password is null");
			setIsLogInSuccess(false);
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
			setErrorMsg("Login failed! Your username or password is wrong!");
			setIsLogInSuccess(false);
		} else {
			setIsLogInSuccess(true);
			localStorage.setItem("token", `Bearer ${token}`);
			updateRenderWhat(renderContent.Contacts);
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
			{isLogInSuccess != undefined && isLogInSuccess === false && (
				<div className="messageBar">
					<ErrorExample msg={errorMsg} />
				</div>
			)}
		</Stack>
	);
};
