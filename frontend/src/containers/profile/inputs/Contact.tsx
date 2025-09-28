import React, { useState, useEffect, ChangeEvent, FocusEvent } from "react";
import { useSelector } from "react-redux";

import type { User } from "@/types";
import type { State } from "@/store";
import { updateUser } from "@/api/user";
import Divider from "src/components/Divider";
import TextCopy from "@/components/TextCopy";

interface ContactProps {
  lockEdit: boolean;
}

const Contact: React.FC<ContactProps> = ({ lockEdit }) => {
  const user: User | null = useSelector((state: State) => state.auth.user);
  const [email, setEmail] = useState<string>(user?.email || "");
  const [phone, setPhone] = useState<string>(user?.phone || "");
  const [city, setCity] = useState<string>(user?.city || "");
  const [state, setState] = useState<string>(user?.state || "");
  const [linkedIn, setLinkedIn] = useState<string>(user?.linkedIn || "");
  const [gitHub, setGitHub] = useState<string>(user?.gitHub || "");

  const validateData = (): boolean => {
    if (!email || !phone || !city || !state || !linkedIn || !gitHub) {
      return false;
    } else if (
      email === user?.email &&
      phone === user?.phone &&
      city === user?.city &&
      state === user?.state &&
      linkedIn === user?.linkedIn &&
      gitHub === user?.gitHub
    ) {
      return false;
    } else {
      return true;
    }
  };

  const updateData = (): void => {
    if (validateData()) {
      updateUser({ email, phone, city, state, linkedIn, gitHub });
    }
  };

  // ToDo: make text parser more robust
  const getUrlText = (url: string): string => {
    const text: string[] = url.split("/").filter((word: string): boolean => !!word) || [];
    return text[text.length - 1] || url;
  };

  const changePhone = (e: ChangeEvent<HTMLInputElement>): void => {
    const numbers: string = e.target.value.replace(/[^0-9]/g, "");
    const size: number = numbers.length;
    let phone: string = "";

    if (size > 10) {
      return;
    } else if (size > 6) {
      phone = `(${numbers.slice(0, 3)})-${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
    } else if (size > 3) {
      phone = `(${numbers.slice(0, 3)})-${numbers.slice(3, 6)}`;
    } else {
      phone = numbers;
    }

    setPhone(phone);
  };

  useEffect((): void => {
    if (user) {
      setEmail(user.email || "");
      setPhone(user.phone || "");
      setCity(user.city || "");
      setState(user.state || "");
      setLinkedIn(user.linkedIn || "");
      setGitHub(user.gitHub || "");
    }
  }, [user]);

  return (
    <>
      {lockEdit ? (
        <div className="text-center">
          <div className="flex place-content-center">
            <TextCopy label="Email" copyText={email} />
            <span className="mr-2">|</span>
            <TextCopy label="Phone" copyText={phone} />
            <span className="mr-2">|</span>
            <TextCopy
              label="Location"
              displayText={city + ", " + state}
              copyText={city}
            />
          </div>
          <div className="flex place-content-center">
            <TextCopy
              label="LinkedIn"
              displayText={getUrlText(linkedIn)}
              copyText={linkedIn}
            />
            <span className="mr-2">|</span>
            <TextCopy
              label="GitHub"
              displayText={getUrlText(gitHub)}
              copyText={gitHub}
            />
          </div>
        </div>
      ) : (
        <form>
          <div className="flex justify-center">
            <div className="m-1">
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Email address"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 text-sm/6"
                value={email}
                onChange={(e: ChangeEvent<HTMLInputElement>): void => setEmail(e.target.value)}
                onMouseLeave={(e: React.MouseEvent<HTMLInputElement>): void => {
                  e.stopPropagation();
                  if (user?.email !== email) {
                    updateData();
                  }
                }}
              />
            </div>
            <div className="m-1">
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="Phone"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 text-sm/6"
                value={phone}
                onChange={changePhone}
                pattern="\(\d{3}\)\d{3}-\d{4}"
                onBlur={(e: FocusEvent<HTMLInputElement>): void => {
                  e.stopPropagation();
                  if (user?.phone !== phone) {
                    updateData();
                  }
                }}
              />
            </div>
            <div className="m-1">
              <input
                id="city"
                name="city"
                type="text"
                placeholder="City"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 text-sm/6"
                value={city}
                onChange={(e: ChangeEvent<HTMLInputElement>): void => setCity(e.target.value)}
                onBlur={(e: FocusEvent<HTMLInputElement>): void => {
                  e.stopPropagation();
                  if (user?.city !== city) {
                    updateData();
                  }
                }}
              />
            </div>
            <div className="m-1 w-20">
              <input
                name="state"
                id="state"
                type="text"
                placeholder="State"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 text-sm/6"
                value={state}
                onChange={(e: ChangeEvent<HTMLInputElement>): void => setState(e.target.value)}
                onBlur={(e: FocusEvent<HTMLInputElement>): void => {
                  e.stopPropagation();
                  if (user?.state !== state) {
                    updateData();
                  }
                }}
              />
            </div>
          </div>
          <div className="flex justify-center">
            <div className="m-1 w-90">
              <input
                id="linkedin"
                name="linkedIn"
                type="text"
                placeholder="LinkedIn"
                className="text-center block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 text-sm/6"
                value={linkedIn || "www.linkedin.com/in/"}
                onChange={(e: ChangeEvent<HTMLInputElement>): void => setLinkedIn(e.target.value)}
                onBlur={(e: FocusEvent<HTMLInputElement>): void => {
                  e.stopPropagation();
                  if (user?.linkedIn !== linkedIn) {
                    updateData();
                  }
                }}
              />
            </div>
            <div className="m-1 w-90">
              <input
                id="github"
                name="gitHub"
                type="text"
                placeholder="GitHub"
                className="text-center block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 text-sm/6"
                value={gitHub || "www.github.com/"}
                onChange={(e: ChangeEvent<HTMLInputElement>): void => setGitHub(e.target.value)}
                onBlur={(e: FocusEvent<HTMLInputElement>): void => {
                  e.stopPropagation();
                  if (user?.gitHub !== gitHub) {
                    updateData();
                  }
                }}
              />
            </div>
          </div>
        </form>
      )}
      <Divider />
    </>
  );
};

export default Contact;
