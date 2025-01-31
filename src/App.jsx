import React from "react";

import NavBar from "./components/NavBar";
import CCustomizer from "./components/CCustomizer";

function App() {
  return (
    <div>
      <NavBar />
      <CCustomizer /> {/* This includes the Model component already */}
      {/* <HeroSection /> */}
      {/* <IntroductionSection />       */}
      {/* <FeaturesSection /> */}
      {/* <ColorHeroSection /> */}
      {/* <ColorGallerySection /> */}
    </div>
  );
}

export default App;
