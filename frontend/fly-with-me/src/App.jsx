import '@mantine/core/styles.css'
import { Button } from "@mantine/core";
import "./App.css";
import flyAnimation from "./assets/Animation.json";
import { Player } from "@lottiefiles/react-lottie-player";

const App = () => {
  return (
    <div className="container">
      <div className="text">
        <h1>FLY WITH <br /> ME</h1>
        <p>Your next adventure starts here. Fast bookings, great prices, and smooth flights to the places you love</p>
        <div className="buttons">
        <Button >Sign In</Button>
        <Button >Sign Up</Button>
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