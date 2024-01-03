import React from 'react';


const projects = [
    {
      title: 'Personal Website',
      description: 'Personal website prototype, having multiple pages and features such as questionnaire, photo gallery, contact me etc., and digital card that gives brief information about me',
      link: 'https://aliamrahli.github.io/personal-page-web1/',
    },
    {
      title: 'Fetch and display from API',
      description: 'This web application is designed to integrate with the dummyjson.com API to fetch product information and dynamically display it on the home page. The application includes various features to enhance user interaction, such as detailed product information, search functionality, category filtering, and pagination.',
      link: 'https://aliamrahli.github.io/fetch-and-display-from-API-as2/',
    },
  ];

const Home = () => (
    <div className="Home">
      <h1>My Portfolio</h1>
      <p className='Introduction'>
        Hello! I am Ali Amrahli, and this is my portfolio showcasing the projects I have worked on during Web&Mobile 1 course.
      </p>
  
      <h3>Projects:</h3>
      <ul className="ProjectList">
        {projects.map((project,index) => (
          <li className="ProjectListItem" key={index}>
            <strong>{project.title}</strong>
            <p className='desc'>{project.description}</p>
            <a href={project.link} target="_blank" className="ProjectLink">
              View Project
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
export default Home;