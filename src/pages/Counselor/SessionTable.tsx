import { useEffect, useState } from "react";
import moment from "moment";
import { Session } from "../../types/session";
import {
  acceptSession,
  cancelSession,
  getSessions,
  rescheduleSession,
} from "../../api/sessionApi";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getDays, getTimes } from "../../api/timeApi";
import { useNavigate } from "react-router-dom";
import { FaEllipsisV } from "react-icons/fa";
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
const SessionTable: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Pending for Approval");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [packageData, setPackageData] = useState<Session[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [times, setTimes] = useState<{ start: string; end: string }[]>([]);

  const [isChange, setIsChange] = useState(false);
  const [accept, setAccept] = useState(false);
  const [cancel, setCancel] = useState(false);
  const [reason, setReason] = useState("");
  const [reschedule, setReschedule] = useState(false);
  const [days, setDays] = useState<number[]>([]);
  const [formState, setFormState] = useState({
    session_date: null as Date | null,
    session_time: "",
    c_reschedule_remark: "",
  });
  const handleTabChange = (a: string) => {
    setActiveTab(a as any);
  };

  const handleActionsClick = (e: React.MouseEvent, sessionId: string) => {
    const button = e.currentTarget as HTMLElement;
    const rect = button.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    setModalPosition({
      top: rect.bottom + scrollTop,
      left: rect.left,
    });
    setOpenMenuId(openMenuId === sessionId ? null : sessionId);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        openMenuId &&
        !(event.target as HTMLElement).closest(".actions-menu")
      ) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openMenuId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let statusToSend = "";

        switch (activeTab) {
          case "Pending for Approval":
            statusToSend = "pending";
            break;
          case "Upcomming Sessions":
            statusToSend = "progress";
            break;
          case "Closed":
            statusToSend = "completed";
            break;
          case "Cancelled":
            statusToSend = "cancelled";
            break;
          case "All Sessions":
            statusToSend = "";
            break;
          default:
            statusToSend = activeTab;
        }

        const response = await getSessions({
          searchQuery: "",
          page: currentPage,
          limit: itemsPerPage,
          ...(statusToSend ? { status: statusToSend } : {}),
        });

        setTotalCount(response.totalCount);
        if (response?.data) {
          setPackageData(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, [currentPage, itemsPerPage, isChange, activeTab]);

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  const handleAccept = (id: string) => {
    setSelectedId(id);
    setAccept(true);
  };
  const handleCloseAccept = () => {
    setSelectedId(null);
    setAccept(false);
  };
  const handleCancel = (id: string) => {
    setSelectedId(id);
    setCancel(true);
  };
  const handleCloseCancel = () => {
    setSelectedId(null);
    setReason("");
    setCancel(false);
  };
  const counselorId = packageData[0]?.counsellor?._id;

  const handleReschedule = async (id: string) => {
    setSelectedId(id);
    try {
      const response = await getDays(counselorId!);
      const availableDays = response.data.map(
        (day: string) => dayNameToNumber[day]
      );
      setDays(availableDays);
      setReschedule(true);
    } catch (error) {
      console.error("Error fetching counselor availability:", error);
    }
  };
  const filterDate = (date: Date) => {
    return days.includes(date.getDay());
  };
  const handleCloseReschedule = () => {
    setSelectedId(null);
    setFormState({
      session_date: null,
      session_time: "",
      c_reschedule_remark: "",
    });
    setReschedule(false);
  };

  const handleAcceptSession = async () => {
    try {
      await acceptSession(selectedId!);
      setIsChange((prevState) => !prevState);
      handleCloseAccept();
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  const handleCancelSession = async () => {
    try {
      await cancelSession(selectedId!, { c_cancel_remark: reason });
      setIsChange((prevState) => !prevState);
      handleCloseCancel();
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  const handleDateChange = async (date: Date | null) => {
    if (!date) return;

    const selectedDayNumber = date.getDay();
    const selectedDay = numberToDay[selectedDayNumber];

    if (!days.includes(selectedDayNumber)) return;

    setFormState((prev) => ({ ...prev, session_date: date }));

    try {
      const response = await getTimes(counselorId, {
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
  const handleRescheduleSession = async () => {
    console.log("dds", formState);

    try {
      await rescheduleSession(selectedId!, formState);
      setReschedule(false);
      setFormState({
        session_date: null,
        session_time: "",
        c_reschedule_remark: "",
      });
      setIsChange((prevState) => !prevState);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className={`relative`}>
      {openMenuId && (
        <div
          className={`actions-menu fixed z-50 w-40 bg-white shadow-lg rounded-md border border-gray-200 ${
            accept || cancel || reschedule ? "hidden" : ""
          }`}
          style={{
            top: `${modalPosition.top}px`,
            left: `${modalPosition.left}px`,
          }}
        >
          <div className="py-1">
            {packageData
              .find((item) => item._id === openMenuId)
              ?.status.includes("progress") ? (
              <button
                onClick={() => navigate(`/session/entry/${openMenuId}`)}
                className="w-full text-left px-4 py-2 text-sm text-green-600 hover:bg-gray-50"
              >
                Add Entry
              </button>
            ) : (
              <>
                <button
                  onClick={() => handleAccept(openMenuId)}
                  className="w-full text-left px-4 py-2 text-sm text-green-600 hover:bg-gray-50"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleReschedule(openMenuId)}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                >
                  Reschedule
                </button>
                <button
                  onClick={() => handleCancel(openMenuId)}
                  className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      )}

      <div className="flex gap-4 mb-6 mt-6 bg-white p-3 rounded-lg shadow-xl">
        {[
          "Pending for Approval",
          "Upcomming Sessions",
          "Closed",
          "Cancelled",
          "All Sessions",
        ].map((tabs) => (
          <button
            key={tabs}
            className={`py-2 px-4 rounded ${
              activeTab === tabs
                ? "bg-primary text-white dark:bg-primary dark:text-white"
                : "bg-gray-200 text-black dark:bg-graydark dark:text-white"
            }`}
            onClick={() => handleTabChange(tabs)}
          >
            {tabs.charAt(0).toUpperCase() + tabs.slice(1)}
          </button>
        ))}
      </div>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 mx-4">
        <div className="max-w-full overflow-x-auto">
          <table
            className={`w-full table-auto ${
              accept || cancel || reschedule ? "blur-sm" : ""
            }`}
          >
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Session ID
                </th>
                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Student Name
                </th>
                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Session Date
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  Session Time
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  Session Name
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  Counselor Name
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  Booked By
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  Counselor Type
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  Status
                </th>
                <th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {packageData?.map((packageItem, key) => (
                <tr key={key}>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <div
                      className="font-medium text-blue-600  cursor-pointer"
                      onClick={() => {
                        navigate(`/session/${packageItem._id}`);
                      }}
                    >
                      {" "}
                      <h5 className="font-medium text-blue-600  hover:underline  dark:text-blue-300 xl:pl-6">
                        {packageItem.session_id}
                      </h5>
                    </div>
                  </td>

                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark xl:pl-11">
                    <p className="text-black dark:text-white">
                      {packageItem.user_name}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark xl:pl-11">
                    <p className="text-black dark:text-white">
                      {moment(packageItem.session_date).format("DD-MM-YYYY")}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {packageItem.session_time?.start} -{" "}
                      {packageItem.session_time?.end}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {packageItem.type}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {packageItem.counsellor_name}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {packageItem.referee}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {packageItem.type}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark capitalize">
                    <p
                      className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                        packageItem.status === "progress"
                          ? "bg-green-500 text-green-600"
                          : packageItem.status === "cancelled"
                          ? "bg-red-500 text-red-600"
                          : packageItem.status === "pending"
                          ? "bg-yellow-500 text-yellow-600"
                          : packageItem.status === "reschedule"
                          ? "bg-violet-500 text-gray-600"
                          : packageItem.status === "completed"
                          ? "bg-blue-500 text-blue-600"
                          : "bg-gray-500 text-gray-700"
                      }`}
                    >
                      {packageItem.status === "progress"
                        ? "Ongoing"
                        : packageItem.status}
                    </p>
                  </td>

                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    {packageItem.status !== "completed" &&
                      packageItem.status !== "cancelled" && (
                        <button
                          onClick={(e) =>
                            handleActionsClick(e, packageItem._id)
                          }
                          className="px-4 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-md text-gray-700 focus:outline-none flex items-center"
                        >
                          <FaEllipsisV className="text-sm" />
                        </button>
                      )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {accept && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 backdrop-blur-sm">
              <div className="bg-white rounded-lg shadow-lg w-96 p-6 dark:bg-graydark">
                <h2 className="text-xl font-semibold text-gray-800">
                  Confirm Session Acceptance
                </h2>
                <p className="mt-4 text-gray-600">
                  Are you sure you want to accept this session? This action
                  cannot be undone.
                </p>
                <div className="mt-6 flex justify-end space-x-4">
                  <button
                    onClick={handleCloseAccept}
                    className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAcceptSession}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  >
                    Accept
                  </button>
                </div>
              </div>
            </div>
          )}
          {cancel && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 backdrop-blur-sm">
              <div className="bg-white rounded-lg shadow-lg w-96 p-6 dark:bg-graydark">
                <h2 className="text-xl font-semibold text-gray-800">
                  Confirm Session Cancellation
                </h2>
                <p className="mt-4 text-gray-600">
                  Are you sure you want to cancel this session? Please provide a
                  reason for cancellation.
                </p>

                <textarea
                  className="w-full mt-4 p-2 border rounded text-gray-700 dark:bg-gray-800 dark:text-white"
                  placeholder="Enter cancellation reason..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                />

                <div className="mt-6 flex justify-end space-x-4">
                  <button
                    onClick={handleCloseCancel}
                    className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCancelSession}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    disabled={!reason.trim()}
                  >
                    Confirm Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
          {reschedule && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 backdrop-blur-sm">
              <div className="bg-white rounded-lg shadow-lg w-96 p-6 dark:bg-graydark">
                <h2 className="text-xl font-semibold text-gray-800">
                  Confirm Session Reschedule
                </h2>
                <p className="mt-4 text-gray-600">
                  Please select a new date and time slot for rescheduling this
                  session.
                </p>

                <div className="w-full mt-4">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Session Date
                  </label>
                  <DatePicker
                    selected={formState.session_date}
                    onChange={handleDateChange}
                    filterDate={filterDate}
                    className="w-full border border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-[#a266f0] dark:text-white"
                    placeholderText="Select a valid date"
                    wrapperClassName="w-full"
                    popperClassName="!z-50"
                  />
                </div>
                <div className="w-full mt-4">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Available Time Slots
                  </label>
                  <select
                    value={
                      formState.session_time
                        ? JSON.stringify(formState.session_time)
                        : ""
                    }
                    onChange={(e) => {
                      const selectedTime = JSON.parse(e.target.value);
                      setFormState((prev) => ({
                        ...prev,
                        session_time: selectedTime,
                      }));
                    }}
                    className="w-full border border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-[#a266f0] dark:text-white"
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

                <div className="w-full mt-4">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Reschedule Reason
                  </label>
                  <textarea
                    className="w-full p-2 border rounded text-gray-700 dark:bg-gray-800 dark:text-white"
                    placeholder="Enter reschedule reason..."
                    value={formState.c_reschedule_remark}
                    onChange={(e) =>
                      setFormState((prev) => ({
                        ...prev,
                        c_reschedule_remark: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="mt-6 flex justify-end space-x-4">
                  <button
                    onClick={handleCloseReschedule}
                    className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleRescheduleSession}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Confirm Reschedule
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="mt-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-gray-700 dark:text-violet-100">
              Items per page:
            </span>
            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="px-2 py-1 border rounded text-gray-700 dark:bg-transparent dark:text-violet-100"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded ${
                currentPage === 1
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed dark:text-violet-100"
                  : "bg-violet-500 text-white dark:text-violet-100"
              }`}
            >
              Previous
            </button>
            <div className="flex space-x-2">
              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-1 rounded ${
                      page === currentPage
                        ? "bg-violet-500 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
            </div>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded ${
                currentPage === totalPages
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed dark:text-violet-100"
                  : "bg-violet-500 text-white dark:text-violet-100"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionTable;
