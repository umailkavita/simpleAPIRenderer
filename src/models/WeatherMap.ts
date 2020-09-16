import { Temperature } from "./Temperature"
import { Weather } from "./Weather"

export interface WeatherMap {
    city: string,
    weather: Weather,
    temparature: Temperature,
}