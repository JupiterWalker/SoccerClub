var app = getApp()

Component({
  data: {
    datetime: "null",
    headCount: 0,
    comment: "no comment",
    longitude: 121.379577,
    latitude: 31.114569,
    locationText: "chusheng",
    memberInfo: [
      {"avatarUrl": "https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg", "nickName": "Jim"},
      {"avatarUrl": "https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg", "nickName": "Jim"},
      {"avatarUrl": "https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg", "nickName": "Jimmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm"},
      {"avatarUrl": "https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg", "nickName": "Jim"},
      {"avatarUrl": "https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg", "nickName": "Jim"},
      {"avatarUrl": "https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg", "nickName": "Jim"},
      {"avatarUrl": "https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg", "nickName": "Jim"},
      {"avatarUrl": "https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg", "nickName": "Jim"}]
  },
  methods: {
    onLoad(options) {
      // 
      console.log("historyActivity Received parameters:", options);
      this.setData({
        activityId: options.activity_id,
        status: decodeURIComponent(options.status),
        type: decodeURIComponent(options.type),
        datetime: decodeURIComponent(options.datetime),
        headCount: Number(options.headcount),
        comment: decodeURIComponent(options.comment),
        location: decodeURIComponent(options.location),
        latitude: Number(decodeURIComponent(options.latitude)),
        longitude: Number(decodeURIComponent(options.longitude)),
        });
      },
  }
})