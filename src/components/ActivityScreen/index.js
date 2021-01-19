import { Row, Col, Container } from "react-bootstrap";
import "./activity-screen.css";
import { useApp } from "../../contexts/AppContext";

export const ActivityScreen = () => {
  const { currentEvent } = useApp();

  return (
    <Col xs={12} md={8} className="screen-col">
      <Container className="screen mt-md-4 py-3 py-md-5 px-md-5">
        <div className="screen__overlay"></div>
        <Row>
          <Col xs={9}>
            <h1 className="screen__event-title">{currentEvent.eventTitle}</h1>
            <p className="screen__event-date">14th Sep, 2021</p>
          </Col>

          <Col xs={3} className="screen__event-actions">
            <box-icon name="edit-alt" type="solid"></box-icon>
            <box-icon name="trash" type="solid"></box-icon>
          </Col>
        </Row>

        <Row className="screen__event-countdown mt-4 mb-3">
          <Col
            xs={12}
            lg={6}
            className="screen__event-countdown-top mb-3 mb-lg-0"
          >
            <div className="months">
              <div className="months__num">7</div>
              <div className="months__label">Months</div>
            </div>
            <div className="days">
              <div className="days__num">14</div>
              <div className="days__label">Days</div>
            </div>
            <div className="hours">
              <div className="hours__num">02</div>
              <div className="hours__label">Hours</div>
            </div>
          </Col>
          <Col xs={12} lg={6} className="screen__event-countdown-bottom">
            <div className="minutes">
              <div className="minutes__num">34</div>
              <div className="minutes__label">Minutes</div>
            </div>
            <div className="seconds">
              <div className="seconds__num">18</div>
              <div className="seconds__label">Seconds</div>
            </div>
          </Col>
        </Row>
      </Container>
    </Col>
  );
};
