import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  
  const personalStatement = "专业化妆师 | 精准驾驭多元风格妆容设计与发型造型";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 z-10 relative">
      {/* Animated planets */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Orbit 1 - Small planet */}
        <motion.div
          className="absolute w-[150px] h-[150px] top-[10%] left-[15%]"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear"
          }}
        >
          <motion.div
            className="absolute w-[20px] h-[20px] rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 shadow-lg shadow-blue-500/30"
            style={{ top: 0, left: "50%", transform: "translateX(-50%)" }}
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        </motion.div>
        
        {/* Orbit 2 - Medium planet with moon */}
        <motion.div
          className="absolute w-[250px] h-[250px] bottom-[20%] right-[10%]"
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear"
          }}
        >
          <div className="absolute w-[35px] h-[35px] rounded-full bg-gradient-to-r from-purple-400 to-pink-500 shadow-lg shadow-purple-500/30"
            style={{ top: 0, left: "50%", transform: "translateX(-50%)" }}>
            {/* Moon */}
            <motion.div
              className="absolute w-[8px] h-[8px] rounded-full bg-gray-300 shadow-lg"
              style={{ top: "-10px", left: "50%", transform: "translateX(-50%)" }}
              animate={{
                rotate: 720,
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                repeatType: "loop",
                ease: "linear"
              }}
              transformOrigin="center 25px"
            />
          </div>
        </motion.div>
        
        {/* Orbit 3 - Large planet */}
        <motion.div
          className="absolute w-[350px] h-[350px] top-[25%] right-[20%]"
          animate={{
            rotate: 360 ,
          }}
          transition={{ 
            duration: 40 ,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear" 
          }}
        >
          <motion.div
            className="absolute w-[45px] h-[45px] rounded-full bg-gradient-to-r from-teal-400 to-cyan-500 shadow-lg shadow-teal-500/30"
            style={{ top: 0, left: "50%", transform: "translateX(-50%)" }} 
            animate={{
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        </motion.div>
      </div> 
      
      {/* Personal statement with animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="max-w-2xl text-center mb-16 relative z-10"
      >
        <p className="text-[clamp(1.5rem,5vw,2.5rem)] font-light text-gray-100 leading-relaxed"> 
          {personalStatement}
        </p>
      </motion.div>
      
      {/* Enter button with animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
        className="absolute bottom-12 flex flex-col items-center cursor-pointer group relative z-10"
        onClick={() => navigate('/resume')}
      >
        <span className="text-gray-200 mb-2 text-lg font-medium">进入简历</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-gray-200"
        >
          <i class="fa-solid fa-chevron-down text-xl"></i>
        </motion.div>
      </motion.div>
    </div>
  );
}