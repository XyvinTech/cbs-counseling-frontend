import { useEffect, useState } from "react";
import { Case } from "../../types/case";
import { getCase } from "../../api/sessionApi";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
interface CaseTableProps {
  searchValue: string;
}
const CaseTable: React.FC<CaseTableProps> = ({ searchValue }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Active Cases");
  const handleTabChange = (a: string) => {
    setActiveTab(a as any);
  };
  const [packageData, setPackageData] = useState<Case[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let statusToSend = "";

        switch (activeTab) {
          case "Active Cases":
            statusToSend = "progress";
            break;
          case "Referred":
            statusToSend = "referred";
            break;
          case "Closed":
            statusToSend = "completed";
            break;
          case "Cancelled":
            statusToSend = "cancelled";
            break;
          case "All Cases":
            statusToSend = "";
            break;
          default:
            statusToSend = activeTab;
        }
        const response = await getCase({
          searchQuery: searchValue,
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
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, itemsPerPage, activeTab, searchValue]);
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
    <>
      {" "}
      <div className="flex gap-4 mb-6 mt-6 bg-white p-3   rounded-lg shadow-xl">
        {["Active Cases", "Closed", "Cancelled", "Referred", "All Cases"].map(
          (tabs) => (
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
          )
        )}
      </div>
      <div className="rounded-sm border border-stroke bg-white  px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 mx-4">
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="max-w-full overflow-x-auto">
              <table className={`w-full table-auto  `}>
                <thead>
                  <tr className="bg-gray-2 text-left dark:bg-meta-4">
                    <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                      Case ID
                    </th>
                    <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                      Session Count
                    </th>
                    <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                      Student Name
                    </th>

                    <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                      Counseling Type
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
                            {packageItem.session_count}
                          </p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark xl:pl-11">
                          <p className="text-black dark:text-white">
                            {packageItem.form_id?.name}
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
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CaseTable;
