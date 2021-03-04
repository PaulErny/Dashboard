import React, { useCallback, useState } from 'react'
import AddIcon from '@material-ui/icons/Add';
import WeatherWidget from './weatherWidget'
import TextField from '@material-ui/core/TextField';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import { MuiPickersUtilsProvider, KeyboardTimePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import '../weather.css'

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
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export default function WeatherModal({ isModalOpened, setIsModalOpened, widgets, setWidgets}) {
  
  const classes = useStyles()

  const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));
  const [inputs, setinputs] = useState({
    city: "Paris",
    country: "FR",
    refresh: "",
  })

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const closeModal = useCallback(() => {
    setIsModalOpened(false)
  }, [setIsModalOpened])

  const handleInputs = (event) => {
    setinputs({ ...inputs, [event.target.name]: event.target.value });
  };
  
  const addWidget = useCallback(() => {
    console.log(inputs.city)
    if (inputs.city && inputs.country) {
      setWidgets([...widgets, (<WeatherWidget inputs={inputs} />)])
      closeModal()
    }
  }, [setWidgets, widgets, closeModal, inputs])

  return (
    <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={isModalOpened}
        onClose={closeModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
      <Fade in={isModalOpened}>
        <ThemeProvider theme={theme}>
          <div className="weatherModal">
            Current Weather
            <TextField
                    name="city"
                    label="Paris"
                    helperText="City Name"
                    InputProps={{className: classes.inputField}}
                    InputLabelProps={{className: classes.inputLabel}}
                    FormHelperTextProps={{className: classes.required}}
                    onChange={handleInputs}
                  />
            <TextField
                    name="country"
                    label="FR"
                    helperText="Country Code"
                    InputProps={{className: classes.inputField}}
                    InputLabelProps={{className: classes.inputLabel}}
                    FormHelperTextProps={{className: classes.required}}
                    onChange={handleInputs}
                  />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardTimePicker
                      margin="normal"
                      id="time-picker"
                      label="Refresh rate"
                      value={selectedDate}
                      onChange={handleDateChange}
                      className={{className: classes.inputLabel}}
                      FormHelperTextProps={{className: classes.required}}
                      InputLabelProps={{className: classes.inputLabel}}
                      style={{paddingBottom: '1em'}}
                    />
            </MuiPickersUtilsProvider>
            <Fab onClick={addWidget} style={{backgroundColor: '#D3DFF8'}} >
              <AddIcon />
            </Fab>
          </div>
        </ThemeProvider>
      </Fade>
    </Modal>
  )
}