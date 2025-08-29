import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

// 作品集展示页面 - 完全重构为专注于作品展示的单一场景

// 相册卡片组件
const AlbumCard = ({ album, onSelect }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group relative rounded-xl overflow-hidden border border-gray-700 hover:border-blue-500 transition-all duration-500 cursor-pointer shadow-lg hover:shadow-blue-900/20 hover:z-10"
      onClick={() => onSelect(album)}
    >
      <div className="aspect-square overflow-hidden">
        <img 
          src={album.coverImage} 
          alt={album.title} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent opacity-80"></div>
        
        {/* 悬浮时显示的装饰元素 */}

        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-blue-500 rounded-full filter blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-1000"></div>
      </div>
      
      <div className="absolute bottom-0 left-0 p-6 w-full">
        <motion.h3 
          initial={{ y: 10, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-white text-xl font-semibold mb-2"
        >
          {album.title}
        </motion.h3>
        
        <motion.p 
          initial={{ y: 10, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-gray-300 mb-4"
        >
          {album.images.length} 个作品
        </motion.p>
        
        <motion.div
          className="transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500"
        >
          <div className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg inline-flex items-center shadow-lg transform group-hover:translate-x-1 transition-transform">
            <span>查看作品</span>
            <i className="fa-solid fa-arrow-right ml-2"></i>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

// 作品图片卡片组件
const PortfolioImageCard = ({ image, onSelect }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="group relative rounded-lg overflow-hidden border border-gray-700 hover:border-blue-500 transition-all duration-500 cursor-pointer"
      onClick={() => onSelect(image)}
    >
      <div className="aspect-square overflow-hidden">
        <img 
          src={image.imageUrl} 
          alt={image.title} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end">
          <div className="p-4 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <h3 className="text-white font-medium text-lg">{image.title}</h3>
            <p className="text-xs text-gray-400 mt-1">{image.albumTitle}</p>
            <div className="mt-1 text-xs text-gray-300 flex items-center">
              <i className="fa-solid fa-search-plus mr-1"></i> 点击查看大图
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// 主作品集页面组件
export default function PortfolioPage() {
  // 状态管理
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [showAlbums, setShowAlbums] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  
  // 作品集数据
  const portfolioAlbums = [
    {
      id: 2,
      title: "哥特风格系列",
      coverImage: "https://lf-code-agent.coze.cn/obj/x-ai-cn/254607720450/attachment/bc3490bfc29977953faf49e975133a87_20250829160256.jpg",
      images: [
        {
          id: 4,
          title: "哥特式优雅妆容",
          imageUrl: "https://lf-code-agent.coze.cn/obj/x-ai-cn/254607720450/attachment/bc3490bfc29977953faf49e975133a87_20250829160256.jpg"
        },
        {
          id: 5,
          title: "暗黑系哥特妆容",
          imageUrl: "https://lf-code-agent.coze.cn/obj/x-ai-cn/254607720450/attachment/43b3bac4c48d82b0390a492ef25244a4_20250829160256.jpg"
        }
      ]
    },
    {
      id: 3,
      title: "复古戏剧系列",
      coverImage: "https://lf-code-agent.coze.cn/obj/x-ai-cn/254607720450/attachment/c9bb0af2d87ea6854499b0514b4d05c6_20250829161620.jpg",
      images: [
        {
          id: 6,
          title: "复古发髻造型",
          imageUrl: "https://lf-code-agent.coze.cn/obj/x-ai-cn/254607720450/attachment/c9bb0af2d87ea6854499b0514b4d05c6_20250829161620.jpg"
        },
        {
          id: 7,
          title: "戏剧风盘发",
          imageUrl: "https://lf-code-agent.coze.cn/obj/x-ai-cn/254607720450/attachment/4b33acdf11b6e2c2d71b1b6d51232c4b_20250829161620.jpg"
        }
      ]
    },
    {
      id: 4,
      title: "婚礼造型系列",
      coverImage: "https://lf-code-agent.coze.cn/obj/x-ai-cn/254607720450/attachment/8d7cef75ff9bfa6c6fb55a358d130c67_20250829161620.jpg",
      images: [
        {
          id: 8,
          title: "浪漫婚纱造型",
          imageUrl: "https://lf-code-agent.coze.cn/obj/x-ai-cn/254607720450/attachment/8d7cef75ff9bfa6c6fb55a358d130c67_20250829161620.jpg"
        }
      ]
    },
    {
      id: 5,
      title: "日常妆容系列",
      coverImage: "https://lf-code-agent.coze.cn/obj/x-ai-cn/254607720450/attachment/61eb0a7c1e9738c3328fa24c7eeac7cc_20250829161621.jpg",
      images: [
        {
          id: 9,
          title: "自然裸妆",
          imageUrl: "https://lf-code-agent.coze.cn/obj/x-ai-cn/254607720450/attachment/61eb0a7c1e9738c3328fa24c7eeac7cc_20250829161621.jpg"
        },
        {
          id: 10,
          title: "日常长发造型",
          imageUrl: "https://lf-code-agent.coze.cn/obj/x-ai-cn/254607720450/attachment/90b3d63eb32f4dc98bc5c43bf2054e11_20250829161621.jpg"
        }
      ]
    },
    {
      id: 6,
      title: "时尚前卫系列",
      coverImage: "https://lf-code-agent.coze.cn/obj/x-ai-cn/254607720450/attachment/7262e6771c0347dc3f537a37843cd83f_20250829161621.jpg",
      images: [
        {
          id: 11,
          title: "黑色西装时尚造型",
          imageUrl: "https://lf-code-agent.coze.cn/obj/x-ai-cn/254607720450/attachment/7262e6771c0347dc3f537a37843cd83f_20250829161621.jpg"
        }
      ]
    },
    {
      id: 7,
      title: "甜美少女系列",
      coverImage: "https://lf-code-agent.coze.cn/obj/x-ai-cn/254607720450/attachment/17616ad47a7ddfbd271d4ea44c2bebe9_20250829161621.jpg",
      images: [
        {
          id: 12,
          title: "粉色系少女妆",
          imageUrl: "https://lf-code-agent.coze.cn/obj/x-ai-cn/254607720450/attachment/17616ad47a7ddfbd271d4ea44c2bebe9_20250829161621.jpg"
        }
      ]
    },
    {
      id: 8,
      title: "优雅成熟系列",
      coverImage: "https://lf-code-agent.coze.cn/obj/x-ai-cn/254607720450/attachment/566785ffb2dddec07e58ab4cf2fba608_20250829161621.jpg",
      images: [
        {
          id: 13,
          title: "优雅波浪卷发",
          imageUrl: "https://lf-code-agent.coze.cn/obj/x-ai-cn/254607720450/attachment/566785ffb2dddec07e58ab4cf2fba608_20250829161621.jpg"
        }
      ]
    },
    {
      id: 9,
      title: "花仙子系列",
      coverImage: "https://lf-code-agent.coze.cn/obj/x-ai-cn/254607720450/attachment/a41015c963420e2fa0e342783c1999b2_20250829161621.jpg",
      images: [
        {
          id: 14,
          title: "花朵装饰造型",
          imageUrl: "https://lf-code-agent.coze.cn/obj/x-ai-cn/254607720450/attachment/a41015c963420e2fa0e342783c1999b2_20250829161621.jpg"
        }
      ]
    },
    {
      id: 10,
      title: "活泼俏皮系列",
      coverImage: "https://lf-code-agent.coze.cn/obj/x-ai-cn/254607720450/attachment/af57c30310cbe658f518c830d45f8793_20250829161621.jpg",
      images: [
        {
          id: 15,
          title: "双马尾卷发",
          imageUrl: "https://lf-code-agent.coze.cn/obj/x-ai-cn/254607720450/attachment/af57c30310cbe658f518c830d45f8793_20250829161621.jpg"
        }
      ]
    }
  ];
  
  // 处理相册点击事件
  const handleAlbumClick = (album) => {
    setSelectedAlbum(album);
    setShowAlbums(false);
    // 滚动到顶部
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // 返回相册列表
  const handleBackToAlbums = () => {
    setSelectedAlbum(null);
    setShowAlbums(true);
    setIsModalOpen(false);
    setSelectedImage(null);
  };
  
  // 处理图片点击事件
  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
    // 防止背景滚动
    document.body.style.overflow = 'hidden';
  };
  
  // 关闭图片模态框
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
    // 恢复背景滚动
    document.body.style.overflow = 'auto';
  };
  
  // 生成所有图片的列表（用于"全部作品"筛选）
  const getAllImages = () => {
    return portfolioAlbums.reduce((allImages, album) => {
      return [...allImages, ...album.images.map(image => ({
        ...image,
        albumTitle: album.title
      }))];
    }, []);
  };

  return (
    <div className="relative z-10 min-h-screen">
      {/* 页面标题区域 */}
      <header className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 to-transparent z-0"></div>
        
        {/* 装饰性几何元素 */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500 rounded-full filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight"
          >
            作品集展示
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto"
          >
            探索我的化妆艺术作品，每一个妆容都是独特故事的视觉表达
          </motion.p>
        </div>
      </header>
      
      {/* 主内容区域 */}
      <main className="container mx-auto px-4 py-12 md:py-20">
        {/* 相册视图 */}
        {showAlbums ? (
          <div className="space-y-12">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-semibold text-white mb-4">作品集系列</h2>
                <p className="text-gray-400 max-w-2xl mx-auto">按风格分类的妆容作品集，点击查看各系列详细内容</p>
             </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {portfolioAlbums.map((album, index) => (
                <AlbumCard 
                  key={album.id} 
                  album={album} 
                  onSelect={handleAlbumClick} 
                  delay={index * 0.1}
                />
              ))}
            </div>
            

          </div>
        ) : (
          // 图片列表视图
          <div className="space-y-8">
            {/* 返回按钮和标题 */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
              <button 
                onClick={handleBackToAlbums}
                className="flex items-center text-blue-400 hover:text-blue-300 transition-colors mb-4 md:mb-0"
              >
                <i className="fa-solid fa-arrow-left mr-2 text-lg"></i>
                <span className="text-lg">返回作品集系列</span>
              </button>
              
              <h2 className="text-3xl font-semibold text-white">
                {selectedAlbum.title}
              </h2>
            </div>
            
            {/* 图片网格 */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {selectedAlbum.images.map((item) => (
                <PortfolioImageCard 
                  key={item.id} 
                  image={item} 
                  onSelect={handleImageClick}
                />
              ))}
            </div>
          </div>
        )}
      </main>
      
      {/* 页脚 */}
      <footer className="py-12 bg-gray-900/60 backdrop-blur-md border-t border-gray-800 mt-24">
        <div className="container mx-auto px-4 text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} 周佳豫 - 化妆师作品集
        </div>
      </footer>
      
      {/* 图片查看模态框 */}
      <AnimatePresence>
        {isModalOpen && selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative max-w-5xl max-h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* 关闭按钮 */}
              <button 
                onClick={closeModal}
                className="absolute -top-16 right-0 text-white text-2xl hover:text-blue-400 transition-colors z-10"
              >
                <i className="fa-solid fa-times"></i>
              </button>
              
              {/* 图片标题 */}
              <h3 className="text-white text-xl font-medium mb-4 text-center">
                {selectedImage.title}
                {selectedImage.albumTitle && (
                  <span className="block text-gray-400 text-sm mt-1">
                    {selectedImage.albumTitle}
                  </span>
                )}
              </h3>
              
              {/* 图片容器 */}
              <div className="relative bg-gray-900 rounded-lg p-1 shadow-2xl">
                <img 
                  src={selectedImage.imageUrl} 
                  alt={selectedImage.title} 
                  className="max-w-full max-h-[80vh] object-contain rounded"
                />
                
                {/* 加载动画（模拟） */}
                <div className="absolute inset-0 bg-gray-900 flex items-center justify-center opacity-0 pointer-events-none">
                  <i className="fa-solid fa-spinner fa-spin text-3xl text-white"></i>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
