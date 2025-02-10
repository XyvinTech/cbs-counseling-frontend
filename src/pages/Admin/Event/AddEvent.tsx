import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import SelectTimer from "../../../components/Admin/SelectTimer";
import { createEvent, getEventById, updateEvent } from "../../../api/eventApi";
import { toast } from "react-toastify";
import { upload } from "../../../api/userApi";

const AddEvent = () => {
  const [preview, setPreview] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [eventData, setEventData] = useState<{
    title: string;
    date: string;
    venue: string;
    guest: string;
    requisition_image: string;
    remainder: string[];
    details: string;
    requisition_description: string;
  }>({
    title: "",
    date: "",
    venue: "",
    guest: "",
    requisition_image: "",
    remainder: [],
    details: "",
    requisition_description: "",
  });

  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  const isEditMode = state?.editMode;
  const eventId = state?.id;

  useEffect(() => {
    if (isEditMode && eventId) {
      const fetchEvent = async () => {
        const response = await getEventById(eventId);
        const event = response.data;

        if (event) {
          const formattedDate = event.date
            ? new Date(event.date).toLocaleDateString("en-CA")
            : "";
          setEventData({
            title: event.title || "",
            date: formattedDate || "",
            venue: event.venue || "",
            guest: event.guest || "",
            requisition_image: event.requisition_image || "",

            remainder: event.remainder || [],
            details: event.details || "",
            requisition_description: event.requisition_description || "",
          });

          setPreview(
            event.requisition_image
              ? `http://localhost:3000/images/${event.requisition_image}`
              : ""
          );
        }
      };
      fetchEvent();
    }
  }, [isEditMode, eventId]);
console.log("prev",preview);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;

    if (files && files.length > 0) {
      const selectedFile = files[0];

      // Generate a temporary preview URL for UI
      const imageUrl = URL.createObjectURL(selectedFile);
      setPreview(imageUrl);

      setFile(selectedFile); // Store the file for actual upload later
    } else {
      setEventData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = eventData.requisition_image;
      if (preview && file) {
        const response = await upload(file);
        if (response?.data) {
          imageUrl = response.data;
        }
      }

      const updatedEventData = {
        ...eventData,
        requisition_image: imageUrl,
      };

      if (isEditMode && eventId) {
        await updateEvent(eventId, updatedEventData);
      } else {
        await createEvent(updatedEventData);
      }

      navigate("/admin-event");
    } catch (error: any) {
      toast.error(error.message || "Failed to upload image!");
    } finally {
      setLoading(false);
    }
  };

  const handleTimerChange = (values: string[]) => {
    setEventData((prev) => ({
      ...prev,
      remainder: values,
    }));
  };

  return (
    <div className="flex flex-col gap-9">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-start">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 cursor-pointer text-black dark:text-white hover:text-blue-600"
          onClick={() => navigate(-1)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>{" "}
        <h2 className="text-title-md2 font-semibold text-black dark:text-white">
          {eventId ? "Edit Event" : "Add Event"}
        </h2>
      </div>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <form onSubmit={handleSubmit}>
          <div className="p-6.5">
            <div className="mb-4.5 grid grid-cols-1 gap-6 xl:grid-cols-2">
              <div className="w-full">
                <label className="mb-2.5 block text-black dark:text-white">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={eventData.title}
                  onChange={handleChange}
                  placeholder="Enter Name"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-[#a266f0] dark:text-white"
                />
              </div>
              <div className="w-full">
                <label className="mb-2.5 block text-black dark:text-white">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={eventData.date}
                  onChange={handleChange}
                  placeholder="Enter Date"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-[#a266f0] dark:text-white"
                />
              </div>
            </div>

            <div className="mb-4.5 grid grid-cols-1 gap-6 xl:grid-cols-2">
              <div className="w-full">
                <label className="mb-2.5 block text-black dark:text-white">
                  Venue
                </label>
                <input
                  type="text"
                  name="venue"
                  value={eventData.venue}
                  onChange={handleChange}
                  placeholder="Enter venue"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-[#a266f0] dark:text-white"
                />
              </div>
              <div className="w-full">
                <label className="mb-2.5 block text-black dark:text-white">
                  Guest
                </label>
                <input
                  type="text"
                  name="guest"
                  value={eventData.guest}
                  onChange={handleChange}
                  placeholder="Enter Guest"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-[#a266f0] dark:text-white"
                />
              </div>
            </div>
            <div className="mb-4.5 grid grid-cols-1 gap-6 xl:grid-cols-2">
              <div className="w-full">
                <label className="mb-2.5 block text-black dark:text-white">
                  Upload Requisition
                </label>
                <input
                  type="file"
                  name="requisition_image"
                  accept="image/*"
                  onChange={handleChange}
                />
                {preview && (
                  <div className="mt-3">
                    <img
                      src={preview}
                      alt="Selected Preview"
                      className="w-32 h-32 object-cover"
                    />
                  </div>
                )}
              </div>
              <SelectTimer
                onTimerChange={handleTimerChange}
                selectedTimer={eventData.remainder}
              />
            </div>
            <div className="mb-4.5 grid grid-cols-1 gap-6 xl:grid-cols-2">
              <div className="w-full">
                <label className="mb-2.5 block text-black dark:text-white">
                  Details of Event
                </label>
                <textarea
                  rows={6}
                  name="details"
                  value={eventData.details}
                  onChange={handleChange}
                  placeholder="Enter Details"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-[#a266f0] dark:text-white"
                />
              </div>
              <div className="w-full">
                <label className="mb-2.5 block text-black dark:text-white">
                  Requisition description
                </label>
                <textarea
                  rows={6}
                  name="requisition_description"
                  value={eventData.requisition_description}
                  onChange={handleChange}
                  placeholder="Enter Description"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-[#a266f0] dark:text-white"
                />
              </div>
            </div>

            <button
              type="submit"
              className="flex w-full justify-center rounded bg-[#a266f0] p-3 font-medium text-gray hover:bg-opacity-90"
            >
              {loading ? "Submitting" : eventId ? "Update" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEvent;
