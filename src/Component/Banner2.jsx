import './Banner2.css';

import { UserRoundCog } from "lucide-react";
import { ShieldCheck} from "lucide-react";
import { Clock3 } from "lucide-react";
import { ArrowRightFromLine } from "lucide-react";
const Banner2 = () => {
  return (
   <div className="banner-img">
  <div className="contents">

    <h3>PREMIUM CARE FOR YOUR RIDE</h3>

    <h1>
      CAR <sub>HIRE</sub>
    </h1>

    <h2>
      SERV <em>ICES</em>
    </h2>

    <div className="dec">
      <p>
        From purchase to performance, we’re with you at every step.
        Our comprehensive services ensure your car stays in top condition, always.
      </p>
    </div>

    <div className="ico">

      <div className="service-feature">
        <ShieldCheck  className="ch-ic" />
        <h4>Trusted Experts</h4>
      </div>

      <div className="feature-divider"></div>

      <div className="service-feature">
        <UserRoundCog  className="ch-ic" />
        <h4>Genuine Parts</h4>
      </div>

      <div className="feature-divider"></div>

      <div className="service-feature">
        <Clock3  className="ch-ic" />
        <h4>Fast &amp; Reliable Service</h4>
      </div>

    </div>

    <button>Explore Our Services

        <ArrowRightFromLine className="ch-icon" />
         </button>

  </div>
</div>
  )
}

export default Banner2