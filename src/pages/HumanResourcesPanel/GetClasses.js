import { styled, keyframes } from "styled-components";
import React, {
  useCallback,
  useState,
  useRef,
  useEffect,
  useContext,
} from "react";
import leaningman_right from "../../images/leaningmanright.png";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import leaningman_left from "../../images/leaningmanleft.png";
import Alert from "../../components/Alert";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Class from "./Class";
import Spinner from "react-bootstrap/Spinner";
import HumanResourcesContext from "./HumanResourcesContext";

const MainDiv = styled.div`
  width: 100%;
  min-height: 100%;
  position: relative;
  .size {
    height: 0px;
    width: 100%;
    margin-bottom: 100px;
  }
`;

export default function GetClasses() {
  const [classes, setClasses] = useState([]);
  const { loading, setLoading } = useContext(HumanResourcesContext);
  const location = useLocation();

  const handleGetClasses = (e) => {
    setLoading(true);
    axios
      .get(
        `http://185.206.93.9:8000/register/listclass/${location.state.username}/${location.state.password}/`
      )
      .then((res) => {
        setClasses(res.data);
        setLoading(false);
      });
  };

  useEffect(handleGetClasses, []);

  return (
    <MainDiv>
      <div className="size">
        <Container className="p-3" fluid>
          {classes.map((classItem) => (
            <Class
              classItem={classItem}
              handleGetClasses={handleGetClasses}
              key={classItem.id}
            />
          ))}
          {classes.length == 0 && !loading && (
            <h1 style={{ margin: "auto" }}>{"کلاس ای موجود نیست"}</h1>
          )}
        </Container>
      </div>
    </MainDiv>
  );
}
