import React, { useEffect, useState } from "react";
import { addTime, deleteTime, getAllTime } from "../../api/timeApi"; // Import API functions

// Define TypeScript interfaces
interface TimeSlot {
  start: string;
  end: string;
}

interface Availability {
  _id: string;
  day: string;
  times: TimeSlot[];
}

const AddAvailability: React.FC = () => {
  const [availability, setAvailability] = useState<Availability[]>([]);
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [day, setDay] = useState<string>("Sunday");
  const [dayTimes, setDayTimes] = useState<Record<string, boolean>>({});
  const [newTime, setNewTime] = useState<TimeSlot>({ start: "", end: "" });
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [showCheckboxes, setShowCheckboxes] = useState<boolean>(false);
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] =
    useState<boolean>(false);
  const [confirmationInput, setConfirmationInput] = useState<string>("");
  const [isChange, setIsChange] = useState<boolean>(false);
  const [isAnySelected, setIsAnySelected] = useState<boolean>(false);

  const daysOfWeek: string[] = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllTime();
        setAvailability(response.data as Availability[]);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, [isChange]);

  useEffect(() => {
    const currentTimes =
      availability.find((time) => time.day === day)?.times || [];
    const initialCheckedState = currentTimes.reduce(
      (acc, _, index) => {
        acc[index.toString()] = false;
        return acc;
      },
      {} as Record<string, boolean>
    );
    setDayTimes(initialCheckedState);
  }, [day, availability]);

  const handleTabChange = (index: number) => {
    setSelectedTab(index);
    setDay(daysOfWeek[index]);
    setIsDialogOpen(false);
    setShowCheckboxes(false);
  };

  const handleCheckboxChange = (index: string) => {
    setDayTimes((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
    setIsAnySelected(true);
  };

  const handleConfirmSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const dayObject = availability.find((time) => time.day === day);
    if (!dayObject) return;

    const checkedIndexes = Object.keys(dayTimes).filter(
      (index) => dayTimes[index]
    );
    const timesToDelete = checkedIndexes
      .map((index) => {
        const timeSlot = dayObject.times[parseInt(index)];
        return timeSlot ? { start: timeSlot.start, end: timeSlot.end } : null;
      })
      .filter(Boolean);

    if (timesToDelete.length === 0) return;

    const requestBody = {
      times: timesToDelete,
      reason: confirmationInput,
    };

    try {
      await deleteTime(dayObject._id, requestBody);

      setAvailability((prev) =>
        prev.map((time) =>
          time.day === day
            ? {
                ...time,
                times: time.times.filter((_, idx) => !dayTimes[idx.toString()]),
              }
            : time
        )
      );

      setIsChange(!isChange);
      setIsAnySelected(false);
      setShowCheckboxes(false);
      setDayTimes({});
    } catch (error) {
      console.error("Failed to delete times:", error);
    }

    setIsConfirmationDialogOpen(false);
    setConfirmationInput("");
  };

  const handleAddTime = async () => {
    if (!newTime.start || !newTime.end) return;

    try {
      const response = await addTime({
        day,
        times: [...selectedDayTimes, newTime],
      });

      if (response) {
        setAvailability((prev) => {
          const updatedAvailability = [...prev];
          const dayIndex = updatedAvailability.findIndex(
            (time) => time.day === day
          );

          if (dayIndex === -1) {
            updatedAvailability.push({
              _id: response._id,
              day,
              times: [newTime],
            });
          } else {
            const existingTimes = updatedAvailability[dayIndex].times;

            const updatedTimes = [...existingTimes, newTime].filter(
              (time, index, self) =>
                index ===
                self.findIndex(
                  (t) => t.start === time.start && t.end === time.end
                )
            );

            updatedAvailability[dayIndex].times = updatedTimes;
          }

          return updatedAvailability;
        });

        setNewTime({ start: "", end: "" });
        setIsDialogOpen(false);
      }
    } catch (error) {
      console.error("Failed to add time:", error);
    }
  };

  const selectedDayTimes: TimeSlot[] =
    availability.find((time) => time.day === day)?.times || [];

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg  dark:bg-boxdark" >
      <div className="flex border-b dark:border-strokedark">
        {daysOfWeek.map((day, index) => (
          <button
            key={index}
            className={`px-4 py-2 text-sm font-medium ${
              selectedTab === index
                ? "border-b-4 border-blue-500 text-blue-600 font-semibold"
                : "text-gray-500 hover:text-gray-700 dark:text-white"
            }`}
            onClick={() => handleTabChange(index)}
            type="button"
          >
            {day}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 min-h-[10vh]">
        {selectedDayTimes.map((timeSlot, index) => (
          <label
            key={index}
            className="flex items-center gap-2 p-3 border border-blue-500 rounded-lg shadow-md text-blue-600 cursor-pointer hover:bg-blue-50"
          >
            {showCheckboxes && (
              <input
                type="checkbox"
                checked={dayTimes[index.toString()]}
                onChange={() => handleCheckboxChange(index.toString())}
                className="w-4 h-4"
              />
            )}
            <span className="text-sm">
              {timeSlot.start} - {timeSlot.end}
            </span>
          </label>
        ))}
        <button
          className="w-10 h-10 flex items-center justify-center bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
          onClick={() => setIsDialogOpen(true)}
          type="button"
        >
          +
        </button>
      </div>
      {selectedDayTimes.length > 0 && (
        <div className="flex justify-between items-center mt-4">
          {!showCheckboxes ? (
            <button
              className="px-4 py-2 text-sm font-medium bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              onClick={() => setShowCheckboxes(true)}
              type="button"
            >
              Select to Remove
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                className="px-4 py-2 text-sm font-medium bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
                onClick={() => {
                  setShowCheckboxes(false);
                  setDayTimes({});
                  setIsAnySelected(false);
                }}
                type="button"
              >
                Cancel
              </button>

              {isAnySelected && (
                <button
                  className="px-4 py-2 text-sm font-medium bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                  onClick={() => setIsConfirmationDialogOpen(true)}
                >
                  Remove Selected
                </button>
              )}
            </div>
          )}
        </div>
      )}
      {isDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold">Add Time Slot</h3>
            <div className="mt-4">
              <input
                type="time"
                name="start"
                value={newTime.start}
                onChange={(e) =>
                  setNewTime({ ...newTime, start: e.target.value })
                }
                className="p-2 border rounded-md w-full mb-2"
              />
              <input
                type="time"
                name="end"
                value={newTime.end}
                onChange={(e) =>
                  setNewTime({ ...newTime, end: e.target.value })
                }
                className="p-2 border rounded-md w-full"
              />
            </div>
            <div className="flex justify-end mt-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded-lg mr-2"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                onClick={handleAddTime}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
      {isConfirmationDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold">Confirm Deletion</h3>
            <input
              type="text"
              value={confirmationInput}
              onChange={(e) => setConfirmationInput(e.target.value)}
              className="p-2 border rounded-md w-full my-2"
            />
            <button
              onClick={handleConfirmSubmit}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Confirm & Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddAvailability;
