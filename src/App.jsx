import React from 'react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import emailjs from 'emailjs-com';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const projects = [

    {
      title: "Terrazas del Lago TakeAway",
      description: "Fullstack food delivery platform with admin dashboard, product management and WhatsApp integration.",
      tech: ["Node.js", "React", "PostgreSQL", "JWT", "Tailwind"],
      image: "/terrazas.png"
    },

    {
      title: "Landing Page - Automotriz Cancilliere",
      description: "Elegant and minimalistic landing page for a premium car dealership inspired by BMW’s design.",
      tech: ["React", "Tailwind", "Framer Motion"],
      image: "/image.png"
    },

    {
      title: "Landing Page - PowerFit Gym",
      description: "Modern landing page with video background, scroll animations, pricing and contact section.",
      tech: ["React", "Tailwind", "Framer Motion"],
      image: "/1212.png"
    },
    {
      title: "Landing Page - Chronosphere Watches",
      description: "Luxury brand landing with bold typography, clean layout and CTA buttons.",
      tech: ["React", "Tailwind"],
      image: "/asaa.png"
    },
    {
      title: "Landing Page - Ilia Topuria",
      description: "Fan landing page with section transitions, highlights, news and next fight countdown.",
      tech: ["React", "Tailwind", "Framer Motion"],
      image: "/lolito.png"
    },
    {
      title: "CloudDelivery",
      description: "Online ordering system with persistent cart, guest checkout and admin panel.",
      tech: ["Node.js", "React", "PostgreSQL", "Express", "JWT"],
      image: "/Cloud.jpeg"
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  const minSwipeDistance = 50;

  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      'service_4cl0lka',
      'template_ffj8fja',
      e.target,
      '0WvB7L0hty3f2xlTZ'
    ).then((result) => {
      console.log(result.text);
      toast.success('Mensaje enviado correctamente');
    })
      .catch((error) => {
        console.log(error.text);
        toast.error('Error al enviar el mensaje');
      });

    e.target.reset(); // Limpia el formulario
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextProject();
    } else if (isRightSwipe) {
      prevProject();
    }
  };

  const nextProject = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === projects.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevProject = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? projects.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        nextProject();
      } else if (e.key === 'ArrowLeft') {
        prevProject();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);


  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b0f19] via-[#0e172b] to-[#111827] text-gray-100 font-sans antialiased">
      <div className="container mx-auto px-4 sm:px-6 py-8 max-w-7xl">
        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-between items-center mb-12 sm:mb-16 space-y-4 sm:space-y-0">

          <div className="group text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-cyan-500">
              TOMAS VALES
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 uppercase tracking-wider">
              Backend Developer · Cofounder & CEO at KIAD
            </p>
          </div>
          <nav>
            <ul className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8">
              {['Home', 'About', 'Projects', 'Contact', 'KIAD'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-xs sm:text-sm text-gray-300 hover:text-cyan-400 transition-colors duration-300 font-medium uppercase tracking-wider"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </header>

        {/* Hero Section */}
        <section id="home" className="py-12 sm:py-20 mb-20 sm:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4 sm:mb-6">
              <span className="block text-gray-300">I build</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-cyan-500">
                Scalable Backend Systems
              </span>
            </h1>
            <p className="text-gray-400 text-lg sm:text-xl md:text-2xl mb-8 sm:mb-10 max-w-2xl leading-relaxed">
              Cofounder of <span className="text-cyan-400 font-medium">KIAD</span> and backend developer focused on high-performance APIs, system architecture, and scalable cloud infrastructure.
            </p>

            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="px-6 sm:px-8 py-2.5 sm:py-3.5 bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-cyan-500/20 text-sm sm:text-base">
                View Projects
              </button>
              <button className="px-6 sm:px-8 py-2.5 sm:py-3.5 border border-cyan-400/30 hover:border-cyan-400/60 text-cyan-400 hover:text-white rounded-lg font-medium transition-all duration-300 text-sm sm:text-base">
                Contact Me
              </button>
            </div>
          </motion.div>
        </section>

        <div className="mt-12 sm:mt-20">
          <hr className="h-px border-none bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
        </div>

        {/* About Section */}
        <section id="about" className="py-12 sm:py-20 mb-20 sm:mb-32">
          <div className="flex flex-col lg:flex-row gap-8 sm:gap-12 md:gap-16">
            <div className="lg:w-1/2">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-cyan-400">About Me</h2>
              <p className="text-gray-300 mb-4 sm:mb-6 text-base sm:text-lg leading-relaxed">
                I'm a backend developer and cofounder of <span className="text-cyan-400 font-semibold">KIAD</span>, passionate about building efficient and scalable systems. I specialize in robust APIs, database design, and infrastructure for real-world businesses.
              </p>
              <ul className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
                {[
                  'RESTful API Design',
                  'PostgreSQL & Relational Modeling',
                  'Database Design',
                  'Express.js / Node.js Architecture',
                  'Performance Optimization',
                  'JWT Authentication & Auth Flows',
                  'System Architecture',
                  'Clean Code & Project Structuring'
                ].map((skill) => (
                  <li key={skill} className="flex items-center">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-300 text-sm sm:text-base">{skill}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors text-sm sm:text-base"
              >
                Get in touch
                <svg className="w-3 h-3 sm:w-4 sm:h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
            <div className="lg:w-1/2 bg-gray-800/50 rounded-xl p-6 sm:p-8 border border-gray-700/50 shadow-lg mt-8 lg:mt-0">
              <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-gray-200">Technical Stack</h3>
              <div className="space-y-6 sm:space-y-8">
                {[
                  {
                    title: 'Languages',
                    items: ['Javascript', 'Python', 'C++', 'Java', 'C#']
                  },
                  {
                    title: 'Frameworks',
                    items: ['Node.js', 'Express', 'NestJS', 'Django', 'Express', '.NET Core']
                  },
                  {
                    title: 'Infrastructure',
                    items: ['AWS', 'Docker', 'Git', 'Postman', 'Vercel']
                  },
                  {
                    title: 'Databases',
                    items: ['PostgreSQL', 'MongoDB', 'MySQL', 'DynamoDB', 'SQLite']
                  }
                ].map((category) => (
                  <div key={category.title}>
                    <h4 className="text-xs sm:text-sm font-semibold mb-2 sm:mb-3 text-gray-400 uppercase tracking-wider">{category.title}</h4>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {category.items.map((item) => (
                        <span
                          key={item}
                          className="px-2 sm:px-3 py-1 sm:py-1.5 bg-gray-700/50 text-gray-200 rounded-full text-xs sm:text-sm hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="mt-12 sm:mt-20">
          <hr className="h-px border-none bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
        </div>

        <section id="kiad" className="relative py-12 sm:py-20 overflow-hidden">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
              {/* Columna izquierda - Contenido */}
              <div className="space-y-6 sm:space-y-8 animate-fade-in">
                <div className="flex flex-col items-start space-y-3 sm:space-y-4">
                  <img
                    src="/LogoBlack.png"
                    alt="KIAD Logo"
                    className="w-16 sm:w-20 md:w-24 opacity-90 hover:opacity-100 transition-opacity duration-500"
                  />
                  <div>
                    <span className="text-xs sm:text-sm font-medium text-cyan-400 tracking-wider animate-fade-up">WEB DEVELOPMENT AGENCY</span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-1 sm:mt-2 text-white animate-fade-up">Crafting Digital Excellence</h2>
                  </div>
                  <p className="text-gray-400 text-base sm:text-lg animate-fade-up">
                    Cofounder & CEO at KIAD, a boutique agency delivering elegant, scalable web solutions for growing businesses.
                  </p>
                </div>

                <p className="text-gray-300 leading-relaxed text-base sm:text-lg animate-fade-up delay-75">
                  We specialize in custom-built websites and backend systems that combine visual elegance with technical robustness.
                  Every solution is tailored to real business needs, designed to scale, and crafted with cutting-edge technologies.
                </p>

                {/* Valores/Beneficios */}
                <div className="grid grid-cols-1 xs:grid-cols-2 gap-4 sm:gap-6 pt-2 sm:pt-4 animate-fade-up delay-100">
                  {[
                    {
                      icon: (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      ),
                      title: 'Custom Code',
                      description: 'Tailored solutions, no templates'
                    },
                    {
                      icon: (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                        </svg>
                      ),
                      title: 'Scalability',
                      description: 'Built to grow with your business'
                    },
                    {
                      icon: (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      ),
                      title: 'Performance',
                      description: 'Lightning-fast experiences'
                    },
                    {
                      icon: (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ),
                      title: 'Ongoing Support',
                      description: 'Long-term partnership'
                    }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-2 sm:space-x-3">
                      <div className="mt-0.5 sm:mt-1 text-cyan-400">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="font-medium text-white text-sm sm:text-base">{item.title}</h4>
                        <p className="text-gray-400 text-xs sm:text-sm">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 sm:pt-6 animate-fade-up delay-150">
                  <a
                    href="https://kiad.dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 border border-cyan-400/30 bg-cyan-400/10 text-cyan-400 hover:bg-cyan-400/20 rounded-lg font-medium transition-all duration-300 text-sm sm:text-base"
                  >
                    Visit KIAD.dev
                    <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-3 w-3 sm:h-4 sm:w-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Columna derecha - Elemento visual */}
              <div className="relative hidden lg:block animate-fade-in-right">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-transparent rounded-xl -rotate-1" />
                <div className="relative bg-gray-800/50 border border-gray-700/50 rounded-xl p-6 sm:p-8 h-full min-h-[300px] sm:min-h-[400px] flex items-center justify-center backdrop-blur-sm">
                  <div className="text-center space-y-3 sm:space-y-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 mx-auto rounded-full bg-cyan-400/10 border border-cyan-400/20 animate-pulse">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-white">Boutique Web Development</h3>
                    <p className="text-gray-400 max-w-md mx-auto text-sm sm:text-base">
                      Where elegant design meets robust engineering for businesses that demand excellence.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-12 sm:mt-20">
          <hr className="h-px border-none bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
        </div>

        {/* Projects Section */}
        <section id="projects" className="py-12 sm:py-20 mb-20 sm:mb-32">
          <div className="mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-cyan-400">Featured Projects</h2>
            <p className="text-gray-400 text-sm sm:text-base max-w-2xl">
              Selected systems I've designed and implemented to solve complex problems at scale.
            </p>
          </div>

          {/* Desktop Grid Layout */}
          <div className="hidden md:grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <ModernProjectCard key={project.title} project={project} index={index} setSelectedProject={setSelectedProject} />
            ))}
          </div>

          {/* Mobile Carousel */}
          <div className="md:hidden relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {projects.map((project, index) => (
                <div key={project.title} className="w-full flex-shrink-0 px-3">
                  <ModernProjectCard project={project} index={index} setSelectedProject={setSelectedProject} />
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevProject}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-gray-800/80 hover:bg-cyan-400/20 backdrop-blur-sm p-3 rounded-full border border-gray-700/50 shadow-lg z-10 transition-all hover:scale-110"
              aria-label="Previous project"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextProject}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-800/80 hover:bg-cyan-400/20 backdrop-blur-sm p-3 rounded-full border border-gray-700/50 shadow-lg z-10 transition-all hover:scale-110"
              aria-label="Next project"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 w-2 rounded-full transition-all duration-300 ${currentIndex === index ? 'bg-cyan-400 w-6' : 'bg-gray-600'}`}
                  aria-label={`Go to project ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        <div className="mt-12 sm:mt-20">
          <hr className="h-px border-none bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
        </div>

        {/* Contact Section */}
        <section id="contact" className="py-12 sm:py-20 mb-12 sm:mb-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-cyan-400">Get In Touch</h2>
            <p className="text-gray-400 mb-6 sm:mb-10 text-sm sm:text-base lg:text-lg">
              Have a project in mind or want to discuss potential opportunities? I'd love to hear from you.
            </p>
            <form onSubmit={sendEmail} className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                  className="px-4 py-2 sm:px-5 sm:py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500/50 transition-all text-gray-200 text-sm sm:text-base"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  required
                  className="px-4 py-2 sm:px-5 sm:py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500/50 transition-all text-gray-200 text-sm sm:text-base"
                />
              </div>
              <textarea
                name="message"
                placeholder="Your Message"
                rows="4"
                required
                className="w-full px-4 py-2 sm:px-5 sm:py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500/50 transition-all text-gray-200 text-sm sm:text-base"
              ></textarea>
              <button
                type="submit"
                className="px-6 py-2.5 sm:px-8 sm:py-3.5 bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-cyan-500/20 text-sm sm:text-base"
              >
                Send Message
              </button>
            </form>
          </div>
        </section>

        <div className="mt-12 sm:mt-20">
          <hr className="h-px border-none bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
        </div>

        {/* Footer */}
        <footer className="py-8 sm:py-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 sm:mb-6 md:mb-0 text-center md:text-left">
              <h2 className="text-lg sm:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-cyan-500">
                TOMAS VALES
              </h2>
              <p className="text-gray-500 text-xs sm:text-sm mt-1">Backend Developer · Cofounder & CEO at KIAD</p>
            </div>
            <div className="flex space-x-4 sm:space-x-6">
              {[
                {
                  name: 'GitHub',
                  href: 'https://github.com/TomasVales',
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                    </svg>
                  )
                },
                {
                  name: 'LinkedIn',
                  href: 'https://www.linkedin.com/in/tomas-vales-5b4735300/',
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect x="2" y="9" width="4" height="12" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  )
                },
                {
                  name: 'Email',
                  href: 'mailto:contacto.tomasvales@gmail.com',
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="5" width="18" height="14" rx="2" ry="2" />
                      <polyline points="3 7 12 13 21 7" />
                    </svg>
                  )
                }
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="text-gray-400 hover:text-cyan-400 transition-colors"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          <div className="mt-6 sm:mt-8 text-center text-gray-600 text-xs sm:text-sm">
            <p>© {new Date().getFullYear()} Tomas Vales. All rights reserved.</p>
          </div>
        </footer>
      </div>
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
      <ToastContainer position="bottom-right" autoClose={3000} theme="dark" />
    </div>
  );
}

function ModernProjectCard({ project, index, setSelectedProject }) {

  return (
    <div className="bg-gray-800/40 hover:bg-gray-800/60 border border-gray-700/30 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 group">
      {/* Project Image */}
      <div className="h-48 relative overflow-hidden bg-gradient-to-br from-gray-700 to-gray-900">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover object-center opacity-80 hover:opacity-100 transition-opacity duration-300"
        />
        <span className="absolute top-4 right-4 bg-gray-900/80 text-cyan-400 text-xs font-medium px-2.5 py-1 rounded-full">
          Project {index + 1}
        </span>
      </div>

      {/* Project Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-200 mb-2 group-hover:text-cyan-400 transition-colors">
          {project.title}
        </h3>
        <p className="text-gray-400 mb-4 text-sm">{project.description}</p>

        {/* Tech Chips */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-full hover:bg-cyan-400/10 hover:text-cyan-400 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* View More Button */}
        <button
          onClick={() => setSelectedProject(project)}
          className="w-full py-2.5 px-4 bg-transparent border border-cyan-400/30 text-cyan-400 rounded-lg font-medium hover:bg-cyan-400/10 transition-all flex items-center justify-center gap-2"
        >
          View Details
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </div>

  );
}


function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 px-4">
      <div className="relative bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 p-8 rounded-2xl shadow-2xl max-w-2xl w-full">

        {/* Botón Cerrar */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-cyan-400 transition-colors text-4xl leading-none focus:outline-none"
          aria-label="Close modal"
        >
          ×
        </button>

        {/* Imagen */}
        <img
          src={project.image}
          alt={project.title}
          className="rounded-xl mb-6 w-full object-cover max-h-80 shadow-lg"
        />

        {/* Título */}
        <h2 className="text-3xl sm:text-4xl font-bold text-cyan-400 mb-4">
          {project.title}
        </h2>

        {/* Descripción */}
        <p className="text-gray-300 text-lg mb-6 leading-relaxed">
          {project.description}
        </p>

        {/* Tecnologías */}
        <div className="flex flex-wrap gap-3">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="px-4 py-2 bg-cyan-400/10 text-cyan-300 text-sm rounded-full border border-cyan-400/30 hover:bg-cyan-400/20 transition-all"
            >
              {tech}
            </span>
          ))}
        </div>

      </div>

    </div>
  );
}

export default App;