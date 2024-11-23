# Weather Now 🌤️

A modern, responsive weather application built with React that provides real-time weather information for any city. Perfect for outdoor enthusiasts who need quick access to current weather conditions.

## Features 🌟

- **Real-time Weather Data**: Get current temperature, humidity, and wind speed
- **City Search**: Look up weather for any city worldwide
- **Responsive Design**: Works seamlessly on both desktop and mobile devices
- **Visual Weather Indicators**: Clear weather condition icons
- **Error Handling**: User-friendly error messages
- **Clean UI**: Modern, minimalist interface using shadcn/ui components

## Technologies Used 💻

- React
- Tailwind CSS
- shadcn/ui
- Open-Meteo API
- Lucide React Icons

## Prerequisites 📋

Before you begin, ensure you have installed:
- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)

## Installation 🚀

1. Clone the repository:
```bash
git clone https://github.com/ashishharswal-dev/weather-now.git
cd weather-now
```

2. Install dependencies:
```bash
npm install
```

3. Set up shadcn/ui:
```bash
npx shadcn-ui@latest init
```

4. Install required shadcn/ui components and lucide icon library:
```bash
npx shadcn-ui@latest add alert
npm install lucide-react
```

5. Start the development server:
```bash
npm run dev
```

## Usage 📱

1. Enter a city name in the search bar
2. Click the search icon or press Enter
3. View the current weather conditions including:
   - Temperature
   - Humidity
   - Wind Speed
   - Weather Condition

## API Reference 🌐

This project uses the Open-Meteo API for weather data:
- Weather API: `https://api.open-meteo.com/v1/forecast`
- Geocoding API: `https://geocoding-api.open-meteo.com/v1/search`

No API key is required.

## Contributing 🤝

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License 📄

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments 👏

- Open-Meteo for providing free weather data
- shadcn/ui for the beautiful components
- Lucide for the icons

## Contact 📧

Your Name - [@ashishharswal-dev](https://github.com/ashishharswal-dev)

Project Link: [Weather Now](https://stackblitz.com/edit/vitejs-vite-bpbk3a?file=src%2FWeatherApp.jsx)
