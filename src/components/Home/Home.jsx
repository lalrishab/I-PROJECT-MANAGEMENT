import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import logo10 from '../../assets/logo10.png';

const CreateProjectForm = () => {
  const navigate = useNavigate(); 
  const [showForm, setShowForm] = useState(false);
  const [projectList, setProjectList] = useState(() => {
    // Load project list from local storage on component mount
    const storedProjects = localStorage.getItem('projectList');
    return storedProjects ? JSON.parse(storedProjects) : [];
  });
  const [domainName, setDomainName] = useState('');
  const [requirements, setRequirements] = useState('');
  const [membersRequired, setMembersRequired] = useState(0);

  const handleCreateClick = () => {
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const enteredDomain = e.target.elements.domain.value;
    const enteredRequirements = e.target.elements.requirements.value;
    const enteredMembersRequired = parseInt(e.target.elements.members.value);

    const newProject = {
      domain: enteredDomain,
      requirements: enteredRequirements,
      membersRequired: enteredMembersRequired
    };

    setProjectList([...projectList, newProject]);

    setDomainName('');
    setRequirements('');
    setMembersRequired(0);
    setShowForm(false); // Close the form after submitting
  };

  const handleJoinProject = (projectId) => { // Update function to accept projectId instead of index
    navigate(`/ToDo/${projectId}`); // Navigate to the ToDo page with the selected project's ID
  };

  useEffect(() => {
    // Save project list to local storage whenever it changes
    localStorage.setItem('projectList', JSON.stringify(projectList));
  }, [projectList]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-200 p-6">
      <h1 className="text-5xl font-bold mb-8 text-center text-gray-800">
        Welcome to{' '}
        <span className="text-blue-600">Project</span>{' '}
        <span className="text-green-600">Management</span>
      </h1>

      <div className="flex justify-center mb-8">
        <img className="w-40 h-40 object-contain rounded-full" src={logo10} alt="Project Logo" />
      </div>

      {!showForm ? (
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Create or Join a Project</h2>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
            onClick={handleCreateClick}
          >
            Create Project
          </button>
        </div>
      ) : (
        <>
          <form className="mt-8 bg-white rounded-lg shadow-lg px-8 py-6 sm:w-96 mx-auto" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Create a New Project</h2>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="domain">
                Domain of the Project
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="domain"
                name="domain"
                type="text"
                placeholder="Enter project domain"
                value={domainName}
                onChange={(e) => setDomainName(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="requirements">
                Requirements Knowledge
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="requirements"
                type="text"
                placeholder="Enter required knowledge"
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="members">
                Members Required
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="members"
                type="number"
                placeholder="Enter number of members required"
                value={membersRequired}
                onChange={(e) => setMembersRequired(parseInt(e.target.value))}
              />
            </div>

            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg w-full transition duration-300 ease-in-out transform hover:scale-105"
              type="submit"
            >
              Create Project
            </button>
          </form>
        </>
      )}

      {/* Display project details cards */}
      <div className="mt-8 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {projectList.map((project, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105"
          >
            <h2 className="text-lg font-bold mb-2 text-gray-800">Project Details</h2>
            <div className="text-gray-700">
              <p><span className="font-bold">Domain:</span> {project.domain}</p>
              <p><span className="font-bold">Requirements:</span> {project.requirements}</p>
              <p><span className="font-bold">Members Required:</span> {project.membersRequired}</p>
            </div>
            <button
              className="mt-4 bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
              onClick={() => handleJoinProject(project.domain)} 
            >
              Join
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreateProjectForm;
