import { styled } from "styled-components";
import { Modal, Row, Col, Form, Button, Container }  from 'react-bootstrap';
import React, { useCallback, useRef, useState } from 'react';
import {DateTimeInput, DateTimeInputSimple, DateInput, DateInputSimple} from 'react-hichestan-datetimepicker';


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

const DateDiv = styled.div`
    > div > div {
        border: 0;
        background-color: transparent;
        margin-left: 7px;
    }
`;

const DatePickerComponent = ({ dataTime, setDateTime, handleChange, id, name }) => {
      
    return (
        <DateDiv>
            <DateInput
                value      = { dataTime       }
                onChange   = { handleChange   }
                className  = { "form-control" }
                id         = { id             }
                name       = { name           }
            />
        </DateDiv>
    );
}

export default function RegisterFormDate ( { dateTime, setDateTime, label, id, name, lg, sm, md, xs, emptyError } ) {

    const [ errors, setErrors ] = useState({
        empty  : true,
    });

    const [ formTextColor, setFormTextColor ] = useState( "text-danger" );

    const handleChange = ( e ) => {

        const string = e.target.value 

        if ( string == "" ) {
            setErrors( s => ({ ...s, empty : true }) )
            setDateTime( string )
            setFormTextColor( "text-danger" )
            return;
        }
        
        setErrors( { length : false, empty : false } )
        setDateTime( string.split('T')[0] )
        setFormTextColor( "text-info" )
    }

    return (    
    <Col lg={lg} sm={sm} md={md} xs={xs} >
        <ColDiv>
            <Form.Group>
                <Form.Label className="text-center">{label}</Form.Label>
                <DatePickerComponent 
                    id           = { id }
                    name         = { name }
                    handleChange = { handleChange }
                    dataTime     = { dateTime }
                />
                <Form.Text className={`validation-text ${ formTextColor } `}>
                    {
                        errors.empty  ? emptyError  : "معتبر است" 
                    }
                </Form.Text>
            </Form.Group>
        </ColDiv>
    </Col>
    );
}