import React, { useEffect, useState } from "react";
import CardDataStats from "../../components/CardDataStats";
import TableOne from "../../components/Tables/TableOne";
import { getDashboard } from "../../api/dashboardApi";
import { subscription } from "../../types/subscription";

const ECommerce: React.FC = () => {
  const [dashboard, setDashboard] = useState<{
    activeUsers: string;
    twilioBalance: string;
    users: string;
    churches: string;
    plans: string;
    subsList: subscription[];
  }>({
    activeUsers: "0",
    twilioBalance: "0",
    users: "0",
    churches: "0",
    plans: "0",
    subsList: [],
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDashboard();

        if (response?.data) {
          setDashboard(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch members:", error);
      }
    };

    fetchData();
  }, []);
  console.log("dashboard", dashboard?.subsList);
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-5 2xl:gap-7.5">
        <CardDataStats title="Active Users" total={dashboard?.activeUsers}>
          <svg
            className="fill-primary dark:fill-white"
            width="22"
            height="16"
            viewBox="0 0 22 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11 15.1156C4.19376 15.1156 0.825012 8.61876 0.687512 8.34376C0.584387 8.13751 0.584387 7.86251 0.687512 7.65626C0.825012 7.38126 4.19376 0.918762 11 0.918762C17.8063 0.918762 21.175 7.38126 21.3125 7.65626C21.4156 7.86251 21.4156 8.13751 21.3125 8.34376C21.175 8.61876 17.8063 15.1156 11 15.1156ZM2.26876 8.00001C3.02501 9.27189 5.98126 13.5688 11 13.5688C16.0188 13.5688 18.975 9.27189 19.7313 8.00001C18.975 6.72814 16.0188 2.43126 11 2.43126C5.98126 2.43126 3.02501 6.72814 2.26876 8.00001Z"
              fill=""
            />
            <path
              d="M11 10.9219C9.38438 10.9219 8.07812 9.61562 8.07812 8C8.07812 6.38438 9.38438 5.07812 11 5.07812C12.6156 5.07812 13.9219 6.38438 13.9219 8C13.9219 9.61562 12.6156 10.9219 11 10.9219ZM11 6.625C10.2437 6.625 9.625 7.24375 9.625 8C9.625 8.75625 10.2437 9.375 11 9.375C11.7563 9.375 12.375 8.75625 12.375 8C12.375 7.24375 11.7563 6.625 11 6.625Z"
              fill=""
            />
          </svg>{" "}
        </CardDataStats>{" "}
        <CardDataStats title="Total Users" total={dashboard?.users}>
          {" "}
          <svg
            className="fill-primary dark:fill-white"
            width="22"
            height="18"
            viewBox="0 0 22 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.18418 8.03751C9.31543 8.03751 11.0686 6.35313 11.0686 4.25626C11.0686 2.15938 9.31543 0.475006 7.18418 0.475006C5.05293 0.475006 3.2998 2.15938 3.2998 4.25626C3.2998 6.35313 5.05293 8.03751 7.18418 8.03751ZM7.18418 2.05626C8.45605 2.05626 9.52168 3.05313 9.52168 4.29063C9.52168 5.52813 8.49043 6.52501 7.18418 6.52501C5.87793 6.52501 4.84668 5.52813 4.84668 4.29063C4.84668 3.05313 5.9123 2.05626 7.18418 2.05626Z"
              fill=""
            />
            <path
              d="M15.8124 9.6875C17.6687 9.6875 19.1468 8.24375 19.1468 6.42188C19.1468 4.6 17.6343 3.15625 15.8124 3.15625C13.9905 3.15625 12.478 4.6 12.478 6.42188C12.478 8.24375 13.9905 9.6875 15.8124 9.6875ZM15.8124 4.7375C16.8093 4.7375 17.5999 5.49375 17.5999 6.45625C17.5999 7.41875 16.8093 8.175 15.8124 8.175C14.8155 8.175 14.0249 7.41875 14.0249 6.45625C14.0249 5.49375 14.8155 4.7375 15.8124 4.7375Z"
              fill=""
            />
            <path
              d="M15.9843 10.0313H15.6749C14.6437 10.0313 13.6468 10.3406 12.7874 10.8563C11.8593 9.61876 10.3812 8.79376 8.73115 8.79376H5.67178C2.85303 8.82814 0.618652 11.0625 0.618652 13.8469V16.3219C0.618652 16.975 1.13428 17.4906 1.7874 17.4906H20.2468C20.8999 17.4906 21.4499 16.9406 21.4499 16.2875V15.4625C21.4155 12.4719 18.9749 10.0313 15.9843 10.0313ZM2.16553 15.9438V13.8469C2.16553 11.9219 3.74678 10.3406 5.67178 10.3406H8.73115C10.6562 10.3406 12.2374 11.9219 12.2374 13.8469V15.9438H2.16553V15.9438ZM19.8687 15.9438H13.7499V13.8469C13.7499 13.2969 13.6468 12.7469 13.4749 12.2313C14.0937 11.7844 14.8499 11.5781 15.6405 11.5781H15.9499C18.0812 11.5781 19.8343 13.3313 19.8343 15.4625V15.9438H19.8687Z"
              fill=""
            />
          </svg>
        </CardDataStats>
        <CardDataStats
          title="SMS Balance"
          total={`$${dashboard?.twilioBalance}`}
        >
          <svg
            className="fill-primary dark:fill-white"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"
              fill=""
            />
            <path
              d="M12 6C10.34 6 9 7.34 9 9H11C11 8.45 11.45 8 12 8C12.55 8 13 8.45 13 9C13 9.55 12.55 10 12 10H11C9.34 10 8 11.34 8 13C8 14.66 9.34 16 11 16V17H13V16C14.66 16 16 14.66 16 13H14C14 13.55 13.55 14 13 14C12.45 14 12 13.55 12 13C12 12.45 12.45 12 13 12H14C14.66 12 16 10.66 16 9C16 7.34 14.66 6 13 6V5H11V6H12Z"
              fill=""
            />
          </svg>
        </CardDataStats>
        <CardDataStats title="Church" total={dashboard?.churches}>
          <svg
            className="fill-primary dark:fill-white"
            width="20"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2C11.45 2 11 2.45 11 3V6.55L9.05 8.05C8.74 8.28 8.57 8.64 8.57 9.01V10H7C6.45 10 6 10.45 6 11V12C6 12.55 6.45 13 7 13H8.57V20H5C4.45 20 4 20.45 4 21V22H20V21C20 20.45 19.55 20 19 20H15.43V13H17C17.55 13 18 12.55 18 12V11C18 10.45 17.55 10 17 10H15.43V9.01C15.43 8.64 15.26 8.28 14.95 8.05L13 6.55V3C13 2.45 12.55 2 12 2ZM10 20V13H14V20H10Z"
              fill=""
            />
          </svg>
        </CardDataStats>
        <CardDataStats title="Plans" total={dashboard?.plans}>
          <svg
            className="fill-primary dark:fill-white"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2C12.48 2 12.93 2.14 13.3 2.39L19.3 6.39C19.69 6.64 20 7.14 20 7.64V16.64C20 17.54 19.58 18.4 18.86 18.93L13.3 22.39C12.93 22.64 12.48 22.78 12 22.78C11.52 22.78 11.07 22.64 10.7 22.39L5.14 18.93C4.42 18.4 4 17.54 4 16.64V7.64C4 7.14 4.31 6.64 4.7 6.39L10.7 2.39C11.07 2.14 11.52 2 12 2ZM12 4L6 8V16L12 20L18 16V8L12 4ZM12 10.25C12.41 10.25 12.75 10.59 12.75 11V15C12.75 15.41 12.41 15.75 12 15.75C11.59 15.75 11.25 15.41 11.25 15V11C11.25 10.59 11.59 10.25 12 10.25ZM12 9.25C11.59 9.25 11.25 8.91 11.25 8.5C11.25 8.09 11.59 7.75 12 7.75C12.41 7.75 12.75 8.09 12.75 8.5C12.75 8.91 12.41 9.25 12 9.25Z"
              fill=""
            />
          </svg>
        </CardDataStats>
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <div className="col-span-12 xl:col-span-12">
          <TableOne brandData={dashboard?.subsList} />
        </div>
      </div>
    </>
  );
};

export default ECommerce;
