var app = getApp()

Component({
  data: {
    datetime: null,
    location: null, 
    type: "match",
    latitude: null,
    longitude: null,
    headcount: 0,
    comment: "",
    activity_id: null,
    openid: null,
    is_created: false
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
      "location": e.detail.location,
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
    console.log("onShareAppMessage")
    return {
      "title": "Sign up",
      "path": "/pages/signUp/index?id="+this.data.activity_id,
      "imageUrl": ""
    }
  },
  onCreateActivity(res) {
    console.log("createActivity onShareAppMessage is called: ", res)
      
    if (!this.data.datetime) {
          wx.showModal({
            title: '必填',
            content: '请填写日期时间~',
        success (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
      return
  }else if (!this.data.location) {
    wx.showModal({
      title: '必填',
      content: '请填写位置~',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    return
  }else if (!this.data.headcount) {
    wx.showModal({
      title: '必填',
      content: '请填写最大报名人数~',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
        
      }
    })
    return
  }
    // create activity
    app.cloud.callContainer({
      config: {
        env: 'prod-9g2ku83w83a5f799', // 微信云托管的环境ID
      },
      path: 'activity/', // 填入业务自定义路径和参数，根目录，就是 /
      method: 'POST', // 按照自己的业务开发，选择对应的方法
      header: {
        'X-WX-SERVICE': 'django-8l8l', // xxx中填入服务名称（微信云托管 - 服务管理 - 服务列表 - 服务名称）
      },
      data: {
        "openid": this.data.openid, 
        "location": this.data.location,
        "latitude": this.data.latitude,
        "longitude": this.data.longitude,
        "datetime": this.data.datetime,
        "type": this.data.type,
        "comment": this.data.comment,
        "headcount": this.data.headcount,
      },
    }).then(res => {
      console.log("created activity: ", res)
      this.setData({
        activity_id: res.data.activity_id,
        is_created: true
      })
    })
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