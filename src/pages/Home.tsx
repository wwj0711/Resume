import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Home() {
  const navigate = useNavigate();
  const [displayedText, setDisplayedText] = useState("");
  
  const personalStatement = "专业化妆师 | 精准驾驭多元风格妆容设计与发型造型";
  const [isHovered, setIsHovered] = useState(false);

  // 打字动画效果
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText(personalStatement.substring(0, index + 1));
      index++;
      if (index === personalStatement.length) {
        clearInterval(interval);
      }
    }, 100);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 z-10 relative overflow-hidden">
      {/* 背景效果 */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900/30 to-gray-900 z-0">
        {/* 背景纹理 */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMDIwMjAiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0Yy0xLjEuMS0uOS4yLTEuOS4xQzM0LjEgMzQuMiAzNC4xIDMzLjQgMzQgMzMuNHMtLjEtMS4xIDEtMS45QzM1LjEgMzEuNCAzNS45IDMxLjUgMzYgMzEuNXMxLjEgLjkgMS45IDEuOWMtLjEgMS0uOSAxLjktMS45IDEuOXptLTcgMTFjLTEuMS4xLTEuOS0uOC0xLjktMS45czAuOC0xLjkgMS45LTEuOWMxLjEgMCAxLjkgMC44IDEuOSAxLjlzLTAuOCAxLjktMS45IDEuOXptMTQgMGMyLjIgMCA0LDEuOCA0IDRzLTEuOCA0LTQgNHMtNC0xLjgtNC00IDEuOC00IDQtNHptMTQtMTdjMS4xIDAgMi4xLjQgMi45IDEuMkMzNy45IDIuNCAzOC45IDIgNDAgMnMyLjEgLjQgMi45IDEuMkM0NC45IDQuNCA0NSAzLjQgNDUgMi4zcy0uOS0yLjEtMi45LTIuMWMtMS4xIDAtMi4xLjQtMi45IDEuMnMtLjkgMi4xIDEuOSAyLjF6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>
      </div>
      
      {/* 装饰性网格线条 */}
      <div className="absolute inset-0 z-0">
        <div className="h-full w-full" style={{
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>
      
      {/* 动画行星 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* 轨道1 - 小行星 */}
        <motion.div
          className="absolute w-[180px] h-[180px] top-[15%] left-[10%]"
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, repeatType: "loop", ease: "linear" }}
        >
          <motion.div
            className="absolute w-[22px] h-[22px] rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 shadow-lg shadow-blue-500/30"
            style={{ top: 0, left: "50%", transform: "translateX(-50%)" }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
          />
        </motion.div>
        
        {/* 轨道2 - 带卫星的中行星 */}
        <motion.div
          className="absolute w-[300px] h-[300px] bottom-[15%] right-[8%]"
          animate={{ rotate: -360 }}
          transition={{ duration: 35, repeat: Infinity, repeatType: "loop", ease: "linear" }}
        >
          <div 
            className="absolute w-[38px] h-[38px] rounded-full bg-gradient-to-r from-pink-400 to-rose-500 shadow-lg shadow-pink-500/30"
            style={{ top: 0, left: "50%", transform: "translateX(-50%)" }}
          >
            {/* 卫星 */}
            <motion.div
              className="absolute w-[9px] h-[9px] rounded-full bg-gray-300 shadow-lg"
              style={{ top: "-12px", left: "50%", transform: "translateX(-50%)" }}
              animate={{ rotate: 720 }}
              transition={{ duration: 6, repeat: Infinity, repeatType: "loop", ease: "linear" }}
              transformOrigin="center 26px"
            />
          </div>
        </motion.div>
        
        {/* 轨道3 - 大行星 */}
        <motion.div
          className="absolute w-[400px] h-[400px] top-[20%] right-[15%]"
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, repeatType: "loop", ease: "linear" }}
        >
          <motion.div
            className="absolute w-[48px] h-[48px] rounded-full bg-gradient-to-r from-teal-400 to-cyan-500 shadow-lg shadow-teal-500/30"
            style={{ top: 0, left: "50%", transform: "translateX(-50%)" }} 
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
          />
        </motion.div>
        
        {/* 装饰性圆环 */}
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full border border-white/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, repeatType: "loop", ease: "linear" }}
        />
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full border border-white/5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          animate={{ rotate: -360 }}
          transition={{ duration: 180, repeat: Infinity, repeatType: "loop", ease: "linear" }}
        />
      </div> 
      
      {/* 带有动画的个人陈述 */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="max-w-2xl text-center mb-20 relative z-10"
      >
        <h1 className="text-[clamp(2rem,6vw,3.5rem)] font-light text-white mb-6 tracking-tight">
         
        </h1>
        <p className="text-[clamp(1.5rem,5vw,2.5rem)] font-light text-gray-100 leading-relaxed"> 
          {displayedText}<span className="animate-pulse">|</span>
        </p>
        
        {/* 装饰线条 */}
        <div className="flex items-center justify-center mt-8 gap-4">
          <div className="h-[1px] w-20 bg-gradient-to-r from-transparent to-pink-400"></div>
          <div className="h-[1px] w-20 bg-gradient-to-l from-transparent to-pink-400"></div>
        </div>
      </motion.div>
      
      {/* 带有动画的进入按钮 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
        className="absolute bottom-16 flex flex-col items-center cursor-pointer group relative z-10"
        onClick={() => navigate('/resume')}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.span 
          className="text-gray-100 mb-3 text-lg font-medium tracking-wide"
          style={{
            textShadow: isHovered ? '0 0 10px rgba(255, 255, 255, 0.8)' : 'none',
          }}
          transition={{ duration: 0.3 }}
        >
          进入简历
        </motion.span>
        
        <motion.div
          className="w-12 h-12 rounded-full border border-gray-400/50 flex items-center justify-center"
          animate={{ 
            y: isHovered ? [0, 10, 0] : [0, 10, 0],
            scale: isHovered ? 1.1 : 1,
            boxShadow: isHovered ? '0 0 15px rgba(255, 255, 255, 0.3)' : 'none',
            borderColor: isHovered ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.3)'
          }}
          transition={{ 
            repeat: Infinity, 
            duration: isHovered ? 1 : 1.5,
            ease: "easeInOut"
          }}
        >
          <i className="fa-solid fa-chevron-down text-gray-200"></i>
        </motion.div>
      </motion.div>
    </div>
  );
}
