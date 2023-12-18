import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import { styled, keyframes } from 'styled-components';
import React, { useCallback, useState, useRef, useEffect, useContext } from 'react';
import { Col, Button, Row, Container, Card, Form, ListGroup, Accordion } from 'react-bootstrap';
import Alert from '../../components/Alert';
import axios from 'axios';
import ImageComponent from '../../components/ImageComponent';
import convertToJalaali from '../../components/convertToJalaali';
import ClassMateListGroup from './ClassMateListGroup';

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
`

const MainDiv = styled.div`
    margin: 0;
    margin-bottom: 30px;
    filter: drop-shadow(0 0 8px rgba( 0,0,0,0.1));
`
const ImageDiv = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    padding: 0;
    width: 100%;
    .personel-photo {

    }
    .birth-certificate {
        width: 300px;
    }
`

const AccordionDiv = styled.div`
    .accordion-button {
        direction: rtl;
        text-align: right;
        line-height: 1.5rem;
        padding: 14px 16px;
        font-size: 1.15rem;
    }
    .accordion-button::after {
        margin: 0 auto 0 0 ;
        
    }
    @media screen and ( max-width : 1000px ) {
        .accordion-button {
            font-size: 16px;
        }
    }
`


export default function Class(props) {

    return <MainDiv>
        <Card className='border-0 p-2 m-2'>
            <Container className='' fluid>
                <Row className='gx-2 gy-2 p-2'>
                    <Col lg={4} md={4} sm={4}  xs={12}>
                        <TitleDiv>{ "نام کلاس  :" }</TitleDiv>
                        <ContentDiv>{ props.classItem.name  } </ContentDiv>
                    </Col>
                    <Col lg={4} md={4} sm={4}  xs={12}>
                        <TitleDiv>{ "ساعت شروع :" }</TitleDiv>
                        <ContentDiv> { props.classItem.startTime } </ContentDiv>  
                    </Col>
                    <Col lg={4} md={4} sm={4}  xs={12}>
                        <TitleDiv>{ "ساعت پایان :" }</TitleDiv>
                        <ContentDiv>{ props.classItem.endTime  }</ContentDiv>
                    </Col>
                </Row>
                <Row className='gx-2 gy-2 p-2'>
                    <Col lg={4} md={4} sm={4}  xs={12}>
                        <TitleDiv>{ "مکان برگزاری :"}</TitleDiv>
                        <ContentDiv>{ props.classItem.location  }</ContentDiv>
                    </Col>
                    <Col lg={4} md={4} sm={4}  xs={12}>
                        <TitleDiv>{ "روز برگزاری در هفته :" }</TitleDiv>
                        <ContentDiv>{ props.classItem.dayInWeek }</ContentDiv>
                    </Col>
                    <Col lg={4} md={4} sm={4}  xs={12}>
                        <TitleDiv>{ "رده سنی :" }</TitleDiv>
                        <ContentDiv>{ props.classItem.grade  }</ContentDiv>
                    </Col>
                </Row>
                <Row className='gx-2 gy-2 p-2'>
                    <Col lg={12} md={12} sm={12}  xs={12}>
                        <TitleDiv>{ "جزئیات کلاس :" }</TitleDiv>
                        <ContentDiv>{ props.classItem.moreDetail  }</ContentDiv>
                    </Col>
                </Row>
                <Row className='gx-2 gy-2 p-2'>
                    <Col lg={12} md={12} sm={12}  xs={12}>
                        <TitleDiv>{ "نام معلم :" }</TitleDiv>
                        <ContentDiv>{ props.classItem.teacher  }</ContentDiv>
                    </Col>
                </Row>

            </Container>
            <Card className='w-auto m-3'>
            <AccordionDiv>
                    <Accordion >
                        <Accordion.Item eventKey='0'>
                            <Accordion.Header>
                                    <h5>{ "دانش آموزان حاضر در این کلاس" }</h5>
                            </Accordion.Header>
                            <Accordion.Body>
    
                                <Card.Body className='p-2'>
                                    <ListGroup>
                                    {
                                        props.classItem.students.map( ( item, index ) => (
                                            <ClassMateListGroup 
                                                student  = { item }
                                                key      = { index }
                                            />
                                            ) )
                                    }
                                    </ListGroup>
                                </Card.Body>
    
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </AccordionDiv>
            </Card>

        </Card>

    </MainDiv>
}


