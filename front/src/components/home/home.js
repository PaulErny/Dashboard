import React, { useEffect, useState } from 'react'

export default function Home() {

  const [about, setAbout] = useState()

  useEffect(() => {
    getAbout()
  }, [])

  const getAbout = async () => {
    const result = await fetch(`http://localhost:8080/about.json`)
    const jsonData = await result.json();
    setAbout(jsonData)
  }

  const displayJson = () => {
    return about
  }

  return(
    <p>
      Home page
      <div>
        { JSON.stringify(about, null, 2) }
      </div>
    </p>
  )
}