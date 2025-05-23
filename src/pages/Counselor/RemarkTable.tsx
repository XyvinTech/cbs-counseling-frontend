import { useEffect, useState } from "react";
import moment from "moment";
import { Session } from "../../types/session";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { FaEllipsisV } from "react-icons/fa";
import { getRemarks } from "../../api/sessionApi";
import { Case } from "../../types/case";
import Loader from "../../components/Loader";
interface RemarkTableProps {
  searchValue: string;
}
const RemarkTable: React.FC<RemarkTableProps> = ({ searchValue }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [packageData, setPackageData] = useState<Case[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  const handleActionsClick = (e: React.MouseEvent, sessionId: string) => {
    console.log(sessionId);
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
      setLoading(true);
      try {
        const response = await getRemarks({
          searchQuery: searchValue,
          page: currentPage,
          limit: itemsPerPage,
        });
        setTotalCount(response.totalCount);
        if (response?.data) {
          setPackageData(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, itemsPerPage, searchValue]);
  useEffect(() => {
    if (searchValue && searchValue.trim() !== '') {
      setCurrentPage(1);
    }
  }, [searchValue]);
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className={`relative`}>
      {openMenuId && (
        <div
          className={`actions-menu fixed z-50 w-40 bg-white shadow-lg rounded-md border border-gray-200`}
          style={{
            top: `${modalPosition.top}px`,
            left: `${modalPosition.left}px`,
          }}
        >
          <div className="py-1">
            <button
              onClick={() => navigate(`/session/remark/${openMenuId}`)}
              className="w-full text-left px-4 py-2 text-sm text-green-600 hover:bg-gray-50"
            >
              Add Remark
            </button>
          </div>
        </div>
      )}

      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 mx-4">
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
                      Case ID
                    </th>
                    <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                      Student Name
                    </th>
                    <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                      Type
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
                  {packageData.length > 0 ? (
                    packageData?.map((packageItem, key) => (
                      <tr key={key}>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <div
                            className="font-medium text-blue-600  cursor-pointer"
                            onClick={() => {
                              navigate(`/counselor-case/${packageItem._id}`);
                            }}
                          >
                            {" "}
                            <h5 className="font-medium text-blue-600  hover:underline  dark:text-blue-300 xl:pl-6">
                              {packageItem.case_id}
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
                            {packageItem.couselling_type}
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
                          {packageItem.status !== "completed" && (
                            <button
                              onClick={(e) =>
                                handleActionsClick(
                                  e,
                                  packageItem.session_ids[0]
                                )
                              }
                              className="px-4 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-md text-gray-700 focus:outline-none flex items-center"
                            >
                              <FaEllipsisV className="text-sm" />
                            </button>
                          )}
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
            <div className="mt-4 flex justify-between items-center">
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
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RemarkTable;
