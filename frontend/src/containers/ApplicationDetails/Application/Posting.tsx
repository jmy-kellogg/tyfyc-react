import { useState, useEffect } from "react";
import { updateApplication } from "@/api/applications";

import RichEditor from "@/components/RichEditor";
import ReadOnly from "@/components/RichEditor/ReadOnly";
import type { ApplicationUpdate } from "@/types/applications";

interface Props {
  application: ApplicationUpdate;
  showForm: boolean;
}

function Posting({ application, showForm }: Props) {
  const [posting, setPosting] = useState<string>("");

  const savePosting = async (posting: string) => {
    await updateApplication({ ...application, posting });
    setPosting(posting);
  };

  useEffect(() => {
    if (application.posting) {
      setPosting(application.posting);
    }
  }, [application]);

  return (
    <>
      <div className="col-span-full min-h-100 my-2">
        <h2 className="block text-sm/6 font-medium">Posting:</h2>
        <div className="m-3">
          {showForm ? (
            <RichEditor content={posting} handleTextChange={savePosting} />
          ) : (
            <ReadOnly content={posting} />
          )}
        </div>
      </div>
    </>
  );
}

export default Posting;
