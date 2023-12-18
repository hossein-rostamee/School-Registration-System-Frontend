import React, { useState, useContext, useEffect } from "react";
import styled from 'styled-components';
import { Col, Button, Row, Container, Card, Form, ListGroup, Accordion } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

const MainDiv = styled.div`
    grid-area: header;
    background-color: white;
    box-shadow: 0 0 20px 1px rgba(89, 90, 94, 0.6);
    z-index: 20000;
    display: grid;
    grid-gap: 10px;
    grid-template: auto / auto 1fr auto;
    justify-content: center;
    align-items: center;
    .user {
        margin-right: 20px;
        position: relative;
        Button {
            width: 150px;
            background-color: transparent ;
            color: black;
            border: 1px solid blue;
            transition: all 1s;
        }
        Button:hover {
            background-color: #24e082;
        }
        Button.user-show {
            border-bottom: 0;
            border-radius: 0;
            background-color: #24e082;
        }
        @media screen and ( min-width : 400px ) and ( max-width : 800px ) {
            Button {
                width: 100px;
            }
        }
        @media screen and ( max-width : 400px ) {
            Button {
                width: 100px;
            }
        }
    }
    .title {
    }
    .exit {
        margin-left: 20px;
        Button {
            width: 150px;
            background-color: transparent ;
            color: black;
            border: 1px solid red;
        }
        Button:hover {
            background-color: rgba( 256, 0, 0, 0.5 );
        }
        @media screen and ( min-width : 400px ) and ( max-width : 800px ) {
            Button {
                width: 100px;
            }
        }
        @media screen and ( max-width : 400px ) {
            Button {
                width: 100px;
            }
        }
    }
`
const Title = styled.p`
    font-size: 22px;
    /* @media screen and ( min-width: 800px ) {
        font-size: 20px;
    }
    @media screen and ( min-width: 600px ) and ( max-width : 800px ) {
        font-size: 18px;
    }
    @media screen and ( min-width: 400px ) and ( max-width : 600px ) {
        font-size: 16px;
    } */
    @media screen and ( max-width : 450px ) {
        font-size: 18px;
    }
    margin: 0;
    padding: 0;
`

const UserShow = styled.div`
    position: absolute;
    background-color: #24e082;
    transition: all 0.5s;

    .username, .password {
        transition: all 0;
    }
    &.user-show {
        height: 150px;
        width: 100%;
        border: 1px solid blue;
        transition: all 1s ;
        display: flex;
        justify-content: space-around;
        flex-direction: column;
        align-items: center;
        border-top: 0;
        div.user-show {
            display: block;
        }
        
    }
    &.user-hide {
        height: 0;
        div.user-hide {
            display: none;
        }
    }
`

export default function StudentPanelHeader( props ) {
    
    const navigate = useNavigate()
    const [ userShow, setUserShow ] = useState( false )
    const [ title, setTitle ] = useState()

    const handleExit = () => {
        navigate( '/', { replace : true } )    
    }
    const handleUser = () => {
        setUserShow( u => !u )
    }

    const titles = [
        "اطلاعات فردی دانش آموز",
        "اطلاعات کلاس دانش آموز",
    ]
    useEffect( () => {
        setTitle( props.getClasses    ? titles[1] : 
                  props.getStudents   ? titles[0] : "" )
    }, [ props.getClasses, props.getStudents ] )

    return <MainDiv className='animate__animated animate__fadeInDownBig animate__delay-0.5s' >
        <div className="user">
            <Button onClick={handleUser} className={`${ userShow ? 'user-show' : ''}`}>
                {"حساب کاربری"}
            </Button>
            <UserShow className={`${ userShow ? 'user-show' : 'user-hide' }`}>
                <div className={`${ userShow ? 'user-show' : 'user-hide' }`}>
                    <h6>نام کاربری</h6>
                    <span>{ props.username }</span>
                </div>
                <div className={`${ userShow ? 'user-show' : 'user-hide' }`}>
                    <h6>رمز عبور</h6>
                    <span>{ props.password }</span>
                </div> 
            </UserShow>
        </div>
        <div className="title">
            <Title className="fw-bold text-center">
                { title }
            </Title>
        </div>
        <div className="exit">
            <Button onClick={handleExit}>{"خروج"}</Button>
        </div>
    </MainDiv>
}
