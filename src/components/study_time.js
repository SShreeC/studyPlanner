
import React, { useState } from "react";
import { predictStudyTime } from "../services/study_timeAPI";
import { motion } from "framer-motion";

const StudyTimePrediction = () => {
    const [inputData, setInputData] = useState({
        past_study_hours: 3.0,
        test_scores: 75,
        subject_difficulty: 2,
        upcoming_deadlines: 10,
        focus_level: 4
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
            const response = await predictStudyTime(inputData);
            console.log(response);

            if (response.status === "success" && response.recommended_study_hours !== undefined) {
                setResult(response.recommended_study_hours);
            } else {
                setError("Failed to predict study time.");
            }
        } catch (err) {
            setError("Error fetching data.");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
            <motion.div 
                className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
            >
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">📚 Study Time Prediction</h2>
                
                <form onSubmit={handleSubmit} className="space-y-5">
                    {Object.keys(inputData).map((key) => (
                        <div key={key}>
                            <label className="block text-gray-700 font-medium capitalize">{key.replace(/_/g, " ")}:</label>
                            <input 
                                type="number"
                                name={key}
                                value={inputData[key]}
                                onChange={handleChange}
                                className="w-full mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                                required
                            />
                        </div>
                    ))}

                    <motion.button 
                        type="submit"
                        className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
                        whileHover={{ scale: 1.05 }}
                    >
                        Predict Study Time
                    </motion.button>
                </form>

                {/* Display Results */}
                {result !== null && (
                    <motion.div 
                        className="mt-6 p-5 bg-green-50 border border-green-400 rounded-xl shadow-lg text-center"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <h3 className="text-xl font-semibold text-green-700">✅ Recommended Study Time</h3>
                        <p className="text-3xl font-bold text-green-800 mt-2">{result.toFixed(2)} hours</p>
                    </motion.div>
                )}

                {/* Display Errors */}
                {error && (
                    <p className="mt-4 text-center text-red-500 font-medium">{error}</p>
                )}
            </motion.div>
        </div>
    );
};

export default StudyTimePrediction;
