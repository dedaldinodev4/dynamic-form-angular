
export type IOptions = {
  key: string; 
  value: string;
}

export type IFormField<T> = {
  value?: T;
  key?: string;
  label?: string;
  required?: boolean;
  validator?: string;
  order?: number;
  controlType?: string;
  type?: string;
  options?: IOptions[];
}

export interface Field {
  input: string;
  label: string;
  value?: string
}
