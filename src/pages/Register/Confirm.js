import React, { useState, useContext } from "react";
import { Modal, Row, Col, Form, Button, Container } from "react-bootstrap";
import { styled } from "styled-components";
import ConfirmUpload from "./ConfirmUpload";
import ConfirmCheckBox from "./ConfirmCheckBox";
import ConfirmCaptcha from "./ConfirmCaptcha";
import Alert from "../../components/Alert";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FormContext from "./RegisterFormContext";
import MainDivContext from "./RegisterMainDivContext";

const ModalDiv = styled(Modal)`
  font-family: "iran-sans";
  letter-spacing: 0.05ch;
  direction: rtl;
  .modal-dialog {
    display: flex;
    justify-content: center;
    max-width: 60vw;
    margin-right: auto;
    margin-left: auto;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .modal-header {
    padding-right: 25px;
    border-bottom: 1px solid #9c7406;
  }
  .modal-footer {
    border: 0;
  }
  .modal-content {
    background-color: #e6c363;
  }
  @media screen and (max-width: 576px) {
    .modal-dialog {
      max-width: 90vw;
    }
    .modal-title {
      font-size: 16px;
    }
  }
  @media screen and (max-width: 886px) and (min-width: 576px) {
    .modal-dialog {
      max-width: 80vw;
    }
    .modal-title {
      font-size: 20px;
    }
  }
`;

const ButtonDiv = styled.div`
  margin: auto;
`;
const maxFileSize = "5000000";

export default function Confirm({ modalShow, setModalShow }) {
  const formFields = useContext(FormContext);
  const { personelPhoto, birthCertificate, agreementCheck, captcha } =
    formFields[2];

  const requiredStates = [
    birthCertificate.state,
    personelPhoto.state,
    agreementCheck.state,
    captcha.state,
  ];

  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const { mainDiv, setSuccess, setSuccessShow } = useContext(MainDivContext);
  const [registerButtonLabel, setRegisterButtonLabel] =
    useState("ثبت نام نهایی");

  function submitForm(form) {
    setRegisterButtonLabel("در حال ثبت نام");
    const formValues = {};
    form.forEach((states) => {
      for (const key in states) {
        formValues[key] = states[key].state;
      }
    });
    const sentFormData = new FormData();
    for (const name in formValues) {
      sentFormData.append(name, formValues[name]);
    }
    axios
      .post("http://185.206.93.9:8000/register/", sentFormData)
      .then((res) => {
        if (res.data == "received") {
          setSuccessShow(true);
          setTimeout(() => {
            setSuccess(true);
          }, 500);
          mainDiv.current.className += " blur";
          setModalShow(false);
          setTimeout(() => {
            setSuccess(false);
            navigate("/", { replace: true });
          }, 2500);
        } else {
          setError(true);
          setTimeout(() => {
            setError(false);
          }, 2000);
        }
      });
  }

  const handleClick = (e) => {
    let err = false;
    requiredStates.forEach((state) => {
      if (!state || state === "__ERR__") {
        err = true;
      }
    });
    if (err) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2000);
    } else {
      submitForm(formFields);
    }
  };

  const handleCloseButton = () => {
    setModalShow(false);
    setTimeout(() => {
      personelPhoto.setState(null);
      birthCertificate.setState(null);
      agreementCheck.setState(false);
      captcha.setState(false);
    }, 1000);
  };

  return (
    <ModalDiv
      show={modalShow}
      aria-labelledby="example-custom-modal-styling-title"
      className={`padding-off`}
    >
      <Modal.Header>
        <Modal.Title
          id="contained-modal-title-vcenter"
          style={{ margin: "auto" }}
        >
          {"برای ثبت نام نهایی فایل های زیر آپلود کنید"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="grid-example">
        <Container>
          <Row className="gx-3 gy-3 mt-1">
            <ConfirmUpload
              label={"فایل عکس سه در چهار خود را بارگذاری کنید"}
              acceptedFormats={".jpg"}
              maxFileSize={maxFileSize}
              id={"personelPhoto"}
              name={"personelPhoto"}
              selectedFile={personelPhoto.state}
              setSelectedFile={personelPhoto.setState}
            />
            <ConfirmUpload
              label={"تصویر صفحه اول شناسنامه خود را بارگذاری کنید"}
              acceptedFormats={".jpg"}
              maxFileSize={maxFileSize}
              id={"birthCertificate"}
              name={"birthCertificate"}
              selectedFile={birthCertificate.state}
              setSelectedFile={birthCertificate.setState}
            />
            <ConfirmCheckBox
              label={
                " اینجانب تقاضای عضویت در  موسسه فرهنگی آموزشی بوعلی سینا  را با ضوابط مربوطه دارم ."
              }
              id={"agreementCheck"}
              name={"agreementCheck"}
              checked={agreementCheck.state}
              setChecked={agreementCheck.setState}
            />
            <ConfirmCaptcha
              captcha={captcha.state}
              setCaptcha={captcha.setState}
            />
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <ButtonDiv>
          <Button onClick={handleClick} variant="success" className="m-2">
            {registerButtonLabel}
          </Button>
          <Button onClick={handleCloseButton} variant="danger">
            انصراف
          </Button>
        </ButtonDiv>
      </Modal.Footer>
      <Alert
        visible={error}
        type="error"
        message={"ابتدا خطاهای داخل فرم را برطرف کنید"}
      />
    </ModalDiv>
  );
}
