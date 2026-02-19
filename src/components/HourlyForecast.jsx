import { useWeather } from '../context/WeatherContext'

const HourlyForecast = () => {
  const { hourly, iconUrl } = useWeather()
  if (!hourly) return null

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5">
      <h2 className="text-white/70 text-xs font-semibold uppercase tracking-widest mb-4">
        ⏱ Hourly Forecast
      </h2>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {hourly.map((h, i) => (
          <div
            key={i}
            className="flex flex-col items-center min-w-[72px] bg-white/10 rounded-xl p-3 border border-white/10"
          >
            <span className="text-white/60 text-xs mb-1">{i === 0 ? 'Now' : h.time}</span>
            <img src={iconUrl(h.icon)} alt={h.description} className="w-10 h-10" />
            <span className="text-white font-semibold text-sm">{h.temp}°</span>
            {h.pop > 0 && (
              <span className="text-blue-300 text-xs mt-1">💧{h.pop}%</span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default HourlyForecast
