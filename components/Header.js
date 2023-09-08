"use client";

import Image from "next/image";
import React from "react";

const Header = ({ session }) => {
  return (
    <header className="bg-white">
      <div className="flex justify-between">
        <div className="flex">
          <Image
            src="/logo.png"
            width={350}
            height={200}
            className="object-contain"
            alt="logo shop"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
