import React,{useRef,useEffect} from "react";
import {motion,useAnimation,useInView} from "framer-motion"
import { fadeIn,textVariant } from "../utils/motion";
import { projectsInfo } from "../constants";
import { SectionWrapper } from "../hoc";

const ProjectCard = ({ index, title, icon,controls }:{index:number,title:string,icon:string,controls:any}) => {
    return (
      <motion.div
        variants={fadeIn('right', 'spring', 0.5 * index, 0.75)}
        animate={controls}
        initial="hidden"
        className="projectCardSingle">
          <img src={icon} alt={title} className="projectImage" />
          <h3 className="projectCardTitle">
            {title}
          </h3>
      </motion.div>
    );
  };

const Projects = ()=>{
  const controls = useAnimation();
  const ref = useRef(null)
  const isInView = useInView(ref)
useEffect(() => {
  if (isInView) {
    controls.start("show");
  }else if((!isInView)){
    controls.start("hidden");

  }
}, [controls, isInView]);
    return(
        <div className="projectContainer">
            <div className="container">
                <motion.div
                ref={ref}
                 variants={textVariant(.5)}
                 animate={controls}
                 initial="hidden"
                >
                <h2 
                className="projectSubTitle"
               
                >Case Studies</h2>
                <h1 
                className="ProjectTitle"
                >Projects</h1>
                </motion.div>
                <motion.p 
                className="projectBody"
                variants={fadeIn('', '', 0.1, 1)}
                animate={controls}
                initial="hidden"
                >These projects demonstrate my expertise with practical examples of 
                some of my work, including brief descriptions and links to code repositories and live demos. They showcase
                 my ability to tackle intricate challenges, adapt to various technologies, and efficiently oversee projects.</motion.p>
            </div>
            <div className="container">
                <div className="projectCardContainer">
        {projectsInfo.map((project, index) => (
          <ProjectCard key={project.title} index={index} {...project} controls={controls}/>
        ))}
        </div>
      </div>
        </div>
    )
}
export default SectionWrapper(Projects, 'projects');
