import { useState, useEffect, useContext } from "react";

import Divider from "src/components/Divider";

import { AuthContext } from "@/context/AuthContext";
import { updateUser } from "@/api/user";

interface Props {
  editAll: boolean;
  lockEdit: boolean;
}

function Contact({ editAll, lockEdit }: Props) {
  const { user } = useContext(AuthContext);
  const [hover, setHover] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [gitHub, setGitHub] = useState("");

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
                  onMouseLeave={updateData}
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
                  onMouseLeave={updateData}
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
                  onMouseLeave={updateData}
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
                  onMouseLeave={updateData}
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
                  onMouseLeave={updateData}
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
                  onMouseLeave={updateData}
                />
              </div>
            </div>
          </form>
        ) : (
          <div className="text-center">
            <p>
              Email: {email} | Phone: {phone} | Location: {city + ", " + state}
            </p>
            <p>
              LinkedIn: {linkedIn} | GitHub: {gitHub}
            </p>
          </div>
        )}
      </div>
      <Divider />
    </>
  );
}

export default Contact;
