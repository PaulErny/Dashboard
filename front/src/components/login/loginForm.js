import React, { useCallback, useState, useContext } from 'react'
import { useHistory } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import './login.css'
import Logo from '../../resources/login.svg'
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';
import {IsLoggedContext} from '../../App'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#3BBA9C',
    },
    secondary: {
      main: '#707793',
    }
  }
});

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
  inputLabel: {
    color: "#707793",
  },
  required: {
    color: '#DA2D8C',
  },
  inputField: {
    color: '#0AF392',
    borderBottom: '1px solid #707793',
  },
  login: {
    color: '#DA2D8C',
    borderColor: '#DA2D8C',
    backgroundColor: '#D3DFF8',
  },
  registerBtn: {
    color: '#DA2D8C',
    borderColor: '#DA2D8C'
  }
}));

export default function LoginForm({isLogginActive, setIsLogginActive}) {

  const classes = useStyles();
  let history = useHistory();
  const isLoggedContext = useContext(IsLoggedContext)
  const [inputs, setinputs] = useState({
    username: "",
    password: "",
  })

  const handleInputs = (event) => {
    setinputs({ ...inputs, [event.target.name]: event.target.value });
  };

  const handleLogin = async () => {
    if (inputs.username && inputs.password) {
      const result = await fetch('http://localhost:8080/users/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          Username: inputs.username,
          Password: inputs.password
        })
      })
      const jsonData = await result.json();
      if (jsonData.tokenString && jsonData.status !== 401) {
        localStorage.setItem("userToken", jsonData.tokenString)
        isLoggedContext.isLoggedDispatch(true)
        history.push('/dashboards')
      }
    }
  }

  const switchToRegister = useCallback( event => {
    setIsLogginActive(!isLogginActive)
  }, [isLogginActive, setIsLogginActive])

  return (
    <Slide direction="up" in={true} mountOnEnter unmountOnExit>
      <div className="container">
        <div className="formContainer">
          <div className="image">
            <img src={Logo} alt="" />
          </div>
          <span className="text">LogIn</span>
          <form className="loginForm" noValidate autoComplete="off">
            <div className="subcontainer">
              <ThemeProvider theme={theme}>
                <TextField 
                  name="username"
                  label="Username" 
                  helperText="Required"
                  required={true}
                  InputProps={{className: classes.inputField}}
                  InputLabelProps={{className: classes.inputLabel}}
                  FormHelperTextProps={{className: classes.required}}
                  onChange={handleInputs}
                />
                <TextField 
                  name="password"
                  label="Password" 
                  type="password" 
                  helperText="Required"
                  required={true}
                  InputProps={{className: classes.inputField}}
                  InputLabelProps={{className: classes.inputLabel}}
                  FormHelperTextProps={{className: classes.required}}
                  onChange={handleInputs}
                />
              </ThemeProvider>
            </div>
          </form>
          <Button onClick={handleLogin} variant="contained" size='large' className={classes.login}>Login</Button>
          <div className="registerTextContainer">
            <span className="registerText">You are new ? </span>
            <Button onClick={switchToRegister} variant="outlined" className={classes.registerBtn}>Register</Button>
          </div>
        </div>

      </div>
    </Slide>
  )
}