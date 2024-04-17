import Image from "next/image";
import React from "react";

const LoadingAuth = () => {
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <Image
        src="/vercel.svg"
        alt="LoadingAuth"
        width={120}
        height={120}
        className="animate-pulse duration-700"
      ></Image>
    </div>
  );
};

export default LoadingAuth;
