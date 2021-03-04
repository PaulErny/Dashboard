import React, { useEffect, useState, useContext } from 'react'
import Grid from '@material-ui/core/Grid'
import WeatherService from '../services/weather/weatherService.js'
import NasaService from '../services/nasa/nasaService'
import './dashboard.css'
import {IsLoggedContext} from '../../App'
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));


export default function Dashboards() {

  const [leftHeight, setLeftHeight] = useState("100%")
  const [widgets, setWidgets] = useState([])
  const isLoggedContext = useContext(IsLoggedContext)
  const classes = useStyles()
  let history = useHistory()

  const updateLeftHeight = () => {
    let height = document.getElementsByClassName("rightSide")[0].clientHeight
    if (height >= document.documentElement.clientHeight * 0.90)
      setLeftHeight( document.getElementsByClassName("rightSide")[0].clientHeight)
    else
      setLeftHeight( document.documentElement.clientHeight * 0.90)
  }

  useEffect(() => {
    // const data = localStorage.getItem("widgets")
    // if (data)
      // console.log( JSON.parse(data) )
      // setwidgets(data)
  }, [])

  useEffect(() => {
    updateLeftHeight()
    // localStorage.setItem("widgets", JSON.stringify(widgets))
  })

  if (isLoggedContext.isLoggedState) {
    return(
      <div className="background" id="dashboard">
        <Grid container justify="flex-start" alignItems="flex-start" >
  
          <Grid item xs={2} container justify="flex-start" alignItems="flex-start">
            <div className="leftSide" style={{height: leftHeight }} >
              <WeatherService widgets={widgets} setWidgets={setWidgets} />
              <NasaService widgets={widgets} setWidgets={setWidgets} />
            </div>
          </Grid>
  
          <Grid item xs={10} container justify="flex-start" alignItems="flex-start" className="rightSide">
            {widgets}
          </Grid>
  
        </Grid>
      </div>
    )
  } else {
    return (
      <div className="background" id="dashboard">
          <Grid container justify="flex-start" alignItems="flex-start" >
    
            <Grid item xs={2} container justify="flex-start" alignItems="flex-start">
              <div className="leftSide" style={{height: leftHeight }} >
                <WeatherService widgets={widgets} setWidgets={setWidgets} />
                <NasaService widgets={widgets} setWidgets={setWidgets} />
              </div>
            </Grid>
    
            <Grid item xs={10} container justify="flex-start" alignItems="flex-start" className="rightSide">
              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={true}
                onClose={() => {history.push('/login')}}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}>
                <h3 style={{color: 'red'}}>You must be logged in to use the dashboard</h3>
              </Modal>
            </Grid>
    
          </Grid>
        </div>
    )  
  }
}