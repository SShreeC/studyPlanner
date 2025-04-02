// import React, { useState } from "react";
// import { predictProgress } from "../services/progressAPI"; // Adjust the import path as necessary

// const ProgressPrediction = () => {
//     const [inputData, setInputData] = useState({
//         study_hours: 12,
//         topics_covered: 34,
//         quiz_scores: 45
//     });

//     const [result, setResult] = useState(null);
//     const [error, setError] = useState(null);

//     const handleChange = (e) => {
//         setInputData({ ...inputData, [e.target.name]: parseFloat(e.target.value) });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError(null);

//         try {
//             const response = await predictProgress(inputData);
//             console.log(response);

//             if (response.status === "success") {
//                 setResult(response.syllabus_completion_percentage);
//             } else {
//                 setError("Failed to predict progress.");
//             }
//         } catch (err) {
//             setError("Error fetching data.");
//         }
//     };

//     return (
//         <div style={{ padding: "20px", maxWidth: "600px", margin: "auto", textAlign: "center" }}>
//             <h2>Progress Prediction</h2>
//             <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
//                 <label>Study Hours:</label>
//                 <input type="number" name="study_hours" value={inputData.study_hours} onChange={handleChange} required />

//                 <label>Topics Covered:</label>
//                 <input type="number" name="topics_covered" value={inputData.topics_covered} onChange={handleChange} required />

//                 <label>Quiz Scores:</label>
//                 <input type="number" name="quiz_scores" value={inputData.quiz_scores} onChange={handleChange} required />

//                 <button type="submit" style={{ padding: "10px", fontSize: "16px", marginTop: "10px" }}>Predict Progress</button>
//             </form>

//             {/* Display Results */}
//             {result !== null && (
//                 <div style={{ marginTop: "20px", padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}>
//                     <h3>Predicted Syllabus Completion</h3>
//                     <p style={{ fontSize: "18px" }}><strong>{result.toFixed(2)}%</strong></p>
//                 </div>
//             )}

//             {/* Display Errors */}
//             {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
//         </div>
//     );
// };

// export default ProgressPrediction;
import React, { useState } from "react";
import { predictProgress } from "../services/progressAPI"; // Adjust the import path as necessary

const ProgressPrediction = () => {
    const [inputData, setInputData] = useState({
        study_hours: 12,
        topics_covered: 34,
        quiz_scores: 45
    });

    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setInputData({ ...inputData, [e.target.name]: parseFloat(e.target.value) });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await predictProgress(inputData);
            console.log(response);

            if (response.status === "success") {
                setResult(response.syllabus_completion_percentage);
            } else {
                setError("Failed to predict progress.");
            }
        } catch (err) {
            setError("Error fetching data.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
            <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full">
                <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">📊 Progress Prediction</h2>
                <p className="text-gray-500 text-center mb-6">Enter your study data to predict syllabus completion percentage.</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Study Hours</label>
                        <input
                            type="number"
                            name="study_hours"
                            value={inputData.study_hours}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Topics Covered</label>
                        <input
                            type="number"
                            name="topics_covered"
                            value={inputData.topics_covered}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Quiz Scores</label>
                        <input
                            type="number"
                            name="quiz_scores"
                            value={inputData.quiz_scores}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                    >
                        Predict Progress
                    </button>
                </form>

                {/* Display Results */}
                {result !== null && (
                    <div className="mt-6 p-4 bg-green-100 border border-green-400 rounded-lg text-center">
                        <h3 className="text-lg font-semibold text-green-700">Predicted Syllabus Completion</h3>
                        <p className="text-3xl font-bold text-green-800 mt-2">{result.toFixed(2)}%</p>
                    </div>
                )}

                {/* Display Errors */}
                {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
            </div>
        </div>
    );
};

export default ProgressPrediction;
