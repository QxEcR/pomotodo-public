import React, {useState} from 'react'

import "./styles/App.css"
import Timer from "./components/Timer"
import Todo from "./components/Todo"
import {signInGoogle, auth} from "./config/firebase"
import useWindowDimensions from "./hooks/useWindowDimensions"

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [name] = useState(localStorage.getItem("POMOTODO-USER-NAME"))
  const { height, width } = useWindowDimensions();

  auth.onAuthStateChanged(user => {
    if(user){
      return setIsSignedIn(true)
    }
    setIsSignedIn(false)
  })

  if(width < 1200)
  {
    return(
      <div className="App">
        <div className="unresponsiveText">
          <p>
            Thanks for visiting PomoTodo <br />
            we are not responsive currently <br />
            our apologies for the inconvenience
          </p>
        </div>

        <div className="footerText">
          <p>

            
            made with love by <a href="https://twitter.com/abdullahdev_">Abdullah</a>
          </p>
        </div>
      </div>
    )
  }

  if(isSignedIn){
    return (
      <div className="App">
        <div className="headerName">Welcome {name}</div>

        <Timer /> 
        <Todo />

        <button className="signOut" onClick={()=>auth.signOut()}>sign out</button>

      </div>
    )
  }
  return (
    <div className="App">

      <Timer />

      <div className="signInContainer">
        <button className="signIn" onClick={signInGoogle}>Sign in with Google</button>
      </div>

      <div className="footerText">
          <p>
            made with love by <a href="https://twitter.com/abdullahdev_">Abdullah</a>
          </p>
        </div>
    </div>
  )
}

export default App
