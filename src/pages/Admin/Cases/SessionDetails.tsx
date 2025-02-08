import {
  BsFillEnvelopeFill,
  BsFillFileEarmarkTextFill,
  BsFillTelephoneFill,
} from "react-icons/bs";
import moment from "moment-timezone";
import userGirl from "../../../images/user/user-girl.png";
import userBoy from "../../../images/user/user-boy.png";
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSessionById } from "../../../api/sessionApi";
import { Session } from "../../../types/session";
import Breadcrumb from "../../../components/Breadcrumbs/Breadcrumb";

const SessionDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState<Session>();
  const location = useLocation();
  const { state } = location;
  const name = state?.name;

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await getSessionById(id || "");
        if (response?.data) {
          setData(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch session:", error);
      }
    };
    if (id) fetchSession();
  }, [id]);

  return (
    <>
      <Breadcrumb pageName={name} titleName="Student" />
      <div className="flex flex-col md:flex-row justify-between items-start p-6 gap-6">
        {/* Left Side: Student & Counsellor Cards */}
        <div className="w-full md:w-2/3 flex flex-col gap-6">
          {[data?.form_id, data?.counsellor].map((person: any, index) => (
            <div
              key={index}
              className="flex bg-white rounded-lg shadow-lg dark:bg-gray-700 p-6 items-center gap-6"
            >
              <div className="w-24 h-24 flex-shrink-0 rounded-full overflow-hidden border-4 border-blue-500">
                <img
                  src={person?.gender === "male" ? userBoy : userGirl}
                  alt="profile"
                />
              </div>
              <div className="flex flex-col">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                  {person?.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {person?.designation || person?.class}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {person?.grNumber || person?.counsellorType}
                </p>
                <div className="flex gap-4 mt-2">
                  <div className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
                    <BsFillTelephoneFill className="text-blue-500" />
                    {person?.mobile}
                  </div>
                  <div className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
                    <BsFillEnvelopeFill className="text-blue-500" />
                    {person?.email}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Side: Session Details */}
        <div className="w-full md:w-1/3 bg-white rounded-lg shadow-lg dark:bg-gray-700 p-6">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            Session Details
          </h3>
          <div className="space-y-4">
            {[
              { label: "Case ID:", value: data?.case_id.case_id },
              { label: "Session No:", value: data?.session_id },
              {
                label: "Appointment Date:",
                value: moment(data?.session_date).format("MMMM DD, YYYY"),
              },
              {
                label: "Appointment Time:",
                value: `${data?.session_time.start} - ${data?.session_time.end}`,
              },
              { label: "Type of Counseling:", value: data?.type },
              { label: "Reason for Counseling:", value: data?.description },
              { label: "Session Status:", value: data?.status },
              {
                label: "Booked By:",
                value: `${data?.form_id.refereeName} (${data?.form_id.referee})`,
              },
            ].map(({ label, value }, index) => (
              <div key={index} className="flex justify-between">
                <p className="text-gray-600 dark:text-gray-300">{label}</p>
                <p className="text-gray-800 dark:text-white font-semibold">
                  {value}
                </p>
              </div>
            ))}
            <div>
              <p className="text-gray-600 dark:text-gray-300">
                Uploaded Documents:
              </p>
              <p className="text-gray-800 dark:text-white font-semibold cursor-pointer flex items-center gap-4">
                <BsFillFileEarmarkTextFill className="text-[30px] text-blue-500 dark:text-blue-300" />
                RIASEC_Career-theory-model-holland.pdf
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SessionDetails;
