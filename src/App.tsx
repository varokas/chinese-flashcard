
import React, { useState, useEffect } from 'react';
import "./app.css"
import Button from 'react-bootstrap/Button';

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}


interface Word {
  word: string
  desc: string
  context: string
}

export function App() {
  const [words, setWords] = useState([])
  const [wordIndex, setWordIndex] = useState(0)
  const [showDesc, setShowDesc] = useState(false)

  async function fetchWords():Promise<[Word]> {
    const res = await fetch("chinese1.json")  
    const resJson = await res.json()

    return resJson
  }


  useEffect(() => {
    fetchWords().then( words => {
      setWords(words)
      setNewWord(getRandomInt(words.length))
    })
  }, []);


  function setNewWord(newIndex:number) {
    setWordIndex(newIndex)
    setShowDesc(false)
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col word">{words[wordIndex]?.[0]}</div>
      </div>
      <div className="d-grid gap-2">
        <div className={`${showDesc ? "" : "hide"}`}>{words[wordIndex]?.[1]}</div>
        <div className={`${showDesc ? "" : "hide"}`}>{words[wordIndex]?.[2]}</div>
      </div>
      {/* <div className={showDesc ? "" : "hide"}>{words[wordIndex]?.[1]}</div>
      <div className={showDesc ? "" : "hide"}>{words[wordIndex]?.[2]}</div> */}
      <div className="d-grid gap-2">
          <Button className='btn-secondary' onClick={() => { setShowDesc(true) } }>Show</Button>
          <Button className='btn-lg' onClick={() => { setNewWord(getRandomInt(words.length)) } }>Next</Button>
      </div>
      
      
    </div>
  )
}