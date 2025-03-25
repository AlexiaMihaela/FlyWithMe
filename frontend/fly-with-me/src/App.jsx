import '@mantine/core/styles.css'
import { Button } from "@mantine/core";
import "./App.css";

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
    </div>
  );
};

export default App;