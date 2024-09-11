import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Box } from "@mui/material";
import { useEventStore } from "../store/eventStore";

const localizer = momentLocalizer(moment);

const BigCalendar = () => {
  const { date, fetchData, change } = useEventStore();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchData();
  }, [fetchData, change]);

  useEffect(() => {
    if (date) {
      const formattedEvents = date?.map((event) => ({
        ...event,
        start: new Date(event.start),
        end: new Date(event.end),
      }));

      setEvents(formattedEvents);
    }
  }, [date]);

  return (
    <Box p={8} bgcolor={"white"}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </Box>
  );
};

export default BigCalendar;
