"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const SettingsForm = ({
  _id,
  username: existingUsername,
  password: existingPassword,
  role: existingRole,
}) => {
  const [username, setUsername] = useState(existingUsername || "");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(existingRole || "");
  const router = useRouter();

  const createAdmin = async (e) => {
    e.preventDefault();
    const admin = {
      username,
      password,
      role,
    };
    if (_id) {
      await axios.put("/api/settings", { ...admin, _id });
    } else {
      await axios.post("/api/settings", admin);
    }

    router.push("/settings");
  };

  return (
    <>
      <form onSubmit={createAdmin}>
        <div className="flex gap-1">
          <label>
            Username
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
            Password
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
          {_id ? (
            <>
              <button
                type="submit"
                className="bg-red-200 py-2 px-3 rounded-xl font-bold "
              >
                Sửa
              </button>
              <button
                type="button"
                onClick={() => router.push("/settings")}
                className="bg-gray-400 py-2 px-3 rounded-xl font-bold ml-4"
              >
                Quay lại
              </button>
            </>
          ) : (
            <>
              <button
                type="submit"
                className="bg-red-200 py-2 px-3 rounded-xl font-bold "
              >
                Thêm
              </button>
              <button
                type="button"
                onClick={() => router.push("/settings")}
                className="bg-gray-400 py-2 px-3 rounded-xl font-bold ml-4"
              >
                Quay lại
              </button>
            </>
          )}
        </div>
      </form>
    </>
  );
};

export default SettingsForm;
