  import { useRef,useEffect } from "react";
  import {VerticalTimeline,VerticalTimelineElement} from "react-vertical-timeline-component"
  import { motion,useAnimation,useInView } from 'framer-motion';
  import 'react-vertical-timeline-component/style.min.css';
  import { experiences } from '../constants';
  import { SectionWrapper } from '../hoc';
  import { download, downloadHover, resume,shashankResume } from '../assets';
  import { textVariant } from '../utils/motion';
  
  const ExperienceCard = ({ experience }:{experience:any}) => (
    <VerticalTimelineElement
      contentStyle={{
        background: '#eaeaec',
        color: '#292929',
        boxShadow:
          'rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
      }}
      contentArrowStyle={{
        borderRight: '7px solid  #232631',
      }}
      date={experience.date}
      iconStyle={{ background: experience.iconBg }}
      icon={
        <div className="experienceLogoContainer">
          <img
            src={experience.icon}
            alt={experience.company_name}
            className="experienceLogo"
          />
        </div>
      }>
      <div>
        <h3 className="">
          {experience.title}
        </h3>
        <p
          className=""
          style={{ margin: 0 }}>
          {experience.company_name}
        </p>
      </div>
    </VerticalTimelineElement>
  );
  
  const Experience = () => {
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

    return (
        <div className="experiencebg">
      <div className="experienceWrapper">
        <div className="experience-linear">
    <div className="container">

        <motion.div 
           ref={ref}
        variants={textVariant(.5)}
        animate={controls}
        initial="hidden"
        >
          <p className="projectSubTitle">
            What I've done so far
          </p>
          <h2 className="ProjectTitle">
            Work Experience.
          </h2>
        </motion.div>
        <motion.div 
           ref={ref}
        variants={textVariant(1)}
        animate={controls}
        initial="hidden"
        >
        <div className="mt-20 flex flex-col">
          <VerticalTimeline className="vertical-timeline-custom-line">
            {experiences.map((experience, index) => (
              <ExperienceCard key={index} experience={experience} />
            ))}
            <VerticalTimelineElement
              contentStyle={{
                background: '#eaeaec',
                color: '#292929',
                boxShadow:
                  'rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              contentArrowStyle={{
                borderRight: '7px solid  #232631',
              }}
              iconStyle={{ background: '#333333' }}
              icon={
                <div className="experienceLogoContainer">
                  <img
                    src={resume}
                    alt="resume"
                    className="experienceLogo"
                  />
                </div>
              }>
              <a
              download
              href={shashankResume}
                className="resumeContainer"
                >
                MY RESUME
                <img
                  src={download}
                  alt="download"
                  className="download-btn experienceLogo"
                />
              </a>
            </VerticalTimelineElement>
          </VerticalTimeline>
        </div>
        </motion.div>
        </div>
        </div>
      </div>
      </div>
    );
  };
  
  export default SectionWrapper(Experience, 'work');
  