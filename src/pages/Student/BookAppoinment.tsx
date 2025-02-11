import React, { useState } from "react";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import SelectType from "../../components/Student/SelectType";
import SelectCounselor from "../../components/Student/SelectCounselor";
import { getDays, getTimes } from "../../api/timeApi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createSession } from "../../api/sessionApi";

const dayNameToNumber: Record<string, number> = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
};

const numberToDay: Record<number, string> = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
};

const BookAppoinment: React.FC = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [days, setDays] = useState<number[]>([]);
  const [times, setTimes] = useState<{ start: string; end: string }[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { state } = location;
  const formId = state?.formId;
  const [form, setForm] = useState({
    type: "",
    counsellor: "",
    session_date: null as Date | null,
    session_time: "",
    description: "",
    form_id: formId,
  });

  const handleTypeChange = (value: string) => {
    setForm((prev) => ({ ...prev, type: value }));
  };

  const handleCounselor = async (value: string) => {
    setForm((prev) => ({ ...prev, counsellor: value }));

    try {
      const response = await getDays(value);
      const availableDays = response.data.map(
        (day: string) => dayNameToNumber[day]
      );
      setDays(availableDays);
    } catch (error) {
      console.error("Error fetching counselor availability:", error);
    }
  };

  const handleDateChange = async (date: Date | null) => {
    if (!date) return;

    const selectedDayNumber = date.getDay();
    const selectedDay = numberToDay[selectedDayNumber];

    if (!days.includes(selectedDayNumber)) return;

    setForm((prev) => ({ ...prev, session_date: date }));

    try {
      const response = await getTimes(form.counsellor, {
        date: date.toLocaleDateString("en-CA"),

        day: selectedDay,
      });

      if (response) {
        setTimes(response.data);
      }
    } catch (error) {
      console.error("Error fetching available times:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createSession(form);
      setIsModalOpen(true);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const closeModalAndRedirect = () => {
    setIsModalOpen(false);
    window.location.href = "https://www.iswkoman.com/";
  };

  const filterDate = (date: Date) => {
    return days.includes(date.getDay());
  };

  return (
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

              {form.type && (
                <SelectCounselor
                  onCounsellorChange={handleCounselor}
                  selectedCounsellor={form.counsellor}
                  type={form.type}
                />
              )}

              {form.counsellor && (
                <div className="w-full">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Session Date
                  </label>
                  <DatePicker
                    selected={form.session_date}
                    onChange={handleDateChange}
                    filterDate={filterDate}
                    className="w-full border border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-[#a266f0] dark:text-white"
                    placeholderText="Select a valid date"
                    wrapperClassName="w-full"
                    popperClassName="!z-50"
                  />
                </div>
              )}

              {form.session_date && times.length > 0 && (
                <div className="w-full">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Available Time Slots
                  </label>
                  <select
                     value={form.session_time ? JSON.stringify(form.session_time) : ""}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        session_time: JSON.parse(e.target.value),
                      }))
                    }
                    className="w-full border border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-[#a266f0] dark:text-white"
                  >
                    <option value="" disabled>
                      Select Time
                    </option>
                    {times.map((slot, index) => (
                      <option key={index} value={JSON.stringify(slot)}>
                        {slot.start} - {slot.end}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="w-full">
                <label className="mb-2.5 block text-black dark:text-white">
                  Details
                </label>
                <textarea
                  rows={6}
                  name="details"
                  value={form.description}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  placeholder="Enter Details"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-[#a266f0] dark:text-white"
                />
              </div>
            </div>

            <button className="flex w-full justify-center rounded bg-[#a266f0] p-3 font-medium text-gray hover:bg-opacity-90">
       {loading ? "Booking..." : "Book"}
            </button>
          </form>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 w-screen h-screen">
          <div className="bg-white p-6 rounded-lg text-center shadow-lg w-[500px] max-w-full">
            <h2 className="text-xl font-semibold mb-4">
              Your appointment request has been submitted. You will receive a
              confirmation once the appointment request is approved!
            </h2>
            <button
              onClick={closeModalAndRedirect}
              className="w-full py-2 bg-primary text-white rounded-md transition hover:bg-opacity-80"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookAppoinment;
