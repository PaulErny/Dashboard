import React, { useCallback, useState } from 'react'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import LanguageIcon from '@material-ui/icons/Language';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import ApodModal from './widgets/apodModal';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import './nasa.css'

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
                 startIcon={<LanguageIcon />}
                 endIcon={<KeyboardArrowUpIcon />}
      >
        NASA Service
      </CustomBtn>
      <div className="nasaServiceCardData">
        <ul className="widgetsList" >
          <li>
            Picture of the day
          </li>
        </ul>
        <IconButton size="small" onClick={openModal} >
          <AddIcon />
        </IconButton>
      </div>
      {isModalOpened && <ApodModal isModalOpened={isModalOpened} 
                                      setIsModalOpened={setIsModalOpened} 
                                      widgets={widgets} 
                                      setWidgets={setWidgets} 
                        />
      }
    </>
  )
}