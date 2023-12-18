import { styled } from "styled-components";
import React, { useState } from 'react';
import { Modal, Row, Col, Form, Button, Container }  from 'react-bootstrap';

const ColDiv = styled.div`
    
    label {
        margin-bottom: 5px;
    }
`
export default function RegisterFormSelect ( { selectedField, setSelectedField ,label, id, name, lg, sm, md, xs, options } ) {

    if ( selectedField == "" ) {
        setSelectedField( options[0].label )
    }
    
    const handleChange = ( e ) => {
        const string = e.target.value 
        setSelectedField( string )
    }
    
    return (
        <Col lg={lg} sm={sm} md={md} xs={xs} >
            <ColDiv>
                <Form.Group>
                    <Form.Label className="text-center">{label}</Form.Label>
                    <Form.Select id = { id } onChange = { handleChange } >
                        {
                            options.map( option => <option
                                                        name  = { name      }
                                                        id    = { option.id }
                                                        key   = { option.id }
                                                    >
                                                        {option.label}
                                                    </option>
                            )
                        }
                    </Form.Select>
                </Form.Group>
            </ColDiv>
        </Col>
    );
}