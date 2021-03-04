import React, { useCallback, useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid'
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/core/styles';
import '../nasa.css'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export default function ApodWidget({date}) {
  const classes = useStyles()
  const [data, setData] = useState({})
  const [isDataSet, SetIsDataSet] = useState(false)
  const [isPhotoClicked, setIsPhotoClicked] = useState(false)
  
  useEffect(() => {
    getApod()
  }, [])

  const getApod = async () => {
    const APIKey = "KsV6YEyDo9nsc256h6xbEDnjoNc2ndOFZxZufEp1"
    const result = await fetch(`https://api.nasa.gov/planetary/apod?date=${date}&api_key=${APIKey}`)
    const jsonData = await result.json();
    console.log(date)
    console.log(jsonData)
    setData(jsonData)
    SetIsDataSet(true)
  }
  
  const Photo = () => {
    const styles = {
      marginTop: '-1em',
      height: '12em',
      objectFit: 'cover',
      borderBottomLeftRadius: '4px',
      borderBottomRightRadius: '4px',
    }
    return (
      <img src={data.url} style={styles} />
    )
  }

  const handlePhotoClick = useCallback(() => {
    setIsPhotoClicked(true)
  }, [])

  const closeModal = useCallback(() => {
    setIsPhotoClicked(false)
  }, [setIsPhotoClicked])

  const PhotoClickedModal = () => {
    return(
      <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={isPhotoClicked}
          onClose={closeModal}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
        <Fade in={isPhotoClicked}>
          <div style={{height: '90vh', width: '90vw'}}>
            <img src={data.url} style={{objectFit: 'scale-down'}} />
          </div>
        </Fade>
      </Modal>
    )
  }

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <div className="apodWidget" onClick={handlePhotoClick}>
        <p className="apodWidgetName"> {data.title}</p>
        { isDataSet && <Photo />}
      </div>
      {isPhotoClicked && <PhotoClickedModal /> }
    </Grid>
  )
}