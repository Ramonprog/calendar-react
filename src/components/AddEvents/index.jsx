/* eslint-disable react/prop-types */
import { Box, Modal, TextField } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export function AddEvent({ open, setOpen, addData }) {
  console.log("🚀 ~ AddEvent ~ addData:", addData);

  const formatDateTimeLocal = (date) => {
    return moment(date).format("YYYY-MM-DDTHH:mm");
  };

  useEffect(() => {
    if (addData) {
      setNewEvent((prev) => ({
        ...prev,
        start: formatDateTimeLocal(addData.start),
        end: formatDateTimeLocal(addData.end),
      }));
    }
  }, [addData]);

  const [newEvent, setNewEvent] = useState({
    title: "",
    start: "",
    end: "",
    desc: "",
    type: "",
    color: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    console.log(newEvent); // Adicione essa linha para verificar os dados do evento
    setOpen(false);
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h3>Adicionar Evento</h3>

          <form onSubmit={handleSubmit}>
            <TextField
              label="Título"
              name="title"
              value={newEvent.title}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Descrição"
              name="desc"
              value={newEvent.desc}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Tipo"
              name="type"
              value={newEvent.type}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Cor"
              name="color"
              value={newEvent.color}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Data de Início"
              name="start"
              value={newEvent.start}
              type="datetime-local"
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Data de Fim"
              name="end"
              value={newEvent.end}
              onChange={handleInputChange}
              fullWidth
              type="datetime-local"
              margin="normal"
            />
            <button type="submit">Adicionar</button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
