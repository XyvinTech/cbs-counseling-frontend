import { Church } from "./church";

export type User = {
  _id: string;
  name: string;
  church: Church;
  email: string;
  phone: string;
  status: string;
  address: string;
  role: string;
};
