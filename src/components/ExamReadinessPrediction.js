// import React, { useState } from "react";
// import { predictExamReadiness } from "../services/examReadinessAPI";

// const ExamReadinessPrediction = () => {
//     const [inputData, setInputData] = useState({
//         study_consistency: [8],
//         past_test_scores: [70],
//         recent_study_hours: [10]
//     });

//     const [result, setResult] = useState(null);
//     const [error, setError] = useState(null);

//     const handleChange = (e) => {
//         setInputData({
//             ...inputData,
//             [e.target.name]: [parseFloat(e.target.value)] // Always store values as an array
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError(null);

//         try {
//             const response = await predictExamReadiness(inputData);
//             console.log(response);

//             if (response.status === "success") {
//                 setResult(response);
//             } else {
//                 setError("Prediction failed.");
//             }
//         } catch (err) {
//             setError("Error fetching data.");
//         }
//     };

//     return (
//         <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 p-6">
//             <div className="bg-white shadow-2xl rounded-lg p-8 w-full max-w-lg">
//                 <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">📖 Exam Readiness Prediction</h2>
//                 <form onSubmit={handleSubmit} className="space-y-5">
//                     {Object.keys(inputData).map((key) => (
//                         <div key={key}>
//                             <label className="block text-gray-700 capitalize font-semibold">{key.replace(/_/g, " ")}</label>
//                             <input
//                                 type="number"
//                                 name={key}
//                                 value={inputData[key][0]} // Access first element of the array
//                                 onChange={handleChange}
//                                 className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                 required
//                             />
//                         </div>
//                     ))}

//                     <button 
//                         type="submit" 
//                         className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-bold hover:bg-blue-700 transition duration-300">
//                         Predict Readiness
//                     </button>
//                 </form>

//                 {/* Display Results */}
//                 {result !== null && (
//                     <div className="mt-6 p-4 border rounded-lg text-center"
//                         style={{
//                             backgroundColor: result.prediction[0] === "High" ? "#D4EDDA" :
//                                             result.prediction[0] === "Medium" ? "#FFF3CD" : "#F8D7DA",
//                             borderColor: result.prediction[0] === "High" ? "#155724" :
//                                          result.prediction[0] === "Medium" ? "#856404" : "#721C24"
//                         }}>
//                         <h3 className="text-lg font-semibold">{result.message}</h3>
//                         <p className="text-2xl font-bold mt-2">{result.prediction[0]}</p>
//                     </div>
//                 )}

//                 {/* Display Errors */}
//                 {error && (
//                     <p className="mt-4 text-center text-red-500">{error}</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default ExamReadinessPrediction;
import React, { useState } from "react";
import { predictExamReadiness } from "../services/examReadinessAPI";

const ExamReadinessPrediction = () => {
    const [inputData, setInputData] = useState({
        study_consistency: [8],
        past_test_scores: [70],
        recent_study_hours: [10]
    });

    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setInputData({
            ...inputData,
            [e.target.name]: [parseFloat(e.target.value)]
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await predictExamReadiness(inputData);
            console.log(response);

            if (response.status === "success") {
                setResult(response);
            } else {
                setError("Prediction failed.");
            }
        } catch (err) {
            setError("Error fetching data.");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-blue-500 to-indigo-600 p-6">
            <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg transition-all duration-300">
                <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-6">
                    📖 Exam Readiness Prediction
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {Object.keys(inputData).map((key) => (
                        <div key={key}>
                            <label className="block text-gray-700 capitalize font-medium mb-2">
                                {key.replace(/_/g, " ")}
                            </label>
                            <input
                                type="number"
                                name={key}
                                value={inputData[key][0]}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                                required
                            />
                        </div>
                    ))}

                    <button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg font-bold hover:scale-105 transform transition-all duration-300 shadow-lg">
                        Predict Readiness
                    </button>
                </form>

                {/* Display Results */}
                {result !== null && (
                    <div className="mt-6 p-5 border rounded-lg text-center shadow-md transition-all duration-300"
                        style={{
                            backgroundColor: result.prediction[0] === "High" ? "#D4EDDA" :
                                            result.prediction[0] === "Medium" ? "#FFF3CD" : "#F8D7DA",
                            borderColor: result.prediction[0] === "High" ? "#28A745" :
                                         result.prediction[0] === "Medium" ? "#FFC107" : "#DC3545"
                        }}>
                        <h3 className="text-lg font-semibold text-gray-800">{result.message}</h3>
                        <p className={`text-2xl font-bold mt-2 ${
                            result.prediction[0] === "High" ? "text-green-700" :
                            result.prediction[0] === "Medium" ? "text-yellow-700" :
                            "text-red-700"
                        }`}>
                            {result.prediction[0]}
                        </p>
                    </div>
                )}

                {/* Display Errors */}
                {error && (
                    <p className="mt-4 text-center text-red-500">{error}</p>
                )}
            </div>
        </div>
    );
};

export default ExamReadinessPrediction;
