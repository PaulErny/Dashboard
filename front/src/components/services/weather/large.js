import React, { useCallback, useState } from 'react'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import WeatherModal from './widgets/weatherModal';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import './weather.css'

const CustomBtn = withStyles({
  root: {
    width: '97%',
    color: '#3BBA9C',
    marginTop: '4px',
    marginLeft: '4px',
    marginBottom: '0px',
    borderBottom: 'none',
    borderBottomLeftRadius: '0px',
    borderBottomRightRadius: '0px',
    borderColor: '#2E3047',
    backgroundColor: '#43455C',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    textAlign: 'center',
    '&:hover': {
      backgroundColor: '#4C4E67',
    }
  }
})((props) => <Button color="default" {...props} />);

export default function Large({setIsLarge, widgets, setWidgets}) {

  const [isModalOpened, setIsModalOpened] = useState(false)

  const triggerLarge = useCallback(() => {
    setIsLarge(false)
  }, [setIsLarge])

  const openModal = useCallback(() => {
    setIsModalOpened(true)
  }, [setIsModalOpened])

  return (
    <>
      <CustomBtn onClick={triggerLarge}
                 size='large' 
                 variant="outlined"
                 startIcon={<WbSunnyIcon />}
                 endIcon={<KeyboardArrowUpIcon />}
      >
        Weather Service
      </CustomBtn>
      <div className="weatherServiceCardData">
        <ul className="widgetsList" >
          <li>
            Real time
          </li>
        </ul>
        <IconButton size="small" onClick={openModal} >
          <AddIcon />
        </IconButton>
      </div>
      {isModalOpened && <WeatherModal isModalOpened={isModalOpened} 
                                      setIsModalOpened={setIsModalOpened} 
                                      widgets={widgets} 
                                      setWidgets={setWidgets} 
                        />
      }
    </>
  )
}