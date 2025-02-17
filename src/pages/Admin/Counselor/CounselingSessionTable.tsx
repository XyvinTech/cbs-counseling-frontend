import { useEffect, useState } from "react";
import { Session } from "../../../types/session";
import { getSessionByCounselor } from "../../../api/sessionApi";
import { useParams } from "react-router-dom";
import moment from "moment";
interface CounselorTableProps {
  searchValue: string;
}

const CounselingSessionTable: React.FC<CounselorTableProps> = ({
  searchValue,
}) => {
  const [packageData, setPackageData] = useState<Session[]>([]);
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getSessionByCounselor(id || "", {
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
      }
    };

    fetchData();
  }, [searchValue, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  return (
    <div className="rounded-sm border border-stroke bg-white  px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 mx-4">
      <div className="max-w-full overflow-x-auto">
        <table className={`w-full table-auto  `}>
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                Session No
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Student Name
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
            </tr>
          </thead>
          <tbody>
            {packageData.length > 0 ? (
              packageData?.map((packageItem, key) => (
                <tr key={key}>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark xl:pl-11">
                    <p className="text-black dark:text-white">
                      {packageItem.session_id}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {packageItem.student_name}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {packageItem.counsellor_type}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
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
                          : "bg-gray-500 text-gray-700"
                      }`}
                    >
                      {packageItem.status === "progress"
                        ? "Ongoing"
                        : packageItem.status}
                    </p>
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
      <div className={`mt-4 flex justify-between items-center `}>
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
        <div className="flex space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded ${
              currentPage === 1
                ? "bg-gray-200 text-gray-500 cursor-not-allowed dark:text-blue-100"
                : "bg-blue-500 text-white dark:via-blue-100"
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
                      ? "bg-blue-500 text-white"
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
                ? "bg-gray-200 text-gray-500 cursor-not-allowed dark:text-blue-100"
                : "bg-blue-500 text-white dark:text-blue-100"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default CounselingSessionTable;
