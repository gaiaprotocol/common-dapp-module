import DomNode, { DomChild } from "../../dom/DomNode.js";
import Component from "../Component.js";
import ButtonType from "./ButtonType.js";
export default class Button extends Component<HTMLAnchorElement> {
    private options;
    private _icon;
    private titleContainer;
    constructor(options: {
        tag?: string;
        type?: ButtonType;
        icon?: DomNode;
        title?: DomChild;
        href?: string;
        target?: string;
        disabled?: boolean;
        click?: (event: Event, node: Button) => void;
    });
    set type(type: ButtonType);
    set title(title: DomChild);
    set icon(icon: DomNode);
    disable(): this;
    enable(): this;
    set loading(loading: boolean);
}
//# sourceMappingURL=Button.d.ts.map