import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// 404页面组件 - 当路由未匹配时显示
export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 z-10 relative">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        <div className="text-6xl font-bold text-white mb-4">404</div>
        <h1 className="text-2xl font-semibold text-gray-200 mb-6">页面未找到</h1>
        <p className="text-gray-400 mb-8">
          抱歉，您访问的页面不存在或已被移动。
        </p>
        <Link
          to="/"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-300"
        >
          返回首页
        </Link>
      </motion.div>
    </div>
  );
}