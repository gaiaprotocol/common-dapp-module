import DomNode, { DomChild } from "../../dom/DomNode.js";
import el from "../../dom/el.js";
import Component from "../Component.js";
import LoadingSpinner from "../loading/LoadingSpinner.js";
import ButtonType from "./ButtonType.js";

export default class Button extends Component<HTMLAnchorElement> {
  private _icon: DomNode | undefined;
  private titleContainer: DomNode | undefined;

  constructor(
    private options: {
      tag?: string;
      type?: ButtonType;
      icon?: DomNode;
      title?: DomChild;
      decapitalize?: boolean;
      href?: string;
      target?: string;
      disabled?: boolean;
      onClick?: (node: Button, event: Event) => void;
    },
  ) {
    super(
      "button" +
        (options.type !== undefined ? "." + options.type : ".text") +
        (options.tag ?? ""),
    );
    if (options.icon !== undefined) {
      this.append(this._icon = options.icon.clone());
    }
    if (options.title !== undefined) {
      this.append(
        this.titleContainer = el("span.title", options.title),
      );
    }
    if (options.decapitalize) {
      this.style({ textTransform: "none" });
    }
    if (options.href !== undefined) {
      this.onDom("click", () => {
        if (options.target === "_blank") {
          window.open(options.href!);
        } else {
          window.location.href = options.href!;
        }
      });
    }
    if (options.disabled === true) {
      this.disable();
    }
    if (options.onClick !== undefined) {
      this.onDom("click", (event) => {
        if (this.hasClass("disabled") !== true) {
          options.onClick!(this, event);
        }
      });
    }
  }

  public set type(type: ButtonType) {
    this.deleteClass("contained", "outlined", "text");
    this.addClass(type);
  }

  public set title(title: DomChild) {
    if (this.titleContainer !== undefined) {
      this.titleContainer.empty().append(title);
    } else {
      this.append(this.titleContainer = el("span.title", title));
    }
  }

  public set icon(icon: DomNode) {
    this._icon?.delete();
    this._icon = icon.appendTo(this, 0);
  }

  public disable(): this {
    this.domElement.setAttribute("disabled", "disabled");
    this.addClass("disabled");
    return this;
  }

  public enable(): this {
    this.domElement.removeAttribute("disabled");
    this.deleteClass("disabled");
    return this;
  }

  public set loading(loading: boolean) {
    if (loading) {
      this.disable();
      this.addClass("loading");
      if (this.options.icon) this.icon = new LoadingSpinner();
      else this.title = new LoadingSpinner();
    } else {
      this.enable();
      this.deleteClass("loading");
      if (this.options.icon) this.icon = this.options.icon.clone();
      else this.title = this.options.title ?? "";
    }
  }
}
