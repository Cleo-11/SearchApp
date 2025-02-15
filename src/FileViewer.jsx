import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function FileViewer() {
    const { filename } = useParams();
    const [content, setContent] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFileContent = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/file?file=${filename}`);
                setContent(response.data.content);
            } catch (error) {
                console.error("❌ Error fetching file content:", error);
            }
        };

        fetchFileContent();
    }, [filename]);

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
                <button
                    onClick={() => navigate(-1)}
                    className="mb-4 bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
                >
                    ← Back
                </button>
                <h1 className="text-2xl font-bold mb-4">{filename}</h1>
                <pre className="p-4 border rounded-lg bg-gray-50 text-gray-700 whitespace-pre-wrap">
                    {content}
                </pre>
            </div>
        </div>
    );
}
