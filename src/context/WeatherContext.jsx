import { createContext, useContext, useState } from 'react'

const WeatherContext = createContext()

export const useWeather = () => useContext(WeatherContext)

// 🔑 PASTE YOUR API KEY HERE
const API_KEY = 'f41cdc0a4147f1cff0e55a08b8003ed6'
const BASE = 'https://api.openweathermap.org/data/2.5'

export const WeatherProvider = ({ children }) => {
  const [current, setCurrent]   = useState(null)
  const [forecast, setForecast] = useState(null)
  const [hourly, setHourly]     = useState(null)
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState(null)
  const [city, setCity]         = useState('')

  const fetchWeather = async (searchCity) => {
    if (!searchCity.trim()) return
    setLoading(true)
    setError(null)

    try {
      // Current weather
      const currentRes = await fetch(
        `${BASE}/weather?q=${encodeURIComponent(searchCity)}&appid=${API_KEY}&units=metric`
      )
      if (!currentRes.ok) {
        if (currentRes.status === 404) throw new Error('City not found. Please check the spelling.')
        if (currentRes.status === 401) throw new Error('Invalid API key. Please check your key.')
        throw new Error('Failed to fetch weather data.')
      }
      const currentData = await currentRes.json()

      // 5-day / hourly forecast (same endpoint gives both)
      const forecastRes = await fetch(
        `${BASE}/forecast?q=${encodeURIComponent(searchCity)}&appid=${API_KEY}&units=metric`
      )
      const forecastData = await forecastRes.json()

      // Group forecast by day
      const dailyMap = {}
      forecastData.list.forEach(item => {
        const date = new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
        if (!dailyMap[date]) dailyMap[date] = []
        dailyMap[date].push(item)
      })

      // Get one entry per day (noon-ish)
      const daily = Object.entries(dailyMap).slice(0, 5).map(([date, items]) => {
        const noon = items.find(i => new Date(i.dt * 1000).getHours() >= 11) || items[0]
        return {
          date,
          temp_max: Math.round(Math.max(...items.map(i => i.main.temp_max))),
          temp_min: Math.round(Math.min(...items.map(i => i.main.temp_min))),
          icon: noon.weather[0].icon,
          description: noon.weather[0].description,
        }
      })

      // Next 8 hours (hourly)
      const hourlyData = forecastData.list.slice(0, 8).map(item => ({
        time: new Date(item.dt * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        temp: Math.round(item.main.temp),
        icon: item.weather[0].icon,
        description: item.weather[0].description,
        pop: Math.round((item.pop || 0) * 100),
      }))

      setCurrent(currentData)
      setForecast(daily)
      setHourly(hourlyData)
      setCity(currentData.name + ', ' + currentData.sys.country)

    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Get weather icon URL
  const iconUrl = (code) => `https://openweathermap.org/img/wn/${code}@2x.png`

  // Get background gradient based on weather condition
  const getBg = (weatherId) => {
    if (!weatherId) return 'from-slate-900 via-blue-950 to-slate-900'
    if (weatherId >= 200 && weatherId < 300) return 'from-slate-900 via-gray-800 to-slate-900'  // thunderstorm
    if (weatherId >= 300 && weatherId < 600) return 'from-slate-800 via-blue-900 to-slate-900'  // rain/drizzle
    if (weatherId >= 600 && weatherId < 700) return 'from-slate-700 via-blue-200 to-slate-600'  // snow
    if (weatherId >= 700 && weatherId < 800) return 'from-slate-700 via-yellow-900 to-slate-800' // fog/mist
    if (weatherId === 800) return 'from-blue-900 via-sky-800 to-blue-950'                        // clear
    return 'from-slate-800 via-blue-900 to-slate-900'                                            // clouds
  }

  return (
    <WeatherContext.Provider value={{
      current, forecast, hourly, loading, error, city,
      fetchWeather, iconUrl, getBg
    }}>
      {children}
    </WeatherContext.Provider>
  )
}
