import React, { useState, useEffect } from 'react';
import './App.css';
import { FormControl, Input } from '@material-ui/core'
import Message from './Message'
import db from './firebase'
import firebase from 'firebase'
import FlipMove from 'react-flip-move'
import SendIcon from '@material-ui/icons/Send'
import { IconButton } from '@material-ui/core'

function App() {

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');

  // useState = variable in REACT
  // useEffect = run code on a specific condition (when data changes in db)
  
  useEffect(() =>{
    // run once when the app component loads
    db.collection('messages')
    .orderBy('timestamp','desc')
    .onSnapshot(snapshot => {
      setMessages(snapshot.docs.map(doc => ({id: doc.id, message: doc.data()})))
    })
  },[])

  useEffect(() =>{
    // run code
    setUsername(prompt('Please enter your name'));
    // If its blank inside [], this code runs ONCE when the app component loads
    // If we have a varaible like input inside [], it runs when input changes everytime 
  },[]) // condition dependencies

  const sendMessage = (event) => {
      // logic to send message
      event.preventDefault();

      db.collection('messages').add({
        message: input,
        username: username,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
      setInput('');
  }


  return (
    <div className="App">
      <br/>
      <img src="https://facebookbrand.com/wp-content/uploads/2018/09/Header-e1538151782912.png?w=100&h=100" alt="Messenger" />
      <h1>FB Messenger Clone</h1>
      <br />
      <h2><i>Welcome {username}</i></h2>

      <form className="app__form">
      <FormControl className='app__formControl'>
        <Input className='app__input' placeholder="Enter a message..." value={input} onChange={event => setInput(event.target.value)} />
        <br/>

        <IconButton className="app__iconButton" disabled={!input} size="small" type="submit" variant="contained" color="primary" onClick={sendMessage}>
          
          <SendIcon />

        </IconButton>

      </FormControl>

      </form>

      <FlipMove>
        {
          messages.map(({id, message}) => (
              <Message key={id} username={username} message={message} />
            ))
        }
      </FlipMove>

    </div>
  );
}

export default App;
