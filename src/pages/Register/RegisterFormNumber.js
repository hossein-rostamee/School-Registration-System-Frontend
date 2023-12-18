import { styled } from "styled-components";
import React, { useState } from 'react';
import { Modal, Row, Col, Form, Button, Container }  from 'react-bootstrap';

const maxLength = 15

const ColDiv = styled.div`
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }

    input[type="number"] {
        /* -moz-appearance: textfield; */
    }
    
    label {
        margin-bottom: 5px;
    }
`
export default function RegisterFormNumber ( { numberField, setNumberField, label, id, name, placeholder, lg, sm, md, xs, lengthError, emptyError } ) {


    const [ errors, setErrors ] = useState({
        length : false,
        empty  : true,
    });

    const [ formTextColor, setFormTextColor ] = useState( "text-danger" )

    const handleChange = ( e ) => {

        const string = e.target.value 

        if ( string == "" ) {
            setErrors( s => ({ ...s, empty : true }) )
            setNumberField( string  )
            setFormTextColor( "text-danger" )
            return;
        }
        
        
        if ( string.length > maxLength ) {
            setErrors( s => ({ length : true, words : false, empty: false }) )
            setNumberField( "__ERR__"  )
            setFormTextColor( "text-danger" )
            return;
        } 
        
        
        setErrors( { length : false, empty : false } )
        setNumberField( string )
        setFormTextColor( "text-info" )
    }
    
    return (
        <Col lg={lg} sm={sm} md={md} xs={xs} >
            <ColDiv>
                <Form.Group>
                    <Form.Label className="text-center">{label}</Form.Label>
                    <Form.Control
                        type        = "number"
                        id          = { id }
                        name        = { name }
                        maxlength   = { 5 }
                        placeholder = { placeholder }
                        onChange    = { handleChange }
                    />
                    <Form.Text className={`validation-text ${ formTextColor } `}>
                        {
                            errors.empty  ? emptyError  : 
                            errors.length ? lengthError : "معتبر است" 
                        }
                    </Form.Text>
                </Form.Group>
            </ColDiv>
        </Col>
    );
}