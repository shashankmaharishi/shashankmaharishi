import {game,medical,portfolio,agency,forkify,squareboat,chicku} from "../assets"

export const navLinks = [
    {
        id: "about",
        name: "About",
        path: "/",
        isVisible: true,
      },
      {
        id: "projects",
        name: "Projects",
        isVisible: true,
      },
      {
        id: "work",
        name: "Experirnce",
        isVisible: true,
      },
      {
        id: "skills",
        name: "Skills",
        isVisible: true,
      },
      
  ];

  export const projectsInfo = [
    {
      title: 'Forkify',
      icon: forkify,
    },
    {
      title: 'Pig Game',
      icon: game,
    },
    {
      title: 'Medical Website',
      icon: medical,
    },
    {
      title: 'Agency Website',
      icon: agency,
    },  {
      title: 'Portfolio Website',
      icon: portfolio,
    }
  ];

  export const experiences = [
    {
      title: 'Front-End Developer',
      company_name: 'Squareboat Solutions',
      icon: squareboat,
      iconBg: '#333333',
      date: 'Jun 2022 - May 2023',
    },
    {
      title: 'Front-End Developer',
      company_name: 'Chicku App',
      icon: chicku,
      iconBg: '#333333',
      date: 'Apr 2021 - Jun 2022',
    }
  ];

  export const skills = [
    {
      title:"React.js",
      width:80
    },{
      title:"Next.js",
      width:50
    },{
      title:"Javascript",
      width:80
    },{
      title:"Typescript",
      width:80
    },{
      title:"Redux",
      width:80
    },{
      title:"HTML",
      width:80
    },{
      title:"CSS",
      width:80
    },{
      title:"Bootstrap",
      width:80
    },
  ]