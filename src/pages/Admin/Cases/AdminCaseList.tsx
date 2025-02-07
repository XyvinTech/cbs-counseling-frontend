import { useState } from "react";
import AdminCaseTable from "./AdminCaseTable";

const AdminCaseList = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  return (
    <>
      <div className="mb-7.5 flex flex-wrap gap-5 xl:gap-7.5 justify-between">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-start">
          <h2 className="text-title-md2 font-semibold text-black dark:text-white ">
            Cases
          </h2>
        </div>
        <div className="relative w-full max-w-xs">
          <div className="relative flex items-center bg-white dark:bg-graydark  rounded-lg shadow-md">
            <button className="absolute left-3 top-1/2 -translate-y-1/2">
              <svg
                className="fill-gray-500 fill-primary"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.16666 3.33332C5.945 3.33332 3.33332 5.945 3.33332 9.16666C3.33332 12.3883 5.945 15 9.16666 15C12.3883 15 15 12.3883 15 9.16666C15 5.945 12.3883 3.33332 9.16666 3.33332ZM1.66666 9.16666C1.66666 5.02452 5.02452 1.66666 9.16666 1.66666C13.3088 1.66666 16.6667 5.02452 16.6667 9.16666C16.6667 13.3088 13.3088 16.6667 9.16666 16.6667C5.02452 16.6667 1.66666 13.3088 1.66666 9.16666Z"
                  fill=""
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M13.2857 13.2857C13.6112 12.9603 14.1388 12.9603 14.4642 13.2857L18.0892 16.9107C18.4147 17.2362 18.4147 17.7638 18.0892 18.0892C17.7638 18.4147 17.2362 18.4147 16.9107 18.0892L13.2857 14.4642C12.9603 14.1388 12.9603 13.6112 13.2857 13.2857Z"
                  fill=""
                />
              </svg>
            </button>

            <input
              type="text"
              placeholder="Type to search..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-full bg-white pl-10 pr-4 py-2.5 text-black dark:bg-graydark dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </div>
      <AdminCaseTable searchValue={searchValue} />
    </>
  );
};

export default AdminCaseList;
