import { IFormField, IOptions } from "../dtos";

type Foo<T extends string> = T extends string ? T : never

export class FormField<T> {
  value?: T;
  key: string;
  label: string;
  required: boolean;
  validator: string;
  order: number;
  controlType: string;
  type: string;
  options: IOptions[];

  constructor(options: {
    value?: T;
    key?: string;
    label?: string;
    required?: boolean;
    validator?: string;
    order?: number;
    controlType?: string;
    type?: string;
    options?: IOptions[];
  } = {}) {
    this.value = options.value;
    this.key = options.key || "";
    this.label = options.label || "";
    this.required = !!options.required;
    this.validator = options.validator || "";
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || "";
    this.type = options.type || "";
    this.options = options.options || [];

  }
}