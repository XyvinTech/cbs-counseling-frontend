import { Plan } from "./plan";
import { User } from "./user";

export type subscription = {
  _id: string;
  user: User;
  status: string;
  expiryDate: string;
  plan: Plan;
  receipt: string;
};

