import Home from './components/Home';
import { Route, Routes } from 'react-router-dom';
import ChatRoom from './components/ChatRoom/ChatRoom';
import { io } from 'socket.io-client';
const socket = io(process.env.SERVER_URL, {
  forceNew: true,
});
function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Home socket={socket} />} />
        <Route path='/chatRoom/:id' element={<ChatRoom socket={socket} />} />
      </Routes>
    </div>
  );
}

export default App;
