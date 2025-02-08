import { Session } from "./session";
import { User } from "./user";

export type Case = {
  _id: string;
  case_id: string;
  form_id: {
    name: string;
    grNumber: string;
};
  concern_raised: string;
  referer: User[];
  referer_remark: string[];
  reason_for_closing: string;
  status: string;
  session_ids: Session[];
  createdAt: string;
  counsellor_name: string;
};
