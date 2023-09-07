import { randomUUID } from "node:crypto";
import { IsRequiredError } from "../errors/isRequiredError";
import { isHexadecimalColorValue } from "../errors/isHexadecimalColorValue";

interface ColorProps {
  name: string;
  value: string;
}

const hexadecimalColorRegex = /^#[0-9A-Fa-f]{6}$/;

export class Color {
  readonly id: string;
  readonly name: string;
  readonly value: string;

  constructor(props: ColorProps, id?: string) {
    this.id = id ?? randomUUID();

    if (props.name.length <= 1) throw new IsRequiredError("name");

    this.name = props.name;

    if (!hexadecimalColorRegex.test(props.value)) {
      throw new isHexadecimalColorValue();
    }

    this.value = props.value.toUpperCase();
  }
}
