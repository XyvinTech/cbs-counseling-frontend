import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addRemark, getSessionById } from "../../api/sessionApi";
import { BsFillEnvelopeFill, BsFillTelephoneFill } from "react-icons/bs";
import moment from "moment-timezone";
import userGirl from "../../images/user/user-girl.png";
import userBoy from "../../images/user/user-boy.png";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { getUser } from "../../api/userApi";
import Loader from "../../components/Loader";

const AddRemark: React.FC = () => {
  const VITE_APP_FILE_URL ="https://able.iswkoman.com/images/"
  const { id } = useParams();
  const [data, setData] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [remark, setRemark] = useState("");
  const [loading, setLoading] = useState(false);
  const [isChange, setIsChange] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUser();
        setUser(response.data);
      } catch (error) {}
    };
    fetchData();
  }, []);
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
  }, [id, isChange]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (remark.trim() === "") return;
    try {
      await addRemark(data?.case_id?._id, { remark: remark });
      setIsChange((prevState) => !prevState);
      setRemark("");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 shadow-lg">
        <h2 className="text-2xl font-semibold text-white">Session Details</h2>
      </div>
      <div className="p-6 bg-gray-100 min-h-screen">
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 dark:bg-form-input dark:text-white text-black">
                <h3 className="text-xl font-semibold  mb-4 ">
                  Student Details
                </h3>
                {[data?.form_id].map((person, index) => (
                  <div key={index} className="flex items-center gap-6 mb-6">
                    <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-300">
                      <img
                        src={person?.gender === "male" ? userBoy : userGirl}
                        alt={`${person?.name || "User"} profile`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col">
                      <h3 className="text-lg font-semibold ">
                        {person?.name || "N/A"}
                      </h3>
                      <p>{person?.class || "N/A"}</p>
                      <div className="flex gap-4 mt-2 text-sm">
                        <div className="flex items-center gap-2">
                          <BsFillTelephoneFill className="text-blue-500" />
                          {person?.mobile || "N/A"}
                        </div>
                        <div className="flex items-center gap-2">
                          <BsFillEnvelopeFill className="text-blue-500" />
                          {person?.email || "N/A"}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 dark:bg-form-input dark:text-white text-black">
                <h3 className="text-xl font-semibold mb-4">Case Details</h3>

                {[
                  { label: "Case ID", value: data?.case_id?.case_id },
                  { label: "Status", value: data?.case_id?.status },
                  {
                    label: "Created At",
                    value: moment(data?.case_id?.createdAt).format(
                      "MMMM DD, YYYY"
                    ),
                  },
                  {
                    label: "Concern Raised Date",
                    value: moment(data?.concern_raised).format("MMMM DD, YYYY"),
                  },
                ].map(({ label, value }, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <p>{label}:</p>
                    <p className="font-medium">{value || "N/A"}</p>
                  </div>
                ))}

                <div className="mt-4">
                  <h4 className="text-lg font-semibold mb-2">
                    Uploaded Reports:
                  </h4>
                  {data?.report && data.report.length > 0 ? (
                    <ul className="list-disc list-inside text-sm text-blue-600">
                      {data.report.map((fileName: string, index: number) => (
                        <li key={index}>
                          <a
                            href={`${VITE_APP_FILE_URL}${fileName}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                          >
                            {fileName}
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500">
                      No reports uploaded.
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 col-span-2 mt-8 dark:bg-form-input dark:text-white text-black">
              <h3 className="text-xl font-semibold mb-4">
                Reason for Counseling
              </h3>
              <p className="font-medium">{data?.description || "N/A"}</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 col-span-2 mt-8 dark:bg-form-input dark:text-white text-black">
              <h3 className="text-xl font-semibold mb-4">Session Details</h3>

              <h4 className="text-lg font-semibold mb-4">Past Sessions</h4>
              {data?.case_id?.session_ids?.length > 0 ? (
                data.case_id.session_ids.map((session: any, index: number) => (
                  <div
                    key={session._id}
                    className="mb-6 p-4 border-b border-gray-300"
                  >
                    <h4 className="text-md font-semibold mb-2">
                      Session {index + 1} - {session.session_id}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { label: "Type of Counseling", value: session.type },

                        {
                          label: "Appointment Date",
                          value: session.session_date
                            ? moment(session.session_date).format(
                                "MMMM DD, YYYY"
                              )
                            : "N/A",
                        },
                        {
                          label: "Appointment Time",
                          value: session.session_time
                            ? `${session.session_time.start} - ${session.session_time.end}`
                            : "N/A",
                        },
                        { label: "Status", value: session.status },

                        {
                          label: "Interactions",
                          value: session.interactions || "N/A",
                        },
                        {
                          label: "Session Type",
                          value: session.session_type || "N/A",
                        },
                      ].map(({ label, value }, idx) => (
                        <div key={idx} className="flex justify-between text-sm">
                          <p>{label}:</p>
                          <p className="font-medium">{value || "N/A"}</p>
                        </div>
                      ))}
                      {session.case_details && (
                        <div className="col-span-1 md:col-span-2 mt-2">
                          <p className="text-sm font-semibold">Case Details:</p>
                          <p className="text-gray-700">
                            {session.case_details}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p>No past session details available.</p>
              )}
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 mt-8 max-w-6xl mx-auto dark:bg-form-input dark:text-white text-black">
              <h3 className="text-xl font-semibold mb-4">Remarks</h3>

              <div className="space-y-4  overflow-y-auto p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                {data?.case_id?.referer_remark?.length > 0 ? (
                  data.case_id.referer_remark.map(
                    (item: any, index: number) => {
                      const isMyRemark = item.name === user?.name;

                      return (
                        <div
                          key={index}
                          className={`flex flex-col ${
                            isMyRemark ? "items-end" : "items-start"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm">
                              {item.name.charAt(0)}
                            </div>
                            <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                              {item.name}
                            </span>
                          </div>
                          <div
                            className={`mt-1 p-3 rounded-lg max-w-lg ${
                              isMyRemark
                                ? "bg-blue-500 text-white"
                                : "bg-gray-300 dark:bg-gray-700 text-black dark:text-white"
                            }`}
                          >
                            <p className="text-sm">{item.remark}</p>
                          </div>
                        </div>
                      );
                    }
                  )
                ) : (
                  <p className="text-center text-gray-500">No remarks yet</p>
                )}
              </div>

              <form onSubmit={handleSubmit} className="mt-6">
                <label className="mb-2.5 block text-black dark:text-white">
                  Add a Remark
                </label>
                <textarea
                  name="remark"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-[#0072bc] dark:text-white"
                  placeholder="Type your remark here..."
                  rows={3}
                  value={remark}
                  onChange={(e) => setRemark(e.target.value)}
                />
                <button
                  type="submit"
                  className="mt-3 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                >
                  Send
                </button>
              </form>
            </div>{" "}
          </>
        )}
      </div>
    </>
  );
};

export default AddRemark;
