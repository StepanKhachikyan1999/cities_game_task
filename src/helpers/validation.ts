import { object, string } from 'yup'
import {checkIsCityName} from './checkIsCityName'
import {checkIsIncludedInCityList} from './checkIsIncludedInCityList'
import {checkIsValid} from "./checkIsValid";

export default object({
  message: string()
      // Validate for Cyrillic characters only
      .matches(/^[А-Яа-яЁё\s-]+$/i, '*используйте русский алфавит')
      // Field is required
      .required('*это поле обязательно')
      // Custom validation for checking if input is a valid city name
      .test(
          'check-is-city-name',
          '*неверный ответ',
          value => checkIsCityName(value)
      )
      // Custom validation for checking if input is valid based on specific criteria
      .test(
          'included-last-letter',
          '*ответ не является русским названием города',
          value => checkIsValid(value)
      )
      // Custom validation for checking if the city name is already used
      .test(
          'included-in-city-list',
          '*пожалуйста, напишите название города, которое не использовалось',
          value => checkIsIncludedInCityList(value)
      ),
});