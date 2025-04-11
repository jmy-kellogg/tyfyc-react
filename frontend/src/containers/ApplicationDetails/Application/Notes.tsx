import { useState, useEffect } from "react";
import { updateApplication } from "@/api/applications";

import RichEditor from "@/components/RichEditor";
import ReadOnly from "@/components/RichEditor/ReadOnly";
import type { ApplicationUpdate } from "@/types/applications";

interface Props {
  application: ApplicationUpdate;
  showForm: boolean;
}

function Notes({ application, showForm }: Props) {
  const [notes, setNotes] = useState<string>("");

  const saveNotes = async (notes: string) => {
    await updateApplication({ ...application, notes });
    setNotes(notes);
  };

  useEffect(() => {
    if (application.notes) {
      setNotes(application.notes);
    }
  }, [application]);

  return (
    <>
      {showForm && (
        <div className="col-span-full min-h-20 my-2">
          <h2 className="block text-sm/6 font-medium">Notes:</h2>
          <div className="m-3">
            <RichEditor content={notes} handleTextChange={saveNotes} />
          </div>
        </div>
      )}
      {!showForm && !!notes && (
        <div className="col-span-full min-h-20 my-2">
          <h2 className="block text-sm/6 font-medium">Notes:</h2>
          <div className="m-3">
            <ReadOnly content={notes} />{" "}
          </div>
          {!showForm && <hr />}
        </div>
      )}
    </>
  );
}

export default Notes;
