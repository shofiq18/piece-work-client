import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from "framer-motion";

const Reveal = ({ children }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { threshold: 0.5 }); 
    const mainControls = useAnimation();

    useEffect(() => {
        if (isInView) {
            mainControls.start("visible"); 
        }
    }, [isInView, mainControls]);

    return (
        <div ref={ref} className="relative overflow-hidden">
            <motion.div
                variants={{
                    hidden: { opacity: 0, y: 75 },
                    visible: { opacity: 1, y: 0 },
                }}
                initial="hidden"
                animate={mainControls}
                transition={{ duration: 1, ease: "easeOut" }}
            >
                {children}
            </motion.div>
        </div>
    );
};

export default Reveal;
