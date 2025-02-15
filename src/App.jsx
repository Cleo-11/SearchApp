import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import FileViewer from "./FileViewer";

function Home() {
    const [query, setQuery] = useState("");
    const [files, setFiles] = useState([]);
    const navigate = useNavigate();

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/search?query=${query}`);
            setFiles(response.data.files);
        } catch (error) {
            console.error("❌ Error fetching files:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-4">File Search</h1>
                <div className="flex space-x-2">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search for a file or keyword..."
                        className="flex-1 p-2 border rounded-lg"
                    />
                    <button
                        onClick={handleSearch}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    >
                        Search
                    </button>
                </div>

                {/* Search Results */}
                <ul className="mt-4">
                    {files.length > 0 ? (
                        files.map((file) => (
                            <li key={file} className="mt-2">
                                <button
                                    onClick={() => navigate(`/file/${encodeURIComponent(file)}`)}
                                    className="text-blue-600 font-semibold underline hover:text-blue-800 cursor-pointer"
                                >
                                    {file}
                                </button>
                            </li>
                        ))
                    ) : (
                        <p className="mt-2 text-gray-500">No files found.</p>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/file/:filename" element={<FileViewer />} />
            </Routes>
        </Router>
    );
}
