import React, { useEffect, useState } from "react";
import { format, isAfter, parseISO, startOfToday, isToday } from "date-fns";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Dialog, DialogContent, IconButton } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import styled from "styled-components";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const CalendarContainer = styled.div`
  position: relative;
  width: 100%;
`;

const PlaceholderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;
  border: none;
  padding: 8px;
  background-color: #efefef;
  cursor: pointer;
`;

const StyledCalendar = styled(Calendar)`
  & .react-calendar__tile--highlight {
    background-color: white !important;
    color: black !important;
  }

  & .react-calendar__tile--weekend {
    color: black;
  }

  & .react-calendar__tile--weekend-highlighted {
    color: black !important;
  }

  & .react-calendar__tile--disabled {
    color: rgba(0, 0, 0, 0.2) !important;
    background-color: #f0f0f0 !important;
  }
`;

const StyledSpan = styled.span`
  color: ${({ selectedDate }) =>
    selectedDate ? "black" : "rgba(0, 0, 0, 0.2)"};
`;

export const StyledDatePicker = ({
  onChange,
  label,
  highlightDays,
  rowData,
  form,
}) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (rowData?.date) {
      setSelectedDate(parseISO(rowData.date));
    }
  }, [rowData]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (onChange) {
      const formattedDate = format(date, "yyyy-MM-dd");
      const dayOfWeek = format(date, "EEEE");
      onChange(formattedDate, dayOfWeek);
    }
    setOpenModal(false);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <CalendarContainer>
        <PlaceholderContainer onClick={() => setOpenModal(true)}>
          <StyledSpan selectedDate={selectedDate}>
            {selectedDate ? format(selectedDate, "yyyy-MM-dd") : label}
          </StyledSpan>
          <IconButton>
            <CalendarTodayIcon />
          </IconButton>
        </PlaceholderContainer>

        <Dialog
          open={openModal}
          onClose={() => setOpenModal(false)}
          maxWidth="sm"
        >
          <DialogContent>
            <Calendar
              onChange={handleDateChange}
              value={selectedDate}
              //   tileClassName={tileClassName}
            />
          </DialogContent>
        </Dialog>
      </CalendarContainer>
    </LocalizationProvider>
  );
};
