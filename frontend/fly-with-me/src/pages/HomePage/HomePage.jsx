
import SignIn from '../../components/SignIn/SignIn'
import SignUp from '../../components/SignUp/SignUp';
import './HomePage.css';
import { Player } from '@lottiefiles/react-lottie-player'; 

import flyAnimation from '../../assets/Animation.json';

const HomePage = () => {
    return (
      <div className="container">
        <div className="text">
          <h1>FLY WITH <br /> ME</h1>
          <p>Your next adventure starts here. Fast bookings, great prices, and smooth flights to the places you love</p>
          <div className="buttons">
          <SignIn/>
          <SignUp/>
          </div>
        </div>
  
        <div className="animation">
          <Player
            autoplay
            loop
            src={flyAnimation}
            className="lottie-player"
          />
        </div>
      </div>
    );
  };
  export default HomePage;