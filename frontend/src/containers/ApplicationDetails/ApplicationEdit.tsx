// Deprecated
import { useState, useEffect, ChangeEvent } from "react";
import { statusOptions } from "@options";
import { getApplication, updateApplication } from "@/api/applications";

import type { Application } from "@/types/applications";
import RichEditor from "@/components/RichEditor";

interface Props {
  applicationId: string;
}

function ApplicationEdit({ applicationId }: Props) {
  const [formData, setFormData] = useState<Partial<Application>>({});
  const [posting, setPosting] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  const onChangeData = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const field = e.target.name;
    const value = e.target.value;

    setFormData({ ...formData, [field]: value });
  };

  const onChangeForm = async () => {
    await updateApplication(formData);
  };

  const saveNotes = async (notes: string) => {
    await updateApplication({ ...formData, notes });
  };

  const savePosting = async (posting: string) => {
    await updateApplication({ ...formData, posting });
  };

  useEffect(() => {
    const fetchData = async () => {
      const dbApplication = await getApplication(applicationId);
      setFormData(dbApplication);
      if (dbApplication.posting) {
        setPosting(dbApplication.posting);
      }
      if (dbApplication.notes) {
        setNotes(dbApplication.notes);
      }
    };
    fetchData();
  }, [applicationId]);

  return (
    <>
      <div className="p-4 space-y-4">
        <div>
          <div className="grid gap-2 grid-cols-8">
            <div className="col-span-4">
              <label className="block text-sm/6 font-medium">Company</label>
              <div className="mt-2">
                <input
                  id="company"
                  name="company"
                  type="text"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  value={formData.company}
                  onChange={onChangeData}
                  onBlur={onChangeForm}
                />
              </div>
            </div>
            <div className="col-span-4">
              <label className="block text-sm/6 font-medium">Job Title</label>
              <div className="mt-2">
                <input
                  id="title"
                  name="title"
                  type="text"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  value={formData.title}
                  onChange={onChangeData}
                  onBlur={onChangeForm}
                />
              </div>
            </div>
            <div className="col-span-4">
              <label className="block text-sm/6 font-medium">
                Company Site
              </label>
              <div className="mt-2">
                <input
                  id="companySite"
                  name="companySite"
                  type="text"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  value={formData.companySite}
                  onChange={onChangeData}
                  onBlur={onChangeForm}
                />
              </div>
            </div>

            <div className="col-span-4">
              <label className="block text-sm/6 font-medium">
                Job Posting Link
              </label>
              <div className="mt-2">
                <input
                  id="postingLink"
                  name="postingLink"
                  type="text"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  value={formData.postingLink}
                  onChange={onChangeData}
                  onBlur={onChangeForm}
                />
              </div>
            </div>
            <div className="col-span-2">
              <label className="block text-sm/6 font-medium">Status</label>
              <div className="mt-2">
                <select
                  name="status"
                  id="status"
                  className="w-full rounded-md bg-white p-2 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  value={formData.status}
                  onChange={onChangeData}
                  onBlur={onChangeForm}
                >
                  {statusOptions.map(({ label, value }) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-span-2">
              <label className="block text-sm/6 font-medium">
                Date Applied
              </label>
              <div className="mt-2">
                <input
                  id="dateApplied"
                  name="dateApplied"
                  type="date"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  value={formData.dateApplied}
                  onChange={onChangeData}
                  onBlur={onChangeForm}
                />
              </div>
            </div>
            <div className="col-span-2">
              <label className="block text-sm/6 font-medium">Location</label>
              <div className="mt-2">
                <input
                  id="location"
                  name="location"
                  type="text"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  value={formData.location}
                  onChange={onChangeData}
                  onBlur={onChangeForm}
                />
              </div>
            </div>
            <div className="col-span-2">
              <label className="block text-sm/6 font-medium">Salary</label>
              <div className="mt-2">
                <input
                  id="salary"
                  name="salary"
                  type="text"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  value={formData.salary}
                  onChange={onChangeData}
                  onBlur={onChangeForm}
                />
              </div>
            </div>
            <div className="col-span-full min-h-100 my-2">
              <label className="block text-sm/6 font-medium">Notes</label>
              <RichEditor content={notes} handleTextChange={saveNotes} />
            </div>
            <div className="col-span-full">
              <label className="block text-sm/6 font-medium">Job Posting</label>
              <RichEditor content={posting} handleTextChange={savePosting} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ApplicationEdit;
