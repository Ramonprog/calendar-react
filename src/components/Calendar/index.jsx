import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import { Container } from "./styles";
import { useEffect, useState } from "react";
import { ModalData } from "../Modal";
import { AsideBar } from "../Aside";
import "moment-timezone";
import "moment/locale/pt-br";
import { CustomToolBar } from "../CustomToolBar";
import { AddEvent } from "../AddEvents";

moment.locale("pt-br");

const DragAndDropCalendar = withDragAndDrop(Calendar);

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
  const localizer = momentLocalizer(moment);
  const [openModal, setOpenModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [openAddEvent, setOpenAddEvent] = useState(false);
  const [slotSelected, setSlotSelected] = useState(null);
  const [events, setEvents] = useState([
    {
      id: 0,
      title: "Paulinha Abelha",
      start: new Date(2024, 4, 19, 10, 0),
      end: new Date(2024, 4, 19, 12, 0),
      desc: "Encerramento de obra",
      type: "singer",
      color: "#f00",
    },
    {
      id: 1,
      title: "Marlus Viana",
      start: new Date(2024, 4, 19, 10, 0),
      end: new Date(2024, 4, 19, 12, 0),
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

  useEffect(() => {
    console.log("🚀 ~ events", events);
  }, [events]);

  function handleEventClick(event) {
    setSelectedEvent(event);
    setOpenModal(true);
  }

  function handleAddEvent(event) {
    setSlotSelected(event);
    setOpenAddEvent(true);
  }

  return (
    <Container>
      <AsideBar />
      <AddEvent
        open={openAddEvent}
        setOpen={setOpenAddEvent}
        addData={slotSelected}
        events={events}
        setEvents={setEvents}
      />
      <ModalData
        open={openModal}
        setOpen={setOpenModal}
        eventData={selectedEvent}
      />
      <DragAndDropCalendar
        localizer={localizer}
        defaultDate={moment().toDate()}
        defaultView="month"
        formats={{
          timeGutterFormat: "HH:mm",
          eventTimeRangeFormat: (prop) =>
            prop.start.toLocaleTimeString("pt-br", {
              hour: "2-digit",
              minute: "2-digit",
            }) +
            " - " +
            prop.end.toLocaleTimeString("pt-br", {
              hour: "2-digit",
              minute: "2-digit",
            }),
        }}
        events={events}
        style={{ height: "600px" }}
        onEventDrop={handleEventDrop}
        onEventResize={handleEventDrop}
        onSelectEvent={handleEventClick}
        messages={messages}
        onSelectSlot={handleAddEvent}
        selectable
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
