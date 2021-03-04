import React, { useCallback, useState } from 'react'
import AddIcon from '@material-ui/icons/Add';
import ApodWidget from './apodWidget'
import { createMuiTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import '../nasa.css'

// Modal.setAppElement('#root')

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

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export default function ApodModal({ isModalOpened, setIsModalOpened, widgets, setWidgets}) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const classes = useStyles();

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const closeModal = useCallback(() => {
    setIsModalOpened(false)
  }, [setIsModalOpened])

  const addWidget = useCallback(() => {
    let year = selectedDate.getFullYear();
    let month = selectedDate.getMonth()+1;
    let day = selectedDate.getDate();

    setWidgets([...widgets, (<ApodWidget date={year+'-' + month + '-'+day} />)])
    closeModal()
  }, [widgets, setWidgets, selectedDate, closeModal])

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
          <div className="apodModal">
            <p>Photo of the day</p>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker margin="normal"
                                id="date-picker-dialog"
                                label="Select photo date"
                                format="dd/MM/yyyy"
                                autoOK
                                disableFuture
                                value={selectedDate}
                                onChange={handleDateChange}
                                KeyboardButtonProps={{
                                  'aria-label': 'change date',
                                }}
                                minDate={new Date('06/16/1995').toString()}
                                style={{paddingBottom: '1em'}}
            />
            </MuiPickersUtilsProvider>
            <Fab onClick={addWidget} style={{backgroundColor: '#D3DFF8'}}>
              <AddIcon />
            </Fab>
          </div>
        </ThemeProvider>
      </Fade>
    </Modal>
  )
}