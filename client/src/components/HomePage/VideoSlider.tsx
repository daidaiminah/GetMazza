import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FirstVideo from '../../assets/videos/luxurious-villa.mp4';
import SecondVideo from '../../assets/videos/Fashion Show.mp4';
import ThirdVideo from '../../assets/videos/boat-curise2.mp4';
import FifthVideo from '../../assets/videos/France Towel.mp4'
import { GoArrowRight, GoArrowUpRight } from 'react-icons/go';

const videos = [
  {
    url: ThirdVideo,
    subtitle: 'Experience Luxury',
    description: 'Exclusive events curated for the elite',
  },
  {
    url: FifthVideo,
    subtitle: 'Premium Destinations',
    description: 'Handpicked venues across the globe',
  },
  {
    url: SecondVideo,
    subtitle: 'Elite Society',
    description: 'Where luxury meets lifestyle',
  },
  {
    url: FirstVideo,
    subtitle: 'Luxurious Villa',
    description: 'Where vacation meet your full expection',
  },
];

const VideoSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % videos.length);
        setIsTransitioning(false);
      }, 100); // 1-second transition time
    }, 10000); // 10-second display time

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Darker overlay for better text contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/30 z-10" />
      
      {/* Video container */}
      <div className="absolute inset-0 w-full h-full">
        <video
          key={currentIndex} // Force refresh on index change
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src={videos[currentIndex].url} type="video/mp4" />
        </video>
      </div>

      {/* Content container with safe margins */}
      <div className="absolute inset-0 flex items-center justify-center z-20 px-4">
        <div className="w-full max-w-3xl mx-auto"> {/* Reduced max-width */}
          <AnimatePresence mode="wait">
            {!isTransitioning && (
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-center"
              >
                {/* Smaller overlay with lighter opacity */}
                <div className="bg-black/15 backdrop-blur-sm rounded-xl p-6 md:p-8 lg:p-10"> {/* Reduced padding and opacity */}      
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-2xl md:text-3xl lg:text-4xl font-brent text-white mb-6 leading-tight"
                >
                  {videos[currentIndex].subtitle}
                </motion.h1>
                
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-xl md:text-2xl font-wellston text-white/90 mb-12"
                >
                  {videos[currentIndex].description}
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="flex flex-col md:flex-row items-center justify-center gap-6"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-3 py-2 border border-gray-600 text-white font-sans text-lg rounded-full hover:bg-[linear-gradient(232deg,rgba(184, 115, 51, 1) 17%, rgba(165, 42, 42, 1) 71%)] transition-all duration-300 shadow-lg hover:shadow-bronze/60"
                  >
                    Become a Member
                  </motion.button>
                  <motion.button onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-3 py-2 flex items-center justify-center text-white font-sans text-lg rounded-full hover:bg-bronze/20 transition-all duration-300"
                    style={{
                      background: 'linear-gradient(232deg,rgba(184, 115, 51, 1) 17%, rgba(165, 42, 42, 1) 71%)'
                    }}
                  >
                    Explore Social Club
                    {isHovered ? <GoArrowRight className="ml-2" /> : <GoArrowUpRight className="ml-2" />}
                  </motion.button>
                </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

       {/* Dot indicators with boundary check */}
       <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 w-max">
      <ul className="flex gap-2">
          {videos.map((_, index) => (
            <li key={index}>
              <button
                onClick={() => {
                  setIsTransitioning(true);
                  setTimeout(() => {
                    setCurrentIndex(index);
                    setIsTransitioning(false);
                  }, 1000);
                }}
                className={`w-[9px] h-[9px] rounded-full transition-all duration-300 ${
                  currentIndex === index ? 'bg-bronze' : 'bg-white/30'
                }`}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default VideoSlider;

