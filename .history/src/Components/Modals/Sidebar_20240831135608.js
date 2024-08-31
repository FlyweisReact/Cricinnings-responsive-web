/** @format */

import { Offcanvas } from "react-bootstrap";

const SidebarMenu = ({ show, handleClose }) => {
  return (
    <Offcanvas show={show} onHide={handleClose} className='main-sidebar' >
      <Offcanvas.Body>
            <div className="close-btn"></div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export { SidebarMenu };
