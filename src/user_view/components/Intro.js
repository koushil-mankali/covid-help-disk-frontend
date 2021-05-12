import { Link } from "react-router-dom";

import Button from "../../UI/Button";

import "./intro.css";

let Intro = () => {
  return (
    <div className="intro">
      <p>STAY HOME STAY SAFE</p>
      <p>Wear a mask to protect you'r self and others and stop the CHAIN!</p>
      <p>For Home Isolation Guidlines</p>
      <Button className='introbtn'>
        <Link to="https://youtu.be/I3DGp4ozMB0" className='linkdiss'>Click Here</Link>
      </Button>
    </div>
  );
};

export default Intro;
