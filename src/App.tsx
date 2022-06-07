import React, { useEffect, useState } from "react";
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
import logo from "./logo.svg";
import "./App.css";
import { LogInButton } from "./LogInButton";
import { LogIn } from "./LogIn";
import { Operation } from "./Operation";
import { renderContent } from "./model";

const textFieldStyles: Partial<ITextFieldStyles> = {
	fieldGroup: { width: 300 },
};
const narrowTextFieldStyles: Partial<ITextFieldStyles> = {
	fieldGroup: { width: 100 },
};
const stackTokens = { childrenGap: 15 };

const getRenderWhat: () => renderContent = () => {
	const token = localStorage.getItem("token")?.substring(7);
	if (token && token !== "undefined") {
		return renderContent.Operation;
	} else {
		return renderContent.LogIn;
	}
};

export const App: React.FunctionComponent = () => {
	let initIsRenderWhat = getRenderWhat();

	const [isRenderWhat, setIsRenderWhat] = useState(initIsRenderWhat);

	// if (App is rendered || dependencies changed) {
	// 	useEffect
	// }

	return (
		<div>
			{isRenderWhat === renderContent.LogIn && (
				<LogIn jumpToFunc={setIsRenderWhat} />
			)}
			{isRenderWhat === renderContent.Operation && <Operation />}
		</div>
	);
};
