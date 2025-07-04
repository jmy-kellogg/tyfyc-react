import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Divider from "src/components/Divider";
import { updateUser } from "@/api/user";
import type { State } from "@/store";

interface Props {
  editAll: boolean;
  lockEdit: boolean;
}

function Summary({ editAll, lockEdit }: Props) {
  const user = useSelector((state: State) => state.auth.user);
  const [hover, setHover] = useState(false);
  const [summary, setSummary] = useState("");

  const updateData = () => {
    if (summary && summary !== user?.summary) {
      updateUser({ summary });
    }
  };

  useEffect(() => {
    if (user) {
      setSummary(user.summary || "");
    }
  }, [user]);

  return (
    <>
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <h2>Summary</h2>

        {!lockEdit && (editAll || hover) ? (
          <div className="mt-2">
            <textarea
              id="summary"
              name="summary"
              className="block w-full rounded-md bg-white px-3 py-1.5 h-32 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 text-sm/6"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              onMouseLeave={updateData}
            ></textarea>
          </div>
        ) : (
          <div>
            <p>{summary}</p>
          </div>
        )}
      </div>
      <Divider />
    </>
  );
}

export default Summary;
