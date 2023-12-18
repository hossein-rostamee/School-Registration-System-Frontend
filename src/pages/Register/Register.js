import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import { styled, keyframes } from 'styled-components';
import React, { useCallback, useState, useRef } from 'react';
import leaningman_right from '../../images/leaningmanright.png';
import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap';
import RegisterForm from './RegisterForm';
import leaningman_left from '../../images/leaningmanleft.png'
import FormContext from './RegisterFormContext';
import MainDivContext from './RegisterMainDivContext';
import Alert from '../../components/Alert';

const MainDiv = styled.div`
    font-family: 'iran-sans';
    letter-spacing: 0.05ch;
    width: 100vw;
    min-height: 100vh;
    margin: 0;
    overflow: auto;
    background: linear-gradient(180deg, rgba(40,56,145,1) 10%, rgba(0,183,196,1) 80%);
    background-size: 400% 400%;

    -webkit-animation: backgroundColorPalette 8s linear infinite;
    -moz-animation: backgroundColorPalette 8s linear infinite;
    animation: backgroundColorPalette 8s linear infinite;

    @-webkit-keyframes backgroundColorPalette {
        0%{background-position:50% 0%}
        50%{background-position:50% 80%}
        100%{background-position:50% 0%}
    }
    @-moz-keyframes backgroundColorPalette {
        0%{background-position:50% 0%}
        50%{background-position:50% 80%}
        100%{background-position:50% 0%}
    }
    @keyframes backgroundColorPalette {
        0%{background-position:50% 0%}
        50%{background-position:50% 80%}
        100%{background-position:50% 0%}
    }

    direction: rtl;

    @media screen and ( min-width: 994px ) {
        overflow: hidden;
    }

    label {
        color: black;
    }

    .input-border {
        input, select {
            border: 0.5px #29072e solid !important;

        }
        animation: show 0.8s linear;
    }

    @keyframes show {
        0% {
            filter: blur( 12px );
        }
        100% {
            filter: blur( 0 );
        }
    }

    .blur {
        filter: blur(15px);
        transition: filter 1s; 
        * {
            cursor: none;
        }
    }

`

const Title = styled.p`
    font-size: 22px;
    @media screen and ( max-width: 576px ) {
        font-size: 18px;
    }
    margin-bottom: 10px;
`

const Img = styled.div`
    filter: grayscale(30%);

    .leaningman_right {
        position: absolute;
        bottom: -15px;
        right: -95px;
        width: 80px;
        height: auto;
    }
    .leaningman_left {
        position: absolute;
        bottom: -20px;
        left: -85px;
        width: 70px;
        height: auto;
    }
    @media screen and ( max-width: 740px ) {
        .leaningman_right {
            display: none;
        }
        .leaningman_left {
            display: none;
        }
    }
    

`

export default function Register() {

    const [ textField_fullName,            setTextField_fullName               ] = useState("");
    const [ textField_fatherName,          setTextField_fatherName             ] = useState("");
    const [ textField_birthCity,           setTextField_birthCity              ] = useState("");
    const [ textField_schoolName,          setTextField_schoolName             ] = useState("");
    const [ textField_classNumber,         setTextField_classNumber            ] = useState("");
    const [ passField,                     setPassField                        ] = useState("");
    const [ birthDate,                     setBirthDate                        ] = useState("");
    const [ numberField_nationalCode,      setNumberField_nationalCode         ] = useState("");
    const [ numberField_fatherPhoneNumber, setNumberField_fatherPhoneNumber    ] = useState("");
    const [ numberField_motherPhoneNumber, setNumberField_motherPhoneNumber    ] = useState("");
    const [ selectedFiled_schoolShift,     setSelectedFiled_schoolShift        ] = useState("");
    const [ selectedFiled_religion,        setSelectedFiled_religion           ] = useState("");
    const [ selectedFiled_grade,           setSelectedFiled_grade              ] = useState("");

    const states_register = {
         fullName           : { state : textField_fullName,            setState : setTextField_fullName               } ,
         fatherName         : { state : textField_fatherName,          setState : setTextField_fatherName             } ,
         birthCity          : { state : textField_birthCity,           setState : setTextField_birthCity              } ,
         schoolName         : { state : textField_schoolName,          setState : setTextField_schoolName             } ,
         classNumber        : { state : textField_classNumber,         setState : setTextField_classNumber            } ,
         passField          : { state : passField,                     setState : setPassField                        } ,
         birthDate          : { state : birthDate,                     setState : setBirthDate                        } ,
         nationalCode       : { state : numberField_nationalCode,      setState : setNumberField_nationalCode         } ,
         fatherPhoneNumber  : { state : numberField_fatherPhoneNumber, setState : setNumberField_fatherPhoneNumber    } ,
         motherPhoneNumber  : { state : numberField_motherPhoneNumber, setState : setNumberField_motherPhoneNumber    } ,
         schoolShift        : { state : selectedFiled_schoolShift,     setState : setSelectedFiled_schoolShift        } ,
         religion           : { state : selectedFiled_religion,        setState : setSelectedFiled_religion           } ,
         grade              : { state : selectedFiled_grade,           setState : setSelectedFiled_grade              } ,         
    }

    const [ textarea_whatIsParentsGrade,                    setTextarea_whatIsParentsGrade                  ] = useState("");
    const [ textarea_howDidGetToKnowQuranSessions,          setTextarea_howDidGetToKnowQuranSessions        ] = useState("");
    const [ textarea_WhoEncourageYouToComeQuranSessions,    setTextarea_WhoEncourageYouToComeQuranSessions  ] = useState("");
    const [ textarea_WhichSessionDidYouParticipate,         setTextarea_WhichSessionDidYouParticipate       ] = useState("");
    const [ textarea_WhichSportsDoYouInterestedIn,          setTextarea_WhichSportsDoYouInterestedIn        ] = useState("");
    const [ textarea_WhichBooksDoYouRecentlyRead,           setTextarea_WhichBooksDoYouRecentlyRead         ] = useState("");
    const [ textarea_WhatLevelofSkillDoYouHaveInCulturalActivity, setTextarea_WhatLevelofSkillDoYouHaveInCulturalActivity        ] = useState("");
    const [ textarea_WhichBooksDoYouLikeToRead,             setTextarea_WhichBooksDoYouLikeToRead           ] = useState("");
    const [ textarea_WriteTheNamesOfYourTwoFriends,         setTextarea_WriteTheNamesOfYourTwoFriends       ] = useState("");
    const [ answers_WhichCulturalActivitiesDoYouInterested, setAnswers_WhichCulturalActivitiesDoYouInterested ] = useState([]);
    const [ answers_WhichFieldsDoYouTalentedIn,             setAnswers_WhichFieldsDoYouTalentedIn             ] = useState([]);
    const [ answers_HowMuchDoYouFamiliarWithQuran,          setAnswers_HowMuchDoYouFamiliarWithQuran          ] = useState([]);
    const [ answers_WhichCommitionsDoYouInterestedIn,       setAnswers_WhichCommitionsDoYouInterestedIn       ] = useState([]);
    const [ answers_HowDoYouSpendYourHolidays,              setAnswers_HowDoYouSpendYourHolidays              ] = useState([]);

    const states_questionnaire = {
        whatIsParentsGrade                          : { state : textarea_whatIsParentsGrade,                          setState : setTextarea_whatIsParentsGrade                          }, 
        howDidGetToKnowQuranSessions                : { state : textarea_howDidGetToKnowQuranSessions,                setState : setTextarea_howDidGetToKnowQuranSessions                }, 
        WhoEncourageYouToComeQuranSessions          : { state : textarea_WhoEncourageYouToComeQuranSessions,          setState : setTextarea_WhoEncourageYouToComeQuranSessions          }, 
        WhichSessionDidYouParticipate               : { state : textarea_WhichSessionDidYouParticipate,               setState : setTextarea_WhichSessionDidYouParticipate               }, 
        WhichSportsDoYouInterestedIn                : { state : textarea_WhichSportsDoYouInterestedIn,                setState : setTextarea_WhichSportsDoYouInterestedIn                }, 
        WhichBooksDoYouRecentlyRead                 : { state : textarea_WhichBooksDoYouRecentlyRead,                 setState : setTextarea_WhichBooksDoYouRecentlyRead                 }, 
        WhichBooksDoYouLikeToRead                   : { state : textarea_WhichBooksDoYouLikeToRead,                   setState : setTextarea_WhichBooksDoYouLikeToRead                   }, 
        WriteTheNamesOfYourTwoFriends               : { state : textarea_WriteTheNamesOfYourTwoFriends,               setState : setTextarea_WriteTheNamesOfYourTwoFriends               },                 
        WhatLevelofSkillDoYouHaveInCulturalActivity : { state : textarea_WhatLevelofSkillDoYouHaveInCulturalActivity, setState : setTextarea_WhatLevelofSkillDoYouHaveInCulturalActivity },
        WhichCulturalActivitiesDoYouInterested      : { state : answers_WhichCulturalActivitiesDoYouInterested,       setState : setAnswers_WhichCulturalActivitiesDoYouInterested       },
        WhichFieldsDoYouTalentedIn                  : { state : answers_WhichFieldsDoYouTalentedIn,                   setState : setAnswers_WhichFieldsDoYouTalentedIn                   },
        HowMuchDoYouFamiliarWithQuran               : { state : answers_HowMuchDoYouFamiliarWithQuran,                setState : setAnswers_HowMuchDoYouFamiliarWithQuran                },
        WhichCommitionsDoYouInterestedIn            : { state : answers_WhichCommitionsDoYouInterestedIn,             setState : setAnswers_WhichCommitionsDoYouInterestedIn             },
        HowDoYouSpendYourHolidays                   : { state : answers_HowDoYouSpendYourHolidays,                    setState : setAnswers_HowDoYouSpendYourHolidays                    },         
    }

    const [ selectedFile_personelPhoto,    setSelectedFile_personelPhoto    ] = useState( null  );
    const [ selectedFile_birthCertificate, setSelectedFile_birthCertificate ] = useState( null  );
    const [ checked_agreementCheck,        setChecked_agreementCheck        ] = useState( false );
    const [ captcha,                       setCaptcha                       ] = useState( false );

    const states_confirm = {
        personelPhoto    : { state : selectedFile_personelPhoto,    setState : setSelectedFile_personelPhoto    },
        birthCertificate : { state : selectedFile_birthCertificate, setState : setSelectedFile_birthCertificate },
        agreementCheck   : { state : checked_agreementCheck,        setState : setChecked_agreementCheck        },
        captcha          : { state : captcha,                       setState : setCaptcha                       },
    }

    const formFields = [
        states_register, 
        states_questionnaire,
        states_confirm,
    ]

    const mainDiv = useRef()
    const [ success, setSuccess ] = useState( false )
    const [ successShow, setSuccessShow ] = useState( false )
    
    return (
        <MainDiv >
            <div className='input-border' ref = { mainDiv } >
            <MainDivContext.Provider value = { { mainDiv, setSuccess, setSuccessShow } }>
                <Container>
                    <Row className="vh-100 d-flex justify-content-center align-items-center">
                    <Col md={10} lg={7} xs={12}>
                        <Card className="p-4 shadow position-relative mt-1 mb-1 rounded-5">
                        <Card.Body className='p-0'>
                            <Title className="fw-bold border-bottom border-dark text-center pb-2">
                                { "مشخصات فردی داوطلب ثبت نام)" }
                            </Title>
                            <FormContext.Provider value = { formFields }>
                                <RegisterForm/>
                            </FormContext.Provider>
                        </Card.Body>
                        <Img>
                            <img  className={ 'leaningman_right' } src={ leaningman_right }/>
                            <img  className={ 'leaningman_left'  } src={ leaningman_left  }/>
                        </Img>
                        </Card>
                    </Col>
                    </Row>
                
                </Container>
            </MainDivContext.Provider>
            </div>
            {            
            successShow && <Alert
                                visible = { success }
                                type = "success"
                                message = { "ثبت نام با موفقیت انجام شد نتیجه به شما پیامک می گردد" }
                            />
            }
        </MainDiv>
    );
}