import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function MobileNavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">Cricinnings</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/cricket-schedule/series">Browse Series</Nav.Link>
            <Nav.Link href="/cricket-match/live-scores">Live Matches</Nav.Link>
            <Nav.Link href="/cricket-schedule/upcoming-series/international">
              Match Day By Day
            </Nav.Link>
            <Nav.Link href="/cricket-scorecard-archives">
              Series Achieve
            </Nav.Link>
            <Nav.Link href="/icc-rankings/men/batting">
              Mens Ranking
            </Nav.Link>
            <Nav.Link href="/icc-rankings/women/batting">
            Women's Ranking
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MobileNavBar;
