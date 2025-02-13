


import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ViewPaste = () => {
  const { id } = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);
  const paste = allPastes.find((p) => p._id === id);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white px-6">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-[90vw] max-w-none">
        <h1 className="text-3xl font-semibold text-blue-400 text-center mb-6">
          📄 View Paste
        </h1>

        <div className="mb-6">
          <label className="block text-gray-400 text-sm font-medium mb-2">
            Title
          </label>
          <input
            className="w-full p-4 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none text-white text-lg"
            type="text"
            disabled
            value={paste?.title || ""}
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-400 text-sm font-medium mb-2">
            Content
          </label>
          <textarea
            className="w-full min-h-[60vh] p-4 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none text-white text-lg resize-none"
            value={paste?.content || ""}
            disabled
          />
        </div>

        <p className="text-gray-500 text-sm text-center">
          📅 Created At: {paste?.createdAt}
        </p>
      </div>
    </div>
  );
};

export default ViewPaste;
