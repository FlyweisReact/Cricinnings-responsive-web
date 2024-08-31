/** @format */
import { useState } from "react";
import { Offcanvas } from "react-bootstrap";

const SidebarMenu = ({ show, handleClose }) => {
  return (
    <Offcanvas show={show} onHide={handleClose} className="main-sidebar">
      <Offcanvas.Body>
        <div className="close-btn">
          <i className="fa-solid fa-xmark" onClick={() => handleClose()}></i>
        </div>
        <div className="links">
          <a href="/cricket-match/live-scores">
            <span className="score-span">
              <img src="/dot.svg" alt="" />
              Live Scores
            </span>
          </a>
          <a href="/cricket-schedule/upcoming-series/international">Schedule</a>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export { SidebarMenu };
