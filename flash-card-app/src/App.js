import React from 'react';
import './App.css';

const projects = [
  {
    title: 'Personal Website',
    description: 'Personal website prototype, having multiple pages and features such as questionnaire, photo gallery, contact me etc. Personal digital card made showcasing brief information about me',
    link: 'https://aliamrahli.github.io/personal-page-web1/',
  },
  {
    title: 'Fetch and display from API',
    description: 'This web application is designed to integrate with the dummyjson.com API to fetch product information and dynamically display it on the home page. The application includes various features to enhance user interaction, such as detailed product information, search functionality, category filtering, and optional pagination.',
    link: 'https://aliamrahli.github.io/fetch-and-display-from-API-as2/',
  },
  // Add more projects as needed
];

const Home = () => (
  <div className="Home">
    <p className='Introduction'>
      Hello! I am Ali Amrahli, and this is my portfolio showcasing the projects I have worked on.
    </p>

    <h3>Projects:</h3>
    <ul className="ProjectList">
      {projects.map((project) => (
        <li className="ProjectListItem">
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



function App() {
  return (
    <div className="App">
    <main>
      <Home />
    </main>
    </div>
  );
}

export default App;
