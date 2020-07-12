import React, { useState, useEffect } from 'react';
import './App.css';
import { Button, FormControl, Input, InputLabel } from '@material-ui/core'
import Message from './Message'

function App() {

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');

  // useState = variable in REACT
  // useEffect = run code on a specific condition (when data changes in db)

  const sendMessage = (event) => {
      // logic to send message
      event.preventDefault()
      setMessages([...messages, input]);
      setInput('');
  }

  useEffect(() =>{
    // run code
    setUsername(prompt('Please enter your name'));
    // If its blank inside [], this code runs ONCE when the app component loads
    // If we have a varaible like input inside [], it runs when input changes everytime 
  },[]) // condition dependencies

  return (
    <div className="App">
      <h1>FB Messenger Clone</h1>
      <form>
      <FormControl>
        <InputLabel>Enter a message...</InputLabel>
        <Input value={input} onChange={event => setInput(event.target.value)} />
        <Button disabled={!input} size="small" type="submit" variant="contained" color="primary" onClick={sendMessage}>Send Message</Button>
      </FormControl>

      </form>

      {
        messages.map(message => (
            <Message text={message} />
          ))
      }

    </div>
  );
}

export default App;
