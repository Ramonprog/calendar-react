import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import { Container } from "./styles";
import { useState } from "react";
import { ModalData } from "./Modal";

moment.locale("pt-br");
const DragAndDropCalendar = withDragAndDrop(Calendar);
const localizer = momentLocalizer(moment);

export function CalendarComponent() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([
    {
      id: 0,
      title: "Paulinha Abelha",
      start: new Date(2024, 4, 14, 10, 0),
      end: new Date(2024, 4, 14, 12, 0),
      desc: "Encerramento de obra",
      type: "singer",
    },
    {
      id: 1,
      title: "Marlus Viana",
      start: new Date(2024, 4, 14),
      end: new Date(2024, 4, 14),
      desc: "Encerramento de obra",
      type: "singer",
    },
  ]);

  function handleEventDrop(data) {
    const { event, start, end } = data;

    const newEvents = events.map((item) => {
      if (item.id === event.id) {
        return {
          ...item,
          start,
          end,
        };
      }
      return item;
    });

    setEvents(newEvents);
  }

  function handleEventClick(event) {
    console.log("🚀 ~ handleEventClick ~ event:", event);
    setSelectedEvent(event);
    setOpenModal(true);
  }

  // function handleEventClose() {
  //   setSelectedEvent(null);
  // }

  return (
    <Container>
      <ModalData
        open={openModal}
        setOpen={setOpenModal}
        eventData={selectedEvent}
      />
      <DragAndDropCalendar
        localizer={localizer}
        defaultDate={moment().toDate()}
        defaultView="month"
        events={events}
        style={{ height: "600px" }}
        resizable={false}
        onEventDrop={handleEventDrop}
        onSelectEvent={handleEventClick}
      />
    </Container>
  );
}
