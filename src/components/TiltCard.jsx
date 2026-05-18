import React, { useRef, useState } from 'react';
import { motion, useSpring, useTransform, useMotionTemplate } from 'framer-motion';

export default function TiltCard({ children, className = "" }) {
  const ref = useRef(null);
  
  const [hover, setHover] = useState(false);
  const x = useSpring(0, { stiffness: 300, damping: 30 });
  const y = useSpring(0, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(y, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-10, 10]);
  const brightness = useTransform(y, [-0.5, 0.5], [1.2, 0.8]);
  const filter = useMotionTemplate`brightness(${brightness})`;

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setHover(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        filter: hover ? filter : "brightness(1)"
      }}
      className={`relative perspective-1000 ${className}`}
    >
      {children}
    </motion.div>
  );
}
