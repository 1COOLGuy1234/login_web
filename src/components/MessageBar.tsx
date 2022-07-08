import {
	Link,
	Stack,
	StackItem,
	MessageBar,
	MessageBarType,
	ChoiceGroup,
	IStackProps,
	MessageBarButton,
	Text,
	IChoiceGroupStyles,
} from "@fluentui/react";

interface IExampleProps {
	msg: string;
}

export const SuccessExample = () => (
	<MessageBar messageBarType={MessageBarType.success} isMultiline={false}>
		Log In Success!
	</MessageBar>
);

export const ErrorExample = (p: IExampleProps) => (
	<MessageBar
		messageBarType={MessageBarType.error}
		isMultiline={false}
		dismissButtonAriaLabel="Close"
	>
		{p.msg}
	</MessageBar>
);
