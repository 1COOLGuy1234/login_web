import * as React from "react";
import { TextField, ITextFieldStyles } from "@fluentui/react/lib/TextField";
import {
	DetailsList,
	DetailsListLayoutMode,
	Selection,
	IColumn,
} from "@fluentui/react/lib/DetailsList";
import { MarqueeSelection } from "@fluentui/react/lib/MarqueeSelection";
import { mergeStyles } from "@fluentui/react/lib/Styling";
import {
	actionType,
	fetchAllContacts,
	fetchOnePageContacts,
} from "../service/common";
import { observer } from "mobx-react-lite";
import { updateContacts } from "../mutators/updateContacts";
import { store, storeContacts } from "../store/store";
import { Contact } from "../model/Contact";
import { Text } from "@fluentui/react/lib/Text";
import { DefaultButton } from "@fluentui/react";
import { ActionDialog } from "./ActionDialog";
import { isTemplateExpression, isTypeElement } from "typescript";
import { updateRenderWhat } from "../mutators/updateRenderWhat";
import { getRenderWhat } from "./App";
import { renderContent } from "../model/renderContent";

const exampleChildClass = mergeStyles({
	display: "block",
	marginBottom: "10px",
});

const textFieldStyles: Partial<ITextFieldStyles> = {
	root: { maxWidth: "300px" },
};

interface contactsProps {
	pageIndex: number;
	capacity: number;
}

export const Contacts: React.FunctionComponent<contactsProps> = observer(
	(props) => {
		// how to write in one line?
		const initItems: Contact[] = [];
		const [items, setItems] = React.useState(initItems);

		React.useEffect(() => {
			fetchOnePageContacts(props.pageIndex, props.capacity).then(
				(data) => {
					if (!data) return;
					setItems(
						data.map((item) => {
							return {
								id: item.id,
								name: item.name,
								phoneNumber: item.phoneNumber,
							};
						})
					);
				}
			);
		}, [props.pageIndex, props.capacity]);

		let columns: IColumn[] = [
			{
				key: "column1",
				name: "Name",
				fieldName: "name",
				minWidth: 100,
				maxWidth: 200,
				isResizable: true,
			},
			{
				key: "column2",
				name: "Phone Number",
				fieldName: "phoneNumber",
				minWidth: 100,
				maxWidth: 200,
				isResizable: true,
			},
			{
				key: "column3",
				name: "update",
				minWidth: 100,
				maxWidth: 200,
				isResizable: true,
			},
			{
				key: "column4",
				name: "remove",
				minWidth: 100,
				maxWidth: 200,
				isResizable: true,
			},
		];

		const onItemInvoked = (item: Contact): void => {
			alert(`Item invoked: ${item.name} ${item.id}`);
		};

		const onRenderItemColumn = (
			item: Contact,
			index: number | undefined,
			column: IColumn | undefined
		) => {
			const fieldContent: string = item[
				column?.fieldName as keyof Contact
			] as string;

			const removeAction = async () => {
				// check tokene
				const token = localStorage.getItem("token");
				if (!token) {
					alert("token is null");
					return;
				}
				// request delete
				const rawResponse = await fetch(`/contacts/${item.id}`, {
					headers: {
						"Content-Type": "application/json",
						authorization: token,
					},
					method: "DELETE",
				});
				const response = await rawResponse.json();
				// if token expired
				if (response.code === 403) {
					alert(response.msg);
					updateRenderWhat(renderContent.LogIn);
					localStorage.setItem("token", "");
					return;
				}
				// modify items
				let copy = [...items];
				for (let i = 0; i < copy.length; i++) {
					if (copy[i].id === item.id) {
						copy.splice(i, 1);
						break;
					}
				}
				setItems(copy);
				alert(response.msg);
			};

			switch (column?.key) {
				case "column1":
					return <Text>{fieldContent}</Text>;
				case "column2":
					return <Text>{fieldContent}</Text>;
				case "column3":
					return (
						<ActionDialog
							itemId={item.id || undefined}
							action={actionType.update}
							items={items}
							setItems={setItems}
						/>
					);
				case "column4":
					return (
						<DefaultButton onClick={removeAction} text="Remove" />
					);
				default:
					return <span>{fieldContent}</span>;
			}
		};

		return (
			<div>
				<DetailsList
					items={items}
					columns={columns}
					setKey="set"
					onRenderItemColumn={onRenderItemColumn}
					layoutMode={DetailsListLayoutMode.justified}
					selectionPreservedOnEmptyClick={true}
					ariaLabelForSelectionColumn="Toggle selection"
					ariaLabelForSelectAllCheckbox="Toggle selection for all items"
					checkButtonAriaLabel="select row"
					onItemInvoked={onItemInvoked}
				/>
				<ActionDialog
					itemId={undefined}
					action={actionType.add}
					items={items}
					setItems={setItems}
				/>
			</div>
		);
	}
);
