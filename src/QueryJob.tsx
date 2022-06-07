import React, { useState } from "react";
import { Stack, ITextFieldStyles, DefaultButton } from "@fluentui/react";

const textFieldStyles: Partial<ITextFieldStyles> = {
	fieldGroup: { width: 300 },
};

const stackTokens = { childrenGap: 15 };

export const QueryJob: React.FunctionComponent = () => {
	const [job, setJob] = useState("");

	const queryAction = async () => {
		const token = localStorage.getItem("token")?.substring(7);
		if (!token || token.length < 10) {
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
			setJob(data["data"]["job"]);
		} else {
			setJob("");
			alert("Token has expired, please refresh the page");
			localStorage.setItem("token", "");
		}
	};

	return (
		<Stack horizontal tokens={stackTokens}>
			<DefaultButton text="Query Job Info" onClick={queryAction} />
			{job.length !== 0 && <div>job is {job}</div>}
		</Stack>
	);
};
