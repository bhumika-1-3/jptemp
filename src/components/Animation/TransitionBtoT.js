// Bottom to top animation (small)

import { motion } from "framer-motion"

const TransitionBtoT = ({ children }) => {
	// Framer motion varinats
	const inViewAnimation = {
		start: {
			y: "10px",
			opacity: 0,
		},
		end: {
			y: "0",
			opacity: 1,
		},
	}

	return (
		<motion.div
			variants={inViewAnimation}
			initial="start"
			whileInView="end"
			transition={{ duration: 0.5 }}
		>
			{children}
		</motion.div>
	)
}

export default TransitionBtoT
