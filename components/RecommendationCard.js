'use client'
import { motion } from 'framer-motion'
import { Star, Sparkles, ExternalLink, Download } from 'lucide-react'
import AppLogo from './AppLogo'
import { getAppByName } from '@/lib/apps'

export default function RecommendationCard({ data, index }) {
  const app = getAppByName(data.app)

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="glass-card p-6 md:p-8 mb-6 hover:shadow-glow-sm"
    >
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex items-start gap-4">
          <AppLogo app={app} size={64} />
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <h3 className="text-2xl font-bold text-white">{data.app}</h3>
              <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                {data.bestFor}
              </span>
            </div>
            <div className="flex items-center gap-3 text-sm text-neutral-400 mb-2">
              <span className="flex items-center gap-1 text-amber-400">
                <Star className="w-4 h-4 fill-amber-400" />
                {data.rating}
              </span>
              <span className="text-emerald-400 font-semibold">{data.compatibility}% match</span>
            </div>
            <p className="text-xs text-emerald-500/80 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              {data.aiInsight}
            </p>
          </div>
        </div>
        <div className="md:ml-auto flex flex-wrap gap-2">
          {data.tags?.map((tag) => (
            <span key={tag} className="px-3 py-1 rounded-full text-xs bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <p className="mt-5 text-neutral-300 leading-relaxed">
        <span className="text-emerald-400 font-semibold">Why: </span>
        {data.reason}
      </p>

      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <div>
          <span className="text-emerald-400 font-semibold text-sm">Pros</span>
          <ul className="mt-2 space-y-1.5">
            {data.pros.map((pro, i) => (
              <li key={i} className="text-sm text-neutral-300 flex gap-2">
                <span className="text-emerald-500">+</span> {pro}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <span className="text-amber-400/90 font-semibold text-sm">Tradeoffs</span>
          <ul className="mt-2 space-y-1.5">
            {data.tradeoffs.map((trade, i) => (
              <li key={i} className="text-sm text-neutral-400 flex gap-2">
                <span className="text-amber-500">−</span> {trade}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="mt-4 text-sm text-neutral-500">
        <span className="text-emerald-400/80 font-medium">Alternative: </span>
        {data.alternative}
      </p>

      <div className="flex flex-wrap gap-3 mt-6">
        <a
          href={data.website}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-500 text-[#050505] font-semibold text-sm hover:bg-emerald-400 transition-all shadow-glow-sm"
        >
          <Download className="w-4 h-4" />
          Get App
        </a>
        <a
          href={data.website}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-emerald-500/30 text-emerald-400 font-semibold text-sm hover:bg-emerald-500/10 transition-all"
        >
          <ExternalLink className="w-4 h-4" />
          Visit Website
        </a>
      </div>
    </motion.article>
  )
}
