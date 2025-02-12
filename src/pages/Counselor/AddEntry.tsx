import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addEntry, getSessionById } from "../../api/sessionApi";
import { BsFillEnvelopeFill, BsFillTelephoneFill } from "react-icons/bs";
import moment from "moment-timezone";
import userGirl from "../../images/user/user-girl.png";
import userBoy from "../../images/user/user-boy.png";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getDays, getTimes } from "../../api/timeApi";
import { getCounsellors, getUser, upload } from "../../api/userApi";
import { toast } from "react-toastify";

const dayNameToNumber: Record<string, number> = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
};

const numberToDay: Record<number, string> = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
};

const AddEntry: React.FC = () => {
  const VITE_APP_FILE_URL = import.meta.env.VITE_APP_FILE_URL;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [user, setUser] = useState<any>(null);
  const [data, setData] = useState<any>(null);
  const [days, setDays] = useState<number[]>([]);
  const [counselorData, setCounselorData] = useState<any>(null);
  const [times, setTimes] = useState<{ start: string; end: string }[]>([]);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [formState, setFormState] = useState({
    concern_raised: "",
    interactions: "",
    details: "",
    type: "",
    refer: "",
    reason_for_closing: "",
    session_date: null as Date | null,
    time: "",
    report: [] as File[],
  });
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
      try {
        const response = await getSessionById(id || "");
        if (response?.data) {
          setData(response.data);
        }
        setFormState((prev) => ({
          ...prev,
          interactions: response?.data.interactions,
          details: response?.data?.case_details,
          concern_raised: response?.data?.case_id?.concern_raised,
        }));
      } catch (error) {
        console.error("Failed to fetch session:", error);
      }
    };

    if (id) fetchSession();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };
  useEffect(() => {
    const fetchData = async () => {
      if (!data?.counsellor?._id) return;

      try {
        const response = await getCounsellors({
          counsellorType: "",
          counsellor: data.counsellor._id,
        });

        setCounselorData(response?.data || []);
      } catch (error) {
        console.error("Error fetching counselors:", error);
      }
    };

    fetchData();
  }, [data]);

  useEffect(() => {
    const fetchDay = async () => {
      try {
        let fetchId = null;

        if (formState.type === "Next Appointment") {
          fetchId = data?.counsellor?._id;
        } else if (formState.type === "Refer With Session") {
          fetchId = formState.refer;
        }

        if (!fetchId) return;

        const response = await getDays(fetchId);
        const availableDays = response.data.map(
          (day: string) => dayNameToNumber[day]
        );
        setDays(availableDays);
      } catch (error) {
        console.error("Error fetching counselor availability:", error);
      }
    };

    fetchDay();
  }, [formState.type, formState.refer, data?.case_id?._id]);

  const filterDate = (date: Date) => {
    return days.includes(date.getDay());
  };
  const handleDateChange = async (date: Date | null) => {
    if (!date) return;

    const selectedDayNumber = date.getDay();
    const selectedDay = numberToDay[selectedDayNumber];

    if (!days.includes(selectedDayNumber)) return;

    setFormState((prev) => ({ ...prev, session_date: date }));

    try {
      let fetchId = null;

      if (formState.type === "Next Appointment") {
        fetchId = data?.counsellor?._id;
      } else if (formState.type === "Refer With Session") {
        fetchId = formState.refer;
      }

      if (!fetchId) return;
      const response = await getTimes(fetchId, {
        date: date.toLocaleDateString("en-CA"),
        day: selectedDay,
      });

      if (response) {
        setTimes(response.data);
      }
    } catch (error) {
      console.error("Error fetching available times:", error);
    }
  };
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []) as File[];

    // if (files.length > 0) {
    //   const imageUrl = URL.createObjectURL(files[0]);

    // }

    setFormState((prev) => ({
      ...prev,
      report: [...prev.report, ...files],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const formData: any = {
      details: formState.details,
      session_id: id,
      form_id: data?.form_id?._id,
      interactions: formState.interactions,
      report: [...(data?.report || [])],
    };

    try {
      if (formState.report.length > 0) {
        const uploadPromises = formState.report.map(async (file) => {
          const response = await upload(file);
          return response?.data;
        });

        const uploadResults = await Promise.all(uploadPromises);
        const successfulUploads = uploadResults.filter(
          (result) => result !== null
        );

        formData.report = [...formData.report, ...successfulUploads];
      }

      formData.concern_raised = showDatePicker
        ? data?.session_date
        : formState.concern_raised;

      if (!formState.type) {
        formData.isEditable = true;
      }
      if (formState.type === "Refer With Session") {
        formData.refer = formState.refer;
        formData.with_session = true;
      }
      if (formState.type === "Close Case") {
        formData.reason_for_closing = formState.reason_for_closing;
        formData.close = true;
      }
      if (formState.type === "Refer") {
        formData.refer = formState.refer;
      }
      if (
        formState.type === "Refer With Session" ||
        formState.type === "Next Appointment"
      ) {
        formData.date = formState.session_date;
        formData.time = formState.time;
      }

      await addEntry(data?.case_id?._id, formData);
      navigate("/counselor-session");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 shadow-lg">
        <h2 className="text-2xl font-semibold text-white">Session Details</h2>
      </div>
      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 dark:bg-form-input dark:text-white text-black">
            <h3 className="text-xl font-semibold  mb-4 ">Student Details</h3>
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
                value: moment(data?.case_id?.createdAt).format("MMMM DD, YYYY"),
              },
              {
                label: "Concern Raised Date",
                value: data?.case_id?.concern_raised
                  ? new Date(data.case_id.concern_raised)
                      .toISOString()
                      .split("T")[0]
                  : "",
              },
            ].map(({ label, value }, index) => (
              <div key={index} className="flex justify-between text-sm">
                <p>{label}:</p>
                <p className="font-medium capitalize">{value || "N/A"}</p>
              </div>
            ))}

            <div className="mt-4">
              <h4 className="text-lg font-semibold mb-2">Uploaded Reports:</h4>
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
                <p className="text-sm text-gray-500">No reports uploaded.</p>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 col-span-2 mt-8 dark:bg-form-input dark:text-white text-black">
          <h3 className="text-xl font-semibold mb-4">Reason for Counseling</h3>
          <p className="font-medium">{data?.description || "N/A"}</p>

          {data?.case_id?.referer_remark?.length > 0 && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-4">Referrer Remarks</h3>
              <div className="space-y-4">
                {data.case_id.referer_remark.map((item: any, index: number) => {
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
                })}
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 col-span-2 mt-8 dark:bg-form-input dark:text-white text-black">
          <h3 className="text-xl font-semibold mb-4">Session Details</h3>

          <div className="mb-6 p-4 border-b border-gray-300">
            <h4 className="text-lg font-semibold mb-2">Current Session</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: "Session ID", value: data?.session_id },
                { label: "Type of Counseling", value: data?.type },
                {
                  label: "Appointment Date",
                  value: data?.session_date
                    ? moment(data.session_date).format("MMMM DD, YYYY")
                    : "N/A",
                },
                {
                  label: "Appointment Time",
                  value: data?.session_time
                    ? `${data.session_time.start} - ${data.session_time.end}`
                    : "N/A",
                },
                { label: "Status", value: data?.status },
                { label: "Interactions", value: data?.interactions || "N/A" },

                { label: "Counsellor", value: data?.counsellor?.name || "N/A" },
                {
                  label: "Booked By",
                  value: data?.form_id?.referee
                    ? `${data.form_id.referee}${
                        data?.form_id?.refereeName
                          ? ` (${data.form_id.refereeName})`
                          : ""
                      }`
                    : "N/A",
                },
              ].map(({ label, value }, idx) => (
                <div key={idx} className="flex justify-between text-sm">
                  <p>{label}:</p>
                  <p className="font-medium capitalize">{value || "N/A"}</p>
                </div>
              ))}
            </div>
          </div>

          <h4 className="text-lg font-semibold mb-4">Past Sessions</h4>
          {data?.case_id?.session_ids?.filter(
            (session: any) => session.session_id !== data?.session_id
          ).length > 0 ? (
            data.case_id.session_ids
              .filter((session: any) => session.session_id !== data?.session_id)
              .map((session: any, index: number) => (
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
                          ? moment(session.session_date).format("MMMM DD, YYYY")
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
                    ].map(({ label, value }, idx) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <p>{label}:</p>
                        <p className="font-medium capitalize">
                          {value || "N/A"}
                        </p>
                      </div>
                    ))}

                    {session.case_details && (
                      <div className="col-span-1 md:col-span-2 mt-2">
                        <p className="text-sm font-semibold">Case Details:</p>
                        <p className="text-gray-700">{session.case_details}</p>
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
          <h3 className="text-xl font-semibold  mb-4">Add Entry</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="mb-2.5 block text-black dark:text-white">
                Date of Concern Raised
              </label>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={showDatePicker}
                  onChange={(e) => setShowDatePicker(e.target.checked)}
                  className="mr-2 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-black dark:text-white">
                  Same as Date of Appointment
                </span>
              </div>
            </div>
            {!showDatePicker && (
              <div className="mb-6">
                <label className="mb-2.5 block text-black dark:text-white">
                  Select Date of Concern
                </label>
                <input
                  type="date"
                  name="concern_raised"
                  value={
                    formState.concern_raised
                      ? formState.concern_raised.split("T")[0]
                      : ""
                  }
                  onChange={handleChange}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-[#a266f0] dark:text-white"
                />
              </div>
            )}
            <div className="mb-6">
              <label className="mb-2.5 block text-black dark:text-white">
                Interaction with Student/Parent/Teacher/Peers
              </label>
              <input
                type="text"
                name="interactions"
                value={formState.interactions}
                onChange={handleChange}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-[#a266f0] dark:text-white"
                placeholder="Add interactions"
              />
            </div>{" "}
            <div className="mb-6">
              <label className="mb-2.5 block text-black dark:text-white">
                Upload Reports
              </label>
              <input
                type="file"
                multiple
                onChange={handleFileUpload}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-[#a266f0] dark:text-white"
              />
            </div>
            <div className="mb-6">
              <label className="mb-2.5 block text-black dark:text-white">
                Case Details
              </label>
              <textarea
                name="details"
                value={formState.details}
                onChange={handleChange}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-[#a266f0] dark:text-white"
                placeholder="Add case details"
                rows={3}
              />
            </div>
            <div className="mb-6">
              <label className="mb-2.5 block text-black dark:text-white">
                Case Status
              </label>
              <select
                name="type"
                value={formState.type}
                onChange={(e) => {
                  const selectedValue = e.target.value;

                  setFormState((prev) => ({ ...prev, type: selectedValue }));
                }}
                className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-[#a266f0] active:border-[#a266f0] dark:border-form-strokedark dark:bg-form-input dark:focus:border-[#a266f0] ${
                  formState.type ? "text-black dark:text-white" : ""
                }`}
              >
                <option value="">Select Status</option>
                <option value="Refer With Session">Refer With Session</option>
                <option value="Refer">Refer</option>
                <option value="Next Appointment">Next Appointment</option>
                <option value="Close Case">Close Case</option>
              </select>
            </div>
            {(formState.type === "Refer With Session" ||
              formState.type === "Refer") && (
              <div className="mb-6">
                <label className="mb-2.5 block text-black dark:text-white">
                  Referred To
                </label>

                <select
                  name="refer"
                  value={formState.refer || ""}
                  onChange={(e) => {
                    const selectedValue = e.target.value;

                    setFormState((prev) => ({ ...prev, refer: selectedValue }));
                  }}
                  className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-[#a266f0] active:border-[#a266f0] dark:border-form-strokedark dark:bg-form-input dark:focus:border-[#a266f0] ${
                    formState.refer ? "text-black dark:text-white" : ""
                  }`}
                >
                  <option value="">Select a Counselor</option>
                  {counselorData?.map((plan: any) => (
                    <option key={plan._id} value={plan._id}>
                      {plan.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {formState.type === "Close Case" && (
              <div className="mb-6">
                <label className="mb-2.5 block text-black dark:text-white">
                  Reason For Closure
                </label>
                <textarea
                  name="reason_for_closing"
                  value={formState.reason_for_closing}
                  onChange={handleChange}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-[#a266f0] dark:text-white"
                  placeholder="Enter reason for closure"
                  rows={4}
                />
              </div>
            )}
            {(formState.type === "Next Appointment" ||
              formState.type === "Refer With Session") && (
              <>
                <div className="mb-6">
                  {" "}
                  <label className="mb-2.5 block text-black dark:text-white">
                    Date
                  </label>
                  <DatePicker
                    selected={formState.session_date}
                    onChange={handleDateChange}
                    filterDate={filterDate}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-[#a266f0] dark:text-white"
                    placeholderText="Select a valid date"
                    wrapperClassName="w-full"
                    popperClassName="!z-50"
                  />
                </div>
                <div className="mb-6">
                  {" "}
                  <label className="mb-2.5 block text-black dark:text-white">
                    Time
                  </label>
                  <select
                    value={formState.time ? JSON.stringify(formState.time) : ""}
                    onChange={(e) => {
                      const selectedTime = JSON.parse(e.target.value);
                      setFormState((prev) => ({
                        ...prev,
                        time: selectedTime,
                      }));
                    }}
                    className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-[#a266f0] active:border-[#a266f0] dark:border-form-strokedark dark:bg-form-input dark:focus:border-[#a266f0] ${
                      formState.time ? "text-black dark:text-white" : ""
                    }`}
                  >
                    <option value="" disabled>
                      Select Time
                    </option>
                    {times.map((slot, index) => (
                      <option key={index} value={JSON.stringify(slot)}>
                        {slot.start} - {slot.end}
                      </option>
                    ))}
                  </select>
                </div>

                {formState.report.length > 0 && (
                  <div className="mt-2">
                    <p className=" font-medium mb-2">Selected Reports:</p>
                    <ul className="list-disc list-inside ">
                      {formState.report.map((file, index) => (
                        <li key={index}>{file.name}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}
            <div className="flex justify-end space-x-4">
              <button className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500 transition duration-200">
                Cancel
              </button>
              <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-200">
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddEntry;
