import React, { useContext, useState } from 'react';
import { Modal, Row, Col, Form, Button, Container }  from 'react-bootstrap';
import styled from 'styled-components';
import QuestionnaireTextArea from './QuestionnaireTextArea';
import QuestionnaireCheckBox from './QuestionnaireCheckBox';
import Confirm from './Confirm';
import FormContext from './RegisterFormContext';
import Alert from '../../components/Alert';

const ModalDiv = styled(Modal)`
  font-family: 'iran-sans';
  letter-spacing: 0.05ch;
  direction: rtl;
  .modal-dialog {
    display: flex;
    justify-content: center;
    max-width: 80vw;
    margin-right: auto;
    margin-left: auto;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .modal-header {
    padding-right: 25px;
  }
  @media screen and ( max-width : 576px ) {
    .modal-dialog {
        max-width: 90vw;
    }
  } 
  .button-width {
    width: 90%;
  }
`

  const ButtonDiv = styled.div`
    margin: auto;
    width: 100%;
    display: flex;
    justify-content: center;
  `

export default function Questionnaire({ modalShow, handleClose, states, setStates }) {

  const formFields = useContext( FormContext )

  const {
    whatIsParentsGrade                          , 
    howDidGetToKnowQuranSessions                , 
    WhoEncourageYouToComeQuranSessions          , 
    WhichSessionDidYouParticipate               , 
    WhichSportsDoYouInterestedIn                , 
    WhichBooksDoYouRecentlyRead                 , 
    WhichBooksDoYouLikeToRead                   , 
    WriteTheNamesOfYourTwoFriends               , 
    WhichCulturalActivitiesDoYouInterested      , 
    WhichFieldsDoYouTalentedIn                  , 
    HowMuchDoYouFamiliarWithQuran               , 
    WhichCommitionsDoYouInterestedIn            , 
    HowDoYouSpendYourHolidays                   , 
    WhatLevelofSkillDoYouHaveInCulturalActivity ,
  } = formFields[1]
  
  const requiredStates = [
    whatIsParentsGrade                          .state , 
    howDidGetToKnowQuranSessions                .state , 
    WhoEncourageYouToComeQuranSessions          .state , 
    WhichSessionDidYouParticipate               .state , 
    WhichSportsDoYouInterestedIn                .state , 
    WhichBooksDoYouRecentlyRead                 .state , 
    WhichBooksDoYouLikeToRead                   .state , 
    WriteTheNamesOfYourTwoFriends               .state , 
    WhichCulturalActivitiesDoYouInterested      .state , 
    WhichFieldsDoYouTalentedIn                  .state , 
    HowMuchDoYouFamiliarWithQuran               .state , 
    WhichCommitionsDoYouInterestedIn            .state , 
    HowDoYouSpendYourHolidays                   .state , 
    WhatLevelofSkillDoYouHaveInCulturalActivity .state ,
  ];

  const [ lastModalShow, setLastModalShow ] = useState(false)

  const [ error, setError ] = useState( false )
  const [ errorShow, setErrorShow ] = useState( false )

  const handleClick = () => {
    let err = false;
    requiredStates.forEach(
        state => {
            if ( !state || state.length == 0 ) {
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
        handleClose()
        setLastModalShow( true  )  
    })()

  }
  
  const handleCloseButton = () => {
    handleClose()
  }

  return (
      <div>
        <ModalDiv
            show={modalShow}
            aria-labelledby="example-custom-modal-styling-title"
            className='padding-off'
            closeButton
        >
          <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter" >
              { "پرسشنامه فردی" }
            </Modal.Title>
            <Button onClick={ handleCloseButton } className='bg-light text-black border-danger close-btn'>
              &times;
            </Button>
          </Modal.Header>
          <Modal.Body className="grid-example">
            <Container>
              <QuestionnaireTextArea
                  name={"whatIsParentsGrade"}
                  label={"سطح تحصیلات اعضای خانواده (پدر ، مادر ، برادر، خواهر):"}
                  rows={1}
                  cols={1}
                  state    = { whatIsParentsGrade.state }
                  setState = { whatIsParentsGrade.setState }
              />
              <QuestionnaireTextArea
                  name={"howDidGetToKnowQuranSessions"}
                  label={"چطور یا توسط چه کسی با موسسه آشنا شدید؟ "}
                  rows={1}
                  cols={1}
                  state    = { howDidGetToKnowQuranSessions.state }
                  setState = { howDidGetToKnowQuranSessions.setState }
              />
              <QuestionnaireTextArea
                  name={"WhoEncourageYouToComeQuranSessions"}
                  label={"چه کسی شما را برای آمدن به موسسه تشویق می کند ؟"}
                  rows={1}
                  cols={1}
                  state    = { WhoEncourageYouToComeQuranSessions.state }
                  setState = { WhoEncourageYouToComeQuranSessions.setState }
              />
              <QuestionnaireTextArea
                  name={"WhichSessionDidYouParticipate"}
                  label={"آيا با موسسات دیگری نیز آشنايي داشته و در آنها شركت مي كرده ايد؟ ( در صورت جواب مثبت شرح مختصري از نوع فعاليت آنها و مدرسان بيان فرماييد.)"}
                  rows={1}
                  cols={1}
                  state    = { WhichSessionDidYouParticipate.state }
                  setState = { WhichSessionDidYouParticipate.setState }
              />
              <QuestionnaireTextArea
                  name={"WhichSportsDoYouInterestedIn"}
                  label={"به انجام چه ورزش هایی علاقمند هستید؟"}
                  rows={1}
                  cols={1}
                  state    = { WhichSportsDoYouInterestedIn.state }
                  setState = { WhichSportsDoYouInterestedIn.setState }
              />
              <QuestionnaireCheckBox
                  label={"به كدامیك از امور آموزشی و هنری علاقمند هستید ؟"}
                  name={"WhichCulturalActivitiesDoYouInterested"}
                  options={[
                    { id : "zaban_activity",        label : "زبان"       },
                    { id : "naghashi_activity",     label : "نقاشی"      },
                    { id : "quran_activity",        label : "قرائت قرآن" },
                    { id : "madahi_activity",       label : "مداحی"      },
                    { id : "computer_activity",     label : "کامپیوتر"   },
                    { id : "khatati_activity",      label : "خطاطی"      },
                    { id : "graphic_activity",      label : "گرافیک"     },
                    { id : "akasi_activity",        label : "عکاسی"      },
                    { id : "filmbardari_activity",  label : "فیلم برداری"},
                    { id : "taater_activity",       label : "تئاتر"      },
                    { id : "sorood_activity",       label : "سرود"       },
                    { id : "mosighi_activity",      label : "موسیقی"     },
                    { id : "etc_activity",          label : "سایر"       },
                  ]}
                  lg = {2} md = {3} sm = {4} xs = {4}
                  state    = { WhichCulturalActivitiesDoYouInterested.state }
                  setState = { WhichCulturalActivitiesDoYouInterested.setState }
              /> 
              <QuestionnaireTextArea
                  name={"WhatLevelofSkillDoYouHaveInCulturalActivity"}
                  label={"در چه سطحی از زمینه های بالا مهارت دارید ؟"}
                  rows={1}
                  cols={1}
                  state    = { WhatLevelofSkillDoYouHaveInCulturalActivity.state }
                  setState = { WhatLevelofSkillDoYouHaveInCulturalActivity.setState }
              />
              <QuestionnaireCheckBox
                  label={"زمینه هایی که در آن علاقه دارید را تیک بزنید"}
                  name={"WhichFieldsDoYouTalentedIn"}
                  options={[
                    { id : "physics_talent",    label : "فیزیک"  },
                    { id : "chemistry_talent",        label : "شیمی"  },
                    { id : "math_talent",      label : "ریاضی"     },
                    { id : "dastan_talent", label : "قصه گویی"  },
                    { id : "hefz_talent",         label : "حفظ شعر"     },
                    { id : "adabiat_talent",     label : "ادبیات"     },
                    { id : "zaban_talent",       label : "زبان" },
                    { id : "sorood_talent",      label : "سرود خوانی"  },
                    { id : "tafsir_talent",       label : "تقلید صدا"   },
                    { id : "khanandegi_talent",       label : "خوانندگی"   },
                    { id : "namayesh_talent",      label : "نمایش"     },
                    { id : "etc_talent",          label : "سایر"    },
                  ]}
                  lg = {2} md = {3} sm = {6} xs = {6}
                  state    = { WhichFieldsDoYouTalentedIn.state }
                  setState = { WhichFieldsDoYouTalentedIn.setState }
              />
              <QuestionnaireCheckBox
                  label={"میزان آشنایی شما با موسسه تا چه اندازه است؟"}
                  name={"HowMuchDoYouFamiliarWithQuran"}
                  options={[
                    { id : "high_familiar",    label : "زیاد"     },
                    { id : "more_familiar",  label : "خوب"  },
                    { id : "average_familiar",      label : "متوسط"       },
                    { id : "less_familiar",        label : "کم" },
                    { id : "worst_familiar",     label : "خیلی کم"     },
                  ]}
                  lg = {2} md = {2} sm = {3} xs = {4}
                  state    = { HowMuchDoYouFamiliarWithQuran.state }
                  setState = { HowMuchDoYouFamiliarWithQuran.setState }
              />
              <QuestionnaireCheckBox
                  label={"علاقمند به فعالیت دراوقات فراغت و فوق برنامه ی خود در كدام یك از بخش های زیر می‌باشید؟  "}
                  name={"WhichCommitionsDoYouInterestedIn"}
                  options={[
                    { id : "ketab_commition",         label : " کتاب و فرهنگ مطالعه"      },
                    { id : "ordou_commition",         label : "اردویی"                    },
                    { id : "hamayesh_commition",      label : " همایش ها و مسابقات فرهنگی"},
                    { id : "jashn_commition",         label : "برگزاری جشن"            },
                    { id : "tarbiatbadani_commition", label : "تربیت بدنی"                },
                    { id : "honarresani_commition",   label : " هنر و رسانه"              },
                    { id : "poshtibani_commition",    label : "مدیریت مالی"           },
                    { id : "tadris_commition",  label : "تدریس"  },
                    { id : "exec_commition",         label : "مدیریت اجرایی"           },
                    { id : "sarmayeensani_commition", label : "عکس برداری"        },
                    { id : "barnamerizi_commition",   label : "فیلم برداری"   },
                  ]}
                  lg = {3} md = {4} sm = {6} xs = {6}
                  state    = { WhichCommitionsDoYouInterestedIn.state }
                  setState = { WhichCommitionsDoYouInterestedIn.setState }
              />
              <QuestionnaireCheckBox
                  label={"اوقات فراغت خود را چگونه می‌گذرانید؟"}
                  name={"HowDoYouSpendYourHolidays"}
                  options={[
                    { id : "badoosta_holiday",        label : "معاشرت با دوستان"       },
                    { id : "gardesh_holiday",         label : "گردش"                   },
                    { id : "motalee_holiday",         label : " مطالعه ی غیر درسی"     },
                    { id : "bazigorohi_holiday",      label : " بازی های گروهی"        },
                    { id : "honari_holiday",          label : " فعالیت های هنری"       },
                    { id : "cinema_holiday",          label : "سینما"                  },
                    { id : "telvision_holiday",       label : "تماشای تلویزیون"        },
                    { id : "bazicomputer_holiday",    label : "بازی با كامپیوتر"       },
                    { id : "bazimobile_holiday",      label : "بازی با موبایل یا تبلت" },
                    { id : "karkardan_holiday",       label : "اشتغال به‌كار"           },
                    { id : "theater_holiday",         label : " تئاتر"                 },
                    { id : "varzesh_holiday",         label : " فعالیت های ورزشی"      },
                    { id : "filmanimation_holiday",   label : " تماشای فیلم و انیمیشن" },
                    { id : "faaliatcomputer_holiday", label : "فعالیت های كامپیوتری"   },
                    { id : "etcholidays_holiday",     label : "غیره"                   },
                  ]}
                  lg = {3} md = {4} sm = {6} xs = {6}
                  state    = { HowDoYouSpendYourHolidays.state }
                  setState = { HowDoYouSpendYourHolidays.setState }
              />
              <QuestionnaireTextArea
                  name={"WhichBooksDoYouRecentlyRead"}
                  label={"آخرین کتاب هایی که خواندید را نام ببرید ؟ "}
                  rows={1}
                  cols={1}
                  state    = { WhichBooksDoYouRecentlyRead.state }
                  setState = { WhichBooksDoYouRecentlyRead.setState }
              />
              <QuestionnaireTextArea
                  name={"WhichBooksDoYouLikeToRead"}
                  label={"علاقه مند به مطالعه کتاب با چه موضوعاتی هستید ؟"}
                  rows={1}
                  cols={1}
                  state    = { WhichBooksDoYouLikeToRead.state }
                  setState = { WhichBooksDoYouLikeToRead.setState }
              />
              <QuestionnaireTextArea
                  name={"WriteTheNamesOfYourTwoFriends"}
                  label={"دو نفر از دوستان نزدیک خود در کلاس و دو نفر بیرون از کلاس را نام ببرید؟"}
                  rows={1}
                  cols={1}
                  state    = { WriteTheNamesOfYourTwoFriends.state }
                  setState = { WriteTheNamesOfYourTwoFriends.setState }
              />
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <ButtonDiv>
                  <Button onClick={ handleClick }  variant='info'  className='m-2 button-width'>هدایت به صفحه ثبت نام نهایی</Button>
            </ButtonDiv>
          </Modal.Footer>
        </ModalDiv>
        <Confirm modalShow ={ lastModalShow } setModalShow = { setLastModalShow } />
        {
            errorShow && <Alert
                            visible = { error }
                            type = "error"
                            message = { "تمام بخش ها را پر کنید" }
                         />
        }
      </div>
  );
}
