import { createStore } from 'vuex'
import api from "@/api/index.js"

export default createStore({
  state: {
    // 初始化避免报错
    playlist: [{
      name: '岁月如歌',
      id: 26608787,
      al: {
        id: 2532179,
        name: "2013 陈奕迅 music life 精选",
        pic: 109951166656425500,
        picUrl: "http://p3.music.126.net/1I8ELtF6pswNRAVs4CwjfA==/109951166656425505.jpg",
        pic_str: "109951166656425505",
      },
      ar: [{
        name: '陈奕迅'
      }]
    }],
    playCurrentIndex: 0,
    // 歌词
    lyric: '',
    // 歌词更新时间
    currentTime: 0,
  },
  mutations: {
    // 修改播放列表
    setPlaylist(state, value){
      state.playlist = value;
    },
    // 修改播放索引
    setPlayIndex(state, value){
      state.playCurrentIndex = value;
    },
    // 修改歌词
    setLyric(state, value){
      state.lyric = value;
    },
    // 修改歌词更新时间
    setCurrentTime(state, value){
      state.currentTime = value;
    }
  },
  actions: {
    // 异步获取歌词后，调用修改歌词方法
    async reqLyric(content, payload){
      let result = await api.getLyric(payload.id)
      content.commit('setLyric', result.data.lrc.lyric)
    }
  },
  getters: {
    // 分割歌词获取分、秒、毫、词、总时间
    lyricList(state){
      let arr = state.lyric.split(/\n/igs).map((item, i, arr) => {
        let min = parseInt(item.slice(1, 3));
        let sec = parseInt(item.slice(4, 6));
        let milli = parseInt(item.slice(7, 10));
        return {
          min, sec, milli,
          lyric:item.slice(11, item.length),
          content: item,
          time: milli +
                sec * 1000 +
                min * 60 * 1000
        }
      })
      arr.forEach((item, i) => {
        if (i===0){
          item.pre = 0
        }else{
          item.pre = arr[i - 1].time
        }
      })
      return arr
    }
  },
  modules: {
  }
})
