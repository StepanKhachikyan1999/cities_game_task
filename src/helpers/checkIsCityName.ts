import { CITIES } from '../constants/consts'
export const checkIsCityName = (value: string) => !!CITIES.find(city => city.toLowerCase() === value.trim().toLowerCase())