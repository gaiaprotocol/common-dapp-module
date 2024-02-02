import DomNode from "../../dom/DomNode.js";
import el from "../../dom/el.js";
import Component from "../Component.js";
import Popup from "../Popup.js";
import Button from "../button/Button.js";
import ButtonType from "../button/ButtonType.js";

export default class Alert extends Popup {
  public content: DomNode;

  constructor(options: {
    title: string;
    message: string;
    confirmTitle?: string;
  }, callback?: () => Promise<void> | void) {
    super({ barrierDismissible: true });
    this.append(
      this.content = new Component(
        ".popup.alert",
        el("header", el("h1", options.title)),
        el("main", el("p", options.message)),
        el(
          "footer",
          new Button({
            type: ButtonType.Text,
            tag: ".confirm-button",
            title: options.confirmTitle ?? "OK",
            click: async () => {
              if (callback) await callback();
              this.delete();
            },
          }),
        ),
      ),
    );
  }
}
