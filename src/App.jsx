import React from "react";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import WorksPage from "./components/Works";
import Footer from "./components/Footer";
import Space from "./components/Space";

const App = () => {
  return (
    <div>
      
      <Hero />
      <Space />
      <About />
      <Space />
      <Skills />
      <Space />
      <WorksPage />
      <Space />
      <Footer />

    </div>
  );
};

export default App;


