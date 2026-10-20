import CarScrollBanner from "../Component/CarScrollBanner";
import Model from "../Component/Model";

import CylinderShowcase from "../Component/CylinderShowcase"

import Choose from "../Component/Choose";
import Footer from "../Component/Footer";

function Home() {
  return (
    <div>
      <CarScrollBanner />
      <Model/>
     <CylinderShowcase/>
      <Choose/>
     <Footer/>
  
    </div>
  );
}

export default Home;