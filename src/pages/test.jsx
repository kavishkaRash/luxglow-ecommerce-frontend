import { useState } from "react";
import mediaUpload from "../utils/mediaUpload.jsx";

export default function TestPage() {
    const [file, setFile] = useState(null);

    async function uploadImage() {
        if (!file) {
            alert("Please select a file first");
            return;
        }

        try {
            const link = await mediaUpload(file);
            console.log(link);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="w-full h-screen flex flex-col gap-4 justify-center items-center">
            <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
            />

            <button
                className="bg-blue-500 text-white p-2 rounded"
                onClick={uploadImage}
            >
                Upload
            </button>
        </div>
    );
}