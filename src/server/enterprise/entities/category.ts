import { randomUUID } from "node:crypto";
import { IsRequiredError } from "../errors/isRequiredError";

interface CategoryProps {
  name: string;
}

export class Category {
  readonly id: string;
  readonly name: string;

  constructor(props: CategoryProps, id?: string) {
    this.id = id ?? randomUUID();

    if (props.name.length <= 1) throw new IsRequiredError("name");

    this.name = props.name;
  }
}
