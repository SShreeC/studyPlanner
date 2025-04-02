// import React, { useState } from "react";
// import { predictWeakSubject } from "../services/WeakSubjectAPI";

// const WeakSubjectPrediction = () => {
//     const [inputData, setInputData] = useState({
//         study_hours: 12,
//         topics_covered: 2,
//         quiz_scores: 45,
//         time_per_question: 1.7
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
//             const response = await predictWeakSubject(inputData);
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
//         <div className="flex justify-center items-center min-h-screen bg-gray-100">
//             <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
//                 <h2 className="text-2xl font-bold text-center mb-4">📖 Weak Subject Prediction</h2>
//                 <form onSubmit={handleSubmit} className="space-y-4">
//                     {Object.keys(inputData).map((key) => (
//                         <div key={key}>
//                             <label className="block text-gray-700 capitalize">{key.replace(/_/g, " ")}:</label>
//                             <input
//                                 type="number"
//                                 name={key}
//                                 value={inputData[key]}
//                                 onChange={handleChange}
//                                 className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                 required
//                             />
//                         </div>
//                     ))}

//                     <button 
//                         type="submit" 
//                         className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">
//                         Predict Weak Subject
//                     </button>
//                 </form>

//                 {/* Display Results */}
//                 {result !== null && (
//                     <div className="mt-6 p-4 bg-yellow-100 border border-yellow-400 rounded-lg text-center">
//                         <h3 className="text-lg font-semibold text-yellow-700">📌 Prediction Result</h3>
//                         <p className={`text-2xl font-bold mt-2 ${result.is_weak_subject ? "text-red-600" : "text-green-600"}`}>
//                             {result.message}
//                         </p>
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

// export default WeakSubjectPrediction;
import React, { useState } from "react";
import { predictWeakSubject } from "../services/WeakSubjectAPI";

const WeakSubjectPrediction = () => {
    const [inputData, setInputData] = useState({
        study_hours: 12,
        topics_covered: 2,
        quiz_scores: 45,
        time_per_question: 1.7
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
            const response = await predictWeakSubject(inputData);
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
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4">
            <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">📖 Weak Subject Prediction</h2>
                
                {/* Form Section */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {Object.keys(inputData).map((key) => (
                        <div key={key}>
                            <label className="block text-gray-700 font-medium capitalize">{key.replace(/_/g, " ")}:</label>
                            <input
                                type="number"
                                name={key}
                                value={inputData[key]}
                                onChange={handleChange}
                                className="w-full mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                required
                            />
                        </div>
                    ))}

                    <button 
                        type="submit" 
                        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition font-semibold shadow-md">
                        Predict Weak Subject
                    </button>
                </form>

                {/* Display Results */}
                {result !== null && (
                    <div className={`mt-6 p-5 rounded-lg text-center shadow-md ${
                        result.is_weak_subject ? "bg-red-100 border border-red-400" : "bg-green-100 border border-green-400"
                    }`}>
                        <h3 className={`text-xl font-semibold ${
                            result.is_weak_subject ? "text-red-700" : "text-green-700"
                        }`}>
                            📌 Prediction Result
                        </h3>
                        <p className={`text-2xl font-bold mt-2 ${
                            result.is_weak_subject ? "text-red-600" : "text-green-600"
                        }`}>
                            {result.message}
                        </p>
                    </div>
                )}

                {/* Display Errors */}
                {error && (
                    <p className="mt-4 text-center text-red-500 font-medium">{error}</p>
                )}
            </div>
        </div>
    );
};

export default WeakSubjectPrediction;
