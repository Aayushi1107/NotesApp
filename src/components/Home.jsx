



import React, { useEffect, useState } from 'react';
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToPastes, updateToPastes } from '../redux/pasteSlice';

const Home = () => {
    const [title, setTitle] = useState("");
    const [value, setValue] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();
    const pasteId = searchParams.get("pasteId");
    const dispatch = useDispatch(); 
    const allPastes = useSelector((state) => state.paste.pastes);

    useEffect(() => {
        const paste = allPastes.find((p) => p._id === pasteId);
        if (paste) {
            setTitle(paste.title);
            setValue(paste.content);
        } else {
            setTitle('');
            setValue('');
        }
    }, [pasteId, allPastes]);

    function createPaste() {
        const paste = {
            title: title,
            content: value,
            _id: pasteId || Date.now().toString(36),
            createdAt: new Date().toISOString(),
        };

        if (pasteId) {
            dispatch(updateToPastes(paste));
        } else {
            dispatch(addToPastes(paste));
        }

        setTitle('');
        setValue('');
        setSearchParams({});
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-10">
            <div className="bg-white shadow-lg rounded-xl p-8 w-[90vw] max-w-none">
                {/* Title Input */}
                <div className="flex flex-col sm:flex-row gap-6 w-full">
                    <input
                        className="flex-1 p-4 border-2 border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                        type="text"
                        placeholder="Enter title here..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <button
                        onClick={createPaste}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                    >
                        {pasteId ? "Update My Paste" : "Create My Paste"}
                    </button>
                </div>

                {/* Content Textarea */}
                <div className="mt-8">
                    <textarea
                        className="w-full h-[600px] p-5 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 resize-none"
                        placeholder="Enter content here..."
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
};

export default Home;
