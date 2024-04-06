import { DomChild } from "../../dom/DomNode.js";
import el from "../../dom/el.js";
import Component from "../Component.js";
import MaterialIcon from "../MaterialIcon.js";

export default class InfoMessageBox extends Component {
  constructor(options: { tag?: string; message: DomChild | DomChild[] }) {
    super((options.tag ?? "") + ".message-box.info-message-box");
    this.append(
      new MaterialIcon("info"),
      el(
        "p",
        ...(Array.isArray(options.message)
          ? options.message
          : [options.message]),
      ),
    );
  }
}
