import React, { useEffect, useState } from "react";
import AddResume from "./Components/AddResume";
import { useUser } from "@clerk/clerk-react";
import GlobalApi from "./../../service/GlobalApi";
import ResumeCardItem from "./Components/ResumeCardItem";

function Dashboard() {
  const { user } = useUser();
  const [resumeList, setResumeList] = useState([]);

  useEffect(() => {
    if (user) {
      GetResumesList();
    }
  }, [user]);
  // Used To get user resumes list

  const GetResumesList = () => {
    GlobalApi.GetUserResumes(user?.primaryEmailAddress?.emailAddress)
      .then((resp) => {
        const resumes = resp.data?.data || []; // Ensure data fallback
        console.log("Fetched resumes:", resumes);
        setResumeList(Array.isArray(resumes) ? resumes : []); // Set empty array if not valid
      })
      .catch((error) => {
        console.error("Error fetching resumes:", error);
        setResumeList([]); // Set empty array on error
      });
  };

  return (
    <div className="p-10 md:px-20 lg:px-32 ">
      <h2 className="font-bold text-3xl ">My Resume</h2>
      <p className="mt-2">Start Creating AI Resume for your next job role</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-10 gap-5">
        <AddResume />
        {resumeList.length > 0
          ? resumeList.map((resume, index) => (
              <ResumeCardItem
                resume={resume}
                key={index}
                refreshData={GetResumesList}
              />
            ))
          : [1, 2, 3, 4].map((item, index) => (
              <div
                key={index}
                className="h-[280px] rounded-lg bg-slate-200 animate-pulse"
              ></div>
            ))}
      </div>
    </div>
  );
}

export default Dashboard;
