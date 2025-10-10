import React from "react";

const JobBoards: React.FC = () => {
  return (
    <div className="page">
      <h1 className="text-center">Job Boards</h1>

      <div className="flex flex-col gap-4 mt-4">
        <a
          href="https://www.linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-4 border-2 border-gray-300 rounded-md hover:bg-blue-100 hover:border-blue-500 transition-colors"
        >
          <div className="flex flex-col">
            <span className="text-xl font-semibold text-blue-500">
              LinkedIn
            </span>
          </div>
        </a>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        <a
          href="https://hiring.cafe/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-4 border-2 border-gray-300 rounded-md hover:bg-pink-100 hover:border-pink-500 transition-colors"
        >
          <div className="flex flex-col">
            <span className="text-xl font-semibold text-pink-500">
              HiringCafe
            </span>
          </div>
        </a>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        <a
          href="https://www.glassdoor.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-4 border-2 border-gray-300 rounded-md hover:bg-green-100 hover:border-green-500 transition-colors"
        >
          <div className="flex flex-col">
            <span className="text-xl font-semibold text-green-500">
              GLASSDOOR
            </span>
          </div>
        </a>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        <a
          href="https://builtin.com/jobs"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-4 border-2 border-gray-300 rounded-md hover:bg-blue-100 hover:border-blue-800 transition-colors"
        >
          <div className="flex flex-col">
            <span className="text-xl font-semibold text-blue-800">
              Built In
            </span>
          </div>
        </a>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        <a
          href="https://us.welcometothejungle.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-4 border-2 border-gray-300 rounded-md hover:bg-yellow-100 hover:border-yellow-500 transition-colors"
        >
          <div className="flex flex-col">
            <span className="text-xl font-semibold text-yellow-500">
              Welcome to the Jungle
            </span>
          </div>
        </a>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        <a
          href="https://www.indeed.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-4 border-2 border-gray-300 rounded-md hover:bg-sky-100 hover:border-sky-500 transition-colors"
        >
          <div className="flex flex-col">
            <span className="text-xl font-semibold text-sky-500">indeed</span>
          </div>
        </a>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        <a
          href="https://www.dice.com/jobs"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-4 border-2 border-gray-300 rounded-md hover:bg-red-100 hover:border-red-500 transition-colors"
        >
          <div className="flex flex-col">
            <span className="text-xl font-semibold text-red-500">Dice</span>
          </div>
        </a>
      </div>
    </div>
  );
};

export default JobBoards;
