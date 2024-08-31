/** @format */

import { Offcanvas } from "react-bootstrap";

const SidebarMenu = ({ show, handleClose }) => {
  return (
    <Offcanvas show={show} onHide={handleClose}>
      <Offcanvas.Header closeButton>
      </Offcanvas.Header>
      <Offcanvas.Body>
  
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export { SidebarMenu };
