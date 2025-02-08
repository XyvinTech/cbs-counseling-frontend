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
  const [data, setData] = useState<Session | null>(null);
  const location = useLocation();
  const { state } = location;
  const name = state?.name || "Session Details";

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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        <div className="col-span-2 flex flex-col gap-6">
          {[data?.form_id, data?.counsellor].map((person: any, index) => (
            <div
              key={index}
              className="flex bg-white rounded-lg shadow-md p-6 items-center gap-6 border border-gray-300"
            >
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-300">
                <img
                  src={person?.gender === "male" ? userBoy : userGirl}
                  alt={`${person?.name || "User"} profile`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col w-full">
                <div className="flex justify-between">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {person?.name || "N/A"}
                  </h3>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {person?.counsellorType ? "Counsellor" : "Student"}
                  </h3>
                </div>
                <p className="text-gray-600">
                  {person?.designation || person?.class || "N/A"}
                </p>
                <p className="text-sm text-gray-500">
                  {person?.grNumber || person?.counsellorType || "N/A"}
                </p>
                <div className="flex gap-4 mt-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-700">
                    <BsFillTelephoneFill className="text-blue-500" />
                    {person?.mobile || "N/A"}
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <BsFillEnvelopeFill className="text-blue-500" />
                    <span className="truncate">{person?.email || "N/A"}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-300">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Session Details
          </h3>
          <div className="space-y-4 text-gray-700">
            {[
              { label: "Case ID:", value: data?.case_id?.case_id },
              { label: "Session No:", value: data?.session_id },
              {
                label: "Appointment Date:",
                value: data?.session_date
                  ? moment(data.session_date).format("MMMM DD, YYYY")
                  : "N/A",
              },
              {
                label: "Appointment Time:",
                value: data?.session_time
                  ? `${data.session_time.start} - ${data.session_time.end}`
                  : "N/A",
              },
              { label: "Type of Counseling:", value: data?.type || "N/A" },
              {
                label: "Reason for Counseling:",
                value: data?.description || "N/A",
              },
              { label: "Session Status:", value: data?.status || "N/A" },
              {
                label: "Booked By:",
                value: data?.form_id
                  ? `${data.form_id.refereeName} (${data.form_id.referee})`
                  : "N/A",
              },
            ].map(({ label, value }, index) => (
              <div key={index} className="flex justify-between text-sm">
                <p className="text-gray-600">{label}</p>
                <p className="text-gray-900 font-medium">{value}</p>
              </div>
            ))}
            <div>
              <p className="text-gray-600">Uploaded Documents:</p>
              <p className="text-blue-500 font-medium cursor-pointer flex items-center gap-2">
                <BsFillFileEarmarkTextFill className="text-xl" />
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
