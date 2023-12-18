import React, { useState } from 'react';
import Captcha from 'react-numeric-captcha';
import styled from 'styled-components'
import { Modal, Row, Col, Form, Button, Container }  from 'react-bootstrap';

const CaptchaDiv = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: row;
    
    .rnc {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 255px;
    background-color: #eee;
    border-radius: 6px;
    padding: 10px;
    box-sizing: border-box;
    }

    .rnc-row {
    display: flex;
    align-items: stretch;
    margin: 0 0 10px 0;
    }

    .rnc-column {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 0 0 0 10px;
    }

    .rnc-canvas {
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 4px;
    }

    .rnc-button {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    background: #fff;
    color: inherit;
    border: none;
    padding: 0;
    width: 25px;
    height: 20px;
    box-sizing: border-box;
    border-radius: 4px;
    transform: scale(2);
    margin-top: 16px;
    margin-right: 5px;
    }

    .rnc-button:last-child {
        display: none;
    }

    .rnc-button svg {
    width: 1em;
    height: 1em;
    fill: currentColor;
    }

    .rnc-input {
    border: none;
    padding: 10px 6px;
    font-size: 20px;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }

    input[type="number"] {
        /* -moz-appearance: textfield; */
    }
`

const ConfirmCaptcha = ( { captcha, setCaptcha }) => {

  const handleChange = ( value ) => {
    setCaptcha( value )
  }

  return (
    <CaptchaDiv>
      <Row>
        <Col lg={12} md={12} sm={12} xs={12}>
          <Captcha
              onChange={ handleChange }
              length={5}
              placeholder="کد بالا را در این قسمت وارد کنید" // optional
          />
          <Form.Text className={`validation-text text-danger `}>
          {
              !captcha ? "عدد موجود در تصویر را به درستی وارد کنید" : null
          }
          </Form.Text>
        </Col>
      </Row>
    </CaptchaDiv>
  );
};

export default ConfirmCaptcha;
