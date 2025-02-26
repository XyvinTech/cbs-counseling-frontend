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
            start: moment(event.start).format("YYYY-MM-DD"),
            end: moment(event.end).format("YYYY-MM-DD"),
            allDay: true, 
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
    <div className="w-full h-screen p-4 bg-white dark:bg-boxdark shadow-md rounded-lg dark:text-white">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        height="auto"
        titleFormat={{ year: "numeric", month: "long" }}
        themeSystem="bootstrap"
        dayHeaderClassNames="bg-[#0072bc] text-white py-2 text-sm"
        displayEventTime={false} 
      />
    </div>
  );
};

export default Calendar;
