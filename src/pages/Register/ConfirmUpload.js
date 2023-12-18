import React, { useState } from 'react';
import { Modal, Row, Col, Form, Button, Container, Popover, OverlayTrigger }  from 'react-bootstrap';
import { styled } from 'styled-components';


export default function ConfirmUpload ({ selectedFile, setSelectedFile, label, acceptedFormats, maxFileSize, id, name }) {

    const fileSizeExceeds = "حجم فایل بیشتر از حد مجاز است"
    const ftleTypeIsWrong = "فرمت فایل اشتباه است"
    const fileIsEmpty     = "باید یک فایل آپلود کنید"

    const [errors, setErrors] = useState(
        { empty : true, size : false, type : false }
    )
    
    const handleFileChange = (e) => {
        
        const file = e.target.files[0];

        if ( !file ) {
            setErrors( s => ( { ...s, empty : true } ) )
            return;
        } 
        if ( file.size > maxFileSize ) {
            setErrors( s => ( { ...s, empty : false, size : true  } ) )
            setSelectedFile( "__ERR__" )
            return;
        }  
        
        if ( file && file.type != 'image/jpeg' ) {
            setErrors( s => ( { empty : false, size : false, type : true  } ) )
            setSelectedFile( "__ERR__" )
            return;
        }
        setErrors( { empty : false, size : false, type : false } )
        setSelectedFile( file )
    };
  

    return (
        <Col lg={6} md={12} sm={12} xs={12}>
            <Form.Group>
                <Form.Label>{ label }</Form.Label>
                <Form.Control
                    type="file"
                    accept={ acceptedFormats }
                    onChange={ handleFileChange }
                    id = { id }
                    name = { name }
                />
                <Form.Text className="text-danger">
                    {
                        errors.empty ? fileIsEmpty     :
                        errors.size  ? fileSizeExceeds :
                        errors.type  ? ftleTypeIsWrong : ""
                    }
                </Form.Text>
            </Form.Group>
        </Col>
    );

}



