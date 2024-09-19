export default {
  firstName: "John",
  lastName: "Doe",
  jobTitle: "Full Stack Developer",
  address: "1234 Elm Street, NC 27601",
  phone: "9876543210",
  email: "johndoe@example.com",
  themeColor: "#4caf50",
  summary:
    "Enthusiastic developer with experience in building full stack applications.Proficient in front-end and back-end technologies, including JavaScript, React, and Node.js. Adept at collaborating with cross-functional teams to deliver high-quality software on time.Passionate about solving complex problems and continuously learning new technologies. Proven track record of contributing to successful projects and enhancing user experiences.Passionate about staying current with industry trends and emerging technologies to continually improve development practices. Proven ability to manage multiple projects simultaneously and deliver on tight deadlines.",
  experience: [
    {
      id: 1,
      title: "Full Stack Developer",
      companyName: "Google",
      city: "Mountain View",
      state: "CA",
      startDate: "Feb 2020",
      endDate: "Present",
      currentlyWorking: true,
      workSummary:
        "Led the development of scalable web applications using React, Node.js, and AWS.",
    },
    {
      id: 2,
      title: "Frontend Developer",
      companyName: "Facebook",
      city: "Menlo Park",
      state: "CA",
      startDate: "Jan 2018",
      endDate: "Jan 2020",
      currentlyWorking: false,
      workSummary:
        "Developed interactive UI components using React and Redux for high-traffic web applications.",
    },
  ],
  education: [
    {
      id: 1,
      universityName: "University of North Carolina",
      startDate: "Aug 2015",
      endDate: "May 2019",
      degree: "Bachelor",
      major: "Computer Science",
      description:
        "Focused on full stack development, algorithms, and database management.",
    },
  ],
  skills: [
    {
      id: 1,
      name: "JavaScript",
      rating: 95,
    },
    {
      id: 2,
      name: "React",
      rating: 100,
    },
    {
      id: 3,
      name: "Node.js",
      rating: 90,
    },
    {
      id: 4,
      name: "MongoDB",
      rating: 80,
    },
  ],
};
