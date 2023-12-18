import React, { useState } from 'react';
import { Modal, Row, Col, Form, Button, Container }  from 'react-bootstrap';
import { styled } from 'styled-components';

const RowDiv = styled.div`
    .form-check-input {
        float: right;

    }
    .form-check-label{
        margin-right: 25px;
    }
`
export default function QuestionnaireCheckBox ({ state : answers, setState : setAnswers, label, options, name, id, ...size }) {

    const handleChange = ( e ) => {
        const item = e.target 
        if ( item.checked && !answers.includes( item.name ) ) {
            setAnswers( [ ...answers, item.name ])
        }
        else if ( !item.checked && answers.includes( item.name ) ) {
            setAnswers( answers.filter( elem => elem !== item.name ) )
        }
    }

    label = "\u270D" + "  " + label;

    return (
        <RowDiv>
            <Row className='mt-4'>
                <Form.Group>
                <Form.Label>{ label }</Form.Label>
                    <Row className='gx-3 gy-3 mt-1'>
                        {
                            options.map( option =>
                                (
                                    <Col {...size} >
                                        <Form.Check
                                            type='checkbox'
                                            name  = { option.label  }
                                            id    = { option.id    }
                                            label = { option.label }
                                            key   = { option.key   }
                                            onChange = { handleChange }
                                            checked  = { answers.includes( option.label ) }
                                        />
                                    </Col>
                                ))
                        }
                    </Row>
                </Form.Group>
            </Row>
        </RowDiv>
    );
}