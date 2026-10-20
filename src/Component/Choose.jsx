import { Link } from "react-router-dom";

import { Settings } from "lucide-react";
import { Cpu } from "lucide-react";
import { ShieldCheck} from "lucide-react";
import { GlobeCode} from "lucide-react";

import "./Choose.css";

const Choose = () => {
  return (
    <div className="ch-section">
      <h1 className="ch-heading"><ShieldCheck className="trust" />WHY <span>CHOOSE</span>  CAR<sub>HIRE</sub></h1>

      <div className="ch-grid">
        <div className="ch-box">
           <Link to="/services" className="ch-box">
         
        
          <Settings className="ch-icon" />
          <h1>Premium Quality</h1>
          <h3>Exceptional materials. Exceptional driving experience.</h3>
         </Link>
        </div>

        <div className="ch-box">
              <Link to="/services" className="ch-box">
            <Cpu className="ch-icon" />
         
          <h1>Advanced Technology</h1>
          <h3>Smart features built for modern drivers.</h3>
          </Link>
        </div>

        <div className="ch-box">
              <Link to="/services" className="ch-box">
            <ShieldCheck className="ch-icon" />
         
          <h1>Safety First</h1>
          <h3>Advanced safety for every journey.</h3>
          </Link>
        </div>

        <div className="ch-box">
              <Link to="/services" className="ch-box">
            <GlobeCode  className="ch-icon" />
         
          <h1>Global Support</h1>
          <h3>Support whenever and wherever you need it.</h3>
          </Link>
        </div>
      </div>

<div className="hero-lifestyle-section">
  <div className="hero-lifestyle-container">
    <h1 className="hero-lifestyle-heading">
      More Than Just a Car <span>It's a Lifestyle.</span>
    </h1>

    <Link to="/about" className="hero-about-btn">
      About
    </Link>
  </div>
</div>
    </div>
  );
};

export default Choose;