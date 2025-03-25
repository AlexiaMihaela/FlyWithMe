import { Player } from "@lottiefiles/react-lottie-player";
import flyAnimation from "./assets/Animation.json";
import '@mantine/core/styles.css'
import "./App.css";
import SignUp from "./components/SignUp/signUp";
import SignIn from "./components/signIn/signIn"

const App = () => {
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

export default App;