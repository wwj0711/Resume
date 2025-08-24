import { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

// Personal information
const personalInfo = {
  name: "王明",
  title: "前端开发工程师",
  contact: {
    phone: "138****5678",
    email: "wangming@example.com",
    github: "github.com/wangming",
    linkedin: "linkedin.com/in/wangming"
  },
  statement: "我是一名对技术充满热情的初级前端开发工程师，拥有两年的Web开发经验，专注于使用React和Vue构建用户友好的交互式界面。我热衷于将设计师的创意精准地转化为高性能的网页应用，并不断学习前沿技术以提升自己。我是一个积极主动的问题解决者，期待能加入一个富有挑战和创造力的团队。",
  skills: [
    { name: "JavaScript", level: 5 },
    { name: "TypeScript", level: 4 },
    { name: "React", level: 4 },
    { name: "Vue", level: 3 },
    { name: "HTML5", level: 5 },
    { name: "CSS3", level: 5 },
    { name: "Sass", level: 4 },
    { name: "ECharts", level: 3 },
    { name: "Git", level: 5 },
    { name: "Figma", level: 3 }
  ],
  interests: [
    { name: "摄影", icon: "camera" },
    { name: "篮球", icon: "basketball-ball" },
    { name: "阅读科幻小说", icon: "book" }
  ],
  education: [
    {
      school: "上海交通大学",
      major: "计算机科学与技术",
      degree: "本科",
      period: "2018.09 - 2022.06"
    }
  ],
  experience: [
    {
      id: 1,
      company: "字节跳动",
      position: "前端开发工程师",
      period: "2022.07 - 至今",
      description: [
        "负责公司内部数据可视化平台的前端开发与维护，使用React和ECharts。",
        "通过代码重构和性能优化，将关键页面的加载速度提升了30%。",
        "与产品经理和设计师紧密合作，快速迭代了超过10个版本的功能。"
      ],
      logo: "BJ"
    },
    {
      id: 2,
      company: "腾讯科技",
      position: "前端开发实习生",
      period: "2021.07 - 2021.12",
      description: [
        "协助开发微信小程序“城市服务”模块，主要负责UI组件的编写和API对接。",
        "参与了代码审查（Code Review），学习并遵循了团队的编码规范。"
      ],
      logo: "TX"
    }
  ],
  projects: [
    {
      id: 1,
      name: "个人博客系统",
      type: "独立项目",
      description: "一个基于Vue.js和Nuxt.js构建的静态博客网站，实现了文章发布、标签分类、Markdown实时渲染和响应式布局。通过这个项目，我深入学习了服务端渲染（SSR）和SEO优化技术。",
      technologies: ["Vue.js", "Nuxt.js", "Markdown", "SSR", "SEO"],
      imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=personal%20blog%20website%20screenshot%20dark%20theme&sign=64d4573859480a39b0c9eb896799eb9e"
    }
  ]
};

// Navigation component
const Navbar = () => {
  const sections = [
    { id: 'about', label: '个人简介' },
    { id: 'skills', label: '技能栈' },
    { id: 'education', label: '教育背景' },
    { id: 'experience', label: '工作经历' },
    { id: 'projects', label: '个人项目' },
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
        <i class="fa-solid fa-star text-yellow-400 mr-2"></i>
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
        <span className="text-gray-400 text-sm">{skill.level}星</span>
      </div>
      <div className="w-full bg-gray-800 rounded-full h-2">
        <motion.div
          initial={{ width: 0 }}
          animate={animate ? { width: `${skill.level * 20}%` } : {}}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="bg-gradient-to-r from-blue-400 to-purple-500 h-2 rounded-full"
        />
        <div className="flex justify-between mt-1">
          {[...Array(5)].map((_, i) => (
            <i 
              key={i} 
              className={`fa-solid fa-star text-xs ${i < skill.level ? 'text-yellow-400' : 'text-gray-700'}`}
            ></i>
          ))}
        </div>
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
          <i class={`fa-solid ${expanded ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
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
              <i class="fa-solid fa-angle-right text-blue-400 mt-1 mr-2"></i>
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
  return (
    <div className="relative z-10 min-h-screen">
      {/* Header with name and title */}
      <header className="py-16 bg-gray-900/60 backdrop-blur-md border-b border-gray-800">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-white mb-2"
          >
            {personalInfo.name}
          </motion.h1>
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
            className="flex justify-center flex-wrap gap-4 md:gap-8 mt-6 text-gray-400 text-sm"
          >
            <div className="flex items-center">
              <i class="fa-solid fa-phone mr-2 text-blue-400"></i>
              <span>{personalInfo.contact.phone}</span>
            </div>
            
            <div className="flex items-center">
              <i class="fa-solid fa-envelope mr-2 text-blue-400"></i>
              <span>{personalInfo.contact.email}</span>
            </div>
            
            <div className="flex items-center">
              <i class="fa-brands fa-github mr-2 text-blue-400"></i>
              <span>{personalInfo.contact.github}</span>
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
                        <i class={`fa-solid fa-${interest.icon}`}></i>
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
        </div>
      </main>
      
      {/* Footer */}
      <footer className="py-8 bg-gray-900/60 backdrop-blur-md border-t border-gray-800 mt-16">
        <div className="container mx-auto px-4 text-center text-gray-400 text-sm">© {new Date().getFullYear()} {personalInfo.name} - 前端开发工程师简历</div>
      </footer>
    </div>
  );
}