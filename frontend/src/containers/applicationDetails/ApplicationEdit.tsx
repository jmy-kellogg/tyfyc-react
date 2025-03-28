import { useState, useEffect, ChangeEvent } from "react";
import { removePunctuation } from "@utils";
import { statusOptions } from "@options";
import { getApplication, updateApplication } from "@/api/applications";

import type { Application } from "@/types/applications";

interface Props {
  applicationId: string;
}

type ParsedText = Array<string>;

function ApplicationEdit({ applicationId }: Props) {
  const [formData, setFormData] = useState<Partial<Application>>({});

  const onChangeData = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const field = e.target.name;
    const value = e.target.value;

    setFormData({ ...formData, [field]: value });
  };

  const onChangeForm = async () => {
    try {
      await updateApplication(formData);
    } catch (err) {
      console.error(err);
    }
  };

  const getCandidates = (parsedText: ParsedText): ParsedText => {
    const firstItems = parsedText.slice(0, 10);
    return firstItems.filter((str) => str.length < 50);
  };

  const findJobTitle = (parsedText: ParsedText) => {
    const title = parsedText.find((text) => {
      const lcText = text.toLocaleLowerCase();
      return lcText.includes("engineer") || lcText.includes("developer");
    });
    return title || "";
  };

  const findCompany = (parsedText: ParsedText) => {
    const isCap = /[A-Z]/;
    const isLower = /[a-z(]/;

    const candidate: string | undefined = parsedText.find((text) => {
      const startsWithAt = text.slice(0, 2).toLocaleLowerCase() === "at";
      const nextWord = text.split(" ")[1];
      return startsWithAt && isCap.test(nextWord);
    });

    if (candidate) {
      const words: ParsedText = candidate.split(" ");
      // remove the "At"
      words.shift();
      const firstLowerCase = words.findIndex((str) => isLower.test(str[0]));
      const company = words.slice(0, firstLowerCase).join(" ");

      return removePunctuation(company);
    } else {
      return "";
    }
  };

  // ToDo: Find city locations
  const findLocation = (parsedText: Array<string>): string => {
    let locationText: string = "";
    const locationTag = parsedText.find((text) => text.includes("Location: "));
    const remoteText = parsedText.find((text) =>
      text.toLocaleLowerCase().includes("remote")
    );

    if (locationTag) {
      locationText = locationTag.replace("Location: ", "");
    } else if (remoteText) {
      locationText = remoteText;
    }

    return locationText;
  };

  const updatePosting = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    const parsedText = value.split("\n").filter((str) => !!str);
    const newApp = { ...formData, posting: value };
    const candidates = getCandidates(parsedText);

    if (!newApp.title) {
      newApp.title = findJobTitle(candidates);
    }
    if (!newApp.location) {
      newApp.location = findLocation(candidates);
    }
    if (!newApp.company) {
      newApp.company = findCompany(parsedText);
    }

    setFormData(newApp);
    updateApplication(newApp);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dbApplication = await getApplication(applicationId);
        setFormData(dbApplication);
      } catch (err) {
        console.error(err);
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

            <div className="col-span-full">
              <label className="block text-sm/6 font-medium">Job Posting</label>
              <textarea
                id="posting"
                name="posting"
                className="w-full min-h-100 rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                value={formData.posting}
                onChange={onChangeData}
                onBlur={updatePosting}
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ApplicationEdit;
