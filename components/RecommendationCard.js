'use client'
import { motion } from 'framer-motion'
import { 
  Star, 
  Sparkles, 
  ExternalLink, 
  Download, 
  TrendingUp, 
  Check, 
  AlertCircle,
  Zap,
  ChevronRight
} from 'lucide-react'
import AppLogo from './AppLogo'
import { getAppByName } from '@/lib/apps'

export default function RecommendationCard({ data, index }) {
  const app = getAppByName(data.app)

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.12, duration: 0.5 }}
      whileHover={{ y: -6 }}
      className="glass-card p-6 md:p-8 mb-6 relative overflow-hidden group"
    >
      {/* Background glow effect */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Category indicator line */}
      <div className="absolute left-0 top-6 bottom-6 w-1 rounded-full bg-gradient-to-b from-emerald-500 via-green-400 to-emerald-500" />
      
      <div className="relative pl-4">
        {/* Header section */}
        <div className="flex flex-col md:flex-row gap-5">
          {/* App Logo and Info */}
          <div className="flex items-start gap-4 flex-1">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 2 }}
              className="relative"
            >
              <AppLogo app={app} size={72} />
              {/* Glow ring */}
              <div className="absolute inset-0 rounded-2xl ring-2 ring-emerald-500/20 group-hover:ring-emerald-500/40 transition-all" />
            </motion.div>
            
            <div className="flex-1 min-w-0">
              {/* App name and badge */}
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h3 className="text-2xl md:text-3xl font-bold text-white">{data.app}</h3>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
                  {data.bestFor}
                </span>
              </div>
              
              {/* Rating and compatibility */}
              <div className="flex flex-wrap items-center gap-4 text-sm mb-3">
                <span className="flex items-center gap-1.5 text-amber-400">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span className="font-semibold">{data.rating}</span>
                  <span className="text-neutral-500">rating</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-emerald-400 font-bold">{data.compatibility}%</span>
                  <span className="text-neutral-400">match</span>
                </span>
              </div>
              
              {/* AI Insight */}
              <p className="text-sm text-emerald-400/80 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-500" />
                <span className="italic">{data.aiInsight}</span>
              </p>
            </div>
          </div>
          
          {/* Feature Tags */}
          <div className="flex flex-wrap gap-2 md:justify-end">
            {data.tags?.map((tag) => (
              <span 
                key={tag} 
                className="feature-tag flex items-center gap-1.5"
              >
                <Zap className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Why section */}
        <div className="mt-6 p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
          <p className="text-neutral-300 leading-relaxed">
            <span className="text-emerald-400 font-semibold flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4" />
              Why this app?
            </span>
            {data.reason}
          </p>
        </div>

        {/* Pros and Tradeoffs grid */}
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {/* Pros */}
          <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
            <span className="text-emerald-400 font-semibold text-sm flex items-center gap-2 mb-3">
              <Check className="w-4 h-4" />
              Advantages
            </span>
            <ul className="space-y-2">
              {data.pros.map((pro, i) => (
                <motion.li 
                  key={i} 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + i * 0.05 }}
                  className="text-sm text-neutral-300 flex gap-3"
                >
                  <span className="text-emerald-500 mt-0.5">
                    <ChevronRight className="w-4 h-4" />
                  </span>
                  <span>{pro}</span>
                </motion.li>
              ))}
            </ul>
          </div>
          
          {/* Tradeoffs */}
          <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/10">
            <span className="text-amber-400/90 font-semibold text-sm flex items-center gap-2 mb-3">
              <AlertCircle className="w-4 h-4" />
              Tradeoffs
            </span>
            <ul className="space-y-2">
              {data.tradeoffs.map((trade, i) => (
                <motion.li 
                  key={i} 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + i * 0.05 }}
                  className="text-sm text-neutral-400 flex gap-3"
                >
                  <span className="text-amber-500/70 mt-0.5">
                    <ChevronRight className="w-4 h-4" />
                  </span>
                  <span>{trade}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        {/* Alternative suggestion */}
        <div className="mt-5 p-3 rounded-lg bg-neutral-900/50 border border-neutral-800">
          <p className="text-sm text-neutral-500">
            <span className="text-emerald-400/70 font-medium">Alternative: </span>
            {data.alternative}
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap gap-3 mt-6">
          <motion.a
            href={data.website}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-emerald-500 to-green-400 text-[#050505] font-semibold text-sm hover:shadow-glow transition-shadow"
          >
            <Download className="w-4 h-4" />
            Get App
          </motion.a>
          <motion.a
            href={data.website}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-emerald-500/25 text-emerald-400 font-semibold text-sm hover:bg-emerald-500/10 hover:border-emerald-500/40 transition-all"
          >
            <ExternalLink className="w-4 h-4" />
            Visit Website
          </motion.a>
        </div>
      </div>
    </motion.article>
  )
}
