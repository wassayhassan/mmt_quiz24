import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import Draggable from "react-draggable";
import { motion } from "framer-motion";

const ReferenceSheet = ({ onClose }) => {
  const [position, setPosition] = useState({ x: -600, y: 100 });

  const handleDrag = (e, { x, y }) => {
    setPosition({ x, y });
  };

  return (
    <Draggable handle=".modal-header" position={position} onStop={handleDrag}>
      <div className="absolute w-[400px] h-full top-14 z-50 cursor-pointer">
        <div className="bg-white border-2 border-lightgray">
          <div className="modal-header flex flex-row items-center bg-black text-white p-1">
            <h6 className="flex-grow">Reference Sheet</h6>
            <motion.button whileTap={{scale:0.97}}>
               <IoMdClose size="1.3rem" onClick={onClose} className="cursor-pointer hover:text-gray-200" />
            </motion.button>
          </div>
          <div className="modal-body p-1">
            <ul className="list-disc pl-4">
              <li>The number of degrees of arc in a circle is 360.</li>
              <li>The number of radians of arc in a circle is 2π.</li>
              <li>The sum of measures in degrees of angles in a triangle is 180.</li>
              <li>Distance Formula: d = √((x2 - x1)^2 + (y2 - y1)^2)</li>
              <li>Midpoint Formula: (x, y) = ((x1 + x2)/2, (y1 + y2)/2)</li>
              <li>Slope-Intercept Form of a Linear Equation: y = mx + b</li>
              <li>Quadratic Formula: x = (-b ± √(b^2 - 4ac)) / (2a)</li>
              <li>Pythagorean Theorem: c^2 = a^2 + b^2</li>
              <li>Area of a Circle: A = πr^2</li>
              <li>Circumference of a Circle: C = 2πr</li>
              <li>Volume of a Rectangular Prism: V = lwh</li>
              <li>Surface Area of a Rectangular Prism: SA = 2lw + 2lh + 2wh</li>
            </ul>
          </div>
        </div>
      </div>
    </Draggable>
  );
};

export default ReferenceSheet;
