import { Row, Col, Container } from "react-bootstrap";
import "./activity-screen.css";
import { useApp } from "../../contexts/AppContext";
import DeleteConfirmModal from "../Modals/DeleteConfirmModal";
import { useEffect, useState } from "react";
import moment from "moment";

export const ActivityScreen = () => {
  const { currentEvent, setShowDeleteModal } = useApp();

  const [totalSeconds, setTotalSeconds] = useState(0);
  const [currentDate, setCurrentDate] = useState(new Date());

  const [months, setMonths] = useState(0);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [mins, setMins] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [formattedDate, setFormattedDate] = useState(
    moment(new Date()).format("Do MMM [,] YYYY")
  );

  useEffect(() => {
    // console.log(currentEvent);
    if (
      Object.keys(currentEvent).length !== 0 &&
      currentEvent.constructor === Object
    ) {
      const constructedDate = new Date(
        currentEvent.date.year,
        currentEvent.date.month - 1,
        currentEvent.date.day,
        0,
        0,
        0,
        0
      );
      setFormattedDate(moment(constructedDate).format("Do MMM [,] YYYY"));
      setTotalSeconds((constructedDate - currentDate) / 1000);
    }
  }, [currentEvent]);

  useEffect(() => {
    const interval = setInterval(() => setCurrentDate(new Date()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (
      Object.keys(currentEvent).length !== 0 &&
      currentEvent.constructor === Object
    ) {
      runCounter();
    }
  }, [currentDate]);

  const runCounter = () => {
    setTotalSeconds(
      (new Date(
        currentEvent.date.year,
        currentEvent.date.month - 1,
        currentEvent.date.day,
        0,
        0,
        0,
        0
      ) -
        currentDate) /
        1000
    );
    setMonths(Math.floor(totalSeconds / 2629746));
    setDays(Math.floor(totalSeconds / 3600 / 24));
    setHours(Math.floor(totalSeconds / 3600) % 24);
    setMins(Math.floor(totalSeconds / 60) % 60);
    setSeconds(Math.floor(totalSeconds) % 60);
  };

  return (
    <Col
      xs={12}
      md={8}
      className="screen-col"
      style={{ backgroundImage: `url(${currentEvent.backgroundUrl})` }}
    >
      <Container
        className="screen mt-md-4 py-3 py-md-5 px-md-5"
        style={{ backgroundImage: `url(${currentEvent.backgroundUrl})` }}
      >
        <div className="screen__overlay"></div>
        <Row>
          <Col xs={9}>
            <h1 className="screen__event-title">{currentEvent.title}</h1>
            <p className="screen__event-date">{formattedDate}</p>
          </Col>

          <Col xs={3} className="screen__event-actions">
            {/* <box-icon name="edit-alt" type="solid"></box-icon> */}
            <box-icon
              name="trash"
              type="solid"
              onClick={() => setShowDeleteModal(true)}
            ></box-icon>
          </Col>
        </Row>

        <Row className="screen__event-countdown mt-4 mb-3">
          <Col
            xs={12}
            lg={6}
            className="screen__event-countdown-top mb-3 mb-lg-0"
          >
            <div className="months">
              <div className="months__num">{months}</div>
              <div className="months__label">Months</div>
            </div>
            <div className="days">
              <div className="days__num">{days}</div>
              <div className="days__label">Days</div>
            </div>
            <div className="hours">
              <div className="hours__num">{hours}</div>
              <div className="hours__label">Hours</div>
            </div>
          </Col>
          <Col xs={12} lg={6} className="screen__event-countdown-bottom">
            <div className="minutes">
              <div className="minutes__num">{mins}</div>
              <div className="minutes__label">Minutes</div>
            </div>
            <div className="seconds">
              <div className="seconds__num">{seconds}</div>
              <div className="seconds__label">Seconds</div>
            </div>
          </Col>
        </Row>
        <DeleteConfirmModal />
      </Container>
    </Col>
  );
};
