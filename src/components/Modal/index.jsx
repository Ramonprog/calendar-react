/* eslint-disable react/prop-types */
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import moment from "moment";

moment.locale("pt-br");

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

export function ModalData({ open, setOpen, eventData, setEvents }) {
  const handleClose = () => setOpen(false);

  function handleDelete() {
    setEvents((prev) => prev.filter((item) => item.id !== eventData.id));
    handleClose();
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h3>Evento</h3>
          <h4>{eventData?.title}</h4>
          <p>{eventData?.desc}</p>
          <p>{eventData?.start.toLocaleString()}</p>
          <p>{eventData?.end.toLocaleString()}</p>
          <Button
            variant="contained"
            sx={{ marginTop: "10px" }}
            color="error"
            onClick={handleDelete}
          >
            Deletar Evento
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
