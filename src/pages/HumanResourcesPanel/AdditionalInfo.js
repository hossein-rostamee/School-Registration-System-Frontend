import { styled, keyframes } from 'styled-components';
import React, { useCallback, useState, useRef, useEffect, useContext } from 'react';
import { Col, Button, Row, Container, Card, Form, Modal } from 'react-bootstrap';
import axios from 'axios';
import Alert from '../../components/Alert';
import HumanResourcesContext from './HumanResourcesContext';

const ModalDiv = styled(Modal)`
font-family: 'iran-sans';
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
@media screen and ( max-width : 576px ) {
  .modal-dialog {
      max-width: 90vw;
  }
  .modal-title {
    font-size: 16px;
  }
}
@media screen and ( max-width : 886px ) and ( min-width : 576px  ){
  .modal-dialog {
      max-width: 80vw;
  }
  .modal-title {
    font-size: 20px;
  }
} 

`

const RowDiv = styled.div`
    .form-check-input {
        float: right;

    }
    .form-check-label{
        margin-right: 25px;
    }
    font-size: 16px;
`

const ButtonDiv = styled.div`
margin: auto;
`

export default function AdditionalInfo({  modalShow, setModalShow, handleAddition, setClassId, classId }) {

    const { classes } = useContext(HumanResourcesContext)

    const handleChange = ( e ) => {
      setClassId( e.target.id )
    }

    const handleCloseButton = ( e ) => {
      setModalShow( false )
    }

    return (
        <ModalDiv
            show = {modalShow}
            aria-labelledby = "example-custom-modal-styling-title"
            className = {`padding-off` }
        >
        <Modal.Body className="grid-example">
            <Container>
            <RowDiv>
                <Form.Group>
                    <Form.Label>{ " کلاس دانش آموز را مشخص کنید :‌" }</Form.Label>
                    <Row className='gx-3 gy-3 mt-1'>
                    {
                      classes.map( classItem => (
                        <Col lg={4} md={4} sm={6} xs={12}>
                        <Form.Check
                          type     = 'radio'
                          label    = { classItem.name }
                          onChange = { handleChange }
                          id       = { classItem.id }
                          name     = "class"
                          checked  = { classId == classItem.id }
                        />
                        </Col>
                      ))
                    }
                    </Row>
                </Form.Group>
            </RowDiv>
            </Container>
        </Modal.Body>
        <Modal.Footer className='mt-2'>
            <ButtonDiv>
                <Button onClick={ handleAddition }  variant='success' className='m-2'>ثبت نهایی</Button>
                <Button onClick={ handleCloseButton } variant='danger'>
                    انصراف
                </Button>
            </ButtonDiv>
        </Modal.Footer>
        </ModalDiv>
    );
}