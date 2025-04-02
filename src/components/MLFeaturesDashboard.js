import React from "react";
import { useNavigate } from "react-router-dom";
import LoggedInNavBar from "./LoggedInNavBar"; // Adjust the path as needed
import { motion } from "framer-motion";
import { Book, BarChart3, Clock, BrainCircuit, ClipboardList, AlertTriangle } from "lucide-react";

const features = [
    {
        title: "Adaptive Study Plan",
        description: "Get a personalized study schedule based on your past study patterns, subject difficulty, and available time.",
        icon: <Book size={40} />,
        route: "/adaptive-study-plan"
    },
    {
        title: "Study Time Prediction",
        description: "Predict how much study time you need based on past hours, test scores, deadlines, and focus levels.",
        icon: <Clock size={40} />,
        route: "/studyTime"
    },
    {
        title: "Quiz Generator",
        description: "Generate quizzes automatically for any topic with mixed difficulty levels and question types.",
        icon: <ClipboardList size={40} />,
        route: "/quiz"
    },
    {
        title: "Progress Prediction",
        description: "Predict syllabus completion percentage based on study hours, topics covered, and quiz scores.",
        icon: <BarChart3 size={40} />,
        route: "/progress_predict"
    },
    {
        title: "Exam Readiness Analysis",
        description: "Analyze your preparedness for exams based on study patterns, test scores, and performance trends.",
        icon: <BrainCircuit size={40} />,
        route: "/exam_ready"
    },
    {
        title: "Weakness Prediction",
        description: "Identify subjects or topics where you need improvement based on your performance trends.",
        icon: <AlertTriangle size={40} />,
        route: "/weak_sub"
    }
];

const MLFeaturesDashboard = () => {
    const navigate = useNavigate();

    return ( 
        <div>
            <LoggedInNavBar />
        <div className="max-w-5xl mx-auto py-10 px-5">
            <h1 className="text-3xl font-bold text-center mb-6">AI-Powered Study Tools</h1>
            {/* <p className="text-gray-600 text-center mb-8">Enhance your learning experience with intelligent study tools powered by AI.</p> */}
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature, index) => (
                    <motion.div key={index} whileHover={{ scale: 1.05 }}>
                        <div className="p-6 flex flex-col items-center text-center shadow-md rounded-xl hover:shadow-lg border border-gray-200 bg-white">
                            <div className="mb-4 text-blue-500">{feature.icon}</div>
                            <h2 className="text-xl font-semibold mb-2">{feature.title}</h2>
                            <p className="text-gray-500 text-sm mb-4">{feature.description}</p>
                            <button 
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                                onClick={() => navigate(feature.route)}
                            >
                                Explore
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div></div>
    );
};

export default MLFeaturesDashboard;
