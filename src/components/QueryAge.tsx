import React, { useState } from "react";
import { Stack, ITextFieldStyles, DefaultButton } from "@fluentui/react";
import { queryInfo } from "../service/common";

const textFieldStyles: Partial<ITextFieldStyles> = {
	fieldGroup: { width: 300 },
};

const stackTokens = { childrenGap: 15 };

export const QueryAge: React.FunctionComponent = () => {
	const [age, setAge] = useState("");

	const queryAction = async () => {
		// curring
		// TODO: Questions
		return queryInfo("age", setAge);
	};

	return (
		<Stack horizontal tokens={stackTokens}>
			<DefaultButton text="Query Age Info" onClick={queryAction} />
			{age.length !== 0 && <div>age is {age}</div>}
		</Stack>
	);
};
