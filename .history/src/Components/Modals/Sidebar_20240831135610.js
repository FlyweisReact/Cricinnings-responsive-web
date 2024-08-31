/** @format */

import { Offcanvas } from "react-bootstrap";

const SidebarMenu = ({ show, handleClose }) => {
  return (
    <Offcanvas show={show} onHide={handleClose} className='main-sidebar' >
      <Offcanvas.Body>
            <div className="close-btn">
            <i class="fa-solid fa-x"></i>
            </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export { SidebarMenu };
