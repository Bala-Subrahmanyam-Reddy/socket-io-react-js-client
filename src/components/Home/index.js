/* eslint-disable react/jsx-no-target-blank */
import React from 'react';
import { v4 as uuid } from 'uuid';
import { useState } from 'react';

export default function Home({ socket }) {
  const [joinRoom, setJoinRoom] = useState('');

  return (
    <div className='container mt-5 '>
      <div className='row pt-5'>
        <div className='col-4 m-auto '>
          <div className='d-flex flex-column justify-content-between align-items-left pb-5'>
            <form className='d-flex flex-row'>
              <div className='form-group mx-sm-3 mb-2'>
                <input
                  type='text'
                  className='form-control'
                  value={uuid()}
                  readOnly={true}
                />
              </div>

              <a
                className='btn btn-primary mb-2'
                href={`/chatRoom/${uuid()}`}
                target='_blank'
              >
                Create
              </a>
            </form>
            <form className='d-flex flex-row'>
              <div className='form-group mx-sm-3 mb-2'>
                <input
                  type='text'
                  className='form-control'
                  onChange={(e) => setJoinRoom(e.target.value)}
                  placeholder='Room id '
                />
              </div>
              <a
                className='btn btn-primary mb-2'
                href={`/chatRoom/${joinRoom}`}
                target='_blank'
              >
                Join
              </a>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
