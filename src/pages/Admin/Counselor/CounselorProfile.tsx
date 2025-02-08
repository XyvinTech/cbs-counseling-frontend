import { BsFillEnvelopeFill, BsFillTelephoneFill } from "react-icons/bs";
import userGirl from "../../../images/user/user-girl.png";
import userBoy from "../../../images/user/user-boy.png";
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserById } from "../../../api/userApi";
import Breadcrumb from "../../../components/Breadcrumbs/Breadcrumb";
import CounselingSessionTable from "./CounselingSessionTable";
import CounselorCaseTable from "./CounselorCaseTable";

const CounselorProfile = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("Counseling Sessions");
  const handleTabChange = (a: string) => {
    setActiveTab(a as any);
  };
  const [data, setData] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    counsellorType: [],
    gender: "",
  });
  const location = useLocation();
  const { state } = location;
  const name = state?.name;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUserById(id || "");
        if (response?.data) {
          setData(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch members:", error);
      }
    };

    if (id) fetchUser();
  }, [id]);

  return (
    <>
      <Breadcrumb pageName={name} titleName="Counselor" />
      <div className="flex justify-center items-center ">
        <div className="w-full  mx-4 bg-white rounded-lg shadow-xl overflow-hidden dark:bg-gray-700">
          <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-600">
            <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
              <div className="relative h-32 w-32 rounded-full bg-white p-2 shadow-lg">
                {data?.gender === "male" ? (
                  <img src={userBoy} alt="profile" className="rounded-full" />
                ) : (
                  <img
                    src={userGirl}
                    alt="profilePic"
                    className="rounded-full"
                  />
                )}
              </div>
            </div>
          </div>
          <div className="px-6 pt-20 pb-6 text-center">
            <h3 className="mb-2 text-3xl font-bold text-gray-800 dark:text-white">
              {data?.name}
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {data?.designation}
            </p>
            <div className="mt-4 mb-6">
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium dark:bg-blue-200 dark:text-blue-900">
                {data?.counsellorType?.length > 0
                  ? data.counsellorType.join(", ")
                  : "No Counselor Type"}
              </div>
            </div>
            <div className="mt-6">
              <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-6 justify-center">
                <div className="flex items-center justify-center p-4 bg-gray-100 rounded-lg shadow-sm dark:bg-gray-600">
                  <BsFillTelephoneFill className="text-xl text-blue-500 dark:text-blue-300" />
                  <span className="ml-2 text-gray-700 dark:text-gray-200">
                    {data?.mobile}
                  </span>
                </div>
                <div className="flex items-center justify-center p-4 bg-gray-100 rounded-lg shadow-sm dark:bg-gray-600">
                  <BsFillEnvelopeFill className="text-xl text-blue-500 dark:text-blue-300" />
                  <span className="ml-2 text-gray-700 dark:text-gray-200">
                    {data?.email}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-4 mb-6 mt-6 bg-white p-3 mx-4  rounded-lg shadow-xl">
        {["Counseling Sessions", "Cases"].map((tabs) => (
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

      {activeTab === "Counseling Sessions" ? <CounselingSessionTable searchValue={""} /> : <CounselorCaseTable searchValue={""} />}
    </>
  );
};

export default CounselorProfile;
