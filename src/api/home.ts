import request from '@/utils/request'
export const reqGetWeather = (cityid: number) =>
  request({
    url: `https://v0.yiketianqi.com/free/day?appid=18926344&appsecret=UNV2vAUD&unescape=1&cityid=${cityid}`,
    method: 'get',
  })
