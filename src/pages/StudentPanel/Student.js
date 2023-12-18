import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import { styled, keyframes } from 'styled-components';
import React, { useCallback, useState, useRef, useEffect, useContext} from 'react';
import { Col, Button, Row, Container, Card, Form, ListGroup, Accordion } from 'react-bootstrap';
import axios from 'axios';
import HumanResourcesContext from './StudentPanelContext';
import ImageComponent from '../../components/ImageComponent';
import convertToJalaali from '../../components/convertToJalaali';
import StudentAccordion from './StudentAccordion';
import DeleteWarning from '../../components/DeleteWarning';

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

export default function Student(props) {

    const questions = [
        {
            question: "سطح تحصیلات اعضای خانواده (پدر ، مادر ، برادر، خواهر):",
            answer: props.student.whatIsParentsGrade
        }
        , {
            question: "چطور یا توسط چه کسی با موسسه آموزشی آشنا شدید؟ ",
            answer: props.student.howDidGetToKnowQuranSessions
        }
        , {
            question: "چه کسی شما را برای آمدن به این موسسه آموزشی تشویق می کند ؟",
            answer: props.student.WhoEncourageYouToComeQuranSessions
        }
        , {
            question: "آيا با موسسات آموزشی ديگري آشنايي داشته و در آنها شركت مي كرده ايد؟ ( در صورت جواب مثبت شرح مختصري از نوع فعاليت آنها بيان فرماييد.)",
            answer: props.student.WhichSessionDidYouParticipate
        }
        , {
            question: "به انجام چه ورزش هایی علاقمند هستید؟",
            answer: props.student.WhichSportsDoYouInterestedIn
        }
        , {
            question: "به كدامیك از امور آموزشی و هنری علاقمند هستید ؟",
            answer: props.student.WhichCulturalActivitiesDoYouInterested
        }
        , {
            question: "در چه سطحی از زمینه های بالا مهارت دارید ؟",
            answer: props.student.WhatLevelofSkillDoYouHaveInCulturalActivity
        }
        , {
            question: "زمینه هایی که علاقه دارید را تیک بزنید",
            answer: props.student.WhichFieldsDoYouTalentedIn
        }
        , {
            question: "میزان آشنایی شما با موسسه تا چه اندازه است؟",
            answer: props.student.HowMuchDoYouFamiliarWithQuran
        }
        , {
            question: "علاقمند به فعالیت دراوقات فراغت و فوق برنامه ی خود در كدام یك از بخش های زیر می‌باشید؟  ",
            answer: props.student.WhichCommitionsDoYouInterestedIn
        }
        , {
            question: "اوقات فراغت خود را چگونه می‌گذرانید؟",
            answer: props.student.HowDoYouSpendYourHolidays
        }
        , {
            question: "آخرین کتاب هایی که خواندید را نام ببرید ؟ ",
            answer: props.student.WhichBooksDoYouRecentlyRead
        }
        , {
            question: "علاقه مند به مطالعه کتاب با چه موضوعاتی هستید ؟",
            answer: props.student.WhichBooksDoYouLikeToRead
        }
        , {
            question: "دو نفر از دوستان نزدیک خود در کلاس و دو نفر بیرون از کلاس را نام ببرید؟",
            answer: props.student.WriteTheNamesOfYourTwoFriends
        }
    ]

    return <MainDiv>
        <Card className='border-0 p-2 m-2'>
            <Container fluid>
                <Row>
                    <ImageDiv>
                        <ImageComponent 
                                id = { props.student.id } 
                                key = { props.student.id } 
                                type = { 'personelPhoto' }   
                                object = { 's' }
                                className = "personel-photo"
                        /> 
                        <ImageComponent 
                                id = { props.student.id } 
                                key = { props.student.id } 
                                type = { 'birthCertificate' } 
                                object = { 's' }
                                className = "birth-certificate"
                        /> 
                    </ImageDiv>
                </Row>
                <Row className='gx-2 gy-2 p-2'>
                    <Col lg={4} md={4} sm={4}  xs={12}>
                        <TitleDiv>{"نام و نام خانوادگی :"}</TitleDiv>
                        <ContentDiv>{ props.student.fullName } </ContentDiv>
                    </Col>
                    <Col lg={4} md={4} sm={4}  xs={12}>
                        <TitleDiv>{ "نام پدر :" }</TitleDiv>
                        <ContentDiv> { props.student.fatherName } </ContentDiv>  
                    </Col>
                    <Col lg={4} md={4} sm={4}  xs={12}>
                        <TitleDiv>{ "کد ملی :‌" }</TitleDiv>
                        <ContentDiv>{ props.student.nationalCode }</ContentDiv>
                    </Col>
                </Row>
                <Row className='gx-2 gy-2 p-2'>
                    <Col lg={4} md={4} sm={4}  xs={12}>
                        <TitleDiv>{ "مقطع تحصیلی :" }</TitleDiv>
                        <ContentDiv>{ props.student.grade  }</ContentDiv>
                    </Col>
                    <Col lg={4} md={4} sm={4}  xs={12}>
                        <TitleDiv>{ "نام کاربری :" }</TitleDiv>
                        <ContentDiv>{ props.student.user }</ContentDiv>
                    </Col>
                    <Col lg={4} md={4} sm={4}  xs={12}>
                        <TitleDiv>{ "رمز عبور :" }</TitleDiv>
                        <ContentDiv>{ props.student.passField }</ContentDiv>
                    </Col>
                </Row>
                <Row className='gx-2 gy-2 p-2'>
                    <Col lg={4} md={4} sm={4}  xs={12}>
                        <TitleDiv>{ "محل تولد :" }</TitleDiv>
                        <ContentDiv>{ props.student.birthCity }</ContentDiv>
                    </Col>
                    <Col lg={4} md={4} sm={4}  xs={12}>
                        <TitleDiv>{ "نام کلاس :‌" }</TitleDiv>
                        <ContentDiv>{ props.student.class_name  }</ContentDiv>
                    </Col>
                    <Col lg={4} md={4} sm={4}  xs={12}>
                        <TitleDiv>{ "تاریخ تولد :" }</TitleDiv>
                        <ContentDiv>{ convertToJalaali( props.student.birthDate ) }</ContentDiv>
                    </Col>
                </Row>
                <Row className='gx-2 gy-2 p-2'>
                    <Col lg={4} md={4} sm={4}  xs={12}>
                        <TitleDiv>{ "مذهب :‌" }</TitleDiv>
                        <ContentDiv>{ props.student.religion  }</ContentDiv>
                    </Col>
                    <Col lg={4} md={4} sm={4}  xs={12}>
                        <TitleDiv>{ "شماره همراه پدر :" }</TitleDiv>
                        <ContentDiv>{ props.student.fatherPhoneNumber  }</ContentDiv>
                    </Col>
                    <Col lg={4} md={4} sm={4} xs={12}>
                        <TitleDiv>{ "شماره همراه مادر :" }</TitleDiv>
                        <ContentDiv>{ props.student.motherPhoneNumber  }</ContentDiv>
                    </Col>
                </Row>
                <Row className='gx-2 gy-2 p-2'>
                    <Col lg={4} md={4} sm={4} xs={12}>
                        <TitleDiv>{ "نام مدرسه :" }</TitleDiv>
                        <ContentDiv>{ props.student.schoolName  }</ContentDiv>
                    </Col>
                    <Col lg={4} md={4} sm={4}  xs={12}>
                        <TitleDiv>{ "شیفت مدرسه :" }</TitleDiv>
                        <ContentDiv>{ props.student.schoolShift }</ContentDiv>
                    </Col>
                    <Col lg={4} md={4} sm={4} xs={12}>
                        <TitleDiv>{ "شماره کلاس مدرسه :" }</TitleDiv>
                        <ContentDiv>{ props.student.classNumber  }</ContentDiv>
                    </Col>
                </Row>

            </Container>
            <Card className='w-auto m-3'>
                <Card.Header>
                    <h5>{ "پاسخ پرسشنامه فردی" }</h5>
                </Card.Header>
                <Card.Body className='p-2'>
                    <Accordion defaultActiveKey="0" flush>
                    {
                        questions.map( ( item, index ) => (
                            <StudentAccordion 
                            question = { item.question }
                            answer   = { item.answer } 
                            key      = { index }
                            id       = { index }
                            />
                            ) )
                        }
                    </Accordion>

                </Card.Body>
            </Card>

        </Card>

    </MainDiv>
}