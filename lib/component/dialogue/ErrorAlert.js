import el from "../../dom/el.js";
import MaterialIcon from "../MaterialIcon.js";
import Button from "../button/Button.js";
import Popup from "../exitable/Popup.js";
export default class ErrorAlert extends Popup {
    constructor(options) {
        super(".error-alert", { barrierDismissible: true });
        this.header.append(el("h1", new MaterialIcon("error"), options.title));
        this.main.append(el("p", options.message));
        this.footer.append(new Button({
            tag: ".confirm",
            title: options.confirmTitle ?? "OK",
            onClick: () => this.delete(),
        }));
    }
}
//# sourceMappingURL=ErrorAlert.js.map