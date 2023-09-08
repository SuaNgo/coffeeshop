"use client";

import { useSession } from "next-auth/react";
import React from "react";
import Navbar from "./Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";

const Layout = ({ children }) => {
  const { data: session } = useSession();

  return (
    <>
      <div className="flex gap-4">
        <Navbar />
        <div
          session={session}
          className="w-full h-full p-4 rounded-l-xl bg-white min-h-screen"
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;
