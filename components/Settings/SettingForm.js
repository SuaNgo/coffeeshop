"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import DialogModal from "../Dialog";

const SettingsForm = ({
  _id,
  username: existingUsername,
  password: existingPassword,
  role: existingRole,
}) => {
  const [username, setUsername] = useState(existingUsername || "");
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [role, setRole] = useState(existingRole || "");
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const createAdmin = async (e) => {
    e.preventDefault();
    const admin = {
      username,
      oldPassword,
      existingPassword,
      password,
      role,
    };
    if (_id) {
      try {
        await axios.put("/api/settings", { ...admin, _id });
        router.push("/settings");
      } catch (error) {
        if (error.response) {
          alert(error.response.data.message);
        }
      }
    } else {
      await axios.post("/api/settings", admin);
      setTimeout(() => {
        router.push("/settings");
      }, 2000);
    }
  };

  return (
    <>
      {_id ? (
        <form onSubmit={createAdmin}>
          <div className="flex gap-1">
            <label>
              Tên tài khoản
              <input
                disabled
                type="text"
                placeholder={"Username"}
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                pattern="^(?=[a-zA-Z0-9._]{4,20}$)(?!.*[_.]{2})[^_.].*[^_.]$"
                title="at least 8 characters, no space"
              />
            </label>

            <label>
              Nhập mật khẩu cũ
              <input
                type="password"
                placeholder={"Password"}
                onChange={(e) => setOldPassword(e.target.value)}
                value={oldPassword}
              />
            </label>

            <label>
              Nhập mật khẩu
              <input
                type="password"
                placeholder={"Password"}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </label>
            <label>
              Role
              <select name="role" onChange={(e) => setRole(e.target.value)}>
                <option value="admin">Admin</option>
                <option value="nhanvien">Nhan vien</option>
              </select>
            </label>
          </div>

          <div className="flex gap-1">
            <button
              type="submit"
              onClick={() => setIsOpen(true)}
              className="text-[20px] p-1 text-center border-blue-600 bg-blue-600 border-2 rounded-md font-bold text-white mt-2"
            >
              Sửa
            </button>
            <button
              type="button"
              onClick={() => router.push("/settings")}
              className="text-[20px] p-1 text-center border-2 border-gray-400 rounded-md font-bold text-white mt-2 bg-gray-400 ml-4"
            >
              Quay lại
            </button>
          </div>
        </form>
      ) : (
        <form onSubmit={createAdmin}>
          <div className="flex gap-1">
            <label>
              Tên tài khoản
              <input
                type="text"
                placeholder={"Username"}
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                pattern="^(?=[a-zA-Z0-9._]{4,20}$)(?!.*[_.]{2})[^_.].*[^_.]$"
                title="at least 8 characters, no space"
              />
            </label>
            <label>
              Nhập mật khẩu
              <input
                type="password"
                placeholder={"Password"}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </label>
            <label>
              Role
              <select name="role" onChange={(e) => setRole(e.target.value)}>
                <option value="admin">Admin</option>
                <option value="nhanvien">Nhan vien</option>
              </select>
            </label>
          </div>
          <div className="flex gap-1">
            <button
              type="submit"
              // onClick={() => setIsOpen(true)}
              className="text-[20px] p-1 text-center border-blue-600 bg-blue-600 border-2 rounded-md font-bold text-white mt-2"
            >
              Thêm
            </button>
            <button
              type="button"
              onClick={() => router.push("/settings")}
              className="text-[20px] p-1 text-center border-2 border-gray-400 rounded-md font-bold text-white mt-2 bg-gray-400 ml-4"
            >
              Quay lại
            </button>
          </div>
          {isOpen ? (
            <DialogModal isOpen={isOpen} closeModal={() => setIsOpen(false)} />
          ) : (
            <></>
          )}
        </form>
      )}
    </>
  );
};

export default SettingsForm;
