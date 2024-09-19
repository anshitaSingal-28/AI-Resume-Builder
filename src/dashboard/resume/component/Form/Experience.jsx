import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useContext, useEffect, useState } from "react";
import RichTextEditor from "../RichTextEditor";
import { useParams } from "react-router-dom";
import GlobalApi from "./../../../../../service/GlobalApi";

import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";

const formField = {
  title: "",
  companyName: "",
  city: "",
  state: "",
  startDate: "",
  endDate: "",
  workSummary: "",
};
function Experience() {
  const params = useParams();
  const [experienceList, setExperienceList] = useState([formField]);

  const [loading, setLoading] = useState(false);

  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  useEffect(() => {
    resumeInfo?.experience.length > 0 &&
      setExperienceList(resumeInfo?.experience);
  }, []);

  const handleChange = (index, event) => {
    const newEntries = experienceList.slice();
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setExperienceList(newEntries);
  };

  const AddNewExperience = () => {
    setExperienceList([
      ...experienceList,
      {
        title: "", // Empty fields for new experience
        companyName: "",
        city: "",
        state: "",
        startDate: "",
        endDate: "",
        workSummary: "",
      },
    ]);
  };

  const RemoveExperience = () => {
    setExperienceList((experienceList) => experienceList.slice(0, -1));
  };

  const handleRichTextEditor = (e, name, index) => {
    const newEntries = experienceList.slice();
    newEntries[index][name] = e.target.value;
    setExperienceList(newEntries);
  };

  const onSave = () => {
    setLoading(true);
    const data = {
      data: {
        experience: experienceList.map(({ id, ...rest }) => rest),
      },
    };

    GlobalApi.UpdateResumeDetail(params?.resumeId, data).then(
      (resp) => {
        console.log(resp);

        setLoading(false);
        toast("Details Updated");
      },
      (error) => {
        setLoading(false);
        toast("Server Error , Try again later");
      }
    );
  };

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      experience: experienceList,
    });
  }, [experienceList]);

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2
          className="font-bold
      text-lg"
        >
          Professional Experience
        </h2>

        <p>Add Your previous Job experience</p>
        <div>
          {experienceList.map((item, index) => (
            <div key={index}>
              <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg ">
                <div>
                  <label className="text-xs ">Position Title</label>
                  <Input
                    name="title"
                    defaultValue={item?.title}
                    onChange={(event) => handleChange(index, event)}
                  ></Input>
                </div>
                <div>
                  <label className="text-xs ">Company Name</label>
                  <Input
                    name="companyName"
                    defaultValue={item?.companyName}
                    onChange={(event) => handleChange(index, event)}
                  ></Input>
                </div>
                <div>
                  <label className="text-xs ">City</label>
                  <Input
                    name="city"
                    defaultValue={item?.city}
                    onChange={(event) => handleChange(index, event)}
                  ></Input>
                </div>
                <div>
                  <label className="text-xs ">State</label>
                  <Input
                    name="state"
                    defaultValue={item?.state}
                    onChange={(event) => handleChange(index, event)}
                  ></Input>
                </div>
                <div>
                  <label className="text-xs ">Start Date</label>
                  <Input
                    name="startDate"
                    defaultValue={item?.startDate}
                    type="date"
                    onChange={(event) => handleChange(index, event)}
                  ></Input>
                </div>
                <div>
                  <label className="text-xs ">End Date</label>
                  <Input
                    name="endDate"
                    defaultValue={item?.endDate}
                    type="date"
                    onChange={(event) => handleChange(index, event)}
                  ></Input>
                </div>
                <div className="col-span-2 ">
                  {/* WORK SUMMARY */}
                  <RichTextEditor
                    index={index}
                    defaultValue={item?.workSummary}
                    onRichTextEditorChange={(event) =>
                      handleRichTextEditor(event, "workSummary", index)
                    }
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between">
          <div className="flex gap-2 ">
            <Button
              variant="outline"
              onClick={AddNewExperience}
              className="text-primary"
            >
              + Add More Experience
            </Button>
            <Button
              variant="outline"
              onClick={RemoveExperience}
              className="text-primary"
            >
              - Remove
            </Button>
          </div>

          <Button type="submit" disabled={loading} onClick={() => onSave()}>
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Experience;
