
// import React, { useState } from "react";
// import { predictStudyPlan } from "../services/api";

// const AdaptiveStudyPlan = () => {
//     const [inputData] = useState({
//         study_logs: [5, 3, 6],
//         subject_difficulty: [2, 3, 1],
//         time_left: 30
//     });

//     const [result, setResult] = useState(null);
//     const [error, setError] = useState(null);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError(null); // Clear previous errors

//         try {
//             const response = await predictStudyPlan(inputData);
//             console.log(response);

//             if (response.status === "success" && response.prediction) {
//                 setResult(response.prediction);
//             } else {
//                 setError("Failed to generate study plan.");
//             }
//         } catch (err) {
//             setError("Error fetching data.");
//         }
//     };

//     return (
//         <div style={{ padding: "20px", maxWidth: "600px", margin: "auto", textAlign: "center" }}>
//             <h2>Adaptive Study Plan</h2>
//             <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
//                 <p><strong>Study Logs:</strong> {JSON.stringify(inputData.study_logs)}</p>
//                 <p><strong>Subject Difficulty:</strong> {JSON.stringify(inputData.subject_difficulty)}</p>
//                 <p><strong>Time Left:</strong> {inputData.time_left} days</p>

//                 <button type="submit" style={{ padding: "10px", fontSize: "16px" }}>Predict Study Hours</button> 
//             </form>

//             {/* Display Results */}
//             {result && (
//                 <div style={{ marginTop: "20px", padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}>
//                     <h3>Recommended Study Hours</h3>
//                     <ul style={{ listStyleType: "none", padding: 0 }}>
//                         {result.map((hours, index) => (
//                             <li key={index} style={{ fontSize: "18px", margin: "5px 0" }}>
//                                 <strong>Subject {index + 1}:</strong> {hours.toFixed(2)} hours
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             )}

//             {/* Display Errors */}
//             {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
//         </div>
//     );
// };

// export default AdaptiveStudyPlan;
import React, { useState } from "react";
import { predictStudyPlan } from "../services/api";

const AdaptiveStudyPlan = () => {
    const [inputData] = useState({
        study_logs: [5, 3, 6],
        subject_difficulty: [2, 3, 1],
        time_left: 30
    });

    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await predictStudyPlan(inputData);
            console.log(response);

            if (response.status === "success" && response.prediction) {
                setResult(response.prediction);
            } else {
                setError("Failed to generate study plan.");
            }
        } catch (err) {
            setError("Error fetching data.");
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl border border-gray-200">
            <h2 className="text-2xl font-semibold text-center mb-4">📖 Adaptive Study Plan</h2>
            <p className="text-gray-500 text-center mb-6">
                Get a personalized study schedule based on your past study patterns, subject difficulty, and available time.
            </p>

            <form onSubmit={handleSubmit} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <div className="text-sm text-gray-700 mb-3">
                    <p><strong>📊 Study Logs:</strong> {JSON.stringify(inputData.study_logs)}</p>
                    <p><strong>📚 Subject Difficulty:</strong> {JSON.stringify(inputData.subject_difficulty)}</p>
                    <p><strong>⏳ Time Left:</strong> {inputData.time_left} days</p>
                </div>

                <button 
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600 transition duration-200"
                >
                    Generate Study Plan
                </button>
            </form>

            {/* Display Results */}
            {result && (
                <div className="mt-6 p-4 bg-green-50 border border-green-300 rounded-lg shadow-sm">
                    <h3 className="text-lg font-semibold text-green-700">✅ Recommended Study Hours</h3>
                    <ul className="mt-3 text-gray-800">
                        {result.map((hours, index) => (
                            <li key={index} className="py-2 text-md">
                                <strong>Subject {index + 1}:</strong> {hours.toFixed(2)} hours
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Display Errors */}
            {error && (
                <p className="text-red-600 text-center mt-4 p-2 bg-red-50 border border-red-300 rounded-lg">
                    {error}
                </p>
            )}
        </div>
    );
};

export default AdaptiveStudyPlan;
