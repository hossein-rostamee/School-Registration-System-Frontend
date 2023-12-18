import styled from 'styled-components';
import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap';
import React, { useCallback, useRef, useState, createContext, useContext } from 'react';
import Questionnaire from './Questionnaire'
import RegisterFormText from './RegisterFormText';
import RegisterFormNumber from './RegisterFormNumber';
import RegisterFormDate from './RegisterFormDate';
import RegisterFormSelect from './RegisterFormSelect';
import Alert from '../../components/Alert';
import RegisterFormPassword from './RegisterFormPassword';
import FormContext from './RegisterFormContext';

export default function RegisterForm() {

    const formFileds = useContext( FormContext )
    
    const states_register = formFileds[0];

    const {
        fullName           , 
        fatherName         , 
        birthCity          , 
        schoolName         , 
        classNumber        , 
        passField          , 
        birthDate          , 
        nationalCode       , 
        fatherPhoneNumber  , 
        motherPhoneNumber  , 
        schoolShift        , 
        religion           , 
        grade              , 
    } = states_register;

    const requiredStates = [
        fullName.state,            
        fatherName.state,          
        birthCity.state,           
        schoolName.state,                 
        passField.state,                     
        birthDate.state,                     
        nationalCode.state,      
        fatherPhoneNumber.state, 
        motherPhoneNumber.state, 
        schoolShift.state,         
        religion.state,        
        grade.state,           
    ];


    const [modalShow, setModalShow] = useState(false);
    const [ error, setError ] = useState( false )
    const [ errorShow, setErrorShow ] = useState( false )

    const handleOnClick = ( event ) => {

        let err = false;
        requiredStates.forEach(
            state => {
                if ( !state || state === "__ERR__" ) {
                    err = true
                }
            }
        )
        err ? 
        (() => { 
            setErrorShow( true )
            setTimeout( () => {
                setError( true )
            }
            , 100 ); 
            setTimeout( () => {
                setError( false )
            }
            , 2000 );   
            setTimeout( () => {
                setErrorShow( false )
            }
            , 3000 );       
        })() : 
        (() => {
            setModalShow( true )
            setErrorShow( false )
        })()
    }

    const handleCloseModal = () => {
        setModalShow( false )
        setErrorShow( true )
    }
    

    return (
    <Form method='post' >
        <Row className='gx-2 gy-1 mt-0'>
            <RegisterFormText
                textField    = { fullName.state    }
                setTextField = { fullName.setState }
                label        = { "نام و نام خانوادگی" }
                placeholder  = { "به فارسی وارد کنید" }
                id           = { "fullName"  }
                name         = { "fullName" }
                lg={6} sm={12} md={12} xs={12}
                wordsError   = {"حاوی حروف غیر فارسی است"}
                lengthError  = {"طول اسم بیش از حد مجاز است" }
                emptyError   = {"* این قسمت اجباری است"}
            />
            <RegisterFormNumber
                numberField     = { nationalCode.state  }
                setNumberField  = { nationalCode.setState  }
                label           = {"شماره ملی خود را وارد کنید"}
                placeholder     = { "فقط عدد وارد کنید" }
                id              = { "nationalCode" }
                name            = { "nationalCode" }
                lg={6} sm={12} md={12} xs={12}
                emptyError      = {"* این قسمت اجباری است"}
                lengthError     = {"طول اسم بیش از حد مجاز است"}
            />
        
        </Row>
        <Row className='gx-2 gy-1 mt-0'>
        
            <RegisterFormText
                textField    = { fatherName.state }
                setTextField = { fatherName.setState }
                label        = { "نام پدر"                       }
                placeholder  = { "به فارسی وارد کنید" }
                id           = { "fatherName"                    }
                name         = { "fatherName"                    }
                lg={4} sm={6} md={6} xs={6}
                wordsError   = {"حاوی حروف غیر فارسی است"}
                lengthError  = {"طول اسم بیش از حد مجاز است" }
                emptyError   = {"* این قسمت اجباری است"}
            />
            <RegisterFormText
                textField    = { birthCity.state }
                setTextField = { birthCity.setState }
                label        = { "محل تولد"                   }
                placeholder  = { "به فارسی وارد کنید"   }
                id           = { "birthCity"                  }
                name         = { "birthCity"                  }
                lg={4} sm={6} md={6} xs={6}
                wordsError   = {"حاوی حروف غیر فارسی است"}
                lengthError  = {"طول اسم بیش از حد مجاز است" }
                emptyError   = {"* این قسمت اجباری است"}
            />
            <RegisterFormDate
                dateTime    = { birthDate.state }
                setDateTime = { birthDate.setState }
                label       = { "تاریخ تولد"          }
                id          = { "birthDate"           }
                name        = { "birthDate"           }
                lg={4} sm={12} md={12} xs={12}
                emptyError  = {"* از تقویم و ضربدر استفاده کنید" }
            />
        </Row>
        <Row>
            <RegisterFormPassword
                passField = { passField.state }
                setPassField = { passField.setState }
                rowClassName = { "gx-2 gy-1 mt-0" }
                id           = { "password" }
                name         = { "password" }
                placeholder  = { "حروف انگلیسی و عدد مجاز است" }
                wordsError   = {"حاوی حروف غیر انگلیسی است"}
                lengthError  = {"حداقل باید ۱۰ کاراکتر باشد" }
                emptyError   = {"* این قسمت اجباری است"}
            />
        </Row>
        <Row className='gx-2 gy-1 mt-0'>
        
            <RegisterFormSelect
                selectedField    = { religion.state    }
                setSelectedField = { religion.setState }
                name    = { "religion" }
                id      = { "religion" }
                label   = { "مذهب" }
                lg={6} sm={6} md={6} xs={6}
                options = {[
                    { id : 'shia',          label : "شیعه"  },
                    { id : 'sunni',         label : "سنی"   },
                    { id : 'extraReligion', label : "سایر"  },
                ]}
            />
            <RegisterFormSelect
                selectedField    = { grade.state    }
                setSelectedField = { grade.setState }
                name    = { "grade" }
                id      = { "grade" }
                label   = { "مقطع تحصیلی" }
                lg={6} sm={6} md={6} xs={6}
                options = {[
                    { id : "grade3",  label : "سوم"     },
                    { id : "grade4",  label : "چهارم"   },
                    { id : "grade5",  label : "پنجم"    },
                    { id : "grade6",  label : "ششم"     },
                    { id : "grade7",  label : "هفتم"    },
                    { id : "grade8",  label : "هشتم"    },
                    { id : "grade9",  label : "نهم"     },
                    { id : "grade10", label : "دهم"     },
                    { id : "grade11", label : "یازدهم"  },
                    { id : "grade12", label : "دوازدهم" },
                ]}
            />
        
        </Row>
        <Row className='gx-2 gy-1 mt-2'>
            <RegisterFormText
                textField    = { schoolName.state    }
                setTextField = { schoolName.setState }
                label        = { "نام مدرسه"              }
                placeholder  = { "به فارسی وارد کنید" }
                id           = { "schoolName"             }
                name         = { "schoolName"             }
                lg={4} sm={6} md={4} xs={6}
                wordsError  = {"حاوی حروف غیر فارسی است"}
                lengthError = {"طول اسم بیش از حد مجاز است" }
                emptyError  = {"* این قسمت اجباری است"}
            />
            <RegisterFormSelect
                selectedField    = { schoolShift.state    }
                setSelectedField = { schoolShift.setState }
                id               = { "schoolShift"       }
                name             = { "schoolShift"       }
                label            = { "شیفت"              }
                lg={4} sm={6} md={4} xs={6}
                options = {[
                    { id : "morning",    label : "صبح"          },
                    { id : "afternoon",  label : "بعد از ظهر"   },
                ]}
            />
            <RegisterFormText
                textField    = { classNumber.state    }
                setTextField = { classNumber.setState }
                label        = { "شماره کلاس"              }
                placeholder  = { "وارد کنید" }
                id           = { "classNumber"            }
                name         = { "classNumber"            }
                lg={4} sm={12} md={4} xs={12}
                wordsError  = { null }
                lengthError = { null }
                emptyError  = {"  این قسمت اختیاری است"}
                emptyErrorValid = { false }
            />
        
        </Row>
        <Row className='gx-2 gy-1 mt-0'>
            <RegisterFormNumber
                numberField     = { fatherPhoneNumber.state    }
                setNumberField  = { fatherPhoneNumber.setState }
                label       = { "شماره همراه پدر"    }
                placeholder = { "فقط عدد وارد کنید"  }
                id          = { "fatherPhoneNumber"  }
                name        = { "fatherPhoneNumber"  }
                lg={6} sm={12} md={6} xs={12}
                emptyError  = {"* این قسمت اجباری است"}
                lengthError = {"طول اسم بیش از حد مجاز است"}
            />
            <RegisterFormNumber
                numberField     = { motherPhoneNumber.state    }
                setNumberField  = { motherPhoneNumber.setState }
                label       = { "شماره همراه مادر"   }
                placeholder = { "فقط عدد وارد کنید"  }
                id          = { "motherPhoneNumber"  }
                name        = { "motherPhoneNumber"  }
                lg={6} sm={12} md={6} xs={12}
                emptyError  = {"* این قسمت اجباری است"}
                lengthError = {"طول اسم بیش از حد مجاز است"}
            />
        </Row>
        <div className="d-grid">
            <Button className='mt-3 rounded-3 bg-success border-success' variant="primary" onClick={ handleOnClick }>
                        { "برای پر کردن پرسشنامه فردی کلیک کنید" }
            </Button>
            <Questionnaire
                           modalShow   = { modalShow }
                           handleClose = { handleCloseModal }
            />
            {
                errorShow && <Alert
                                visible = { error }
                                type = "error"
                                message = { "ابتدا خطاهای داخل فرم را برطرف کنید" }
                             />
            }
        </div>
    </Form>
    );
} 

