import { User } from "./user";

export type Session = {
  _id: string;
  session_id: string;
  case_id: string;
  form_id: string;
  session_date: string;
  session_time: string;
  interactions: string;
  type: string;
  counsellor: User;
  description: string;
  report: string[];
  status: string;
  case_details: string;
  reschedule_remark: string;
  cancel_remark: string;
  c_reschedule_remark: string;
  c_cancel_remark: string;
};
