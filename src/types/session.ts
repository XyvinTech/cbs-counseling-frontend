import { User } from "./user";

export type Session = {
  _id: string;
  session_id: string;
  case_id: string;
  form_id: string;
  session_date: string;
  session_time: {
    start: string;
    end: string;
  };
  interactions: string;
  type: string;
  counsellor: User;
  case_date: string;
  description: string;
  report: string[];
  status: string;
  case_details: string;
  reschedule_remark: string;
  cancel_remark: string;
  c_reschedule_remark: string;
  c_cancel_remark: string;
  student_name: string;
  counsellor_type: string[];
  counsellor_name: string;
  user_name: string;
  caseid: string;
  referee: string
};
