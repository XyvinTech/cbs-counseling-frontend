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
import { toast } from "react-toastify";
import { sessionReport } from "../../../api/reportApi";
import { saveAs } from "file-saver";
import * as base64js from "base64-js";
import Loader from "../../../components/Loader";
const SessionDetails = () => {
  const { id } = useParams();
  const VITE_APP_FILE_URL ="https://able.iswkoman.com/images/"

  const [data, setData] = useState<Session | null>(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const { state } = location;
  const name = state?.name || "Session Details";

  useEffect(() => {
    const fetchSession = async () => {
      setLoading(true);
      try {
        const response = await getSessionById(id || "");
        if (response?.data) {
          setData(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch session:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchSession();
  }, [id]);
  const userType = localStorage.getItem("userType");
  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await sessionReport(id || "");
      const base64Data = response.data;
      const byteArray = base64js.toByteArray(base64Data);
      const pdfBlob = new Blob([byteArray], { type: "application/pdf" });
      saveAs(pdfBlob, "report.pdf");
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Breadcrumb pageName={name} titleName="Session" nav={false} />
          {userType === "admin" && (
            <div className="flex justify-end mt-4 p-6 pb-0">
              <button
                onClick={handleDownload}
                className="px-6 py-2 bg-[#0072bc] text-white rounded hover:bg-opacity-90 transition"
              >
                Download Session Report
              </button>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
            <div className="col-span-2 flex flex-col gap-6 ">
              {[data?.form_id, data?.counsellor].map((person: any, index) => (
                <div
                  key={index}
                  className="flex flex-col bg-white rounded-lg shadow-md p-6 border border-gray-300 dark:bg-form-input dark:text-white"
                >
                  <div className="flex items-center gap-6">
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
                        {person?.grNumber ||
                          (Array.isArray(person?.counsellorType) &&
                          person?.counsellorType.length > 0
                            ? person.counsellorType.join(", ")
                            : "N/A")}
                      </p>

                      <div className="flex gap-4 mt-2 text-sm">
                        <div className="flex items-center gap-2 text-gray-700">
                          <BsFillTelephoneFill className="text-blue-500" />
                          {person?.mobile || "N/A"}
                        </div>
                        <div className="flex items-center gap-2 text-gray-700">
                          <BsFillEnvelopeFill className="text-blue-500" />
                          <span className="truncate">
                            {person?.email || "N/A"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="bg-white rounded-lg shadow-md p-6 border border-gray-300 dark:bg-form-input dark:text-white">
                <h3 className="text-2xl font-semibold text-gray-900">
                  Additional Details
                </h3>
                <div className="mt-4 space-y-4">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">
                      Reason for Counseling:
                    </h4>
                    <p className="text-gray-700">
                      {data?.description || "N/A"}
                    </p>
                  </div>

                  {data?.c_cancel_remark && (
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">
                        Cancellation Remark:
                      </h4>
                      <p className="text-gray-700">
                        {data?.c_cancel_remark || "N/A"}
                      </p>
                    </div>
                  )}
                  {data?.c_reschedule_remark && (
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">
                        Reschedule Reason:
                      </h4>
                      <p className="text-gray-700">
                        {data?.c_reschedule_remark || "N/A"}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-300 dark:bg-form-input dark:text-white">
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
                  { label: "Session Status:", value: data?.status || "N/A" },
                  {
                    label: "Booked By:",
                    value: data?.form_id
                      ? `${data.form_id.referee}${
                          data?.form_id?.refereeName
                            ? ` (${data.form_id.refereeName})`
                            : ""
                        }`
                      : "N/A",
                  },
                ].map(({ label, value }, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <p className="text-gray-600">{label}</p>
                    <p className="text-gray-900 font-medium capitalize">
                      {value}
                    </p>
                  </div>
                ))}

                {data?.report && data.report.length > 0 && (
                  <div>
                    <p className="text-gray-600">Reports:</p>
                    <ul className="space-y-2">
                      {data.report.map((report, index) => (
                        <li
                          key={index}
                          className="text-blue-500 font-medium cursor-pointer flex items-center gap-2 text-xs"
                          onClick={() =>
                            window.open(
                              `${VITE_APP_FILE_URL}${report}`,
                              "_blank"
                            )
                          }
                        >
                          <BsFillFileEarmarkTextFill className="text-xl" />
                          {report}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>{" "}
        </>
      )}
    </>
  );
};

export default SessionDetails;
