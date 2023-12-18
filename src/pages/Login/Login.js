import logo from "../../images/logo.png";
import "animate.css";
import { Fragment, useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Alert from "../../components/Alert";
import LoginDiv from "./LoginDiv";
import ShowAndHidePassword from "../../components/ShowAndHidePassword";

function Login() {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSucces] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [username, setUsername] = useState("");
  const [loginButtonLabel, setLoginButtonLabel] = useState("ورود");

  const handlePasswordChange = (evnt) => {
    setPasswordInput(evnt.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  function handleSubmit(event) {
    event.preventDefault();
    setLoginButtonLabel("در حال ورود");
    // let csrftoken = getCookie('csrftoken');
    // let headers = new Headers();
    // headers.append('X-CSRFToken', csrftoken);
    // axios.defaults.withCredentials = true;
    // const csrfProtection = csrf({
    //   cookie: true
    // });
    // axios.use(csrfProtection);
    // let item = { title : event.target.username.value, description : event.target.password.value, completed : true }
    // console.log( event.target )
    const formData = new FormData(event.target);
    axios
      .post("http://185.206.93.9:8000/register/login/", formData)
      .then((res) => {
        const [status, role] = res.data.split("/");
        if (status == "accepted") {
          setSucces(true);
          setTimeout(() => {
            setSucces(false);
            switch (role) {
              case "HumanResources":
                navigate("./HumanResourcesPanel", {
                  state: { password: passwordInput, username: username },
                });
                break;
              case "Student":
                navigate("./StudentPanel", {
                  state: { password: passwordInput, username: username },
                });
                break;
              case "Teacher":
                navigate("./TeacherPanel", {
                  state: { password: passwordInput, username: username },
                });
                break;
              default:
                navigate("/");
                break;
            }
          }, 1000);
        } else if (status == "denied") {
          setError(true);
          setTimeout(() => {
            setError(false);
          }, 2000);
        }
        setLoginButtonLabel("ورود");
      });
    // (req, res) => {
    //   res.json({ CSRFToken: req.CSRFToken() })
    // })
    // document.cookie = "csrftoken={{ csrf_token }}"
  }

  const handleCloseAlert = () => {
    setError(false);
    setSucces(false);
  };

  return (
    <LoginDiv>
      <div className="login-page">
        <header className="header">
          <img
            src={logo}
            className="animate__animated animate__zoomIn app-logo"
          />
        </header>
        <main className="login animate__animated animate__backInRight animate__delay-0.5s">
          <h2 className="login-header">ورود به سامانه</h2>
          <div className="login-main">
            <form method="post" id="LoginForm" onSubmit={handleSubmit}>
              <div className="login-form-group">
                <label for="username" className="username-label">
                  نام کاربری
                </label>
                <input
                  id="username"
                  type="text"
                  name="username"
                  value={username}
                  onChange={handleUsernameChange}
                  placeholder="Username"
                />
              </div>
              <div className="login-form-group">
                <label for="password" className="pass-label">
                  رمز عبور
                </label>
                <ShowAndHidePassword
                  id={"password"}
                  name={"password"}
                  placeholder={"password"}
                  width={"40"}
                  height={"30"}
                  viewBox={"3 -3 20 20"}
                  rightPos={"0px"}
                  handleChange={handlePasswordChange}
                />
              </div>
            </form>
          </div>
          <div className="login-footer">
            <a className="sign-up" href={"./Register"}>
              ثبت نام در سامانه
            </a>
            <button type="submit" form="LoginForm" className="login-btn">
              {loginButtonLabel}
            </button>
            <a className="forgot-pass">فراموشی رمز عبور</a>
          </div>
        </main>
        <footer className="footer">
          <div className="subtitle animate__animated animate__fadeInUpBig animate__delay-0.5s">
            <p className="subtitle-text">
              <Subtitling subtitleTexts={subtitleTexts} />
            </p>
          </div>
        </footer>

        <Alert
          visible={error}
          type="error"
          message={"نام کاربری یا کلمه عبور اشتباه است"}
        />

        <Alert
          visible={success}
          type="success"
          message={"با موفقیت وارد شدید"}
        />
      </div>
    </LoginDiv>
  );
}

let subtitleTexts = [
  "به موسسه فرهنگی آموزشی بوعلی سینا خوش آمدید",
  "برای بهرمنده شدن از امکانات سامانه ابتدا وارد سامانه شوید",
  "در صورتی که حساب کاربری ندارید روی کلمه ثبت نام کلیک کنید",
];

function Subtitling({ subtitleTexts }) {
  let [subtitleText, setSubtitleText] = useState();
  let [repeatFlag, setRepeatFlag] = useState(false);

  useEffect(() => {
    subtitleTexts.forEach((item, index) => {
      setTimeout(() => {
        setSubtitleText(item);
      }, index * 8000);
    });

    setTimeout(() => {
      setRepeatFlag(!repeatFlag);
    }, subtitleTexts.length * 8000);
  }, [repeatFlag]);

  return <Fragment>{subtitleText}</Fragment>;
}

export default Login;
