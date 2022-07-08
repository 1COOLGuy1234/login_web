import * as React from "react";
import { Stack, IStackTokens } from "@fluentui/react";
import { DefaultButton, PrimaryButton } from "@fluentui/react/lib/Button";

export interface IButtonExampleProps {
	// These are set based on the toggles shown above the examples (not needed in real code)
	disabled?: boolean;
	checked?: boolean;
	onClickAction: () => void;
}

// Example formatting
const stackTokens: IStackTokens = { childrenGap: 40 };

export const LogInButton: React.FunctionComponent<IButtonExampleProps> = (
	props
) => {
	const { disabled, checked, onClickAction } = props;

	return (
		<Stack horizontal tokens={stackTokens}>
			<DefaultButton
				text="Log In"
				onClick={onClickAction}
				allowDisabledFocus
				disabled={disabled}
				checked={checked}
			/>
		</Stack>
	);
};
