/** @format */
import { useState } from "react";
import { Offcanvas ,Dropdown } from "react-bootstrap";

const SidebarMenu = ({ show, handleClose }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDropdown1, setShowDropdown1] = useState(false);
  const handleToggle = () => {
    setShowDropdown(!showDropdown);
  };
  const handleToggle1 = () => {
    setShowDropdown1(!showDropdown1);
  };

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
          <a href="#" onClick={handleToggle1}>
            Series
            <Dropdown
              className="dropdown_nav"
              show={showDropdown1}
              onToggle={(isOpen) => setShowDropdown1(isOpen)}
            >
              <Dropdown.Menu
                className="no-border-radius"
                show={showDropdown1}
                ref={dropdownRef1}
              >
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
                <a className="no1" href="/live-cricket-scores/Allseries">
                  <Dropdown.Item
                    className="no-border-radius-text1"
                    onClick={() => navigate("/live-cricket-scores/Allseries")}
                  >
                    All Series {">>"}
                  </Dropdown.Item>
                </a>
              </Dropdown.Menu>
            </Dropdown>
          </a>

          <a href="#" onClick={handleToggle}>
            ICC Ranking
            <Dropdown
              className="dropdown_nav"
              show={showDropdown}
              onToggle={(isOpen) => setShowDropdown(isOpen)}
            >
              <Dropdown.Menu
                className="no-border-radius"
                show={showDropdown}
                ref={dropdownRef}
              >
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
          </a>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export { SidebarMenu };
