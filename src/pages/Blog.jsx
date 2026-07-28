import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, Calendar, Clock, ArrowRight } from 'lucide-react';
import { blogPosts } from '../data/blogPosts';
import SEO from '../components/SEO';

export default function Blog() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
  };

  return (
    <>
    <SEO title="Blog : Conseils CV et Lettre de Motivation" description="Lisez nos derniers articles et astuces pour rédiger un CV parfait, créer un portfolio et réussir vos entretiens d'embauche." url="https://www.moncvgo.com/blog" />
    <div className="bg-slate-50 dark:bg-[#0B1120] min-h-[calc(100vh-4rem)] relative overflow-hidden pb-20">
      
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 dark:bg-blue-600/10 blur-[150px] rounded-full pointer-events-none -z-10"></div>
      <div className="absolute bottom-40 left-0 w-[500px] h-[500px] bg-yellow-500/5 dark:bg-yellow-500/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>

      <section className="pt-16 pb-12 sm:pt-24 sm:pb-16 px-4">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-400 text-slate-900 font-black text-xs uppercase tracking-widest brutal-border brutal-shadow mb-6 transform rotate-2">
            <BookOpen className="w-4 h-4 text-slate-900" />
            Notre Blog
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter uppercase mb-6">
            Ressources et <span className="bg-yellow-400 text-slate-900 px-3 py-1 ml-2 brutal-border transform -rotate-2 inline-block">Conseils</span>
          </h1>
          <p className="text-xl text-slate-700 dark:text-slate-300 font-bold max-w-2xl mx-auto mb-16">
            Découvrez nos articles exclusifs pour booster votre carrière et décrocher le job de vos rêves.
          </p>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 text-left"
          >
            {blogPosts.map((post, index) => {
              const bgColors = ['bg-sky-100', 'bg-orange-100', 'bg-emerald-100', 'bg-purple-100'];
              const cardBg = bgColors[index % bgColors.length];
              const rotations = ['rotate-1', '-rotate-2', 'rotate-2', '-rotate-1'];
              const cardRotation = rotations[index % rotations.length];

              return (
                <motion.article 
                  key={post.id} 
                  variants={itemVariants}
                  className={`flex flex-col brutal-border brutal-shadow ${cardBg} transform ${cardRotation} hover:rotate-0 transition-transform duration-300 overflow-hidden h-full group`}
                >
                  <div className="h-48 overflow-hidden brutal-border-b">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow text-slate-900">
                    <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-wider mb-4">
                      <span className="bg-white px-2 py-1 brutal-border shadow-sm flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {new Date(post.date).toLocaleDateString('fr-FR')}
                      </span>
                      <span className="bg-white px-2 py-1 brutal-border shadow-sm flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {post.readTime}
                      </span>
                    </div>
                    <span className="inline-block px-2 py-1 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest w-max mb-3 brutal-border shadow-sm">
                      {post.category}
                    </span>
                    <h2 className="text-2xl font-black mb-3 leading-tight uppercase tracking-tight">
                      {post.title}
                    </h2>
                    <p className="font-medium text-slate-800 mb-6 flex-grow">
                      {post.excerpt}
                    </p>
                    <Link 
                      to={`/blog/${post.id}`} 
                      className="mt-auto flex items-center gap-2 font-black uppercase text-sm tracking-widest bg-white p-3 brutal-border brutal-shadow brutal-hover brutal-active text-center justify-center w-full"
                    >
                      Lire l'article <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </motion.div>
      </section>
    </div>
    </>
  );
}
