import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LogoDark from "../../images/schoolLogo.png";
import Logo from "../../images/schoolLogo.png";
import { login } from "../../api/authApi";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await login({ email, password });

      if (response?.data?.token) {
        localStorage.setItem("token", response?.data?.token);
        localStorage.setItem("userType", response?.data?.userType);

        if (response?.data?.userType === "admin") {
          navigate("/dashboard");
        } else {
          navigate("/dashboard");
        }
      } else {
        toast.error("Invalid login credentials");
      }
    } catch (err: any) {
      toast.error(err.message || "Something went wrong!");
    }
  };

  return (
    <div className="flex justify-center items-center bg-white h-screen">
      <div className="w-full xl:w-1/2 border border-stroke bg-white dark:border-strokedark dark:bg-boxdark shadow-lg">
        <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
          <div className="mb-3.5 flex justify-center">
            <img className="hidden dark:block" src={Logo} alt="Logo" />
            <img className="dark:hidden w-26 h-28" src={LogoDark} alt="Logo" />
          </div>
          <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2 flex justify-center">
            Login to ABLE
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="mb-2.5 block font-medium text-black dark:text-white">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="mb-2.5 block font-medium text-black dark:text-white">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
            </div>

            <div className="mb-5">
              <input
                type="submit"
                value="Sign In"
                className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
