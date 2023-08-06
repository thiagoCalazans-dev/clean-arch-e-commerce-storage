import { randomUUID } from "node:crypto";
import { IsRequiredError } from "../errors/isRequiredError";
import { isHexadecimalColorValue } from "../errors/isHexadecimalColorValue";

interface ColorProps {
  name: string;
  value: string;
}

const hexadecimalColorRegex = /^#[0-9A-Fa-f]{6}$/;

export class Color {
  private id: string;
  private _name: string;
  private _value: string;

  constructor(props: ColorProps, id?: string) {
    this.id = id ?? randomUUID();

    if (props.name.length <= 1) throw new IsRequiredError("name");

    this._name = props.name;

    if (!hexadecimalColorRegex.test(props.value)) {
      throw new isHexadecimalColorValue();
    }

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
