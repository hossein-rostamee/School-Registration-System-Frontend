import React from "react";
import { Col, Button, Row, Container, Card, Form, ListGroup, Modal} from 'react-bootstrap';
import styled from 'styled-components'

const MainDiv = styled( Modal )`
    direction: rtl;
    font-family: 'iran-sans';
    .modal-footer {
        justify-content: center;
    }
    .btn-close {
        margin-left: 0;
        display: none;
    }
    .modal-body {
        font-size: large;
    }
    .modal-title {
        color: red;
    }
`

export default function DeleteWarning({ show, handleDeleteWarning, type }) {
    
    return <MainDiv show={show} animation={true} >
        <Modal.Header closeButton>
          <Modal.Title>هشدار</Modal.Title>
        </Modal.Header>
        <Modal.Body>{ `آیا از حذف  ${ type } مطمئن هستید ؟‌` }</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteWarning} id="no"> 
            خیر
          </Button>
          <Button variant="primary" onClick={handleDeleteWarning} id="yes">
            بله
          </Button>
        </Modal.Footer>
    </MainDiv>
}