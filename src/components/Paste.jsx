


import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }

  function handleShare(pasteId) {
    const shareableLink = `${window.location.origin}/pastes/${pasteId}`;
    navigator.clipboard.writeText(shareableLink);
    toast.success("Link copied to clipboard! 📋");
  }

  return (
    <div className="min-h-screen bg-gray-100 p-10 flex justify-center">
      <div className="w-[90vw]">
        {/* Search Bar */}
        <div className="flex justify-center">
          <input
            className="p-4 rounded-xl w-full max-w-4xl mt-5 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="search"
            placeholder="🔍 Search your pastes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Pastes List */}
        <div className="flex flex-col gap-6 mt-10">
          {filteredData.length > 0 ? (
            filteredData.map((paste) => {
              return (
                <div
                  key={paste._id}
                  className="bg-white shadow-lg p-6 rounded-xl border border-gray-300 w-full"
                >
                  <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                    {paste.title}
                  </h2>
                  <p className="text-gray-600 truncate">{paste.content}</p>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-4 mt-5">
                    <NavLink
                      to={`/?pasteId=${paste?._id}`}
                      className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                    >
                      ✏️ Edit
                    </NavLink>

                    <NavLink
                      to={`/pastes/${paste?._id}`}
                      className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                    >
                      👀 View
                    </NavLink>

                    <button
                      onClick={() => handleDelete(paste?._id)}
                      className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                    >
                      🗑️ Delete
                    </button>

                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(paste?.content);
                        toast.success("Copied to clipboard! 📋");
                      }}
                      className="px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
                    >
                      📋 Copy
                    </button>

                    <button
                      onClick={() => handleShare(paste?._id)}
                      className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition"
                    >
                      🔗 Share
                    </button>
                  </div>

                  <p className="text-gray-400 text-sm mt-3">
                    {new Date(paste.createdAt).toLocaleString()}
                  </p>

                </div>
              );
            })
          ) : (
            <p className="text-center text-gray-500 mt-5">No pastes found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Paste;
