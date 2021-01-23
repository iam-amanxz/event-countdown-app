import React, { useState, useEffect } from "react";
import { Container, Card } from "react-bootstrap";
import moment from "moment";

import { useEvent } from "../../contexts/EventContext";

import "./activity-screen.css";

const ActivityScreen = () => {
  const { currentEvent, setShowEditModal, setShowDeleteModal } = useEvent();

  const date = new Date(
    currentEvent.date.year,
    currentEvent.date.month - 1,
    currentEvent.date.day,
    0,
    0,
    0,
    0
  );

  const [months, setMonths] = useState(0);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [mins, setMins] = useState(0);
  const [secs, setSecs] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(0);

  const [countdownOver, setCountdownOver] = useState(false);

  const countdown = () => {
    setMonths(Math.floor(totalSeconds / 2629746));
    setDays(Math.floor(totalSeconds / 3600 / 24));
    setHours(Math.floor(totalSeconds / 3600) % 24);
    setMins(Math.floor(totalSeconds / 60) % 60);
    setSecs(Math.floor(totalSeconds) % 60);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const eventDate = new Date(
        currentEvent.date.year,
        currentEvent.date.month - 1,
        currentEvent.date.day,
        0,
        0,
        0,
        0
      );
      const currentDate = new Date();
      setTotalSeconds((eventDate - currentDate) / 1000);

      if (totalSeconds < 0) {
        setCountdownOver(true);
      } else {
        setCountdownOver(false);
        countdown();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [currentEvent, totalSeconds]);

  return (
    <Container className="screen py-2 pt-md-5 pb-md-4 px-0">
      <Card className="screen-card">
        <div
          className="screen-card-overlay"
          style={{
            background: `url("${currentEvent.backgroundUrl}")`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        ></div>
        <Card.Header className="text-right activity-actions">
          <box-icon
            name="edit-alt"
            type="solid"
            style={{ marginRight: "15px" }}
            onClick={async () => {
              setShowEditModal(true);
            }}
          ></box-icon>
          <box-icon
            name="trash"
            type="solid"
            onClick={() => setShowDeleteModal(true)}
          ></box-icon>
        </Card.Header>
        <Card.Body className="p-3 p-md-5">
          <Card.Title className="screen__title">
            {currentEvent.title}
          </Card.Title>

          <Card.Text className="screen__date">
            {moment(date).format("Do MMM [,] YYYY")}
          </Card.Text>

          {countdownOver && (
            <h3 className="text-center mt-2 mt-md-5">Hurray! Its time..... </h3>
          )}

          {!countdownOver && (
            <div className="countdown">
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
              <div className="minutes">
                <div className="minutes__num">{mins}</div>
                <div className="minutes__label">Min</div>
              </div>
              <div className="seconds">
                <div className="seconds__num">{secs}</div>
                <div className="seconds__label">Sec</div>
              </div>
            </div>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ActivityScreen;
