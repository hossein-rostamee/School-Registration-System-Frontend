import React, { useState } from 'react';
import { Modal, Row, Col, Form, Button, Container }  from 'react-bootstrap';
import { styled } from 'styled-components';

const RowDiv = styled.div`
    .form-check-input {
        float: right;

    }
    .form-check-label{
        margin-right: 40px;
    }
    .form-check {
        padding: 0;
    }
    input[ type = "checkbox" ] {
        border: 2px solid dodgerblue;
    }
`

export default function ConfirmCheckBox ( { checked, setChecked, id, label, name } ) {
    const handleChange = ( e ) => {
        setChecked( !checked )
    }

    return (
        <RowDiv>
            <Row className='mt-0'>
                <Form.Group>
                    <Row className='gx-3 gy-3 mt-0'>
                        <Col lg={12} >
                            <Form.Check
                                type      ='switch'
                                name      = { name }
                                id        = { id   }
                                label     = { label }
                                key       = { id  }
                                checked   = { checked }
                                onChange  = { handleChange }
                                className = 'p-1'
                            />
                           <Form.Text className={`validation-text text-danger`}>
                            {
                                !checked ? "باید این قسمت را تیک بزنید" : null
                            }
                            </Form.Text>
                        </Col>
                        
                    </Row>
                </Form.Group>
            </Row>
        </RowDiv>
    )
}