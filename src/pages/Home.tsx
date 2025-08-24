import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  
  const personalStatement = "扎实的专业技能基础，系统掌握化妆技艺核心技法，能精准驾驭不同风格妆容设计与发型造型，注重妆容质感（如层次化通透感、色彩层次感）与发型结构完整性，对肤质适配、脸型修饰等细节把控专业，实践经验覆盖多人次化妆服务场景。";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 z-10 relative">
      {/* Personal statement with animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="max-w-2xl text-center mb-16"
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
        className="absolute bottom-12 flex flex-col items-center cursor-pointer group"
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