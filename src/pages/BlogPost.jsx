import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { blogPosts } from '../data/blogPosts';
import SEO from '../components/SEO';

export default function BlogPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = blogPosts.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!post) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center bg-slate-50 dark:bg-[#0B1120] text-slate-900 dark:text-white">
        <h1 className="text-4xl font-black mb-4">Article introuvable</h1>
        <button onClick={() => navigate('/blog')} className="px-6 py-3 bg-yellow-400 text-slate-900 brutal-border brutal-shadow font-black uppercase">
          Retour au blog
        </button>
      </div>
    );
  }

  return (
    <>
    <SEO title={post.title} description={post.excerpt} url={`https://www.moncvgo.com/blog/${post.id}`} />
    <article className="bg-slate-50 dark:bg-[#0B1120] min-h-[calc(100vh-4rem)] pb-20 relative">
      
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-full h-[400px] bg-gradient-to-b from-blue-100 to-transparent dark:from-slate-900 dark:to-transparent pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 pt-12 relative z-10">
        <Link 
          to="/blog" 
          className="inline-flex items-center gap-2 px-4 py-2 bg-white text-slate-900 brutal-border brutal-shadow brutal-hover brutal-active font-black uppercase tracking-widest text-xs mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Retour au blog
        </Link>

        <div className="bg-white brutal-border brutal-shadow p-6 sm:p-12 transform rotate-1 text-slate-900 mb-12">
          <div className="flex flex-wrap items-center gap-4 text-xs font-bold uppercase tracking-wider mb-6">
            <span className="bg-yellow-400 px-3 py-1 brutal-border shadow-sm">
              {post.category}
            </span>
            <span className="flex items-center gap-1 text-slate-600">
              <Calendar className="w-4 h-4" /> {new Date(post.date).toLocaleDateString('fr-FR')}
            </span>
            <span className="flex items-center gap-1 text-slate-600">
              <Clock className="w-4 h-4" /> {post.readTime}
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter leading-tight mb-8">
            {post.title}
          </h1>

          <div className="w-full h-[300px] sm:h-[400px] bg-slate-200 brutal-border overflow-hidden mb-10 transform -rotate-1">
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          </div>

          {/* Blog Content */}
          <div 
            className="prose prose-lg max-w-none text-slate-800 font-medium leading-relaxed prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight prose-headings:text-slate-900 prose-a:text-blue-600 prose-a:font-bold prose-strong:font-black prose-strong:bg-yellow-100 prose-strong:px-1"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </div>
    </article>
    </>
  );
}
