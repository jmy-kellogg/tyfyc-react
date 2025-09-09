import type { ApplicationUpdate, Application } from "@/types";

interface Props {
  onUpdate: (form: ApplicationUpdate) => void;
  application: Application;
}

const PostingBtnMenu = ({ onUpdate, application }: Props) => {
  const updateCompany = () => {
    const text = window?.getSelection()?.toString() || "";
    if (text) {
      onUpdate({ company: text });
    }
  };

  const updateLocation = () => {
    const text = window?.getSelection()?.toString() || "";
    if (text) {
      onUpdate({ location: text });
    }
  };

  const updateSalary = () => {
    const text = window?.getSelection()?.toString() || "";
    if (text) {
      onUpdate({ salary: text });
    }
  };

  return (
    <div className="flex">
      <button
        className={`group p-1 mr-1 flex rounded-sm border-1 ${application.company ? "border-gray-300 hover:bg-gray-200 " : "border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white"} hover:cursor-pointer`}
        onClick={updateCompany}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z"
          />
        </svg>
        <span className="flex group-hover:hidden">
          {application.company || "Company"}
        </span>
        <span className="hidden group-hover:flex">Update Company</span>
      </button>

      <button
        className={`group p-1 mr-1 flex rounded-sm border-1 ${application.location ? "border-gray-300 hover:bg-gray-200 " : "border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white"} hover:cursor-pointer`}
        onClick={updateLocation}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
          />
        </svg>
        <span className="flex group-hover:hidden">
          {application.location || "Location"}
        </span>
        <span className="hidden group-hover:flex">Update Location</span>
      </button>

      <button
        className={`group p-1 mr-1 flex rounded-sm border-1 ${application.salary ? "border-gray-300 hover:bg-gray-200 " : "border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white"} hover:cursor-pointer`}
        onClick={updateSalary}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
        <span className="flex group-hover:hidden">
          {application.salary || "Salary"}
        </span>
        <span className="hidden group-hover:flex">Update Salary</span>
      </button>

      {/* <button className="group p-1 mx-1 flex rounded-sm border-1 border-gray-300 hover:bg-gray-200 hover:cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z"
          />
        </svg>
        <span className="hidden group-hover:flex">Add Skill</span>
      </button> */}
    </div>
  );
};
export default PostingBtnMenu;
