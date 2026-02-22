# 🌤 WeatherNow

A real-time weather app built with React.js and the OpenWeatherMap API. Search any city in the world and get current conditions, hourly updates, and a 5-day forecast — all with a dynamic UI that changes based on the weather.

**Live Demo:** [weathernow-indol.vercel.app](https://weathernow-indol.vercel.app)

---

## Features

- 🔍 **City Search** — Search any city worldwide with instant results
- 🌡 **Current Weather** — Temperature, feels like, humidity, wind speed, pressure, visibility, cloud cover, sunrise & sunset
- ⏱ **Hourly Forecast** — Next 8 time intervals with rain probability
- 📅 **5-Day Forecast** — Daily high/low temps with weather icons
- 🎨 **Dynamic Backgrounds** — Gradient changes automatically based on weather condition (clear, rain, snow, thunderstorm, clouds)
- ⚡ **Quick City Buttons** — Mumbai, London, Tokyo, New York, Dubai on the empty state for instant search
- ⚠️ **Error Handling** — Friendly messages for invalid city names, bad API keys, and network failures

---

## Tech Stack

| Technology | Usage |
|---|---|
| React 18 | UI framework |
| Context API | Global state management |
| Tailwind CSS | Styling |
| OpenWeatherMap API | Weather data |
| Vite | Build tool |
| Vercel | Deployment |

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/ariantechzone-stack/weathernow.git
cd weathernow
```

### 2. Install dependencies

```bash
npm install
```

### 3. Add your API key

Open `src/context/WeatherContext.jsx` and replace:

```js
const API_KEY = 'YOUR_API_KEY_HERE'
```

Get a free key at [openweathermap.org](https://openweathermap.org) → Sign Up → API Keys tab.

> ⚠️ New API keys take 10–30 minutes to activate after signup.

### 4. Run locally

```bash
npm run dev
```

---

## Project Structure

```
src/
├── components/
│   ├── SearchBar.jsx         # City search input + submit
│   ├── CurrentWeather.jsx    # Main weather card + 8 stat tiles
│   ├── HourlyForecast.jsx    # Scrollable hourly strip
│   └── FiveDayForecast.jsx   # 5-day forecast list
├── context/
│   └── WeatherContext.jsx    # Global state + all API calls
├── App.jsx                   # App layout
└── main.jsx                  # Entry point
```

---

## API Used

**OpenWeatherMap** — [openweathermap.org](https://openweathermap.org)

Endpoints used:
- `GET /weather` — Current weather conditions
- `GET /forecast` — 5-day / 3-hour forecast (used for both hourly and daily views)

---

## Dynamic Backgrounds

The app changes its background gradient based on the weather condition code returned by the API:

| Condition | Background |
|---|---|
| Clear sky | Deep blue gradient |
| Clouds | Slate blue gradient |
| Rain / Drizzle | Dark blue-slate gradient |
| Thunderstorm | Dark grey gradient |
| Snow | Light blue-white gradient |
| Fog / Mist | Yellow-brown gradient |

---

## Deployment

Deployed on **Vercel** with client-side routing handled via `vercel.json`:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

---

## Author

**Arian Designs**
- Portfolio: [portfolio-five-green-24.vercel.app](https://portfolio-five-green-24.vercel.app)
- GitHub: [@ariantechzone-stack](https://github.com/ariantechzone-stack)
- Email: ariantechzone@gmail.com
