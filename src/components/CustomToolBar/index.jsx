/* eslint-disable react/prop-types */
import { Button, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { Container, ControlBtn } from "./styles";

export function CustomToolBar({ label, onView, onNavigate, views }) {
  console.log("🚀 ~ CustomToolBar ~ label:", label);
  const [anchorEl, setAnchorEl] = useState(null);
  const [viewSelected, setViewSelected] = useState("Mês");
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function translateView(view) {
    switch (view) {
      case "month":
        return "Mês";
      case "week":
        return "Semana";
      case "day":
        return "Dia";
      case "agenda":
        return "Agenda";
      default:
        return view;
    }
  }

  return (
    <Container>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        variant="outlined"
        sx={{ marginBottom: "15px" }}
      >
        {viewSelected}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {views.map((view) => (
          <MenuItem
            key={view}
            onClick={() => {
              onView(view);
              handleClose();
              setViewSelected(translateView(view));
            }}
          >
            {translateView(view)}
          </MenuItem>
        ))}
      </Menu>

      <h2>{label}</h2>
      <ControlBtn>
        <MenuItem onClick={() => onNavigate("PREV")} title="Anterior">
          {"<"}
        </MenuItem>
        <MenuItem onClick={() => onNavigate("TODAY")}>Hoje</MenuItem>
        <MenuItem onClick={() => onNavigate("NEXT")} title="Próximo">
          {">"}
        </MenuItem>
      </ControlBtn>
    </Container>
  );
}
