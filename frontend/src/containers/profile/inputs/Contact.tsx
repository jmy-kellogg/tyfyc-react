import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import type { User } from "@/types";
import type { State } from "@/store";
import { updateUser } from "@/api/user";
import Divider from "src/components/Divider";

interface Props {
  editAll: boolean;
  lockEdit: boolean;
}

function Contact({ editAll, lockEdit }: Props) {
  const user: User | null = useSelector((state: State) => state.auth.user);
  const [hover, setHover] = useState(false);
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [city, setCity] = useState(user?.city || "");
  const [state, setState] = useState(user?.state || "");
  const [linkedIn, setLinkedIn] = useState(user?.linkedIn || "");
  const [gitHub, setGitHub] = useState(user?.gitHub || "");

  const validateData = () => {
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

  const updateData = () => {
    if (validateData()) {
      updateUser({ email, phone, city, state, linkedIn, gitHub });
    }
  };

  useEffect(() => {
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
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {!lockEdit && (editAll || hover) ? (
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
                  onChange={(e) => setEmail(e.target.value)}
                  onMouseLeave={() => {
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
                  onChange={(e) => setPhone(e.target.value)}
                  onMouseLeave={() => {
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
                  onChange={(e) => setCity(e.target.value)}
                  onMouseLeave={() => {
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
                  onChange={(e) => setState(e.target.value)}
                  onMouseLeave={() => {
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
                  onChange={(e) => setLinkedIn(e.target.value)}
                  onMouseLeave={() => {
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
                  onChange={(e) => setGitHub(e.target.value)}
                  onMouseLeave={() => {
                    if (user?.gitHub !== gitHub) {
                      updateData();
                    }
                  }}
                />
              </div>
            </div>
          </form>
        ) : (
          <div className="text-center">
            <p>
              <strong>Email:</strong> {email} | <strong>Phone:</strong> {phone}{" "}
              | <strong>Location:</strong> {city + ", " + state}
            </p>
            <p>
              <strong>LinkedIn:</strong> {linkedIn} | <strong>GitHub:</strong>{" "}
              {gitHub}
            </p>
          </div>
        )}
      </div>
      <Divider />
    </>
  );
}

export default Contact;
