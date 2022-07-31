# 简介
这是用vue框架写的网易云音乐项目，浏览器请切换成移动设备后查看，目前许多功能并未完善，只用来练习vue写法
另外，它需要配合网易云音乐API一起使用

# 网易云音乐API
https://github.com/Binaryify/NeteaseCloudMusicApi

# 安装运行
```
$ npm install
$ npm run serve
```

# 使用说明
1. 运行网易云音乐API项目，就是启动后端，默认localhost:3000
2. 运行musicapp项目
3. 如果无法获取banner图与歌单，检查网易云音乐API项目，是否为localhost:3000
4. 如果不是3000，你需要到musicapp项目，根目录/src/api/index.js修改baseUrl变量
