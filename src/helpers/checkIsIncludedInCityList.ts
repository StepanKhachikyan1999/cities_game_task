import store from '../store'

export const checkIsIncludedInCityList = (value: string) => store.getState().cities.collection.includes(value)