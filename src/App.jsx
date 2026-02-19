import { WeatherProvider, useWeather } from './context/WeatherContext'
import SearchBar from './components/SearchBar'
import CurrentWeather from './components/CurrentWeather'
import HourlyForecast from './components/HourlyForecast'
import FiveDayForecast from './components/FiveDayForecast'

const WeatherApp = () => {
  const { current, loading, error, getBg } = useWeather()

  const bgClass = getBg(current?.weather?.[0]?.id)

  return (
    <div className={`min-h-screen bg-gradient-to-br ${bgClass} transition-all duration-1000`}>
      {/* Header */}
      <div className="sticky top-0 z-10 bg-black/20 backdrop-blur-md border-b border-white/10 px-4 py-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-white font-bold text-xl tracking-tight">
              🌤 WeatherNow
            </h1>
            <span className="text-white/40 text-xs">Powered by OpenWeatherMap</span>
          </div>
          <SearchBar />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin" />
            <p className="text-white/60 text-sm">Fetching weather data...</p>
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="bg-red-500/20 border border-red-400/30 rounded-2xl p-5 text-center">
            <div className="text-3xl mb-2">⚠️</div>
            <p className="text-red-200 font-medium">{error}</p>
            <p className="text-red-300/60 text-sm mt-1">Try searching for a different city.</p>
          </div>
        )}

        {/* Empty state */}
        {!current && !loading && !error && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="text-7xl mb-6">🌍</div>
            <h2 className="text-white text-2xl font-semibold mb-2">Search any city</h2>
            <p className="text-white/50 text-sm max-w-sm">
              Get real-time weather, hourly updates, and a 5-day forecast for any city in the world.
            </p>
            <div className="flex gap-2 mt-6 flex-wrap justify-center">
              {['Mumbai', 'London', 'Tokyo', 'New York', 'Dubai'].map(c => (
                <QuickCity key={c} name={c} />
              ))}
            </div>
          </div>
        )}

        {/* Weather data */}
        {current && !loading && (
          <>
            <CurrentWeather />
            <HourlyForecast />
            <FiveDayForecast />
          </>
        )}
      </div>
    </div>
  )
}

// Quick city button for empty state
const QuickCity = ({ name }) => {
  const { fetchWeather } = useWeather()
  return (
    <button
      onClick={() => fetchWeather(name)}
      className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-full
                 px-4 py-1.5 text-white/70 hover:text-white text-sm transition-all"
    >
      {name}
    </button>
  )
}

const App = () => (
  <WeatherProvider>
    <WeatherApp />
  </WeatherProvider>
)

export default App
