import { store } from "../store/store";
import { mutatorAction } from "satcheljs";
import { renderContent } from "../model/renderContent";

export const updateRenderWhat = mutatorAction(
	"updateRenderContent",
	(renderWhat: renderContent) => {
		store.renderWhat = renderWhat;
	}
);
