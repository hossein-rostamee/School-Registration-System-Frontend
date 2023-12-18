import { styled } from "styled-components";
import React, { useEffect, useRef, useState } from 'react';
import { Modal, Row, Col, Form, Button, Container }  from 'react-bootstrap';
import ShowAndHidePassword from '../../components/ShowAndHidePassword';

const ColDiv = styled.div`
    label {
        margin-bottom: 5px;
    }
`

const minlength = 10;

export default function RegisterFormPassword ( { id, name, placeholder, rowClassName, passField, setPassField, wordsError, lengthError, emptyError } ) {

    const [ passErrors, setPassErrors ] = useState({
        words  : false,
        length : false,
        empty  : true,
    });

    const [ confirmPassErrors, setConfirmPassErrors ] = useState({
        equality : false,
        empty    : true,
    });
    const [ formPassColor, setFormPassColor ]               = useState( "text-danger" )
    const [ formPassConfirmColor, setFormPassConfirmColor ] = useState( "text-danger" )
    const [ passFieldString, setPassFieldString ] = useState( "" )
    const confirmPassRefElement = useRef()
    
    useEffect( () => {
        handleChangeConfirmPass( { target : confirmPassRefElement.current } )  
    },[ passField ] )

    const handleChangePass = ( e ) => {

        const string = e.target.value
        const regex1 = new RegExp('^[\u0600-\u06FF]+$');
        const regex2 = new RegExp('^[\u0600-\u06FF]+[A-Za-z0-9۰-۹]+[\u0600-\u06FF]*$');
        const regex3 = new RegExp('^[A-Za-z0-9۰-۹]+[\u0600-\u06FF]+[A-Za-z0-9۰-۹]*$');
        const regex4 = new RegExp(' +'); 


        if ( string == "" ) {
            setPassErrors( s => ({ ...s, empty : true }) )
            setPassField( string  )
            setPassFieldString( "" )
            setFormPassColor( "text-danger" )
            return;
        }
        
        if 
        (  
            regex3.test( string ) || 
            regex1.test( string ) ||
            regex2.test( string ) ||
            regex4.test( string )  
        ) 
        {
            setPassErrors( s => ({ ...s, words : true, empty : false  }) )
            setFormPassColor( "text-danger" )
            setPassFieldString( "__ERR__" )
            setPassField( "__ERR__"  )
            return;
        }
        
        if ( string.length < minlength ) {
            setPassErrors( s => ({ length : true, words : false, empty: false }) )
            setFormPassColor( "text-danger" )
            setPassFieldString( "__ERR__" )
            setPassField( "__ERR__"  )
            return;
            
        } 

        setPassErrors( { words : false, length : false, empty : false } )
        setPassField( string )
        setPassFieldString( string )
        setFormPassColor( "text-info" )

    }

    const handleChangeConfirmPass = ( e ) => {
        
        const string = e.target.value
        if ( string == "" ) {
            setConfirmPassErrors( s => ({ ...s, empty : true }) )
            setFormPassConfirmColor( "text-danger" )
            setPassField( "__ERR__" )
            return;
        } 
        if ( string !== passFieldString ) {
            setConfirmPassErrors( s => ({ equality : true, empty : false }) )
            setFormPassConfirmColor( "text-danger" )
            setPassField( "__ERR__" )
            return;
        }
        setConfirmPassErrors( { equality : false, empty : false } )
        setPassField( passFieldString )
        setFormPassConfirmColor( "text-info" )

    }
    
    return (
        <Row className = { rowClassName }>
            <Col lg={6} sm={12} md={6} xs={12} >
                <ColDiv>
                    <Form.Group>
                        <Form.Label>{"گذرواژه"}</Form.Label>
                        <ShowAndHidePassword 
                                placeholder  = { placeholder } 
                                className    = { "form-control"} 
                                name         = { name }
                                id           = { id }
                                width        = { "25"}
                                height       = { "40"}
                                viewBox      = { "0 0 20 25"}
                                leftPos      = { "10px"}
                                handleChange = { handleChangePass }
                        />
                        <Form.Text className={`validation-text ${ formPassColor } `}>
                                {
                                    passErrors.empty  ? emptyError  : 
                                    passErrors.words  ? wordsError  : 
                                    passErrors.length ? lengthError : "معتبر است" 
                                }
                        </Form.Text>
                    </Form.Group>
                </ColDiv>
            </Col>
            <Col lg={6} sm={12} md={6} xs={12}  >
                <ColDiv>
                    <Form.Group>
                        <Form.Label>{"تایید گذرواژه"}</Form.Label>
                        <ShowAndHidePassword 
                                placeholder  = { "مجددا وارد کنید" } 
                                className    = { "form-control" } 
                                width        = { "25"}
                                height       = { "40"}
                                viewBox      = { "0 0 20 25"}
                                leftPos      = { "10px"}
                                handleChange = { handleChangeConfirmPass }
                                refValue     = { confirmPassRefElement }
                        />
                        <Form.Text className={`validation-text ${ formPassConfirmColor } `}>
                                {
                                    confirmPassErrors.empty    ? emptyError              : 
                                    confirmPassErrors.equality ? "با گذرواژه یکسان نیست" : "معتبر است" 
                                }
                        </Form.Text>
                    </Form.Group>
                </ColDiv>
            </Col>
        </Row>

    );
}

