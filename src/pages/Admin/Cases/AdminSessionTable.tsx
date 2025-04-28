import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSessionByCase } from "../../../api/sessionApi";
import { Session } from "../../../types/session";
import moment from "moment";
import Loader from "../../../components/Loader";
interface SessionTableProps {
  searchValue: string;
  onStudentChange: (studentName: string) => void;
}

const AdminSessionTable: React.FC<SessionTableProps> = ({ searchValue,onStudentChange }) => {
  const [packageData, setPackageData] = useState<Session[]>([]);
  const { id } = useParams();
  const VITE_APP_FILE_URL ="https://able.iswkoman.com/images/"
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedCase, setSelectedCase] = useState<Session | null>(null);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getSessionByCase(id || "", {
          searchQuery: searchValue,
          page: currentPage,
          limit: itemsPerPage,
        });
        setTotalCount(response.totalCount);
        if (response?.data) {
          setPackageData(response.data);
          const studentName = response.data[0]?.form_id?.name || "report";
          onStudentChange(studentName);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [, searchValue, currentPage, itemsPerPage]);
  useEffect(() => {
    if (searchValue && searchValue.trim() !== '') {
      setCurrentPage(1);
    }
  }, [searchValue]);
const student=packageData[0]?.form_id?.name
  const navigate = useNavigate();
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  const handleView = (caseItem: Session) => {
    setOpen(true);
    setSelectedCase(caseItem);
  };
  type StatusColorMap = {
    [key in
      | "progress"
      | "cancelled"
      | "pending"
      | "reschedule"
      | "completed"
      | "referred"]: string;
  };

  const getStatusColor = (status: string) => {
    const statusColors: StatusColorMap = {
      progress: "bg-emerald-100 text-emerald-800",
      cancelled: "bg-rose-100 text-rose-800",
      pending: "bg-amber-100 text-amber-800",
      reschedule: "bg-sky-100 text-sky-800",
      completed: "bg-indigo-100 text-indigo-800",
      referred: "bg-violet-100 text-violet-800",
    };

    return status in statusColors
      ? statusColors[status as keyof StatusColorMap]
      : "bg-gray-100 text-gray-800";
  };
  return (
    <div className="rounded-sm border border-stroke bg-white  px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      {loading ? (
        <Loader />
      ) : (
        <>
          {" "}
          <div className="max-w-full overflow-x-auto">
            <table className={`w-full table-auto `}>
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                    Session ID
                  </th>
                  <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                    Student Name
                  </th>
                  <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                    Counselor Name
                  </th>
                  <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                    Type
                  </th>
                  <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                    Session Date
                  </th>
                  <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                    Session Time
                  </th>
                  <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                    Status
                  </th>
                  <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white"></th>
                </tr>
              </thead>
              <tbody>
                {packageData.length > 0 ? (
                  packageData?.map((packageItem, key) => (
                    <tr key={key}>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark xl:pl-11">
                        <div
                          className="font-medium text-blue-600  cursor-pointer"
                          onClick={() => {
                            navigate(`/session/${packageItem._id}`);
                          }}
                        >
                          {" "}
                          <h5 className="font-medium text-blue-600  hover:underline  dark:text-blue-300">
                            {packageItem.session_id}
                          </h5>
                        </div>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {packageItem.user_name}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {packageItem.counsellor_name}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {packageItem.type}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {moment(packageItem.session_date).format(
                            "DD-MM-YYYY"
                          )}
                        </p>
                      </td>{" "}
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {packageItem.session_time?.start}-
                          {packageItem.session_time?.end}
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
                              ? "bg-blue-500 text-gray-600"
                              : packageItem.status === "completed"
                              ? "bg-blue-500 text-blue-600"
                              : packageItem.status === "referred"
                              ? "bg-purple-500 text-purple-600"
                              : "bg-gray-500 text-gray-700"
                          }`}
                        >
                          {packageItem.status === "progress"
                            ? "Ongoing"
                            : packageItem.status}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <div className="flex items-center space-x-3.5">
                          <button
                            className="hover:text-primary"
                            onClick={() => handleView(packageItem)}
                          >
                            <svg
                              className="fill-current"
                              width="18"
                              height="18"
                              viewBox="0 0 18 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
                                fill=""
                              />
                              <path
                                d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
                                fill=""
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="text-center py-5 text-gray-500 dark:text-gray-300 dark:text-white"
                    >
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className={`mt-4 flex justify-between items-center`}>
            <div className="flex items-center space-x-2">
              <span className="text-gray-700 dark:text-blue-100">
                Items per page:
              </span>
              <select
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                className="px-2 py-1 border rounded text-gray-700 dark:bg-transparent dark:text-blue-100"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>
            <div className="flex items-center space-x-4 dark:text-blue-100">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded transition ${
                  currentPage === 1
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                Previous
              </button>

              <span className="text-gray-800 dark:text-gray-200">
                Page <strong>{currentPage}</strong> of{" "}
                <strong>{totalPages}</strong>
              </span>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded transition ${
                  currentPage === totalPages
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                Next
              </button>
            </div>

            {selectedCase && open && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 mt-16">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-2xl p-6 relative min-h-[500px] max-h-[80vh] overflow-y-auto dark:bg-strokedark dark:text-white">
              
                  <div className="flex justify-between items-center p-6 border-b">
                    <div className="flex items-center space-x-4">
                      <h2 className="text-2xl font-bold text-gray-800">
                        Session Details
                      </h2>
                      <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                        Session ID: {selectedCase?.session_id}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        setOpen(false);
                        setSelectedCase(null);
                      }}
                      className="text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>

                  <div className="p-6 space-y-6">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Student</p>
                        <p className="font-semibold text-gray-800">
                          {selectedCase?.user_name}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Counselor</p>
                        <p className="font-semibold text-gray-800">
                          {selectedCase?.counsellor_name}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Status</p>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                            selectedCase?.status
                          )}`}
                        >
                          {selectedCase?.status}
                        </span>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Case Type</p>
                        <p className="font-medium text-gray-800">
                          {selectedCase?.type}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">
                          Session Date
                        </p>
                        <p className="font-medium text-gray-800">
                          {moment(selectedCase?.session_date).format(
                            "MMMM DD, YYYY"
                          )}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">
                          Session Time
                        </p>
                        <p className="font-medium text-gray-800">
                          {selectedCase?.session_time?.start} -{" "}
                          {selectedCase?.session_time?.end}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">
                          Interactions
                        </p>
                        <p className="font-medium text-gray-800">
                          {selectedCase?.interactions}
                        </p>
                      </div>
                    </div>

                   
                    <div className="border-t pt-4 mt-4">
                      <h3 className="text-lg font-semibold mb-3 text-gray-800">
                        Case Description
                      </h3>
                      <p className="text-gray-700">
                        {selectedCase?.description}
                      </p>
                    </div>
                    <div className="border-t pt-4 mt-4">
                      <h3 className="text-lg font-semibold mb-3 text-gray-800">
                        Case Details
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500 mb-1">
                            Student Details
                          </p>

                          <p className="text-sm text-gray-600">
                            Class: {selectedCase?.form_id?.class}
                            <br />
                            GR Number: {selectedCase?.form_id?.grNumber}
                            <br />
                            Email: {selectedCase?.form_id?.email}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">
                            Additional Information
                          </p>
                          <p className="font-medium text-gray-800">
                            Referee: {selectedCase?.form_id?.referee}
                          </p>
                          <p className="text-sm text-gray-600">
                            Created:{" "}
                            {moment(selectedCase?.form_id?.createdAt).format(
                              "MMMM DD, YYYY"
                            )}
                          </p>
                        </div>
                      </div>
                    </div>

                    {selectedCase?.report && selectedCase?.report.length > 0 && (
                      <div className="border-t pt-4 mt-4">
                        <h3 className="text-lg font-semibold mb-3 text-gray-800">
                          Attachments
                        </h3>
                        <div className="space-y-2">
                          {selectedCase?.report?.map((file, index) => (
                            <div
                              key={index}
                              className="bg-gray-50 p-3 rounded-md flex items-center justify-between"
                            >
                              <p className="text-gray-700">{file}</p>
                              <a
                                 href={`${VITE_APP_FILE_URL}${file}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800"
                              >
                                Download
                              </a>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>{" "}
        </>
      )}
    </div>
  );
};

export default AdminSessionTable;
