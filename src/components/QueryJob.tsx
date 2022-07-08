import React, { useState } from "react";
import { Stack, ITextFieldStyles, DefaultButton } from "@fluentui/react";
import { queryInfo } from "../service/common";

const textFieldStyles: Partial<ITextFieldStyles> = {
	fieldGroup: { width: 300 },
};

const stackTokens = { childrenGap: 15 };

export const QueryJob: React.FunctionComponent = () => {
	const [job, setJob] = useState("");

	const queryAction = async () => {
		return queryInfo("job", setJob);
	};

	return (
		<Stack horizontal tokens={stackTokens}>
			<DefaultButton text="Query Job Info" onClick={queryAction} />
			{job.length !== 0 && <div>job is {job}</div>}
		</Stack>
	);
};
