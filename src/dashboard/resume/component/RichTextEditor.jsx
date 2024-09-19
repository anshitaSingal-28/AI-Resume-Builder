import { Button } from "@/components/ui/button";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { Brain, Loader, LoaderCircle } from "lucide-react";
import React, { useContext, useState } from "react";
import {
  BtnBold,
  BtnBulletList,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnStrikeThrough,
  BtnUnderline,
  Editor,
  EditorProvider,
  Separator,
  Toolbar,
} from "react-simple-wysiwyg";
import { AIchatSession } from "./../../../../service/AIModal";
import { toast } from "sonner";
const PROMPT =
  "position title:{positionTitle} , Depends on position title give me 4-5 bullet points for my experience in resume , give me result in HTML format Donot give response on basis of levels";

function RichTextEditor({ onRichTextEditorChange, index, defaultValue }) {
  const [value, setValue] = useState(defaultValue);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);

  const GenerateSummaryFromAI = async () => {
    setLoading(true);
    if (!resumeInfo.experience[index].title) {
      toast("Please Add Position Title");
      return;
    }
    const prompt = PROMPT.replace(
      "{positionTitle}",
      resumeInfo.experience[index].title
    );
    const result = await AIchatSession.sendMessage(prompt);
    console.log(result.response.text());
    const resp = result.response.text();
    setValue(resp.replace("[", "").replace("]", ""));
    setLoading(false);
  };

  return (
    <div>
      <div className="flex justify-between items-end my-2">
        <label className="text-xs">Summary</label>
        <Button
          variant="outline"
          onClick={GenerateSummaryFromAI}
          className="flex gap-2 border-primary text-primary"
        >
          {loading ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            <>
              <Brain className="h-4 w-4" />
              Generate from AI
            </>
          )}
        </Button>
      </div>
      <EditorProvider>
        <Editor
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            onRichTextEditorChange(e);
          }}
        >
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
}

export default RichTextEditor;
