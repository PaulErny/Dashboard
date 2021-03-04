import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import { withStyles, makeStyles, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import './login.css'
import Logo from '../../resources/login.svg'
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { useHistory } from 'react-router-dom'


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
  formControlLabel: {
    color: '#3BBA9C',
  },
  registerBtn: {
    color: '#DA2D8C',
    borderColor: '#DA2D8C',
    backgroundColor: '#D3DFF8',
  }
}));

const CustomCheckbox = withStyles({
  root: {
    color: '#DA2D8C',
    '&$checked': {
      color: '#3BBA9C',
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

export default function LoginForm(props) {

  const [hasAgreed, setHasAgreed] = useState(false)
  const classes = useStyles();
  let history = useHistory();
  const [inputs, setinputs] = useState({
    username: '',
    password: '',
    passwordConfirm: '',
  })

  const handleInputs = (event) => {
    setinputs({ ...inputs, [event.target.name]: event.target.value });
  };

  const handleCheckbox = () => {
    setHasAgreed(!hasAgreed);
  };

  const handleRegister = async () => {
    if (inputs.username && inputs.password && inputs.password === inputs.passwordConfirm) {
      const result = await fetch('http://localhost:8080/users/Register', {
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
      // console.log(result)
      const jsonData = await result.json();
      console.log(jsonData)
      if (jsonData.status === 201)
        history.push('/login')
    }
  };

  return (
    <div className="container">
      <div className="registerFormContainer">
        <div className="image">
          <img src={Logo} alt="" />
        </div>
        <span className="text">Register</span>
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
              <TextField 
                name="passwordConfirm"
                label="Confirm" 
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
        <FormControlLabel
            control={<CustomCheckbox checked={hasAgreed} onChange={handleCheckbox} name="terms" />}
            label="I agree to the terms of service"
            className={classes.formControlLabel}
        />
        <Button onClick={handleRegister} className={classes.registerBtn} variant="contained" size='large'>Register</Button>
      </div>
    </div>
  )
}