import React, { useState, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import Model from "./Model";

const CCustomizer = () => {
  const [availableHeight, setAvailableHeight] = useState(window.innerHeight - 64);
  const [showInstructions, setShowInstructions] = useState(true);
  const [hoveredPart, setHoveredPart] = useState(null);
  const [colors, setColors] = useState({
    frame: "#FF6A13",
    base: "#FFFFFF",
    slider: "#008DC3",
    temple: "#101820",
  });

  const [menuPosition, setMenuPosition] = useState(null);
  const buttonRef = useRef(null);

  const [showDialog, setShowDialog] = useState(false);

  const filamentCategories = {
    PolyMaker: [
      { name: "White", hex: "#FFFFFF" },
      { name: "Black", hex: "#101820" },
      { name: "Grey", hex: "#888B8D" },
      { name: "Dark Grey", hex: "#6C6D71" },
      { name: "Army Brown", hex: "#775C50" },
      { name: "Olive Brown", hex: "#A79565" },
      { name: "Natural White", hex: "#F1E6B2" },
      { name: "Dark Green Grey", hex: "#4C5F46" },
      { name: "Army Green", hex: "#68724D" },
      { name: "Red", hex: "#AF231C" },
      { name: "ABS Red", hex: "#DE4343" },
      { name: "Orange", hex: "#FF6A13" },
      { name: "Gold", hex: "#BD6200" },
      { name: "ABS Yellow", hex: "#FFC845" },
      { name: "Yellow", hex: "#FFE800" },
      { name: "Lime", hex: "#C4D600" },
      { name: "Pop Green", hex: "#77D730" },
      { name: "ABS Green", hex: "#3A913F" },
      { name: "Green", hex: "#00A95C" },
      { name: "Teal", hex: "#00B4BC" },
      { name: "ABS Teal", hex: "#2DCCD3" },
      { name: "Light Blue", hex: "#5BC2E7" },
      { name: "Pop Blue", hex: "#008DC3" },
      { name: "Blue", hex: "#002677" },
      { name: "ABS Purple", hex: "#6E3FA3" },
      { name: "Purple", hex: "#7758B3" },
      { name: "Pop Pink", hex: "#D83076" },
      { name: "ABS Pink", hex: "#F59BBB" },
    ],
  };

  useEffect(() => {
    const handleResize = () => {
      setAvailableHeight(window.innerHeight - 64);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleColorChange = (part, color) => {
    setColors((prev) => ({ ...prev, [part]: color }));
  };

  const handleMouseEnter = (part) => {
    setHoveredPart(part);

    if (buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const screenHeight = window.innerHeight;
      const spaceBelow = screenHeight - buttonRect.bottom;
      const menuHeight = 200;

      if (spaceBelow < menuHeight) {
        setMenuPosition("top");
      } else {
        setMenuPosition("bottom");
      }
    }
  };

  const handleMouseLeave = () => {
    setHoveredPart(null);
    setMenuPosition(null);
  };
  
  const handleOverlayClick = () => {
    setShowInstructions(false); // Hide the instructions overlay
  };

  const hexToColorName = (hex) => {
    for (const category of Object.values(filamentCategories)) {
      const color = category.find((c) => c.hex === hex);
      if (color) return color.name;
    }
    return "Unknown";
  };

  const handleCopy = () => {
    const configText = Object.entries(colors)
      .map(([part, hex]) => `${part}: ${hexToColorName(hex)}`)
      .join("\n");
    navigator.clipboard.writeText(configText);
    alert("Configuration copied to clipboard!");
  };

  return (
    <motion.div
      className="relative flex justify-center items-center overflow-hidden"
      style={{ height: `${availableHeight}px` }}
    >
      {/* Instructions Overlay */}
      <AnimatePresence>
        {showInstructions && (
          <motion.div
            className="absolute z-50 bg-black bg-opacity-75 text-white px-6 py-4 text-2xl rounded-md shadow-lg flex items-center justify-center"
            style={{
              position: "absolute",
              top: "70%",
              width: "fit-content",
              maxWidth: "80%",
              textAlign: "center",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 1.25 } }}
            exit={{
              opacity: 0,
              y: 20, // Slightly adjust the y position during exit for a smoother effect
              transition: { duration: 0.5 },
            }}
            onClick={handleOverlayClick} // Trigger the fade-out on click
          >
            <p>
              Use the left mouse button to orbit the model. <br />
              Use the right mouse button to pan the view. <br />
              Click this box to hide the instructions.
            </p>
          </motion.div>
        )}
      </AnimatePresence>


      <div className="shadow-2xl rounded-3xl h-full w-full flex flex-col">
        {/* Canvas */}
        <Canvas
          className="h-full w-full"
          camera={{
            fov: 10,
            near: 0.1,
            far: 1000,
            position: [0, 2, 5],
          }}
        >
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.3} />
          <Environment preset="warehouse" />
          <Model colors={colors} />
          <OrbitControls />
        </Canvas>

        {/* Color Selection */}
        <div className="flex justify-center py-4">
          {Object.keys(colors).map((part) => (
            <div
              key={part}
              className="relative mr-5 flex items-center space-x-2"
              onMouseEnter={() => handleMouseEnter(part)}
              onMouseLeave={handleMouseLeave}
            >
              <label className="capitalize">{part}:</label>
              <motion.button
                ref={buttonRef}
                className="w-6 h-6 rounded-full border border-gray-300"
                style={{ backgroundColor: colors[part] }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
              <AnimatePresence>
                {hoveredPart === part && menuPosition && (
                  <motion.div
                    className={`absolute bg-white shadow-lg rounded-md p-4 max-h-60 overflow-y-auto z-50 ${
                      menuPosition === "bottom" ? "top-full" : "bottom-full"
                    }`}
                    style={{
                      top: menuPosition === "bottom" ? "100%" : "auto",
                      bottom: menuPosition === "top" ? "100%" : "auto",
                      width: "300px",
                    }}
                  >
                    {Object.keys(filamentCategories).map((category) => (
                      <div key={category} className="mb-4">
                        <h4 className="font-semibold text-lg mb-2">{category}</h4>
                        <div className="grid grid-cols-5 gap-4 justify-items-center items-center">
                          {filamentCategories[category].map((color) => (
                            <motion.div
                              key={color.hex}
                              className="w-8 h-8 rounded-full cursor-pointer border border-gray-300"
                              style={{ backgroundColor: color.hex }}
                              onClick={() => handleColorChange(part, color.hex)}
                              whileHover={{ scale: 1.2 }}
                              whileTap={{ scale: 0.9 }}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Save Configuration Button */}
        <div className="flex justify-center my-4">
          <button
            onClick={() => setShowDialog(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
          >
            Save Configuration
          </button>
        </div>
      </div>

      {/* Dialog Box */}
      <AnimatePresence>
        {showDialog && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg shadow-lg p-6 w-96"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <h2 className="text-xl font-semibold mb-4">Configuration</h2>
              <ul className="mb-4">
                {Object.entries(colors).map(([part, hex]) => (
                  <li key={part} className="mb-2">
                    <strong>{part}:</strong> {hexToColorName(hex)}
                  </li>
                ))}
              </ul>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={handleCopy}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  Copy
                </button>
                <button
                  onClick={() => setShowDialog(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CCustomizer;
