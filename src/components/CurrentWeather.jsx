import { useWeather } from '../context/WeatherContext'

const CurrentWeather = () => {
  const { current, city, iconUrl } = useWeather()
  if (!current) return null

  const { main, weather, wind, visibility, sys } = current
  const now = new Date()
  const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  const dateStr = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })

  const sunrise = new Date(sys.sunrise * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  const sunset  = new Date(sys.sunset  * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })

  return (
    <div className="w-full">
      {/* Main card */}
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 mb-4">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-1">{city}</h1>
            <p className="text-white/60 text-sm mb-4">{dateStr} · {timeStr}</p>
            <div className="flex items-center gap-4">
              <span className="text-7xl font-thin text-white">{Math.round(main.temp)}°C</span>
              <img src={iconUrl(weather[0].icon)} alt={weather[0].description} className="w-20 h-20" />
            </div>
            <p className="text-white/80 capitalize text-lg mt-1">{weather[0].description}</p>
            <p className="text-white/50 text-sm mt-1">
              Feels like {Math.round(main.feels_like)}°C &nbsp;·&nbsp;
              H: {Math.round(main.temp_max)}° &nbsp;L: {Math.round(main.temp_min)}°
            </p>
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Humidity',    value: `${main.humidity}%`,                     icon: '💧' },
          { label: 'Wind Speed',  value: `${Math.round(wind.speed)} m/s`,         icon: '💨' },
          { label: 'Visibility',  value: `${(visibility / 1000).toFixed(1)} km`,  icon: '👁️' },
          { label: 'Pressure',    value: `${main.pressure} hPa`,                  icon: '🌡️' },
          { label: 'Sunrise',     value: sunrise,                                  icon: '🌅' },
          { label: 'Sunset',      value: sunset,                                   icon: '🌇' },
          { label: 'Cloud Cover', value: `${current.clouds.all}%`,                icon: '☁️' },
          { label: 'Wind Dir',    value: `${wind.deg}°`,                          icon: '🧭' },
        ].map(({ label, value, icon }) => (
          <div key={label} className="bg-white/10 backdrop-blur-md border border-white/15 rounded-xl p-4">
            <div className="text-xl mb-1">{icon}</div>
            <div className="text-white font-semibold text-sm">{value}</div>
            <div className="text-white/50 text-xs">{label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CurrentWeather
