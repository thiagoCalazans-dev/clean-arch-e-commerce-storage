import { randomUUID } from "node:crypto";
import { IsRequiredError } from "../errors/isRequiredError";

interface CategoryProps {
  name: string;
}

export class Category {
  private id: string;
  private _name: string;

  constructor(props: CategoryProps, id?: string) {
    this.id = id ?? randomUUID();

    if (props.name.length <= 1) throw new IsRequiredError("name");

    this._name = props.name;
  }

  get data() {
    return {
      id: this.id,
      name: this._name,
    };
  }
}
