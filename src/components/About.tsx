import React,{useEffect,useRef} from "react";
import {motion,useAnimation,useInView} from "framer-motion"
import { fadeIn } from "../utils/motion";
import {profile} from "../assets/"
import { SectionWrapper } from "../hoc";

const About = ()=>{
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
        <div className="aboutWrapper">
           <motion.div 
           ref={ref}
           className="bgHero"
           variants={fadeIn('right', 'spring', 0.5, .75)}
           animate={controls}
           initial="hidden"
           >
            <div className="row">
            <div className="col-sm-12 col-md-6">
                <motion.div 
                className="heroContent"
                variants={fadeIn('right', 'spring', 1.25, .75)}
                >
               <h1 
               className="heroTitle">Hi, I am a</h1>
               <h1 className="heroTitle">Frontend Developer</h1>
               </motion.div>
            </div>
            <div className="col-sm-12 col-md-6">
            <motion.div 
            className="profileContainer"
            variants={fadeIn('left', 'spring', 0.5, .75)}
           >
                 <img src={profile} alt="profile" className="profile-image"></img>
                 </motion.div>
            </div>
            </div>
           </motion.div>
        </div>
    )
}
export default SectionWrapper(About, 'about');
