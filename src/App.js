import React, { useState, useEffect } from 'react';
import './App.css';
import { Button, FormControl, Input, InputLabel } from '@material-ui/core'
import Message from './Message'
import db from './firebase'
import firebase from 'firebase'
import FlipMove from 'react-flip-move'

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
      <h1>FB Messenger Clone</h1>
      <h2>Welcome {username}</h2>
      <form>
      <FormControl>
        <InputLabel>Enter a message...</InputLabel>
        <Input value={input} onChange={event => setInput(event.target.value)} />
        <br/>
        <Button disabled={!input} size="small" type="submit" variant="contained" color="primary" onClick={sendMessage}>Send Message</Button>
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
