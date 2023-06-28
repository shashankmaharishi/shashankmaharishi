import Navbar from "./Navbar";
import About from "./About";
import Projects from "./Projects";
import Experience from "./Experience";
import Skills from "./Skills";

function HomePage() {

  return (
    <>
          <Navbar />
          <About/>
          <Projects/>
          <Experience/>
          <Skills/>
          </>
  );
}

export default HomePage;
