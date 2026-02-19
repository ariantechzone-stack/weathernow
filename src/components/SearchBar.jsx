import { useState } from 'react'
import { useWeather } from '../context/WeatherContext'

const SearchBar = () => {
  const [input, setInput] = useState('')
  const { fetchWeather, loading } = useWeather()

  const handleSubmit = (e) => {
    e.preventDefault()
    fetchWeather(input)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto">
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 text-lg">🔍</span>
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Search city... e.g. Mumbai, London, Tokyo"
            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 pl-11
                       text-white placeholder-white/40 text-sm outline-none
                       focus:border-white/50 focus:bg-white/15 transition-all"
          />
        </div>
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="bg-white/20 hover:bg-white/30 disabled:opacity-40 disabled:cursor-not-allowed
                     border border-white/20 rounded-xl px-6 py-3 text-white font-semibold
                     text-sm transition-all active:scale-95"
        >
          {loading ? '...' : 'Search'}
        </button>
      </div>
    </form>
  )
}

export default SearchBar
