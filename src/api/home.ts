// import { http } from "@/utils/request"
import request from '@/utils/request'

// 获取天气信息
// 使用的天气接口及参数 https://www.tianqiapi.com/index/doc?version=v61
export const reqGetWeather = (cityid: number) =>
  // http.get(url: `https://v0.yiketianqi.com/free/day?appid=18926344&appsecret=UNV2vAUD&unescape=1&cityid=${cityid}`)
  request({
    url: `https://v0.yiketianqi.com/free/day?appid=18926344&appsecret=UNV2vAUD&unescape=1&cityid=${cityid}`,
    method: 'get',
  })
