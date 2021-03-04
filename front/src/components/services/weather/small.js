import React, {useCallback } from 'react'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import './weather.css'

const CustomBtn = withStyles({
  root: {
    width: '97%',
    color: '#3BBA9C',
    marginTop: '4px',
    marginLeft: '4px',
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

export default function Small({isLarge, setIsLarge}) {

  const triggerLarge = useCallback(() => {
    setIsLarge(true)
  }, [setIsLarge])

  return (
      <CustomBtn onClick={triggerLarge} 
                 size='large' 
                 variant="outlined"
                 startIcon={<WbSunnyIcon />}
                 endIcon={<KeyboardArrowDownIcon />} >
        Weather Service
      </CustomBtn>
  )
}