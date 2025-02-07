import React, { useState, useEffect } from "react";
import LogoDark from "../../images/schoolLogo.png";
import SelectBooking from "../../components/Student/SelectBooking";
import { getUserByStudent } from "../../api/userApi";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { createForm, createSession } from "../../api/sessionApi";
import SelectType from "../../components/Student/SelectType";

const BookAppoinment: React.FC = () => {
  const location = useLocation();
  const { state } = location;
  const formId = state?.formId;
  const [form, setForm] = useState({
    type: "",
    counsellor: "",
    session_date: "",
    session_time: "",
    description: "",
    form_id: formId,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createSession(form);

      //  OPEN A DIALOG YOU ARE SUCCESSFULLY BOOKED AND REDIRECT TO https://www.iswkoman.com/"
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleTypeChange = (value: string) => {
    setForm((prev) => ({
      ...prev,
      type: value,
    }));
  };
  return (
    <>
      <div className="flex flex-col justify-center items-center bg-white h-screen">
        <div className="w-full xl:w-1/2 border border-stroke bg-white dark:border-strokedark dark:bg-boxdark shadow-lg">
          <div className="w-full p-4 sm:p-12.5 xl:p-8.5">
            <div className="mb-3.5 flex justify-center">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-black dark:text-white text-center mb-3">
                Book Appointment
              </h3>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <SelectType
                  onPlanChange={handleTypeChange}
                  selectedPlan={form.type}
                />

                <div></div>

                <div></div>

                <div></div>
              </div>

              <div className="mb-5">
                <input
                  type="submit"
                  value="Next"
                  className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookAppoinment;
