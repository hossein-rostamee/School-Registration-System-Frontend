import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
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
import { useLocation } from "react-router-dom";
import HumanResourcesContext from "./HumanResourcesContext";
import ImageComponent from "../../components/ImageComponent";
import convertToJalaali from "../../components/convertToJalaali";
import AdditionalInfo from "./AdditionalInfo";
import Spinner from "react-bootstrap/Spinner";
import AlertContext from "./AlertContext";

const TitleDiv = styled.div`
  font-weight: bold;
  font-size: 18px;
  padding: 5px;
  display: inline-block;
  @media screen and (max-width: 1000px) {
    font-size: 16px;
  }
  @media screen and (max-width: 500px) {
    font-size: 14px;
  }
`;
const ContentDiv = styled.div`
  font-weight: 100;
  font-size: 17px;
  display: inline-block;
  line-height: 2rem;
  @media screen and (max-width: 1000px) {
    font-size: 15px;
  }
  @media screen and (max-width: 500px) {
    font-size: 13px;
  }
`;

const MainDiv = styled.div`
  margin: 0;
  margin-bottom: 30px;
  filter: drop-shadow(0 0 8px rgba(0, 0, 0, 0.1));
`;

export default function ClassStudentTumbnail(props) {
  const { classes, loading, setLoading } = useContext(HumanResourcesContext);
  const { setSuccessShow, setMessage, setSuccess } = useContext(AlertContext);
  const [classId, setClassId] = useState(classes[0].id);
  const [modalShow, setModalShow] = useState(false);
  const location = useLocation();

  const handleAddition = (e) => {
    setModalShow(false);
    setLoading(true);
    const sentForm = new FormData();
    sentForm.append("student_id", props.student.id);
    sentForm.append("class_id", classId);
    axios
      .post(
        `http://185.206.93.9:8000/register/listclass/changeClass/${location.state.username}/${location.state.password}/`,
        sentForm
      )
      .then((res) => {
        if (res.data == "changed") {
          setLoading(false);
          setMessage("کلاس دانش آموز با موفقیت تغییر پیدا کرد");
          setSuccessShow(true);
          setTimeout(() => {
            setSuccess(true);
          }, 100);
          setTimeout(() => {
            setSuccess(false);
          }, 1000);
          setTimeout(() => {
            setSuccessShow(false);
          }, 1500);
          setTimeout(() => {
            props.handleGetClasses();
          }, 200);
        } else {
          return;
        }
      });
  };

  const handleClick = (e) => {
    setModalShow(true);
  };

  return (
    <Container className="border-0 p-0 m-0">
      <Row className="gx-2 gy-2 p-2">
        <Col>
          <Row>
            <Col>
              <Col sm={12} xs={12}>
                <TitleDiv>{"نام و نام خانوادگی :"}</TitleDiv>
                <ContentDiv>{props.student.fullName} </ContentDiv>
              </Col>
              <Col sm={12} xs={12}>
                <TitleDiv>{"نام پدر :"}</TitleDiv>
                <ContentDiv> {props.student.fatherName} </ContentDiv>
              </Col>
              <Col sm={12} xs={12}>
                <TitleDiv>{"کد ملی :‌"}</TitleDiv>
                <ContentDiv>{props.student.nationalCode}</ContentDiv>
              </Col>
              <Col sm={12} xs={12}>
                <TitleDiv>{"تاریخ تولد :"}</TitleDiv>
                <ContentDiv>
                  {convertToJalaali(props.student.birthDate)}
                </ContentDiv>
              </Col>
            </Col>
            <Col>
              <Col sm={12} xs={12}>
                <TitleDiv>{"شماره همراه پدر :"}</TitleDiv>
                <ContentDiv>{props.student.fatherPhoneNumber}</ContentDiv>
              </Col>
              <Col sm={12} xs={12}>
                <TitleDiv>{"شماره همراه مادر :"}</TitleDiv>
                <ContentDiv>{props.student.motherPhoneNumber}</ContentDiv>
              </Col>
              <Col sm={12} xs={12}>
                <TitleDiv>{"مقطع تحصیلی :"}</TitleDiv>
                <ContentDiv>{props.student.grade}</ContentDiv>
              </Col>
              <Col sm={12} xs={12}>
                <TitleDiv>{"نام مدرسه :"}</TitleDiv>
                <ContentDiv>{props.student.schoolName}</ContentDiv>
              </Col>
              <Col sm={12} xs={12}>
                <TitleDiv>{"شیفت مدرسه :"}</TitleDiv>
                <ContentDiv>{props.student.schoolShift}</ContentDiv>
              </Col>
            </Col>
          </Row>
          <Row className="gx-2 gy-2 m-3">
            <Col className="d-flex justify-content-center align-items">
              <Button
                onClick={handleClick}
                className="w-100 btn-primary"
                style={{ "font-size": "18px" }}
              >
                {"تغییر کلاس"}
              </Button>
            </Col>
          </Row>
        </Col>
        <Col
          lg={4}
          className="m-auto d-flex justify-content-center align-items-center"
        >
          <ImageComponent
            id={props.student.id}
            key={props.student.id}
            type={"personelPhoto"}
            object={"s"}
          />
        </Col>
      </Row>
      <AdditionalInfo
        modalShow={modalShow}
        setModalShow={setModalShow}
        handleAddition={handleAddition}
        setClassId={setClassId}
        classId={classId}
      />
    </Container>
  );
}
