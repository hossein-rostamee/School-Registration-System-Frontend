import React, { useState } from 'react';
import { Modal, Row, Col, Form, Button, Container }  from 'react-bootstrap';
import { styled } from 'styled-components';

const maxLength = 30 

const ColDiv = styled.div`
    /* position: relative;
    .validation-text {
        position: absolute;
        bottom: -22px;
        right: 2px;
    } */
    label {
        margin-bottom: 5px;
    }
`;

export default function RegisterFormText ( { textField, setTextField, label, placeholder, id, name, lg, sm, md, xs, wordsError, lengthError, emptyError, emptyErrorValid = true } ) {

    const [ errors, setErrors ] = useState({
        words  : false,
        length : false,
        empty  : true,
    });

    const [ formTextColor, setFormTextColor ] = useState( emptyErrorValid ? "text-danger" :  "text-info" )

    const handleChange = ( e ) => {

        const string = e.target.value
        const regex1 = /^[A-Za-z0-9۰-۹]+\s*[A-Za-z0-9۰-۹]*\s*[A-Za-z0-9۰-۹]*\s*[A-Za-z0-9۰-۹]*\s*$/;
        const regex2 = /^[\u0600-\u06FF]+\s*[\u0600-\u06FF]+\s*[A-Za-z0-9۰-۹]+\s*[\u0600-\u06FF]*$/;
        const regex3 = /^[A-Za-z0-9]+\s*[\u0600-\u06FF]+\s*[A-Za-z0-9۰-۹]*\s*$/
        const regex4 = /^\s*$/;
        
        if ( string == "" && emptyErrorValid ) {
            setErrors( s => ({ ...s, empty : true }) )
            setTextField( string  )
            setFormTextColor( "text-danger" )
            return;
        }
        
        if 
        (  
            string.match( regex1 ) && wordsError ||
            string.match( regex2 ) && wordsError ||
            string.match( regex3 ) && wordsError || 
            string.match( regex4 ) && wordsError 
        ) 
        {
            setErrors( s => ({ ...s, words : true, empty : false  }) )
            setFormTextColor( "text-danger" )
            setTextField( "__ERR__"  )
            return;
        }
        
        if ( string.length > maxLength && lengthError ) {
            setErrors( s => ({ length : true, words : false, empty: false }) )
            setFormTextColor( "text-danger" )
            setTextField( "__ERR__"  )
            return;
        } 
        
        
        setErrors( { words : false, length : false, empty : false } )
        setTextField( string )
        setFormTextColor( "text-info" )
    }
    

    return (
        <Col lg={lg} sm={sm} md={md} xs={xs} >
            <ColDiv>
                <Form.Group>
                    <Form.Label className="text-center">{label}</Form.Label>
                    <Form.Control
                        type        = "text"
                        id          = { id }
                        name        = { name }
                        placeholder = { placeholder }
                        onChange    = { handleChange }
                    />
                    <Form.Text className={`validation-text ${ formTextColor } `}>
                        {
                            errors.empty  ? emptyError  : 
                            errors.words  ? wordsError  :
                            errors.length ? lengthError : "معتبر است" 
                        }
                    </Form.Text>
                </Form.Group>
            </ColDiv>
        </Col>
    );
}