import request from '@/utils/request'

export const requestWeather = () => {
  request.get<any>('https://api.vvhan.com/api/weather')
}
