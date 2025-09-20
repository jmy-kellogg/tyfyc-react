import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Divider from "src/components/Divider";
import RichEditor from "@/components/RichEditor";
import ReadOnly from "@/components/RichEditor/ReadOnly";
import { updateUser } from "@/api/user";
import type { State } from "@/store";

interface Props {
  lockEdit: boolean;
}

function Summary({ lockEdit }: Props) {
  const user = useSelector((state: State) => state.auth.user);
  const [summary, setSummary] = useState(user?.summary || "");

  const updateText = (text: string) => {
    setSummary(text);

    if (text && summary !== text) {
      updateUser({ summary });
    }
  };

  const saveSummary = () => {
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
      <h2>Summary</h2>
      {lockEdit ? (
        <div>
          <ReadOnly content={summary} />
        </div>
      ) : (
        <form onBlur={saveSummary}>
          <div className="mt-2">
            <RichEditor content={summary} onTextChange={updateText} />
          </div>
        </form>
      )}
      <Divider />
    </>
  );
}

export default Summary;
