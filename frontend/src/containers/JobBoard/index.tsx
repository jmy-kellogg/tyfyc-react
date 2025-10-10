import { FC, useState, FormEvent, ChangeEvent, useEffect } from "react";
import { getJobSearches, createJobSearch } from "@/api/jobSearch";
import type { JobSearch, JobSearchCreate } from "@/types";

interface JobBoard {
  id: string;
  name: string;
  link: string;
  hostname: string;
  textColor: string;
  color: string;
}

interface JobSearchForm {
  name: string;
  link: string;
  details: string;
  boardName: string;
}

const boardsMap: JobBoard[] = [
  {
    id: "linkedIn",
    name: "LinkedIn",
    hostname: "linkedin",
    link: "https://www.linkedin.com",
    textColor: "blue-500",
    color: "blue",
  },
  {
    id: "hiringCafe",
    name: "HiringCafe",
    hostname: "hiring.cafe",
    link: "https://hiring.cafe/",
    textColor: "pink-500",
    color: "pink",
  },
  {
    id: "glassdoor",
    name: "GLASSDOOR",
    hostname: "glassdoor",
    link: "https://www.glassdoor.com",
    textColor: "green-500",
    color: "green",
  },
  {
    id: "builtIn",
    name: "Built In",
    hostname: "builtin",
    link: "https://builtin.com/jobs",
    textColor: "blue-800",
    color: "blue",
  },
  {
    id: "welcomeToTheJungle",
    name: "Welcome to the Jungle",
    hostname: "welcometothejungle",
    link: "https://us.welcometothejungle.com/",
    textColor: "yellow-500",
    color: "yellow",
  },
  {
    id: "indeed",
    name: "indeed",
    hostname: "indeed",
    link: "https://www.indeed.com",
    textColor: "sky-500",
    color: "sky",
  },
  {
    id: "dice",
    name: "Dice",
    hostname: "dice",
    link: "https://www.dice.com/jobs",
    textColor: "red-500",
    color: "red",
  },
];

const JobBoards: FC = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [jobSearches, setJobSearches] = useState<JobSearch[]>([]);
  const [searchForm, setSearchForm] = useState<JobSearchForm>({
    name: "",
    link: "",
    details: "",
    boardName: "",
  });

  useEffect(() => {
    const fetchJobSearches = async (): Promise<void> => {
      try {
        const searches = await getJobSearches();
        setJobSearches(searches);
      } catch (error) {
        console.error("Failed to fetch job searches:", error);
      }
    };

    fetchJobSearches();
  }, []);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ): void => {
    setSearchForm({
      ...searchForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    try {
      const newJobSearch: JobSearchCreate = {
        name: searchForm.name,
        link: searchForm.link,
        details: searchForm.details,
        boardName: searchForm.boardName || undefined,
      };

      const createdSearch = await createJobSearch(newJobSearch);
      setJobSearches([...jobSearches, createdSearch]);
      setShowForm(false);
      setSearchForm({ name: "", link: "", details: "", boardName: "" });
    } catch (error) {
      console.error("Failed to create job search:", error);
    }
  };

  return (
    <div className="page">
      <h1 className="text-center">Job Boards</h1>
      <button
        type="button"
        className="flex align-bottom rounded-md bg-indigo-600 text-white m-3 p-2 font-semibold shadow-md hover:cursor-pointer hover:bg-indigo-500"
        onClick={(e: React.MouseEvent<HTMLButtonElement>): void => {
          e.stopPropagation();
          setShowForm(!showForm);
        }}
      >
        {showForm ? "Cancel" : "Add Search"}
      </button>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 p-4 border-2 border-gray-300 rounded-md mb-4 mx-3"
        >
          <h2 className="text-lg font-semibold">Add New Job Search</h2>

          <input
            type="text"
            name="name"
            placeholder="Search Name"
            value={searchForm.name}
            onChange={handleInputChange}
            className="rounded-md bg-white p-2 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
            required
          />

          <input
            type="url"
            name="link"
            placeholder="Search Link"
            value={searchForm.link}
            onChange={handleInputChange}
            className="rounded-md bg-white p-2 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
            required
          />

          <textarea
            name="details"
            placeholder="Search Details"
            value={searchForm.details}
            onChange={handleInputChange}
            className="rounded-md bg-white p-2 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
            rows={3}
          />

          <input
            type="text"
            name="boardName"
            placeholder="Job Board Name (Optional)"
            value={searchForm.boardName}
            onChange={handleInputChange}
            className="rounded-md bg-white p-2 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
          />

          <button
            type="submit"
            className="rounded-md bg-indigo-600 text-white p-2 font-semibold shadow-md hover:bg-indigo-500"
          >
            Save Search
          </button>
        </form>
      )}

      {jobSearches.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-3">Saved Searches</h2>
          {jobSearches.map((search) => {
            let board;
            try {
              const url = new URL(search.link);
              const baseUrl = url.hostname.replace("www.", "");
              board = boardsMap.find(({ hostname }) => hostname == baseUrl);
            } catch {
              console.error("Invalid URL:", search.link);
            }

            return (
              <div key={search.id} className="flex flex-col gap-4 mt-4">
                <a
                  href={search.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3 p-4 border-2 border-gray-300 rounded-md hover:bg-${board?.color || "grey"}-100 hover:border-${board?.textColor || "indigo-600"} transition-colors`}
                >
                  <div className="flex flex-col">
                    <span
                      className={`text-xl font-semibold text-${board?.textColor || "indigo-600"}`}
                    >
                      {search.name}
                    </span>
                    <span className="mx-2">
                      {search.boardName ||
                        (board?.name && (
                          <span className="text-md font-semibold text-gray-500">
                            {search.boardName || board?.name}
                          </span>
                        ))}
                      {search.details && (
                        <p className="text-sm text-gray-700 mt-1">
                          {search.details}
                        </p>
                      )}
                    </span>
                  </div>
                </a>
              </div>
            );
          })}
        </div>
      )}

      <h2 className="text-xl font-semibold mt-6 mb-3">Job Boards</h2>
      {boardsMap.map(({ id, name, link, textColor, color }) => (
        <div key={id} className="flex flex-col gap-4 mt-4">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-3 p-4 border-2 border-gray-300 rounded-md hover:bg-${color}-100 hover:border-${textColor} transition-colors`}
          >
            <div className="flex flex-col">
              <span className={`text-xl font-semibold text-${textColor}`}>
                {name}
              </span>
            </div>
          </a>
        </div>
      ))}
    </div>
  );
};

export default JobBoards;
