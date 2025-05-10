import { useState, useEffect } from 'react';
import { motion, useAnimation, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const CreatingMoment = () => {
  const [bgColor, setBgColor] = useState('linear-gradient(241deg, rgba(181, 113, 49, 1) 0%, rgba(0, 0, 0, 1) 14%)');
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;

      // Calculate the background color based on scroll position
      const scrollPercentage = Math.min(position / 200, 1); // Adjust 300 to change how fast the transition happens
      const bronzeOpacity = 0.8 * scrollPercentage;
      
      if (position > 0) {
        setBgColor(`linear-gradient(241deg, rgba(181, 113, 49, ${bronzeOpacity}) 0%, rgba(0, 0, 0, 1) 14%)`);
      } else {
        setBgColor('linear-gradient(241deg, rgba(181, 113, 49, 1) 0%, rgba(0, 0, 0, 1) 14%)');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
        ease: 'easeOut'
      }
    })
  };

  const timelineItems = [
    {
      year: '2020',
      title: '5 Countries Covered',
      description: 'Spanning 5 continents with handpicked venues in the world\'s most sought-after destinations.'
    },
    {
      year: '2022',
      title: '400+ Members',
      description: 'Join a curated network of luxury venues and hospitality leaders elevating global event experiences'
    },
    {
      year: '2024',
      title: '7 Strategic Partners Worldwide',
      description: 'Exclusive alliances with 7 global leaders in luxury hospitality and event innovation.'
    }
  ];

  return (
    <section 
      className="w-full py-12 overflow-hidden transition-colors duration-300 relative"
      style={{
        background: bgColor,
        transition: 'background 0.3s ease-out'
      }}
      ref={ref}
    >
      <div className="container max-w-6xl px-4 mx-auto md:px-6 lg:px-8 mb-10">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <div className="lg:max-w-lg">
            <motion.h2 
              className='text-white font-brent font-semibold text-3xl md:text-4xl mb-6'
              initial={{ opacity: 0, y: 20 }}
              animate={controls}
              variants={{
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
              }}
            >
              Creating moments that matter for you
            </motion.h2>
            <motion.div
              initial={{ opacity: 0 }}
              animate={controls}
              variants={{
                visible: { opacity: 1, transition: { delay: 0.3, duration: 0.6 } }
              }}
            >
              <p className='text-white font-wellston mb-3'>
                With GetMazza, we offer unparalleled hospitality and event experiences that bring people closer.
              </p>
              <p className='text-white font-wellston mb-3'>
                Enjoy the highest quality services, exclusive access to the finest hotels, restaurants, events and much more
              </p>
              <p className='text-white font-wellston'>
                Become a member, join our social club @mazzaindaloft and relieve well crafted experiences
              </p>
            </motion.div>
          </div>
          
          {/* Infographic Timeline */}
          <div className="relative w-full lg:w-1/2 mt-10 lg:mt-0">
            {/* Vertical Timeline Line */}
            <motion.div 
              className="absolute left-7 md:left-7 top-0 bottom-0 w-1 bg-gray-700"
              initial={{ height: 0 }}
              animate={controls}
              variants={{
                visible: { height: '100%', transition: { duration: 1.5 } }
              }}
              style={{ zIndex: 1 }}
            />
            
            {/* Timeline Items */}
            <div className="relative z-10">
              {timelineItems.map((item, i) => (
                <motion.div 
                  key={i} 
                  className="mb-14 relative"
                  custom={i}
                  initial="hidden"
                  animate={controls}
                  variants={cardVariants}
                >
                  <div className="flex">
                    {/* Year Circle */}
                    <motion.div 
                      className="relative z-10 mr-6 md:mr-8"
                      initial={{ scale: 0 }}
                      animate={controls}
                      variants={{
                        visible: { 
                          scale: 1, 
                          transition: { delay: i * 0.2 + 0.5, duration: 0.4, type: 'spring' } 
                        }
                      }}
                    >
                      <div className="flex items-center justify-center w-14 h-14 md:w-18 md:h-18 rounded-full bg-black border-2 border-bronze overflow-hidden">
                        <span className="font-glass text-bronze text-sm">{item.year}</span>
                      </div>
                    </motion.div>
                    
                    {/* Content Card */}
                    <motion.div 
                      className="bg-black bg-opacity-60 backdrop-filter backdrop-blur-sm rounded-lg p-5 border border-bronze/30 flex-1"
                      initial={{ x: 50, opacity: 0 }}
                      animate={controls}
                      variants={{
                        visible: { 
                          x: 0, 
                          opacity: 1, 
                          transition: { delay: i * 0.3, duration: 0.6 } 
                        }
                      }}
                    >
                      <h3 className='text-bronze font-glass text-xl md:text-2xl mb-2'>{item.title}</h3>
                      <p className='text-white font-wellston'>{item.description}</p>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <motion.div 
        className="absolute -right-10 top-20 w-40 h-40 rounded-full bg-bronze/10 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      <motion.div 
        className="absolute -left-20 bottom-10 w-60 h-60 rounded-full bg-bronze/5 blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 1
        }}
      />
    </section>
  );
};

export default CreatingMoment;