export interface Forecast {
    number: number,
    name: string,
    startTime: Date,
    endTime: Date,
    isDaytime: true,
    temperature: number,
    temperatureUnit: string,
    temperatureTrend: string,
    windSpeed: string,
    windDirection: string,
    icon: string,
    shortForecast: string,
    detailedForecast: string
  }