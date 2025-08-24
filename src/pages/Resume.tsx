import { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';



// Navigation component
const Navbar = () => {
  const sections = [
    { id: 'about', label: '个人简介' },
    { id: 'skills', label: '技能栈' },
    { id: 'education', label: '教育背景' },
    { id: 'experience', label: '工作经历' },
    { id: 'projects', label: '个人项目' },
    { id: 'portfolio', label: '作品展示' },
    { id: 'interests', label: '兴趣爱好' }
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className="sticky top-0 bg-gray-900/70 backdrop-blur-md z-50 border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex justify-center py-4">
          <ul className="flex space-x-6 md:space-x-10 text-sm md:text-base">
            {sections.map((section) => (
              <li key={section.id}>
                <button
                  onClick={() => scrollToSection(section.id)}
                  className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center"
                >
                  <span>{section.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

// Section card component
const SectionCard = ({ title, children }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="mb-8 bg-gray-900/60 backdrop-blur-sm rounded-xl p-6 border border-gray-800 shadow-lg"
    >
      <h2 className="text-2xl font-bold text-white mb-4 pb-2 border-b border-gray-700 flex items-center">
        {title}
      </h2>
      {children}
    </motion.div>
  );
};

// Skill rating component
const SkillRating = ({ skill }) => {
  const [animate, setAnimate] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setAnimate(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

    return (
      <div ref={ref} className="mb-4">
        <div className="flex justify-between mb-1">
          <span className="text-gray-300">{skill.name}</span>
        </div>
        <div className="w-full bg-gray-800 rounded-full h-2">
          <motion.div
            initial={{ width: 0 }}
            animate={animate ? { width: `${skill.level * 20}%` } : {}}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="bg-gradient-to-r from-blue-400 to-purple-500 h-2 rounded-full"
          />
        </div>
    </div>
  );
};

// Work experience component
const WorkExperience = ({ experience }) => {
  const [expanded, setExpanded] = useState(true);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
       animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="mb-6 bg-gray-800/50 rounded-lg p-5 border border-gray-700 hover:border-gray-600 transition-colors duration-300"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start">
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg w-12 h-12 flex items-center justify-center text-white font-bold text-xl mr-4 flex-shrink-0">
            {experience.logo}
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">{experience.company}</h3>
            <p className="text-gray-300">{experience.position}</p>
            <p className="text-gray-400 text-sm">{experience.period}</p>
          </div>
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <i className={`fa-solid ${expanded ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
        </button>
      </div>
      
      <motion.div
        initial={{ maxHeight: 0, opacity: 0 }}
        animate={expanded ? { maxHeight: 500, opacity: 1 } : { maxHeight: 0, opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="mt-4 pl-16 overflow-hidden"
      >
        <ul className="space-y-2 text-gray-300">
          {experience.description.map((item, index) => (
            <li key={index} className="flex items-start">
              <i className="fa-solid fa-angle-right text-blue-400 mt-1 mr-2"></i>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
};

// Project card component
const ProjectCard = ({ project }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="bg-gray-800/50 rounded-lg overflow-hidden border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:shadow-lg hover:shadow-blue-900/10"
    >
      <div className="relative">
        <img 
          src={project.imageUrl} 
          alt={project.name} 
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70"></div>
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-white">{project.name}</h3>
          <span className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full">{project.type}</span>
        </div>
        <p className="text-gray-300 mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech, index) => (
            <span 
              key={index} 
              className="bg-gray-700/70 text-gray-200 text-xs px-3 py-1 rounded-full hover:bg-gray-600 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// Main Resume component
export default function Resume() {
  // Personal information data
  const personalInfo = {
    name: "周佳豫",
    title: "化妆师",
    email: "example@example.com",
    phone: "13541313431",
    location: "四川省成都市成华区",
    statement: "扎实的专业技能基础，系统掌握化妆技艺核心技法，能精准驾驭不同风格妆容设计与发型造型，注重妆容质感（如层次化通透感、色彩层次感）与发型结构完整性，对肤质适配、脸型修饰等细节把控专业，实践经验覆盖多人次化妆服务场景。",
    skills: [
      { name: "专业化妆技法", level: 5 },
      { name: "发型设计", level: 4 },
      { name: "色彩搭配", level: 5 },
      { name: "肤质分析", level: 4 },
      { name: "古典妆容", level: 4 },
      { name: "现代时尚妆", level: 5 },
      { name: "新娘妆", level: 4 },
      { name: "特效妆", level: 3 }
    ],
    interests: [
      { name: "时尚潮流", icon: "star" },
      { name: "古典文化", icon: "book" },
      { name: "摄影", icon: "camera" }
    ],
    education: [
      {
        school: "黑珍珠化妆培训学校",
        major: "美妆",
        degree: "专业",
        period: "2025/6/5 - 2025/9/26"
      }
    ],
    experience: [
      {
        company: "户外妆容设计",
        position: "化妆师",
        period: "2025.07 - 2023.08",
        logo: "户",
        description: [
          "针对户外多元场景（森林/海岛/草坪）开发适应性妆容方案，解决自然光线与环境干扰问题",
          "核心成果：建立'场景-光线-肤质'三维适配模型：森林场景采用'雾面底妆+莓果系'配色，通透持妆校色叠加植物精油锁妆术，吸收大地色渐变打造立体感",
          "海边场景重点优化防水抗汗配方，用水防妆+微珠光粉饼定妆; 微光透感隔离霜抵抗强紫外线; 海浪蓝调眼影渐变塑造自然红晕。"
        ] 
      },
      {
        company: "红黑哥特风格设计", 
        position: "化妆师",
        period: "2025.07 - 2025.08",
        logo: "红", 
        description: [
          "主导红黑哥特风系列妆容创意设计与执行，聚焦精准美学与戏剧张力表达",
          "深度挖掘古典哥特文化符号与现代潮流新融合特点，以'血色浪漫'为核心概念，设计标志性猩红渐变唇妆全过程。"
        ]
      },
      {
        company: "新娘妆容设计",
        position: "化妆师",
        period: "2025.06 - 2025.07",
        logo: "新",
        description: [
          "基于新娘气质、婚礼主题、服饰风格提供'妆容+发型+饰品'一体化定制方案",
          "前期深度沟通：通过'婚前访谈+素颜分析'多维度面部诊断（确立立体感、饱满苹果肌)",
          "妆容细节把控：底妆采用'微湿粉底+轻薄蜜粉+局部遮瑕'打造通透原生感", 
          "妆面指定细节：眼妆采用'深邃眼眸+飞扬眼线'局部强调打造灵动美感，根据礼服设计渐变层次（眼尾泡眼用光大地色消肿)"
        ]
      }
    ],
    projects: [
      {
        name: "黑珍珠化妆培训学校项目", 
        type: "美妆",
        description: "统筹协调：保障活动高效推进，前期明确活动核心需求", 
        technologies: ["活动策划", "化妆教学", "造型设计"],
        imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=makeup+artist+workspace+with+cosmetics+and+tools&sign=67219936f710fd5e9e3350b78c006914"
      }
     ],
    portfolio: [
      {
        id: 1,
        title: "新娘妆容设计",
        imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=bridal+makeup+elegant+look&sign=51682d943e37120d2e340894ce3c3bd6"
      },
      {
        id: 2,
        title: "哥特风格妆容",
        imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=gothic+makeup+dark+romantic&sign=cd93ae6d89b596b839b5d8a967e5e01c"
      },
      {
        id: 3,
        title: "自然日常妆",
        imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=natural+everyday+makeup&sign=4c8b226f84dfc65a3e01c1ee6ddbb3b8"
      },
      {
        id: 4,
        title: "舞台特效妆",
        imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=stage+special+effects+makeup&sign=4be391750779d121bdac26ce7bc5b3c9"
      },
      {
        id: 5,
        title: "时尚杂志妆容",
        imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=fashion+magazine+makeup+editorial&sign=8db5d4410e95c3ccac313f2468eee9b4"
      },
      {
        id: 6,
        title: "户外写真妆容",
        imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=outdoor+portrait+makeup+natural+light&sign=8955014a9750e98a426bc63dbcb8ca03"
      }
    ]
  };
  return (
    <div className="relative z-10 min-h-screen">
      {/* Header with name and title */}
      <header className="py-16 bg-gray-900/60 backdrop-blur-md border-b border-gray-800">
        <div className="container mx-auto px-4 text-center">
           <div className="flex items-center justify-center gap-4">
             <img 
               src="https://lf-code-agent.coze.cn/obj/x-ai-cn/254607720450/attachment/1756025753_hd_20250824220457.png" 
               alt="周佳豫头像" 
               className="w-20 h-20 rounded-full border-2 border-blue-500 shadow-lg object-cover"
             />
             <motion.h1
               initial={{ opacity: 0, y: -20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8 }}
               className="text-4xl md:text-5xl font-bold text-white mb-2"
             >
               {personalInfo.name}
             </motion.h1>
           </div>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-300"
          >
            {personalInfo.title}
          </motion.p>
          
          {/* Contact information */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-6 flex flex-wrap justify-center gap-4 md:gap-8 text-gray-400"
          >
            <div className="flex items-center">
              <i className="fa-solid fa-envelope text-blue-400 mr-2"></i>
              <span>{personalInfo.email}</span>
            </div>
            <div className="flex items-center">
              <i className="fa-solid fa-phone text-blue-400 mr-2"></i>
              <span>{personalInfo.phone}</span>
            </div>
            <div className="flex items-center">
              <i className="fa-solid fa-map-marker-alt text-blue-400 mr-2"></i>
              <span>{personalInfo.location}</span>
            </div>
          </motion.div>
        </div>
      </header>
      
      {/* Navigation */}
      <Navbar />
      
      {/* Main content */}
      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column */}
          <div className="lg:col-span-1 space-y-8">
            {/* About section */}
            <div id="about">
              <SectionCard title="个人简介">
                <p className="text-gray-300 leading-relaxed">
                  {personalInfo.statement}
                </p>
              </SectionCard>
            </div>
            
            {/* Skills section */}
            <div id="skills">
              <SectionCard title="技能栈">
                <div className="space-y-1">
                  {personalInfo.skills.map((skill, index) => (
                    <SkillRating key={index} skill={skill} />
                  ))}
                </div>
              </SectionCard>
            </div>
            
            {/* Interests section */}
            <div id="interests">
              <SectionCard title="兴趣爱好">
                <div className="grid grid-cols-1 gap-4">
                  {personalInfo.interests.map((interest, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center mr-3 text-blue-400">
                        <i className={`fa-solid fa-${interest.icon}`}></i>
                      </div>
                      <span className="text-gray-300">{interest.name}</span>
                    </div>
                  ))}
                </div>
              </SectionCard>
            </div>
          </div>
          
          {/* Right column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Education section */}
            <div id="education">
              <SectionCard title="教育背景">
                <div className="bg-gray-800/50 rounded-lg p-5 border border-gray-700">
                  <h3 className="text-xl font-semibold text-white mb-1">{personalInfo.education[0].school}</h3>
                  <p className="text-gray-300 mb-1">{personalInfo.education[0].major} ({personalInfo.education[0].degree})</p>
                  <p className="text-gray-400 text-sm">{personalInfo.education[0].period}</p>
                </div>
              </SectionCard>
            </div>
            
            {/* Experience section */}
            <div id="experience">
              <SectionCard title="工作经历">
                <div className="space-y-4">
                  {personalInfo.experience.map((exp, index) => (
                    <WorkExperience key={index} experience={exp} />
                  ))}
                </div>
              </SectionCard>
            </div>
            
            {/* Projects section */}
            <div id="projects">
              <SectionCard title="个人项目">
                <div className="space-y-4">
                  {personalInfo.projects.map((project, index) => (
                    <ProjectCard key={index} project={project} />
                  ))}
                </div>
              </SectionCard>
             </div>
          </div>
          
          {/* Portfolio section */}
          <div id="portfolio">
            <SectionCard title="作品展示">
              {/* PortfolioGallery component not defined, so removing this line */}
            </SectionCard>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="py-8 bg-gray-900/60 backdrop-blur-md border-t border-gray-800 mt-16">
        <div className="container mx-auto px-4 text-center text-gray-400 text-sm">© {new Date().getFullYear()} {personalInfo.name} - 简历</div>
      </footer>
    </div>
  );
}