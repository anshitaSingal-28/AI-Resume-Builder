import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { UserButton, useUser } from "@clerk/clerk-react";
import { NotebookPen } from "lucide-react";

function Header() {
  const { user, isSignedIn } = useUser();
  return (
    <div
      className="p-3 px-5 flex justify-between shadow-md
    
    "
    >
      {/* <img src="/logo.svg" width={200} height={200} /> */}
      <div className="flex">
        <NotebookPen className="h-10 w-10 text-primary"></NotebookPen>
        <h1
          className="
         text-black mt-1 text-2xl italic font-extrabold"
        >
          Resume Builder
        </h1>
      </div>
      {isSignedIn ? (
        <div className="flex gap-2 items-center ">
          <Link to={"/dashboard"}>
            <Button>Dashboard</Button>
          </Link>
          <UserButton />
        </div>
      ) : (
        <Link to={"/auth/sign-in"}>
          <Button>Get Started</Button>
        </Link>
      )}
    </div>
  );
}

export default Header;
