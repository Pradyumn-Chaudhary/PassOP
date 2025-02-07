import React from "react";
import { useRef, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from 'react-toastify';

const Manager = () => {
  const ref = useRef();
  const passRef = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setpasswordArray(JSON.parse(passwords));
    }
  }, []);

  const savePassword = (e) => {
    if (e.type === "keydown" && e.key !== "Enter") {
      return;
    }
    if (!form.password.trim() || !form.username.trim() || !form.site.trim()) {
      toast('Fill all the fields!', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      return;
    }
    setpasswordArray([...passwordArray, form]);
    localStorage.setItem("passwords", JSON.stringify([...passwordArray, form]));
    setform({ site: "", username: "", password: "" });
    toast('Saved!', {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const showPassword = () => {
    if (ref.current.src.includes("show.svg")) {
      ref.current.src = "hide.svg";
      passRef.current.type = "password";
    } else {
      ref.current.src = "show.svg";
      passRef.current.type = "text";
    }
  };

  const handleCopy = (e) => {
    navigator.clipboard.writeText(e);
    toast('Copied to clipboard!', {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  };

  const handleEdit = (index) => {
    let newArr = [...passwordArray];
    setform({
      site: newArr[index].site,
      username: newArr[index].username,
      password: newArr[index].password,
    });
    newArr.splice(index, 1);
    setpasswordArray(newArr);
  };

  const handleTrash = (index) => {
    if (confirm("Are you sure to delete this data?")) {
      let newArr = [...passwordArray];
      newArr.splice(index, 1);
      setpasswordArray(newArr);
      localStorage.setItem("passwords", JSON.stringify(newArr));
      toast('Deleted!', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div
        className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_0%, rgba(50, 200, 50, 0.5), rgba(255, 255, 255, 0))]
"
      ></div>

      <div className="container mx-auto md:max-w-[75%] text-center text-2xl">
        <div className="logo font-bold">
          <span className="text-green-700">&lt;</span>
          Pass
          <span className="text-green-700">OP/&gt;</span>
        </div>
        <p className="text-center text-sm text-green-900">
          Your own Password Manager
        </p>
        <div className="text-white flex flex-col p-4 gap-4">
          <input
            onChange={handleChange}
            value={form.site}
            name="site"
            type="text"
            placeholder="Enter website url"
            className="bg-white rounded-full h-8 outline-none border border-green-500 text-black text-sm px-3"
          />
          <div className="flex justify-center gap-4 flex-col md:flex-row">
            <input
              onChange={handleChange}
              value={form.username}
              name="username"
              type="text"
              placeholder="Enter username"
              className="bg-white rounded-full h-8 w-full outline-none border border-green-500 text-black text-sm px-3"
            />
            <div className="w-full relative text-black text-sm">
              <input
                onChange={handleChange}
                ref={passRef}
                value={form.password}
                name="password"
                type="password"
                placeholder="Enter password"
                onKeyDown={savePassword}
                className="bg-white rounded-full h-8 w-full outline-none border border-green-500 px-3"
              />
              <span
                className="absolute right-3 top-1.5 cursor-pointer"
                onClick={showPassword}
              >
                <img ref={ref} src="hide.svg" alt="" />
              </span>
            </div>
          </div>
        </div>
        <button
          className="flex items-center justify-center mx-auto bg-green-400 rounded-full w-fit px-4 py-1 hover:bg-green-500 border border-green-900 cursor-pointer mb-2"
          onClick={savePassword}
        >
          <lord-icon
            src="https://cdn.lordicon.com/jgnvfzqg.json"
            colors="primary:#121331,secondary:#166534"
          ></lord-icon>
          <span className="pl-1">Save</span>
        </button>
      </div>

      <div className="password md:w-[75%] mx-auto pb-16">
        <span className="text-2xl font-bold my-1">Your Passwords</span>
        {passwordArray.length === 0 && (
          <div className="mx-5 my-2">No Password to show</div>
        )}
        {passwordArray.length != 0 && (
        <div className="table-responsive">
             <table className="table-auto w-full rounded-md overflow-hidden">
            <thead className="bg-green-800 text-white">
              <tr>
                <th className="py-1">Site</th>
                <th className="py-1">Username</th>
                <th className="py-1">Password</th>
                <th className="py-1">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-green-200">
              {passwordArray.map((password, index) => {
                return (
                  <tr key={uuidv4()}>
                    <td className="text-center py-1">
                      <div className="flex justify-center gap-2">
                        <a href="password.site" target="_blank">
                          {password.site}
                        </a>
                        <lord-icon
                          src="https://cdn.lordicon.com/iykgtsbt.json"
                          colors="primary:#121331,secondary:#166534"
                          trigger="click"
                          onClick={() => handleCopy(password.site)}
                          style={{ cursor: "pointer" }}
                        ></lord-icon>
                      </div>
                    </td>
                    <td className="text-center py-1">
                      <div className="flex justify-center gap-2">
                        {password.username}
                        <lord-icon
                          src="https://cdn.lordicon.com/iykgtsbt.json"
                          colors="primary:#121331,secondary:#166534"
                          trigger="click"
                          onClick={() => handleCopy(password.username)}
                          style={{ cursor: "pointer" }}
                        ></lord-icon>
                      </div>
                    </td>
                    <td className="text-center py-1">
                      <div className="flex justify-center gap-2">
                        {password.password}
                        <lord-icon
                          src="https://cdn.lordicon.com/iykgtsbt.json"
                          colors="primary:#121331,secondary:#166534"
                          trigger="click"
                          onClick={() => handleCopy(password.password)}
                          style={{ cursor: "pointer" }}
                        ></lord-icon>
                      </div>
                    </td>
                    <td>
                      <div className="flex justify-center items-center gap-1">
                        <img
                          src="edit.svg"
                          alt=""
                          className="cursor-pointer"
                          onClick={() => handleEdit(index)}
                        />
                        <img
                          src="trash.svg"
                          alt=""
                          className="cursor-pointer"
                          onClick={() => handleTrash(index)}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            </table>
            </div>
        )}
      </div>
    </>
  );
};

export default Manager;
