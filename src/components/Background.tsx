import { motion } from "framer-motion";

export default function Background() {
  return (
    <div className="fixed inset-0 z-0">
      {/* Starry background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: 'url(https://lf3-static.bytednsdoc.com/obj/eden-cn/0077eh7fd/pngtree-pure-black-starry-minimalist-dreamy-business-background-picture-image_913719.jpg)',
        }}
      />
      
      {/* Semi-transparent black overlay for text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-70"></div>
      
      {/* Animated stars overlay */}
      <div className="absolute inset-0">
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 2 + 0.5,
              height: Math.random() * 2 + 0.5,
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              boxShadow: `0 0 ${Math.random() * 5 + 2}px rgba(255, 255, 255, ${Math.random() * 0.5 + 0.5})`
            }}
            animate={{
              opacity: [Math.random() * 0.5 + 0.2, Math.random() * 0.8 + 0.5, Math.random() * 0.5 + 0.2],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              repeatType: "reverse",
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>
    </div>
  );
}