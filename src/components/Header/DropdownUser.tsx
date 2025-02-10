import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ClickOutside from "../ClickOutside";
import UserOne from "../../images/user/user-01.png";
import { toast } from "react-toastify";
import { getUser } from "../../api/userApi";

const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUser();
        setUser(response.data);
      } catch (error) {}
    };
    fetchData();
  }, []);

  const navigate = useNavigate();
  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4 focus:outline-none"
      >
        <span className="hidden text-right lg:block">
          <span className="block text-sm font-medium text-black dark:text-white">
            {user?.name}
          </span>
          <span className="block text-xs text-gray-500 dark:text-gray-400">
            {user?.userType}
          </span>
        </span>

        <span className="h-12 w-12 rounded-full overflow-hidden border border-gray-300">
          <img
            src={UserOne}
            alt="User"
            className="w-full h-full object-cover"
          />
        </span>
      </button>

      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-boxdark border border-gray-200 dark:border-strokedark shadow-lg rounded-md overflow-hidden">
          <button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("userType");
              toast.success("Logout successful");
              navigate("/");
            }}
            className="flex w-full justify-center rounded bg-white p-3 font-medium text-primary hover:bg-opacity-90"
          >
            Log Out
          </button>
        </div>
      )}
    </ClickOutside>
  );
};

export default DropdownUser;
