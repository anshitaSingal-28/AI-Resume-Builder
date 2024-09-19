import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { LoaderCircle } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "./../../../../../service/GlobalApi";
import { toast } from "sonner";

function Education() {
  const [loading, setLoading] = useState(false);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const params = useParams();
  const [educationalList, setEducationalList] = useState([
    {
      universityName: "",
      degree: "",
      major: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  ]);

  useEffect(() => {
    resumeInfo?.education.length > 0 &&
      setEducationalList(resumeInfo?.education);
  }, []);

  const handleChange = (event, index) => {
    const newEntries = educationalList.slice();
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setEducationalList(newEntries);
  };

  const AddNewEducation = () => {
    setEducationalList([
      ...educationalList,
      {
        universityName: "",
        degree: "",
        major: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);
  };

  const RemoveEducation = () => {
    setEducationalList((educationalList) => educationalList.slice(0, -1));
  };
  const onSave = () => {
    setLoading(true);
    const data = {
      data: {
        education: educationalList.map(({ id, ...rest }) => rest),
      },
    };
    // console.log(data);
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
      education: educationalList,
    });
  }, [educationalList]);

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2
        className="font-bold
      text-lg"
      >
        Education
      </h2>

      <p>Add Your educational details</p>
      <div>
        {educationalList.map((item, index) => (
          <div>
            <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
              <div className="col-span-2">
                <label className="text-xs">University Name</label>
                <Input
                  defaultValue={item?.universityName}
                  name="universityName"
                  onChange={(e) => handleChange(e, index)}
                />
              </div>
              <div>
                <label className="text-xs">Degree</label>
                <Input
                  defaultValue={item?.degree}
                  name="degree"
                  onChange={(e) => handleChange(e, index)}
                />
              </div>
              <div>
                <label className="text-xs">Major</label>
                <Input
                  defaultValue={item?.major}
                  name="major"
                  onChange={(e) => handleChange(e, index)}
                />
              </div>
              <div>
                <label className="text-xs">Start Date</label>
                <Input
                  type="date"
                  defaultValue={item?.startDate}
                  name="startDate"
                  onChange={(e) => handleChange(e, index)}
                />
              </div>
              <div>
                <label className="text-xs">End Date</label>
                <Input
                  name="endDate"
                  defaultValue={item?.endDate}
                  type="date"
                  onChange={(e) => handleChange(e, index)}
                />
              </div>
              <div className="col-span-2">
                <label className="text-xs">Description</label>
                <Textarea
                  defaultValue={item?.description}
                  name="description"
                  onChange={(e) => handleChange(e, index)}
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
            onClick={AddNewEducation}
            className="text-primary"
          >
            + Add More Education
          </Button>
          <Button
            variant="outline"
            onClick={RemoveEducation}
            className="text-primary"
          >
            - Remove
          </Button>
        </div>

        <Button disabled={loading} onClick={() => onSave()}>
          {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
        </Button>
      </div>
    </div>
  );
}

export default Education;
