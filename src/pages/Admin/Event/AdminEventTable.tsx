import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import moment from "moment-timezone";
import { Event } from "../../../types/event";
import { deleteEvent, getEvent, getEventById } from "../../../api/eventApi";
import Loader from "../../../components/Loader";
interface EventTableProps {
  searchValue: string;
}

const AdminEventTable: React.FC<EventTableProps> = ({ searchValue }) => {
  const [packageData, setPackageData] = useState<Event[]>([]);
  const VITE_APP_FILE_URL = "https://able.iswkoman.com/images/";
  const [isChange, setIsChange] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [view, setView] = useState(false);
  const [data, setData] = useState({
    title: "",
    date: "",
    venue: "",
    creator: "",
    requisition_image: "",
    guest: "",
    details: "",
    type: "",
    requisition_description: "",
  });
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const handleOpen = (id: string) => {
    setSelectedId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedId(null);
  };
  const handleView = async (id: string) => {
    try {
      const response = await getEventById(id);
      const value = response.data;

      if (value) {
        setData({
          title: value.title || "",
          date: value.date || "",
          venue: value.venue || "",
          creator: value.creator || "",
          requisition_image: value.requisition_image || "",
          guest: value.guest || "",
          type: value.type || "",
          details: value.details || "",
          requisition_description: value.requisition_description || "",
        });
      }
      setView(true);
    } catch (error) {
      console.error("Failed to fetch value:", error);
    }
  };
  const handleCloseView = () => {
    setView(false);
  };
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getEvent({
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
  }, [isChange, searchValue, currentPage, itemsPerPage]);
  const handleDelete = async () => {
    try {
      await deleteEvent(selectedId!);
      setIsChange((prevState) => !prevState);
      handleClose();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const navigate = useNavigate();
  const totalPages = Math.ceil(totalCount / itemsPerPage); // Calculate total pages

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  return (
    <div className="rounded-sm border border-stroke bg-white  px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      {loading ? (
        <Loader />
      ) : (
        <>
          {" "}
          <div className="max-w-full overflow-x-auto">
            <table className={`w-full table-auto ${open ? "blur-sm" : ""}`}>
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                    Title
                  </th>
                  <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                    Date
                  </th>
                  <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                    Venue
                  </th>
                  <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                    Creator
                  </th>

                  <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {packageData.length > 0 ? (
                  packageData.map((packageItem, key) => (
                    <tr key={key}>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark xl:pl-11">
                        <p className="text-black dark:text-white">
                          {packageItem.title}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {moment(packageItem.date).format("DD-MM-YYYY")}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {packageItem.venue}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {packageItem.creator}
                        </p>
                      </td>

                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <div className="flex items-center space-x-3.5">
                          <button
                            className="hover:text-primary"
                            onClick={() => handleView(packageItem._id)}
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
                          <button
                            onClick={() => handleOpen(packageItem._id)}
                            className="hover:text-danger dark:text-danger"
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
                                d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                                fill=""
                              />
                              <path
                                d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
                                fill=""
                              />
                              <path
                                d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
                                fill=""
                              />
                              <path
                                d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
                                fill=""
                              />
                            </svg>
                          </button>
                          <button
                            className="hover:text-primary dark:text-green-700"
                            onClick={() =>
                              navigate("/add-event", {
                                state: {
                                  id: packageItem._id,
                                  editMode: true,
                                },
                              })
                            }
                          >
                            <svg
                              className="fill-current"
                              width="18"
                              height="18"
                              viewBox="0 0 18 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M13.232 2.768a1 1 0 0 1 1.416 0l2.5 2.5a1 1 0 0 1 0 1.416L6.865 13.571a1 1 0 0 1-.366.211l-2.142.643a1 1 0 0 1-1.224-1.224l.643-2.142a1 1 0 0 1 .211-.366L13.232 2.768z" />
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
            {open && (
              <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                <div className="bg-white rounded-lg shadow-lg w-96 p-6 dark:bg-graydark">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Confirm Deletion
                  </h2>
                  <p className="mt-4 text-gray-600">
                    Are you sure you want to delete this Event? This action
                    cannot be undone.
                  </p>
                  <div className="mt-6 flex justify-end space-x-4">
                    <button
                      onClick={handleClose}
                      className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleDelete}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}
            {view && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 mt-16">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-2xl p-6 relative min-h-[500px] max-h-[80vh] overflow-y-auto dark:bg-strokedark dark:text-white">
                  <button
                    onClick={handleCloseView}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
                  >
                    ✖
                  </button>

                  <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
                    {data?.title}
                  </h2>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Date
                      </p>
                      <p className="text-gray-700 dark:text-gray-200 font-medium">
                        {moment(data?.date).format("MMMM DD, YYYY")}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Venue
                      </p>
                      <p className="text-gray-700 dark:text-gray-200 font-medium">
                        {data?.venue}
                      </p>
                    </div>
                    {data?.type && (
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Type
                        </p>
                        <p className="text-gray-700 dark:text-gray-200 font-medium">
                          {data?.type}
                        </p>
                      </div>
                    )}
                    {data?.creator && (
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Creator
                        </p>
                        <p className="text-gray-700 dark:text-gray-200 font-medium">
                          {data?.creator}
                        </p>
                      </div>
                    )}
                    {data?.guest && (
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Guest
                        </p>
                        <p className="text-gray-700 dark:text-gray-200 font-medium">
                          {data?.guest}
                        </p>
                      </div>
                    )}
                  </div>

                  {data?.requisition_image && (
                    <div className="mt-4">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Requisition Image
                      </p>
                      <div className="w-full flex justify-center items-center h-40 rounded-md overflow-hidden mt-2">
                        <img
                          src={`${VITE_APP_FILE_URL}${data?.requisition_image}`}
                          alt="Requisition"
                          className="max-w-full max-h-full object-contain rounded-lg bg-black"
                        />
                      </div>
                    </div>
                  )}

                  <div className="mt-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Details
                    </p>
                    <p className="text-gray-700 dark:text-gray-200 font-medium">
                      {data?.details}
                    </p>
                  </div>
                  {data?.requisition_description && (
                    <div className="mt-4">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Requisition Description
                      </p>
                      <p className="text-gray-700 dark:text-gray-200 font-medium">
                        {data?.requisition_description}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          <div
            className={`mt-4 flex justify-between items-center ${
              open ? "blur-sm" : ""
            }`}
          >
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
  );
};

export default AdminEventTable;
