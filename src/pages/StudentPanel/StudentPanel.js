import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import { styled, keyframes } from "styled-components";
import React, { useCallback, useState, useRef, useEffect } from "react";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import Alert from "../../components/Alert";
import "animate.css";
import { useLocation, useNavigate } from "react-router-dom";
import ProtecteRoute from "../../components/ProtectRoute";
import Spinner from "react-bootstrap/Spinner";
import StudentPanelDashboard from "./StudentPanelDashboard";
import StudentPanelHeader from "./StudentPanelHeader";
import StudentPanelToolbar from "./StudentPanelToolbar";
import StudentPanelContext from "./StudentPanelContext";
import StudentPanelContent from "./StudentPanelContent";

const MainDiv = styled.div`
  font-family: "iran-sans";
  letter-spacing: 0.05ch;
  width: 100vw;
  min-height: 100vh;
  margin: 0;
  overflow: auto;

  display: grid;
  grid-template: 70px auto / 250px auto;
  justify-content: stretch;
  align-content: stretch;
  grid-template-areas:
    "dashbord  header"
    "dashbord content";

  overflow: hidden;
  position: fixed;
  direction: rtl;
  label {
    color: black;
  }

  & {
    input,
    select {
      border: 0.5px #29072e solid !important;
    }
  }

  @media screen and (max-width: 800px) {
    grid-template: 40px 70px auto / auto;
    grid-template-areas:
      "toolbar"
      "header"
      "content";
  }
`;

const SpinnerDiv = styled.div`
  position: relative;
  height: auto;
  width: auto;
  grid-area: content;
  background-color: black;
  opacity: 0.5;
  display: flex;
  justify-content: center;
  align-items: center;
  .spinner {
    opacity: 1 !important;
    width: 100px;
    color: green;
    height: 100px;
    margin-bottom: 300px;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 50000;
  animation: show 1s;
  @keyframes show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @media screen and (min-width: 800px) {
    display: none;
  }
`;

export default function StudentPanel() {
  const [loading, setLoading] = useState(false);
  const [getClasses, setGetClasses] = useState(false);
  const [getStudents, setGetStudents] = useState(true);
  const location = useLocation();
  const [success, setSuccess] = useState(false);
  const [successShow, setSuccessShow] = useState(false);
  const [message, setMessage] = useState("");
  const [showDashboard, setShowDashboard] = useState(false);

  return (
    <MainDiv
      className={`input-border ${showDashboard ? "show-dashboard" : ""} `}
    >
      <ProtecteRoute url={"http://185.206.93.9:8000/register/login/"} />
      <StudentPanelContext.Provider
        value={{ loading, setLoading, setSuccessShow, setMessage, setSuccess }}
      >
        <StudentPanelHeader
          username={location.state ? location.state.username : ""}
          password={location.state ? location.state.password : ""}
          getClasses={getClasses}
          getStudents={getStudents}
        />
        <StudentPanelDashboard
          setGetClasses={setGetClasses}
          setGetStudents={setGetStudents}
          showDashboard={showDashboard}
        />
        <StudentPanelContent
          getClasses={getClasses}
          getStudents={getStudents}
        />
        <StudentPanelToolbar setShowDashboard={setShowDashboard} />
        {loading && (
          <SpinnerDiv>
            <Spinner animation="border" role="status" className="spinner" />
          </SpinnerDiv>
        )}
        {successShow && (
          <Alert
            visible={success}
            type="success"
            message={message}
            forPanel={true}
          />
        )}
        {showDashboard && (
          <Overlay
            onClick={() => {
              setShowDashboard(false);
            }}
          />
        )}
      </StudentPanelContext.Provider>
    </MainDiv>
  );
}
