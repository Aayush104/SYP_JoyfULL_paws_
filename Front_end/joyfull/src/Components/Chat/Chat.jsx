import './Chat.css';
import InnerNav from '../InnerNav/InnerNav';
// import { useParams } from 'react-router-dom';


const Chat = () => {
  // const { name } = useParams();
  return (
    <>
      <InnerNav />
      <div className='main_chat'>
        <div className='w-chat'>
          <div className='dashboard'>
            <p>This is dashboard</p>
          </div>
          <div className='conversation'>
          <div className='p-name'>
          <span>Aayush</span>
          </div>
      
            <div className='texts'>
              <div className='received'>
                <p>Hello, my name is Aayush</p>
              </div>
              <div className='sent'>
                <p>Hi, I am Pratiush</p>
              </div>
            </div>
            <div className='sender'>
              <input type='text' />
              <button className='button2'>Send</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
