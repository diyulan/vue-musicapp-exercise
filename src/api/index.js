import axios from 'axios';

let baseUrl = 'http://localhost:3000'

// 获取轮播图的api，type:资源类型，对应以下类型，默认为0即PC
// 1: android; 2: iphone; 3: ipad
export let getBanner = (type=0) => {
  return axios.get(`${baseUrl}/banner?type=${type}`)
}

// 获取推荐歌单，可选参数limit:取出数量，默认为10
export let getMusicList = (limit=10) => {
  return axios.get(`${baseUrl}/personalized?limit=${limit}`)
}

// 获取歌单详情
export let getPlaylistDetail = (id) => {
  return axios.get(`${baseUrl}/playlist/detail?id=${id}`)
}

// 获取歌词
export let getLyric = (id) => {
  return axios.get(`${baseUrl}/lyric?id=${id}`)
}

// 搜索歌曲
export let searchMusic = (keyword) => {
  return axios.get(`${baseUrl}/search?keywords=${keyword}`)
}

export default {
  getBanner, getMusicList, getPlaylistDetail, getLyric,
  searchMusic,
}