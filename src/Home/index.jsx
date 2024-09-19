import Header from "@/components/custom/Header";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/clerk-react";
import {
  ArrowLeft,
  ArrowRight,
  Download,
  Edit,
  HomeIcon,
  Share,
  Share2Icon,
  ViewIcon,
} from "lucide-react";
import React from "react";

function Home() {
  return (
    <div>
      <Header />

      <div className="min-h-screen bg-gray-100 flex flex-col">
        {/* Hero Section */}
        <header className="bg-black text-white py-16 flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Create Stunning Resumes with Ease
          </h1>
          <p className="text-lg lg:text-xl mb-8">
            Our Resume Builder helps you craft professional resumes effortlessly
            with the help of AI.
          </p>
          <div className="flex gap-4">
            <a href="/auth/sign-in">
              <Button>
                Get Started For Free<ArrowRight className="ml-2"></ArrowRight>
              </Button>
            </a>
            <a href="/dashboard">
              <Button>
                Dashboard
                <HomeIcon className="ml-2" />
              </Button>
            </a>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow py-12 px-4 lg:px-20">
          {/* Cards Section */}
          <section className="container mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">
              Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center border-t-primary border-t-4 hover:scale-105">
                <Edit className="mb-2 "></Edit>
                <h3 className="text-xl font-bold mb-4">Easy Editing</h3>
                <p className="mb-4">
                  Edit your resume with our user-friendly editor that allows you
                  to customize every detail. Get suggestions through AI, change
                  themes according to your choice to make your resume stand out.
                </p>
              </div>
              <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center border-t-primary border-t-4 hover:scale-105">
                <ViewIcon className="mb-2"></ViewIcon>
                <h3 className="text-xl font-bold mb-4">Preview and Update</h3>
                <p className="mb-4">
                  Enjoy a user-friendly interface that allows you to easily
                  navigate through your resume history. Update your resumes
                  anytime with new information or design changes, ensuring they
                  are always current.
                </p>
              </div>
              <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center border-t-primary border-t-4 hover:scale-105">
                <Share2Icon className="mb-2"></Share2Icon>
                <h3 className="text-xl font-bold mb-4">Download & Share</h3>
                <p className="mb-4">
                  Seamlessly download your resume and share it with potential
                  employers or networks via Email or social media. Secure
                  Sharing with Privacy Controls.
                </p>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="text-white py-6 text-center bg-black">
          <p>
            &copy; {new Date().getFullYear()} Resume Builder App. All rights
            reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default Home;
