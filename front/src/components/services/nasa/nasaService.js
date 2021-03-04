import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import Small from './small.js'
import Large from './large.js'
import './nasa.css'

export default function NasaService({widgets, setWidgets}) {

  const [isLarge, setIsLarge] = useState(false)

  return (
    <Grid item xs={12}>
      { !isLarge && <Small isLarge={isLarge} setIsLarge={setIsLarge} />}
      { isLarge && <Large setIsLarge={setIsLarge} 
                          widgets={widgets} 
                          setWidgets={setWidgets}/>
      }
    </Grid>
  )
}