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
import {
  Col,
  Button,
  Row,
  Container,
  Card,
  Form,
  Accordion,
  ListGroup,
} from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import leaningman_left from "../../images/leaningmanleft.png";
import Alert from "../../components/Alert";
import axios from "axios";
import HumanResourcesContext from "./HumanResourcesContext";
import ImageComponent from "../../components/ImageComponent";
import AdditionalInfo from "./AdditionalInfo";
import convertToJalaali from "../../components/convertToJalaali";
import Spinner from "react-bootstrap/Spinner";
import DeleteWarning from "../../components/DeleteWarning";
import VolunteerListGroup from "./VolunteerListGroup";
import AlertContext from "./AlertContext";
import VolunteerForm from "./VolunteerForm";

const TitleDiv = styled.div`
  font-weight: bold;
  font-size: 18px;
  padding: 5px;
  display: inline-block;
  @media screen and (max-width: 1000px) {
    font-size: 16px;
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
`;

const MainDiv = styled.div`
  margin: 0;
  margin-bottom: 30px;
  filter: drop-shadow(0 0 8px rgba(0, 0, 0, 0.1));
`;
const ImageDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0;
  width: 100%;
  margin: 10px;
  .personel-photo {
  }
  .birth-certificate {
    width: 300px;
  }
`;

const AccordionDiv = styled.div`
  .accordion-button {
    direction: rtl;
    text-align: right;
    line-height: 1.5rem;
    padding: 14px 16px;
    font-size: 1.15rem;
  }
  .accordion-button::after {
    margin: 0 auto 0 0;
  }
  @media screen and (max-width: 1000px) {
    .accordion-button {
      font-size: 16px;
    }
  }
`;

export default function Volunteer(props) {
  const { classes, loading, setLoading } = useContext(HumanResourcesContext);
  const [classId, setClassId] = useState(classes[0].id);
  const [modalShow, setModalShow] = useState(false);
  const [deleteWarningShow, setDeleteWarningShow] = useState(false);
  const [deleteWarning, setDeleteWarning] = useState(false);
  const { setSuccessShow, setMessage, setSuccess } = useContext(AlertContext);
  const location = useLocation();

  const questions = [
    {
      question: "سطح تحصیلات اعضای خانواده (پدر ، مادر ، برادر، خواهر):",
      answer: props.volunteer.whatIsParentsGrade,
    },
    {
      question: "چطور یا توسط چه کسی با موسسه آموزشی آشنا شدید؟ ",
      answer: props.volunteer.howDidGetToKnowQuranSessions,
    },
    {
      question: "چه کسی شما را برای آمدن به این موسسه آموزشی تشویق می کند ؟",
      answer: props.volunteer.WhoEncourageYouToComeQuranSessions,
    },
    {
      question:
        "آيا با موسسات آموزشی ديگري آشنايي داشته و در آنها شركت مي كرده ايد؟ ( در صورت جواب مثبت شرح مختصري از نوع فعاليت آنها بيان فرماييد.)",
      answer: props.volunteer.WhichSessionDidYouParticipate,
    },
    {
      question: "به انجام چه ورزش هایی علاقمند هستید؟",
      answer: props.volunteer.WhichSportsDoYouInterestedIn,
    },
    {
      question: "به كدامیك از امور آموزشی و هنری علاقمند هستید ؟",
      answer: props.volunteer.WhichCulturalActivitiesDoYouInterested,
    },
    {
      question: "در چه سطحی از زمینه های بالا مهارت دارید ؟",
      answer: props.volunteer.WhatLevelofSkillDoYouHaveInCulturalActivity,
    },
    {
      question: "زمینه هایی که علاقه دارید را تیک بزنید",
      answer: props.volunteer.WhichFieldsDoYouTalentedIn,
    },
    {
      question: "میزان آشنایی شما با موسسه تا چه اندازه است؟",
      answer: props.volunteer.HowMuchDoYouFamiliarWithQuran,
    },
    {
      question:
        "علاقمند به فعالیت دراوقات فراغت و فوق برنامه ی خود در كدام یك از بخش های زیر می‌باشید؟  ",
      answer: props.volunteer.WhichCommitionsDoYouInterestedIn,
    },
    {
      question: "اوقات فراغت خود را چگونه می‌گذرانید؟",
      answer: props.volunteer.HowDoYouSpendYourHolidays,
    },
    {
      question: "آخرین کتاب هایی که خواندید را نام ببرید ؟ ",
      answer: props.volunteer.WhichBooksDoYouRecentlyRead,
    },
    {
      question: "علاقه مند به مطالعه کتاب با چه موضوعاتی هستید ؟",
      answer: props.volunteer.WhichBooksDoYouLikeToRead,
    },
    {
      question:
        "دو نفر از دوستان نزدیک خود در کلاس و دو نفر بیرون از کلاس را نام ببرید؟",
      answer: props.volunteer.WriteTheNamesOfYourTwoFriends,
    },
  ];

  const [fullName, set_fullName] = useState(props.volunteer.fullName);
  const [fatherName, set_fatherName] = useState(props.volunteer.fatherName);
  const [birthCity, set_birthCity] = useState(props.volunteer.birthCity);
  const [schoolName, set_schoolName] = useState(props.volunteer.schoolName);
  const [classNumber, set_classNumber] = useState(props.volunteer.classNumber);
  const [birthDate, set_birthDate] = useState(props.volunteer.birthDate);
  const [nationalCode, set_nationalCode] = useState(
    props.volunteer.nationalCode
  );
  const [fatherPhoneNumber, set_fatherPhoneNumber] = useState(
    props.volunteer.fatherPhoneNumber
  );
  const [motherPhoneNumber, set_motherPhoneNumber] = useState(
    props.volunteer.motherPhoneNumber
  );
  const [schoolShift, set_schoolShift] = useState(props.volunteer.schoolShift);
  const [religion, set_religion] = useState(props.volunteer.religion);
  const [grade, set_grade] = useState(props.volunteer.grade);

  const handleAddition = (e) => {
    setModalShow(false);
    setLoading(true);
    const sentForm = new FormData();
    sentForm.append("volunteer_id", props.volunteer.id);
    sentForm.append("class_id", classId);
    axios
      .post(
        `http://185.206.93.9:8000/register/register_student/${location.state.username}/${location.state.password}/`,
        sentForm
      )
      .then((res) => {
        if (res.data == "saved") {
          axios
            .get(
              `http://185.206.93.9:8000/register/list/delete/${props.volunteer.id}/${location.state.username}/${location.state.password}/`
            )
            .then((res) => {
              setLoading(false);
              setMessage("داوطلب با موفقیت به عنوان دانش آموز ثبت شد");
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
                props.setVolunteers((s) =>
                  s.filter((v) => v.id !== props.volunteer.id)
                );
              }, 200);
            });
        } else {
          return;
        }
      });
  };

  const handleUpdation = (e) => {
    props.volunteer.fullName = fullName;
    props.volunteer.fatherName = fatherName;
    props.volunteer.birthCity = birthCity;
    props.volunteer.schoolName = schoolName;
    props.volunteer.classNumber = classNumber;
    props.volunteer.birthDate = birthDate;
    props.volunteer.nationalCode = nationalCode;
    props.volunteer.fatherPhoneNumber = fatherPhoneNumber;
    props.volunteer.motherPhoneNumber = motherPhoneNumber;
    props.volunteer.schoolShift = schoolShift;
    props.volunteer.religion = religion;
    props.volunteer.grade = grade;

    const sentFormData = new FormData();
    for (const name in props.volunteer) {
      sentFormData.append(name, props.volunteer[name]);
    }

    setLoading(true);
    axios
      .post(
        `http://185.206.93.9:8000/register/list/update/${props.volunteer.id}/${location.state.username}/${location.state.password}/`,
        sentFormData
      )
      .then((res) => {
        setLoading(false);
      });
    // .catch((err) => console.log(err));
  };

  const handleClick = (e) => {
    setModalShow(true);
  };

  const handleDeleteWarning = (e) => {
    setDeleteWarning(false);
    setTimeout(() => {
      setDeleteWarningShow(false);
    }, 300);
    if (e.target.id == "yes") {
      setLoading(true);
      axios
        .get(
          `http://185.206.93.9:8000/register/list/delete/${props.volunteer.id}/${location.state.username}/${location.state.password}/`
        )
        .then((res) => {
          setLoading(false);
          setMessage("داوطلب با موفقیت از لیست حذف شد");
          setSuccessShow(true);
          setTimeout(() => {
            setSuccess(true);
          }, 100);
          setTimeout(() => {
            setSuccess(false);
          }, 1000);
          setTimeout(() => {
            setSuccessShow(false);
          }, 2000);
          props.setVolunteers((s) =>
            s.filter((v) => v.id !== props.volunteer.id)
          );
        });
    }
  };

  const handleDeletion = (e) => {
    setDeleteWarningShow(true);
    setTimeout(() => {
      setDeleteWarning(true);
    }, 100);
  };

  const handleChange = (e) => {
    props.volunteer[e.target.id] = e.target.value;
  };

  return (
    <MainDiv>
      <Card className="border-0 p-2 m-2">
        <Container className="mt-2 mb-1" fluid>
          <Row className="gx-2 gy-2 m-1">
            <VolunteerForm
              label={"نام و نام خانوادگی :"}
              state={fullName}
              setState={set_fullName}
              id={"fullName"}
            />
            <VolunteerForm
              label={"نام پدر :"}
              state={fatherName}
              setState={set_fatherName}
              id={"fatherName"}
            />
            <VolunteerForm
              label={"کد ملی :‌"}
              state={nationalCode}
              setState={set_nationalCode}
              id={"nationalCode"}
            />
          </Row>
          <Row className="gx-2 gy-2 m-1">
            <VolunteerForm
              label={"مقطع تحصیلی :"}
              state={grade}
              setState={set_grade}
              id={"grade"}
            />
            <VolunteerForm
              label={"شماره کلاس مدرسه :"}
              state={classNumber}
              setState={set_classNumber}
              id={"classNumber"}
            />
            <VolunteerForm
              label={"محل تولد :"}
              state={birthCity}
              setState={set_birthCity}
              id={"birthCity"}
            />
          </Row>
          <Row className="gx-2 gy-2 m-1">
            <VolunteerForm
              label={"تاریخ تولد :"}
              state={birthDate}
              setState={set_birthDate}
              id={"birthDate"}
            />
            <VolunteerForm
              label={"مذهب :‌"}
              state={religion}
              setState={set_religion}
              id={"religion"}
            />
            <VolunteerForm
              label={"شماره همراه پدر :"}
              state={fatherPhoneNumber}
              setState={set_fatherPhoneNumber}
              id={"fatherPhoneNumber"}
            />
          </Row>
          <Row className="gx-2 gy-2 m-1">
            <VolunteerForm
              label={"شماره همراه مادر :"}
              state={motherPhoneNumber}
              setState={set_motherPhoneNumber}
              id={"motherPhoneNumber"}
            />
            <VolunteerForm
              label={"نام مدرسه :"}
              state={schoolName}
              setState={set_schoolName}
              id={"schoolName"}
            />
            <VolunteerForm
              label={"شیفت مدرسه :"}
              state={schoolShift}
              setState={set_schoolShift}
              id={"schoolShift"}
            />
          </Row>
        </Container>
        <Card className="w-auto m-3">
          <AccordionDiv>
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <h5>{"پاسخ پرسشنامه فردی"}</h5>
                </Accordion.Header>
                <Accordion.Body>
                  <Card.Body className="p-2">
                    <ListGroup>
                      {questions.map((item, index) => (
                        <VolunteerListGroup
                          question={item.question}
                          answer={item.answer}
                          key={index}
                        />
                      ))}
                    </ListGroup>
                  </Card.Body>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </AccordionDiv>
        </Card>

        <ImageDiv>
          <ImageComponent
            id={props.volunteer.id}
            key={props.volunteer.id}
            type={"personelPhoto"}
            object={"v"}
            className="personel-photo"
          />
          <ImageComponent
            id={props.volunteer.id}
            key={props.volunteer.id}
            type={"birthCertificate"}
            object={"v"}
            className="birth-certificate"
          />
        </ImageDiv>
        <Row className="gx-2 gy-2 p-2">
          <Col>
            <Button
              onClick={handleClick}
              className="btn-success w-100 p-4 pt-2 pb-2 "
              style={{ "font-size": "18px" }}
            >
              تبدیل به دانش آموز
            </Button>
          </Col>
          <Col>
            <Button
              onClick={handleDeletion}
              className="btn-danger w-100 p-4 pt-2 pb-2"
              style={{ "font-size": "18px" }}
            >
              حذف از لیست
            </Button>
          </Col>
          <Col>
            <Button
              onClick={handleUpdation}
              className="btn-Info w-100 p-4 pt-2 pb-2"
              style={{ "font-size": "18px" }}
            >
              بروز رسانی
            </Button>
          </Col>
        </Row>
        <Col style={{ margin: "auto" }}>
          <TitleDiv>{"تاریخ تکمیل فرم :"}</TitleDiv>
          <ContentDiv>{convertToJalaali(props.volunteer.date)}</ContentDiv>
        </Col>
      </Card>

      {
        <AdditionalInfo
          modalShow={modalShow}
          setModalShow={setModalShow}
          handleAddition={handleAddition}
          setClassId={setClassId}
          classId={classId}
        />
      }
      {deleteWarningShow && (
        <DeleteWarning
          handleDeleteWarning={handleDeleteWarning}
          show={deleteWarning}
          type={props.volunteer.fullName}
        />
      )}
    </MainDiv>
  );
}
