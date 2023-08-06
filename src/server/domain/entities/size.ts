import { randomUUID } from "node:crypto";
import { IsRequiredError } from "../errors/isRequiredError";

interface SizeProps {
  name: string;
  value: string;
}

export class Size {
  private id: string;
  private _name: string;
  private _value: string;

  constructor(props: SizeProps, id?: string) {
    this.id = id ?? randomUUID();

    if (props.name.length <= 1) throw new IsRequiredError("name");

    this._name = props.name;

    if (props.value.length < 1) throw new IsRequiredError("value");

    this._value = props.value.toUpperCase();
  }

  get data() {
    return {
      id: this.id,
      name: this._name,
      value: this._value,
    };
  }
}
