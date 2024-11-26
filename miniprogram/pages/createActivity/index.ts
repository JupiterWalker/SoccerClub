var app = getApp()

Component({
  data: {
    text: "This is page data.",
    datetime: null,
    latitude: null,
    longitude: null,
    headcount: 0,
    comment: ""
  },
  methods: {
  onDatetimeEvent(e) {
      console.log('onDatetimeEvent recieved: ', e);
      this.setData({
        "datetime": e.detail.datetime
      })
  },
  onLocationEvent(e) {
    console.log('onLocationEvent recieved: ', e);
    this.setData({
      "datetime": e.detail.location,
      "latitude": e.detail.latitude,
      "longitude": e.detail.longitude,
    })
  },
  onHeadcountEvent(e) {
    console.log('onHeadcountEvent recieved: ', e);
    this.setData({
      "headcount": Number(e.detail.value),
    })
  },
  onCommentEvent(e) {
    console.log('onCommentEvent recieved: ', e);
    this.setData({
      "comment": e.detail.value,
    })
  },
  onLoad() {
    // 页面创建时执行
  },
  onShow() {
    // 页面出现在前台时执行
  },
  onReady() {
    // 页面首次渲染完毕时执行
  },
  onHide() {
    // 页面从前台变为后台时执行
  },
  onUnload() {
    // 页面销毁时执行
  },
  onPullDownRefresh() {
    // 触发下拉刷新时执行
  },
  onReachBottom() {
    // 页面触底时执行
  },
  onShareAppMessage(res) {
    console.log("createActivity onShareAppMessage is called: ", this.data)
    // 页面被用户分享时执行
    // create activity
    var activityId = 11
    return {
      "title": "Sign up",
      "path": "/pages/signUp/index?id="+activityId,
      "imageUrl": ""
    }
  },
  onPageScroll() {
    // 页面滚动时执行
  },
  onResize() {
    // 页面尺寸变化时执行
  },
  onTabItemTap(item) {
    // tab 点击时执行
    console.log(item.index)
    console.log(item.pagePath)
    console.log(item.text)
  },
  // 事件响应函数
  viewTap() {
      this.setData({
        text: 'Set some data for updating view.'
      })
    },
  }
})