import { useWeather } from '../context/WeatherContext'

const FiveDayForecast = () => {
  const { forecast, iconUrl } = useWeather()
  if (!forecast) return null

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5">
      <h2 className="text-white/70 text-xs font-semibold uppercase tracking-widest mb-4">
        📅 5-Day Forecast
      </h2>
      <div className="flex flex-col gap-2">
        {forecast.map((day, i) => (
          <div
            key={i}
            className="flex items-center justify-between bg-white/5 hover:bg-white/10
                       border border-white/10 rounded-xl px-4 py-3 transition-all"
          >
            <span className="text-white/70 text-sm w-36 truncate">
              {i === 0 ? 'Today' : day.date}
            </span>
            <div className="flex items-center gap-2">
              <img src={iconUrl(day.icon)} alt={day.description} className="w-8 h-8" />
              <span className="text-white/60 text-xs capitalize w-28 hidden md:block truncate">
                {day.description}
              </span>
            </div>
            <div className="flex gap-3 text-sm">
              <span className="text-white font-semibold">{day.temp_max}°</span>
              <span className="text-white/40">{day.temp_min}°</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FiveDayForecast
