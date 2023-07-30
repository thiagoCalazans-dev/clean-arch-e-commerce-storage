import { randomUUID } from "node:crypto";

interface BrandProps {
  name: string;
}

export class Brand {
  id;
  name;
  constructor(props: BrandProps, id?: string) {
    this.id = id || randomUUID();
    this.name = props.name;
  }
}
