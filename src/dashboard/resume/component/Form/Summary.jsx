import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "./../../../../../service/GlobalApi";
import { Brain, LoaderCircle } from "lucide-react";

import { toast } from "sonner";
import { AIchatSession } from "./../../../../../service/AIModal";

const prompt =
  "Job Title: {jobTitle} , Depend on my job title give me a summary for resume within 4-5 lines in JSON format with field experience level and summary with Experience level for Fresher,Mid-Level and Experienced";

function Summary({ enableNext }) {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [summary, setSummary] = useState();
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const [aiGeneratedSummaryList, setAiGeneratedSummaryList] = useState([]);
  useEffect(() => {
    summary &&
      setResumeInfo({
        ...resumeInfo,
        summary: summary,
      });
  }, [summary]);

  const GenerateSummaryFromAI = async () => {
    setLoading(true);
    const PROMPT = prompt.replace("{jobTitle}", resumeInfo.jobTitle);
    console.log("Prompt sent to AI:", PROMPT);

    try {
      // Send message to AI
      const result = await AIchatSession.sendMessage(PROMPT);
      const responseText = await result.response.text();
      console.log("Response from AI:", responseText);

      // Attempt to parse the AI response
      let parsedSummaries;
      try {
        parsedSummaries = JSON.parse(responseText);
        console.log("Parsed Summaries:", parsedSummaries);
      } catch (parseError) {
        console.error("Failed to parse AI response as JSON:", parseError);
        toast.error("Error parsing AI response. Please check the AI service.");
        setLoading(false);
        return;
      }

      // Validate and handle the parsed summaries
      if (parsedSummaries && parsedSummaries.experience_levels) {
        const experienceLevels = Object.entries(
          parsedSummaries.experience_levels
        ).map(([level, data]) => ({
          level,
          summary: data.summary,
        }));

        if (experienceLevels.length === 3) {
          setAiGeneratedSummaryList(experienceLevels);
        } else {
          throw new Error("Unexpected response format or missing data.");
        }
      } else {
        throw new Error(
          "AI response does not contain 'experience_levels' object."
        );
      }
    } catch (error) {
      console.error("Error generating summary from AI:", error);
      toast.error("Failed to generate summary from AI. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const onSave = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      data: {
        summary: summary,
      },
    };
    GlobalApi.UpdateResumeDetail(params?.resumeId, data).then(
      (resp) => {
        console.log(resp);
        enableNext(true);
        setLoading(false);
        toast("Details Updated");
      },
      (error) => {
        setLoading(false);
      }
    );
  };

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2
          className="font-bold
      text-lg"
        >
          Summary
        </h2>

        <p>Add Summary for your job title</p>

        <form className="mt-7" onSubmit={onSave}>
          <div
            className="flex justify-between items-end
          "
          >
            <label>Add Summary</label>
            <Button
              onClick={GenerateSummaryFromAI}
              type="button"
              variant="outline"
              className="border-primary text-primary flex gap-2"
            >
              <Brain className="h-4 w-4" />
              Generate From AI
            </Button>
          </div>
          <Textarea
            required
            className="mt-5"
            value={resumeInfo?.summary} // Bind the value to the summary state
            onChange={(e) => setSummary(e.target.value)}
          />
          <div className="mt-2 flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
            </Button>
          </div>
        </form>
      </div>

      {aiGeneratedSummaryList.length > 0 && (
        <div className="my-5">
          <h2 className="font-bold text-lg">Suggestions</h2>
          {aiGeneratedSummaryList.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                setSummary(item.summary);
                toast.success(`Selected summary for ${item.level}`);
              }}
              className="p-5 shadow-lg my-4 rounded-lg cursor-pointer hover:bg-gray-100"
            >
              <h2 className="font-bold my-1 text-primary">
                Level: {item.level}
              </h2>
              <p>{item.summary}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Summary;
