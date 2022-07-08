import React, { useEffect, useState } from "react";
import { ITextFieldStyles } from "@fluentui/react";
import "../App.css";
import { LogInButton } from "./LogInButton";
import { LogIn } from "./LogIn";
import { Operation } from "./Operation";
import { renderContent } from "../model/renderContent";
import { store } from "../store/store";
import { observer } from "mobx-react-lite";
import { ContactsExample } from "./ContactsExample";
import { Contacts } from "./Contacts";
import { updateRenderWhat } from "../mutators/updateRenderWhat";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { fetchPageNumber } from "../service/common";

const textFieldStyles: Partial<ITextFieldStyles> = {
	fieldGroup: { width: 300 },
};
const narrowTextFieldStyles: Partial<ITextFieldStyles> = {
	fieldGroup: { width: 100 },
};
const stackTokens = { childrenGap: 15 };

export const getRenderWhat: () => renderContent = () => {
	const token = localStorage.getItem("token")?.substring(7);
	if (token && token !== "undefined") {
		return renderContent.Contacts;
	} else {
		return renderContent.LogIn;
	}
};

export const App: React.FunctionComponent = observer(() => {
	/**
	 * listen to localStorage, once token is empty, set `isRenderWhat` to renderContent.LogIn
	 */
	const [pagesNumber, setPagesNumber] = useState(0);
	const [currentPageIndex, setCurrentPageIndex] = useState(1);
	let capacity: number = 20;
	fetchPageNumber(capacity).then((pNum) => setPagesNumber(pNum));

	const switchPage = (__: React.ChangeEvent<unknown>, pIndex: number) => {
		setCurrentPageIndex(pIndex);
	};

	// useEffect(() => {}, [currentPageIndex]);

	return (
		<>
			<div>
				{store.renderWhat === renderContent.LogIn && <LogIn />}
				{store.renderWhat === renderContent.Operation && <Operation />}
				{store.renderWhat === renderContent.Contacts && (
					<>
						<Contacts
							pageIndex={currentPageIndex}
							capacity={capacity}
						/>
						<Stack spacing={2}>
							<Pagination
								page={currentPageIndex}
								onChange={switchPage}
								count={pagesNumber}
								color="primary"
							/>
						</Stack>
					</>
				)}
			</div>
		</>
	);
});
