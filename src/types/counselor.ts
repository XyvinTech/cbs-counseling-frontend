import { Type } from "./type";

export type Counselor = {
  _id: string;
  name: string;
  phone: string;
  designation: string;
  email: string;
  type: Type;
  gender: string;
};
