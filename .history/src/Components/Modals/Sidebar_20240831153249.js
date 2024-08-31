/** @format */
import { useState, useRef } from "react";
import { Offcanvas, Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { formatTitle } from "../Integration/ApiIntegration";

const SidebarMenu = ({ show, handleClose, allSeries }) => {
  const navigate = useNavigate();

  const clickHandler = (link) => {
    handleClose();
    navigate(link);
  };

  return (
    <Offcanvas show={show} onHide={handleClose} className="main-sidebar">
      <Offcanvas.Body>
        <div className="close-btn">
          <i className="fa-solid fa-xmark" onClick={() => handleClose()}></i>
        </div>
        <div className="links">
          <a
            href={"#"}
            onClick={() => clickHandler("/cricket-match/live-scores")}
          >
            
              Live Scores
            </span>
          </a>
          <a href="/cricket-schedule/upcoming-series/international">Schedule</a>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Series
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {allSeries?.slice(0, 5)?.map((item) => (
                <Dropdown.Item
                  key={item?.cid}
                  className="no-border-radius-text"
                >
                  <Link
                    to={`/cricket-series/${item?.cid}/${formatTitle(
                      item?.title
                    )}-${item?.season}/matches`}
                  >
                    {item?.title}
                  </Link>
                </Dropdown.Item>
              ))}
              <Dropdown.Item
                className="no-border-radius-text1"
                onClick={() => navigate("/live-cricket-scores/Allseries")}
              >
                All Series {">>"}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              ICC Ranking
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => navigate("/icc-rankings/men/batting")}
                className="no-border-radius-text"
              >
                ICC - Men's Ranking
              </Dropdown.Item>
              <Dropdown.Item
                className="no-border-radius-text"
                onClick={() => navigate("/icc-rankings/women/batting")}
              >
                ICC - Women's Ranking
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export { SidebarMenu };
