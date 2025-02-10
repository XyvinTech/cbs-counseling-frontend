import { Form } from "./form";
import { Session } from "./session";
import { User } from "./user";

export type Case = {
  _id: string;
  case_id: string;
  form_id: Form;
  concern_raised: string;
  referer: User[];
  referer_remark: string[];
  reason_for_closing: string;
  status: string;
  session_ids: Session[];
  createdAt: string;
  counsellor_name: string;
  session_count: number;
  user_name:string;
  couselling_type:string

};
