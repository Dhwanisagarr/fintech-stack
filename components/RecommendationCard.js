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
      className="glass-card p-6 md:p-8 mb-6 hover:border-white/20 hover:shadow-lg"
    >
      <div className="flex flex-col md:flex-row items-start justify-between gap-6">
        <div className="flex items-start gap-4">
          <AppLogo app={app} size={64} />
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <h3 className="text-2xl font-bold text-white">{data.app}</h3>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/10 text-white border border-white/20 h-fit">
                {data.bestFor}
              </span>
            </div>
            <div className="flex items-center gap-3 text-sm text-zinc-400 mb-2">
              <span className="flex items-center gap-1 text-white font-medium">
                <Star className="w-4 h-4 text-white fill-white" />
                {data.rating}
              </span>
              <span className="text-white font-semibold">{data.compatibility}% match</span>
            </div>
            <p className="text-xs text-zinc-400 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-white" />
              {data.aiInsight}
            </p>
          </div>
        </div>
        <div className="md:ml-auto flex flex-wrap items-center gap-2 h-fit">
          {data.tags?.map((tag) => (
            <span key={tag} className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-zinc-900/90 text-zinc-300 border border-white/10 shrink-0 h-fit">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <p className="mt-5 text-zinc-300 leading-relaxed">
        <span className="text-white font-semibold">Why: </span>
        {data.reason}
      </p>

      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <div>
          <span className="text-white font-semibold text-sm">Pros</span>
          <ul className="mt-2 space-y-1.5">
            {data.pros.map((pro, i) => (
              <li key={i} className="text-sm text-zinc-300 flex gap-2">
                <span className="text-white font-bold">+</span> {pro}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <span className="text-zinc-400 font-semibold text-sm">Tradeoffs</span>
          <ul className="mt-2 space-y-1.5">
            {data.tradeoffs.map((trade, i) => (
              <li key={i} className="text-sm text-zinc-400 flex gap-2">
                <span className="text-zinc-500 font-bold">−</span> {trade}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="mt-4 text-sm text-zinc-500">
        <span className="text-zinc-400 font-medium">Alternative: </span>
        {data.alternative}
      </p>

      <div className="flex flex-wrap gap-3 mt-6">
        <a
          href={data.website}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-zinc-200 transition-all shadow-md"
        >
          <Download className="w-4 h-4" />
          Get App
        </a>
        <a
          href={data.website}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 text-white font-semibold text-sm hover:bg-white/10 transition-all"
        >
          <ExternalLink className="w-4 h-4" />
          Visit Website
        </a>
      </div>
    </motion.article>
  )
}

