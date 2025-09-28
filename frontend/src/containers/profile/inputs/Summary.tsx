import React, { useState, useEffect, FocusEvent } from "react";
import { useSelector } from "react-redux";
import Divider from "src/components/Divider";
import RichEditor from "@/components/RichEditor";
import ReadOnly from "@/components/RichEditor/ReadOnly";
import { updateUser } from "@/api/user";
import type { State } from "@/store";

interface SummaryProps {
  lockEdit: boolean;
}

const Summary: React.FC<SummaryProps> = ({ lockEdit }) => {
  const user = useSelector((state: State) => state.auth.user);
  const [summary, setSummary] = useState<string>(user?.summary || "");

  const updateText = (text: string): void => {
    setSummary(text);

    if (text && summary !== text) {
      updateUser({ summary });
    }
  };

  const saveSummary = (): void => {
    if (summary && summary !== user?.summary) {
      updateUser({ summary });
    }
  };

  useEffect((): void => {
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
        <form onBlur={(e: FocusEvent<HTMLFormElement>): void => {
          e.stopPropagation();
          saveSummary();
        }}>
          <div className="mt-2">
            <RichEditor content={summary} onTextChange={updateText} />
          </div>
        </form>
      )}
      <Divider />
    </>
  );
};

export default Summary;
