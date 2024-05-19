import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import { Container } from "./styles";
import { useState } from "react";
import { ModalData } from "../Modal";
import { AsideBar } from "../Aside";
import "moment-timezone";
import "moment/locale/pt-br";
import { CustomToolBar } from "../CustomToolBar";

moment.tz.setDefault("America/Sao_Paulo");

const DragAndDropCalendar = withDragAndDrop(Calendar);
const localizer = momentLocalizer(moment);

const messages = {
  allDay: "Dia todo",
  previous: "Anterior",
  next: "Próximo",
  today: "Hoje",
  month: "Mês",
  week: "Semana",
  day: "Dia",
  agenda: "Agenda",
  date: "Data",
  time: "Hora",
  event: "Evento",
  noEventsInRange: "Não há eventos neste período.",
  showMore: (total) => `+ ver mais (${total})`,
};

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
      color: "#f00",
    },
    {
      id: 1,
      title: "Marlus Viana",
      start: new Date(2024, 4, 14),
      end: new Date(2024, 4, 14),
      desc: "Encerramento de obra",
      type: "singer",
      color: "#f0f",
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

  return (
    <Container>
      <AsideBar />
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
        onEventDrop={handleEventDrop}
        onEventResize={handleEventDrop}
        onSelectEvent={handleEventClick}
        messages={messages}
        className="calendar"
        components={{
          toolbar: CustomToolBar,
        }}
        eventPropGetter={(event) => {
          const style = {
            backgroundColor: event.color,
          };
          return { style };
        }}
      />
    </Container>
  );
}
