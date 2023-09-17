"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);
  const sendLoginInfo = async (e) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      username: username,
      password: password,
      callbackUrl: "/dashboard",
    });
    if (res?.error) {
      setError("invalid email or password");
    } else {
      setError(null);
    }
  };
  return (
    <>
      <div className="w-[60%] h-[80%] bg-white rounded-3xl grid grid-cols-2 overflow-hidden">
        <div className="w-full h-full overflow-hidden relative rounded-3xl">
          <Image
            src="/login-photo.avif"
            alt="login image"
            className="object-cover w-full h-full"
            width={1920}
            height={1080}
            priority={true}
          />
          <div className="absolute w-[80%] h-[70%] bg-black z-40 opacity-70 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 rounded-2xl backdrop-blur-login py-4 px-4">
            <h1 className="text-sm font-bold bg-slate-700 text-white w-fit opacity-100 p-2 mb-4">
              <span>
                NAMMOB'S <br />
                COFFEE
              </span>
            </h1>
            <div className="border border-white w-10 mb-8"></div>
            <span className="text-white text-3xl leading-[44px]">
              Start your day <br /> with a black Coffee
            </span>
          </div>
        </div>

        <div className="relative">
          <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[70%] ">
            <h1 className="text-3xl font-bold mb-4">Login</h1>
            <form className="mb-4" onSubmit={sendLoginInfo}>
              <label>
                <h1 className="">Username</h1>
                <input
                  name="username"
                  required
                  type="text"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  className="my-2 rounded-md"
                  autoComplete="off"
                  pattern="^(?=[a-zA-Z0-9._]{4,20}$)(?!.*[_.]{2})[^_.].*[^_.]$"
                  title="has special characters"
                />
              </label>
              <label>
                <h1 className="">Password</h1>
                <input
                  name="password"
                  required
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  className="my-2 rounded-md"
                  pattern="^(?=[a-zA-Z0-9._]{6,20}$)(?!.*[_.]{2})[^_.].*[^_.]$"
                  title="has special characters"
                />
              </label>
              <button
                type="submit"
                className="flex border rounded-md w-full items-center py-3 justify-center mt-2  bg-gradient-to-r from-[#169D79] to-[#1FC798]"
              >
                <span className="text-[16px] leading-4">Login</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
