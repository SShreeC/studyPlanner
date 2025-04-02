// import React, { useState } from 'react';

// function quizStartScreen({ errorMessage, onStartQuiz }) {
//   const [topic, setTopic] = useState('');
  
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (topic.trim()) {
//       onStartQuiz(topic);
//     }
//   };
  
//   return (
//     <section className="start-screen container">
//       <h2>Choose a topic to start testing your knowledge</h2>
//       <form onSubmit={handleSubmit}>
//         <input 
//           type="text" 
//           placeholder="Enter your topic..." 
//           value={topic} 
//           onChange={(e) => setTopic(e.target.value)} 
//         />
//         <button type="submit" disabled={!topic.trim()}>
//           Start Quiz
//         </button>
//       </form>
//       {errorMessage && <small className="error">There was an error, please try again later.</small>}
//     </section>
//   );
// }

// export default quizStartScreen;


import React, { useState } from "react";

const QuizStartScreen = ({ errorMessage, onStartQuiz }) => {
  const [topic, setTopic] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (topic.trim()) {
      onStartQuiz(topic);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Choose a topic to test your knowledge
        </h2>
        <form onSubmit={handleSubmit} className="w-full">
          <input
            type="text"
            placeholder="Enter your topic..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <button
            type="submit"
            disabled={!topic.trim()}
            className={`mt-4 w-full p-3 text-white font-semibold rounded-lg transition 
                        ${
                          topic.trim()
                            ? "bg-blue-500 hover:bg-blue-600"
                            : "bg-gray-300 cursor-not-allowed"
                        }`}
          >
            Start Quiz
          </button>
        </form>
        {errorMessage && (
          <p className="mt-3 text-red-500 text-sm">
            ❌ There was an error, please try again later.
          </p>
        )}
      </div>
    </div>
  );
};

export default QuizStartScreen;
