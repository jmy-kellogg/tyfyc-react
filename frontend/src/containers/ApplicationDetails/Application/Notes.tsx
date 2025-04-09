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
      <div className="col-span-full min-h-20 my-2">
        <h2 className="block text-sm/6 font-medium">Notes:</h2>
        <div className="m-3">
          {showForm && (
            <RichEditor content={notes} handleTextChange={saveNotes} />
          )}
          {!showForm && !!notes && <ReadOnly content={notes} />}
        </div>
      </div>
      {!showForm && <hr />}
    </>
  );
}

export default Notes;
