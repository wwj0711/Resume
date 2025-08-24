import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  
  const personalStatement = "我是一名对技术充满热情的初级前端开发工程师，拥有两年的Web开发经验，专注于使用React和Vue构建用户友好的交互式界面。我热衷于将设计师的创意精准地转化为高性能的网页应用，并不断学习前沿技术以提升自己。我是一个积极主动的问题解决者，期待能加入一个富有挑战和创造力的团队。";

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