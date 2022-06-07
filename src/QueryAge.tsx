import React, { useState } from "react";
import { Stack, ITextFieldStyles, DefaultButton } from "@fluentui/react";

const textFieldStyles: Partial<ITextFieldStyles> = {
	fieldGroup: { width: 300 },
};

const stackTokens = { childrenGap: 15 };

export const QueryAge: React.FunctionComponent = () => {
	const [age, setAge] = useState("");

	const queryAction = async () => {
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
			setAge(data["data"]["age"]);
		} else {
			setAge("");
			alert("Token has expired, please refresh the page");
			localStorage.setItem("token", "");
		}
	};

	return (
		<Stack horizontal tokens={stackTokens}>
			<DefaultButton text="Query Age Info" onClick={queryAction} />
			{age.length !== 0 && <div>age is {age}</div>}
		</Stack>
	);
};
