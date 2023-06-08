/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import './chat.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { TalkBox } from 'react-talk';
import { Modal, Button } from 'react-bootstrap';

export default function ChatRoom({ socket }) {
  const params = useParams();
  const roomId = params.id;
  const [chatMessages, setChatMessages] = useState([]);
  const [userName, setUserName] = useState('');
  const [userNameModal, setUserNameModal] = useState(true);
  socket.on('connect', () => {
    pushMessage({
      message: 'Connection Established',
      name: 'server',
      id: socket.id,
    });
    socket.emit('join-room', roomId);
  });

  socket.emit('new-user', userName === '' ? 'Random User' : userName);

  const sendMessage = (msg) => {
    const sendMessageObj = {
      message: msg,
      name: userName,
      id: socket.id,
    };
    pushMessage(sendMessageObj);
    socket.emit('send-chat-message', msg, roomId);
    return true;
  };

  socket.on('chat-message', (data) => {
    pushMessage(data);
  });

  function pushMessage(data) {
    const newSendMessage = {
      author: data.name,
      authorId: data.id,
      message: data.message,
      timestamp: Date.now().toString(),
    };
    setChatMessages([...chatMessages, newSendMessage]);
  }

  function handleClose() {
    setUserNameModal(false);
  }

  return (
    <div className='container mt-5 '>
      <div className='row'>
        <div className='col-12 col-md-4 m-auto'>
          <TalkBox
            topic='Chat'
            currentUserId={socket.id}
            currentUser='Pinger'
            messages={chatMessages}
            onSendMessage={sendMessage}
          />
        </div>
      </div>
      <div className='static-modal'>
        <Modal show={userNameModal} onHide={handleClose} backdrop='static'>
          <Modal.Header>
            <Modal.Title>Enter UserName</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <input
              type='text'
              className='form-control'
              onChange={(e) => setUserName(e.target.value)}
              placeholder='Enter name'
            />
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={handleClose}>Close</Button>
            <Button bsStyle='primary' onClick={handleClose}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      ;
    </div>
  );
}
