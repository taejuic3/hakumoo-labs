// Model.jsx
import React, { memo } from "react";
import { useGLTF } from "@react-three/drei";

const Model = memo(({ colors }) => {
  const { nodes, materials } = useGLTF("/hakumoo-labs/haku1.glb");

  // Dynamically set material colors
  if (materials?.frameMaterial) {
    materials.frameMaterial.color.set(colors.frame);
  }
  if (materials?.baseMaterial) {
    materials.baseMaterial.color.set(colors.base);
  }
  if (materials?.sliderMaterial) {
    materials.sliderMaterial.color.set(colors.slider);
  }
  if (materials?.templeMaterial) {
    materials.templeMaterial.color.set(colors.temple);
  }

  return <primitive object={nodes.Scene} />;
});

export default Model;
