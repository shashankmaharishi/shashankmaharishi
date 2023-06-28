import { useEffect,useRef } from "react"
import { SectionWrapper } from "../hoc"
import {motion,useAnimation,useInView} from "framer-motion"
import { textVariant } from "../utils/motion"
import { skills } from "../constants"
import { fadeIn,fadeInSkill } from "../utils/motion"

const SkillCard = ({title,index,width,controls}:{title:string,index:number,width:number,controls:any})=>{
    return(
       <motion.div 
       className="skillContainer"
       variants={fadeIn('right', 'spring', 0.5 * index, 0.75)}
       animate={controls}
       initial="hidden"
       >
        <motion.div 
        className="skillCardBg" style={{width:`${width}%`}}
       variants={fadeInSkill(width, 'spring', 0 * index, .75)}
        
        ></motion.div>
        <div className="skillText">
       {title}
       </div>
       </motion.div>
    )
   }

const Skills = ()=>{
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
        <div className="skillWrapper">
            <div className="container">
            <motion.div
            ref={ref} 
            variants={textVariant(.5)}
            animate={controls}
            >
        <p className="projectSubTitle">My skills</p>
        <h2 className="ProjectTitle text-white">Technologies.</h2>
      </motion.div>
      <div className="row">
      {
        skills.map((skill,index)=>(
            <div className="col-sm-12 col-md-3">
            <SkillCard title={skill.title} index={index} width={skill.width} controls={controls}/>
            </div>
        ))
      }
      </div>

            </div>
        </div>
    )
}

export default SectionWrapper(Skills,'skills')