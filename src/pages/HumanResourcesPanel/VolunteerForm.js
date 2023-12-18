import React from 'react'
import { styled, keyframes } from 'styled-components';
import { useCallback, useState, useRef, useEffect, useContext } from 'react';
import leaningman_right from '../../images/leaningmanright.png';
import { Col, Button, Row, Container, Card, Form, Accordion, ListGroup } from 'react-bootstrap';

const TitleDiv = styled.div`
    font-weight: bold;
    font-size: 18px;
    padding: 5px;
    display: inline-block;
    @media screen and ( max-width : 1000px ) {
        font-size: 16px;
    }
`

const ContentDiv = styled.div`
    font-weight: 100;
    font-size: 17px;
    display: inline-block;
    line-height: 2rem;
    @media screen and ( max-width : 1000px ) {
        font-size: 15px;
    }
    .without-border {
        border-width: 0 !important;
    }
`

export default function VolunteerForm( { label, id, state, setState } ) {
    
    const handleChange = ( e ) => {
        setState( e.target.value )
    }

    return (
        <Col lg={4} md={4} sm={4}  xs={12}>
            <TitleDiv>{ label }</TitleDiv>
            <ContentDiv>
                <Form.Control
                    type        = "text"
                    id          = { id           }
                    value       = { state        }
                    onChange    = { handleChange }
                    className   = { 'without-border' } 
                />
            </ContentDiv>
        </Col>
    );
}