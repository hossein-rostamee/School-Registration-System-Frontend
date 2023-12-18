import React, { useState } from 'react';
import { Modal, Row, Col, Form, Button, Container }  from 'react-bootstrap';
import { styled } from 'styled-components';

const QuesionBox = styled.div`
    @media screen and ( max-width : 576px ) {
        textarea {
            height: 80px;
        }
    }
    textarea {
        color: gray;
    }
`

export default function QuestionnaireTextArea ({ id, name, rows, cols, label, state : textarea ,setState : setTextarea }) {

    const handleOnChangeTextarea = ( event ) => {
        setTextarea( event.target.value )
    }

    label = "\u270D" + "  " + label;

    return (
        <QuesionBox>
            <Row className='mt-4'>
                <Col>
                <Form.Group>
                    <Form.Label>{ label }</Form.Label>
                    <Form.Control
                        as = "textarea"
                        rows  = { rows }
                        cols  = { cols }
                        name = { name }
                        id = { name }
                        value = { textarea }
                        onChange = { handleOnChangeTextarea }
                        className='textarea-phone'
                    />
                </Form.Group>
                </Col>
            </Row>
        </QuesionBox>
    );
} 