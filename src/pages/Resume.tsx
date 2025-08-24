import { useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';
import { useRef } from 'react';



// Navigation component
const Navbar = () => {
  const sections = [
    { id: 'about', label: '���˼��' },
    { id: 'skills', label: '����ջ' },
    { id: 'education', label: '��������' },
    { id: 'experience', label: '��������' },
    { id: 'projects', label: '������Ŀ' },
    { id: 'portfolio', label: '��Ʒչʾ' },
    { id: 'interests', label: '��Ȥ����' }
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
  // ���ģ̬��״̬����
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [showAlbums, setShowAlbums] = useState(true);
  
  // ������Ἧ����¼�
  const handleAlbumClick = (album) => {
    setSelectedAlbum(album);
    setShowAlbums(false);
  };
  
  // ������Ἧ�б�
  const handleBackToAlbums = () => {
    setSelectedAlbum(null);
    setShowAlbums(true);
    setIsModalOpen(false);
    setSelectedImage(null);
  };
  
  // ����ͼƬ����¼�
  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
    // ��ֹ��������
    document.body.style.overflow = 'hidden';
  };
  
  // �ر�ģ̬��
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
    // �ָ���������
    document.body.style.overflow = 'auto';
  };
  
  // Personal information data
  
  const personalInfo = {
    name: "�ܼ�ԥ",
    title: "��ױʦ",
    email: "example@example.com",
    phone: "13541313431",
    location: "�Ĵ�ʡ�ɶ��гɻ���",
    statement: "��ʵ��רҵ���ܻ�����ϵͳ���ջ�ױ���պ��ļ������ܾ�׼��Ԧ��ͬ���ױ������뷢�����ͣ�ע��ױ���ʸУ����λ�ͨ͸��\ɫ�ʲ�θУ��뷢�ͽṹ������\�Է�������\�������ε�ϸ�ڰѿ�רҵ\ʵ�����鸲�Ƕ��˴λ�ױ���񳡾�",
    skills: [
      { name: "רҵ��ױ����", level:5 },
      { name: "�������", level:4 },
      { name: "ɫ�ʴ���", level:5 },
      { name: "���ʷ���", level:4 },
      { name: "�ŵ�ױ��", level:4 },
      { name: "�ִ�ʱ��ױ", level:5 },
      { name: "����ױ", level:4 },
      { name: "��Чױ", level:3 }
    ],
    interests: [{"name":"ʱ�г���","icon":"star"},{"name":"�ŵ��Ļ�","icon":"book"},{"name":"��Ӱ","icon":"camera"}],
    education: [{"school":"�����黯ױ��ѵѧУ","major":"��ױ","degree":"רҵ","period":"2025/6/5 - \n2025/9/26"}],
    experience: [
      {
        company: "����ױ�����",
        position: "��ױʦ",
        period: "2025.07 - 2023.08",
        logo: "��",
        description: [
          "��Ի����Ԫ������ɭ��/����/��ƺ��������Ӧ��ױ�ݷ����������Ȼ�����뻷����������",
          "���ĳɹ�������'����-����-����'��ά����ģ�ͣ�ɭ�ֳ�������'�����ױ+ݮ��ϵ'��ɫ��ͨ͸��ױУɫ����ֲ�ﾫ����ױ�������մ��ɫ������������",
          "���߳����ص��Ż���ˮ�����䷽����ˮ��ױ+΢���۱���ױ; ΢��͸�и���˪�ֿ�ǿ������; ����������Ӱ����������Ȼ���Ρ�"
        ] 
      },
      {
        company: "��ڸ��ط�����", 
        position: "��ױʦ",
        period: "2025.07 - 2025.08",
        logo: "��", 
        description: [
          "������ڸ��ط�ϵ��ױ�ݴ��������ִ�У��۽���׼��ѧ��Ϸ����������",
          "����ھ�ŵ�����Ļ��������ִ��������ں��ص㣬��'Ѫɫ����'Ϊ���ĸ����Ʊ�־���ɺ콥�䴽ױȫ���̡�"
        ]
      },
      {
        company: "����ױ�����",
        position: "��ױʦ",
        period: "2025.06 - 2025.07",
        logo: "��",
        description: [
          "�����������ʡ��������⡢���η���ṩ'ױ��+����+��Ʒ'һ�廯���Ʒ���",
          "ǰ����ȹ�ͨ��ͨ��'��ǰ��̸+���շ���'��ά���沿��ϣ�ȷ������С�����ƻ����)",
          "ױ��ϸ�ڰѿأ���ױ����'΢ʪ�۵�+�ᱡ�۷�+�ֲ����'����ͨ͸ԭ����", 
          "ױ��ָ��ϸ�ڣ���ױ����'��������+��������'�ֲ�ǿ�������鶯���У����������ƽ����Σ���β�����ù���ɫ����)"
        ]
      }
    ],
    projects: [
      {
        name: "�����黯ױ��ѵѧУ��Ŀ", 
        type: "��ױ",
        description: "ͳ��Э�������ϻ��Ч�ƽ���ǰ����ȷ���������", 
        technologies: ["��߻�", "��ױ��ѧ", "�������"],
        imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=makeup+artist+workspace+with+cosmetics+and+tools&sign=67219936f710fd5e9e3350b78c006914"
      }
    ],
    portfolioAlbums: [
      {
        id: 1,
        title: "����-ױ��ϵ��",
        coverImage: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=bridal+makeup+elegant+look&sign=51682d943e37120d2e340894ce3c3bd6",
        images: [
          {
            id: 1,
            title: "����ױ�����",
            imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=bridal+makeup+elegant+look&sign=51682d943e37120d2e340894ce3c3bd6"
          },
          {
            id: 2,
            title: "��������ױ��",
            imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=wedding+dinner+makeup+glamorous&sign=f4f84bcaa81a231ce9ce9cd04c0a5ed6"
          }
        ]
      },
      {
        id: 2,
        title: "ʱ�з��ϵ��",
        coverImage: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=fashion+magazine+makeup+editorial&sign=8db5d4410e95c3ccac313f2468eee9b4",
        images: [
          {
            id: 3,
            title: "���ط��ױ��",
            imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=gothic+makeup+dark+romantic&sign=cd93ae6d89b596b839b5d8a967e5e01c"
          },
          {
            id: 4,
            title: "ʱ����־ױ��",
            imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=fashion+magazine+makeup+editorial&sign=8db5d4410e95c3ccac313f2468eee9b4"
          }
        ]
      },
      {
        id: 3,
        title: "�ճ�ױ��ϵ��",
        coverImage: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=natural+everyday+makeup&sign=4c8b226f84dfc65a3e01c1ee6ddbb3b8",
        images: [
          {
            id: 5,
            title: "��Ȼ�ճ�ױ",
            imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=natural+everyday+makeup&sign=4c8b226f84dfc65a3e01c1ee6ddbb3b8"
          },
          {
            id: 6,
            title: "����д��ױ��",
            imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=outdoor+portrait+makeup+natural+light&sign=8955014a9750e98a426bc63dbcb8ca03"
          },
          {
            id: 7,
            title: "��̨��Чױ",
            imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=stage+special+effects+makeup&sign=4be391750779d121bdac26ce7bc5b3c9"
          }
        ]
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
               alt="�ܼ�ԥͷ��" 
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
              <SectionCard title="���˼��">
                <p className="text-gray-300 leading-relaxed">
                  {personalInfo.statement}
                </p>
              </SectionCard>
            </div>
            
            {/* Skills section */}
            <div id="skills">
               <SectionCard title="����ջ">
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={personalInfo.skills}>
                      <PolarGrid stroke="#444" />
                      <PolarAngleAxis 
                        dataKey="name" 
                        tick={{ fill: '#bbb', fontSize: 12 }} 
                        tickLine={false}
                        axisLine={{ stroke: '#555' }}
                      />
                      <PolarRadiusAxis 
                        angle={30} 
                        domain={[0, 5]} 
                        tick={false} 
                        grid={{ stroke: '#555' }}
                        axisLine={false}
                      />
                      <Radar
                        name="����ˮƽ"
                        dataKey="level"
                        stroke="#6366f1"
                        fill="#6366f1"
                        fillOpacity={0.6}
                        animationDuration={1500}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </SectionCard>
            </div>
            
            {/* Interests section */}
            <div id="interests">
              <SectionCard title="��Ȥ����">
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
              <SectionCard title="��������">
                <div className="bg-gray-800/50 rounded-lg p-5 border border-gray-700">
                  <h3 className="text-xl font-semibold text-white mb-1">{personalInfo.education[0].school}</h3>
                  <p className="text-gray-300 mb-1">{personalInfo.education[0].major} ({personalInfo.education[0].degree})</p>
                  <p className="text-gray-400 text-sm">{personalInfo.education[0].period}</p>
                </div>
              </SectionCard>
            </div>
            
            {/* Experience section */}
            <div id="experience">
              <SectionCard title="��������">
                <div className="space-y-4">
                  {personalInfo.experience.map((exp, index) => (
                    <WorkExperience key={index} experience={exp} />
                  ))}
                </div>
              </SectionCard>
            </div>
            
            {/* Projects section */}
            <div id="projects">
              <SectionCard title="������Ŀ">
                <div className="space-y-4">
                   {personalInfo.projects.map((project, index) => (
                    <ProjectCard key={index} project={project} />
                  ))}
                </div>
                    
                     {/* Portfolio with albums */}
                     <div className="mt-8">
                       <div className="flex items-center justify-between mb-6">
                         <h3 className="text-2xl font-semibold text-white">��Ʒչʾ</h3>
                         {!showAlbums && (
                           <button 
                             onClick={handleBackToAlbums}
                             className="flex items-center text-blue-400 hover:text-blue-300 transition-colors"
                           >
                             <i className="fa-solid fa-arrow-left mr-2"></i>
                             <span>������Ἧ</span>
                           </button>
                         )}
                       </div>
                       
                       {/* Album view */}
                       {showAlbums ? (
                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                           {personalInfo.portfolioAlbums.map((album) => (
                             <motion.div
                               key={album.id}
                               initial={{ opacity: 0, y: 20 }}
                               animate={{ opacity: 1, y: 0 }}
                               transition={{ duration: 0.5 }}
                               className="group relative rounded-xl overflow-hidden border border-gray-700 hover:border-blue-500 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-blue-900/20"
                               onClick={() => handleAlbumClick(album)}
                             >
                                 <div className="h-48 w-full overflow-hidden">
                                  <img 
                                    src={album.coverImage} 
                                    alt={album.title} 
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent opacity-80"></div>
                                </div>
                               <div className="absolute bottom-0 left-0 p-6 w-full">
                                 <h4 className="text-2xl font-bold text-white mb-2">{album.title}</h4>
                                 <p className="text-gray-300 mb-4">{album.images.length} ����Ʒ</p>
                                 <div className="transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                   <div className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg inline-flex items-center">
                                     <span>�鿴��Ʒ</span>
                                     <i className="fa-solid fa-arrow-right ml-2"></i>
                                   </div>
                                 </div>
                               </div>
                             </motion.div>
                           ))}
                         </div>
                       ) : (
                         // Images view for selected album
                         <div>
                           <h4 className="text-xl font-semibold text-gray-300 mb-4">{selectedAlbum.title}</h4>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                             {selectedAlbum.images.map((item) => (
                               <div 
                                 key={item.id} 
                                 className="group relative rounded-lg overflow-hidden border border-gray-700 hover:border-blue-500 transition-all duration-300 cursor-pointer"
                                 onClick={() => handleImageClick(item)}
                               >
                                 <img 
                                   src={item.imageUrl} 
                                   alt={item.title} 
                                     className="w-full h-24 object-cover transform group-hover:scale-110 transition-transform duration-500"
                                 />
                                 <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                                   <div className="p-4 w-full">
                                     <h3 className="text-white font-medium">{item.title}</h3>
                                     <div className="mt-1 text-xs text-gray-300 flex items-center">
                                       <i className="fa-solid fa-search-plus mr-1"></i> ����鿴��ͼ
                                     </div>
                                   </div>
                                 </div>
                               </div>
                             ))}
                           </div>
                         </div>
                       )}
                     </div>
                     
                     {/* Image modal */}
                     <AnimatePresence>
                       {isModalOpen && selectedImage && (
                         <motion.div
                           initial={{ opacity: 0 }}
                           animate={{ opacity: 1 }}
                           exit={{ opacity: 0 }}
                           className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4"
                           onClick={closeModal}
                         >
                           <motion.div
                             initial={{ scale: 0.9, opacity: 0 }}
                             animate={{ scale: 1, opacity: 1 }}
                             exit={{ scale: 0.9, opacity: 0 }}
                             transition={{ type: "spring", stiffness: 300, damping: 30 }}
                             className="relative max-w-4xl max-h-[90vh]"
                             onClick={(e) => e.stopPropagation()}
                           >
                             <button 
                               onClick={closeModal}
                               className="absolute -top-12 right-0 text-white text-2xl hover:text-blue-400 transition-colors"
                             >
                               <i className="fa-solid fa-times"></i>
                             </button>
                             <h3 className="text-white text-xl font-medium mb-2 text-center">{selectedImage.title}</h3>
                             <img 
                               src={selectedImage.imageUrl} 
                               alt={selectedImage.title} 
                               className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
                             />
                           </motion.div>
                         </motion.div>
                       )}
                     </AnimatePresence>
              </SectionCard>
             </div>
          </div>

        </div>
      </main>
      
      {/* Footer */}
      <footer className="py-8 bg-gray-900/60 backdrop-blur-md border-t border-gray-800 mt-16">
        <div className="container mx-auto px-4 text-center text-gray-400 text-sm">? {new Date().getFullYear()} {personalInfo.name} - ǰ�˿�������ʦ����</div>
      </footer>
    </div>
  );
}