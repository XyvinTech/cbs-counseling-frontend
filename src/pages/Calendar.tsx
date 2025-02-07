import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import moment from "moment";
import { getCalendar } from "../api/eventApi";

const Calendar = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCalendar();

        if (response?.data && Array.isArray(response.data)) {
          const formattedEvents = response.data.map((event: any) => ({
            title: event.title,
            start: moment.utc(event.start).toISOString(),
            end: moment.utc(event.end).toISOString(),
          }));
          setEvents(formattedEvents);
        } else {
          console.warn("Invalid response format from API:", response);
        }
      } catch (error) {
        console.error("Failed to fetch events:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full h-screen p-4 bg-white dark:bg-boxdark shadow-md rounded-lg">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        height="auto"
        titleFormat={{ year: "numeric", month: "long" }}
        themeSystem="bootstrap"
        dayHeaderClassNames="bg-[#8B5CF6] text-white py-2 text-sm "
      />
    </div>
  );
};

export default Calendar;
