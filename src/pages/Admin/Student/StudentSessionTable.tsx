import { useEffect, useState } from "react";
import { Session } from "../../../types/session";
import { getSessionByStudent } from "../../../api/sessionApi";
import moment from "moment";
import Loader from "../../../components/Loader";
import { useNavigate } from "react-router-dom";

interface CounselorTableProps {
  searchValue: string;
  id: string;
}

const StudentSessionTable: React.FC<CounselorTableProps> = ({
  searchValue,
  id,
}) => {
  const [packageData, setPackageData] = useState<Session[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
const navigate=useNavigate();
  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getSessionByStudent(id, {
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
  }, [id, searchValue, currentPage, itemsPerPage]); // Depend on id

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  return (
    <div className="rounded-sm border border-stroke bg-white  px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 mx-4">
      {loading ? (
        <Loader />
      ) : (
        <>
          {" "}
          <div className="max-w-full overflow-x-auto">
            <table className={`w-full table-auto  `}>
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                    Session No
                  </th> <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                    Session Date
                  </th>
                  <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                    Session Time
                  </th>

                  <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                    Counselor Name
                  </th>
                  <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                    Counseling Type
                  </th>
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
                      </td> <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark xl:pl-11">
                        <p className="text-black dark:text-white">
                          {moment(packageItem.session_date).format(
                            "DD-MM-YYYY"
                          )}
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
                          {packageItem.counsellor_name}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {packageItem.counsellor_type[0]},{" "}
                          {packageItem.counsellor_type[1]}
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
          </div>{" "}
        </>
      )}
    </div>
  );
};

export default StudentSessionTable;
