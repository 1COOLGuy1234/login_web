import React, { useState } from "react";
import { Stack, TextField, ITextFieldStyles } from "@fluentui/react";
import "../App.css";
import { QueryJob } from "./QueryJob";
import { QueryAge } from "./QueryAge";

const textFieldStyles: Partial<ITextFieldStyles> = {
	fieldGroup: { width: 300 },
};

const stackTokens = { childrenGap: 15 };

export const Operation: React.FunctionComponent = () => {
	return (
		<Stack tokens={stackTokens}>
			<QueryJob />
			<QueryAge />
		</Stack>
	);
};
