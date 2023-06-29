const DirectionModal = ({ onClose }) => {
  return (
    <div className="fixed top-4 left-0 right-0 bottom-4 flex items-center justify-center z-50 max-h-screen">
      <div className="bg-white rounded-md p-4 max-w-md shadow-lg h-full">
        <div className="flex justify-end">
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-2 h-full">
          <h2 className="text-lg font-semibold">Tips for Solving SAT Math Problems</h2>
          <ul className="list-disc list-inside text-gray-600 overflow-y-auto h-[93%]">
            <li>Understand the question: Read the question carefully and make sure you understand what is being asked.</li>
            <li>Identify the problem type: Determine the type of math problem you are dealing with, such as algebra, geometry, or data analysis.</li>
            <li>Organize the information: Take note of any given information, variables, or formulas provided in the question.</li>
            <li>Work step-by-step: Break down the problem into smaller steps. Solve each step carefully and show your work.</li>
            <li>Use your scratch paper: Utilize the provided scratch paper to perform calculations, draw diagrams, or write equations.</li>
            <li>Apply relevant formulas and concepts: Apply the appropriate formulas, equations, theorems, and mathematical concepts.</li>
            <li>Eliminate answer choices: Use the process of elimination to eliminate obviously incorrect answer choices.</li>
            <li>Use estimation: Use estimation techniques to arrive at a close approximate answer.</li>
            <li>Be cautious with units and measurements: Pay attention to units of measurement and convert units if necessary.</li>
            <li>Practice regularly: Solve practice questions from official SAT study materials or reputable sources.</li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default DirectionModal;
