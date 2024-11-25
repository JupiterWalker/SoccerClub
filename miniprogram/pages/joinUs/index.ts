var app = getApp()

Component({
  data: {
    text: "This is page data.",
    openid: null,
    avatarUrl: null,
    nickname: null
  },
  methods: {
  onLoad: function() {
    console.log("[my info] on load")
      console.log("[my info] avatar: ", app.globalData.userInfo.avatar)
      var avatarUrl;
      if (app.globalData.userInfo.local_avatar) {
        console.log('load local avatar')
        avatarUrl = app.globalData.userInfo.local_avatar;
      }  
      else {
        console.log('load cloud avatar')
        avatarUrl = app.globalData.userInfo.avatar;
      }
      this.setData({
        "openid": app.globalData.userInfo.openid,
        "avatarUrl": avatarUrl,
        "nickname": app.globalData.userInfo.nickname,
      })
  },
  onShow: function() {
    // 页面出现在前台时执行
  },
  onReady: function() {
    // 页面首次渲染完毕时执行
  },
  onHide: function() {
    // 页面从前台变为后台时执行
  },
  onUnload: function() {
    // 页面销毁时执行
  },
  onPullDownRefresh: function() {
    // 触发下拉刷新时执行
  },
  onReachBottom: function() {
    // 页面触底时执行
  },
  onShareAppMessage: function () {
    // 页面被用户分享时执行
  },
  onPageScroll: function() {
    // 页面滚动时执行
  },
  onResize: function() {
    // 页面尺寸变化时执行
  },
  onTabItemTap(item) {
    // tab 点击时执行
    console.log(item.index)
    console.log(item.pagePath)
    console.log(item.text)
  },
  onInputChange(e: any) {
    console.log('onInputChange', e)
    const nickname = e.detail.value
    this.setData({
      "nickname": nickname,
    });
  },
  onChooseAvatar(e: any) {
      const avatarUrl  = e.detail.avatarUrl
      console.log('onChooseAvatar', avatarUrl)
      this.setData({
        "avatarUrl": avatarUrl,
      });
      app.globalData.userInfo.local_avatar = avatarUrl
  },
  async uploadAvatarAndGetPath(openid, avatarUrl) {
    console.log("call clound func uploadAvatarAndGetOpenid in  uploadAvatarAndGetPath, params: " + openid + ', ' + avatarUrl)
    var uploadRes;
    uploadRes = await app.cloud.uploadFile({
      cloudPath: 'test/' + 'avatar' + openid,
      filePath: avatarUrl,
      config: {
        env: 'prod-9g2ku83w83a5f799' // 需要替换成自己的微信云托管环境ID
      }
    });
    console.log('uploadRes:', uploadRes);
    const new_avatarUrl = uploadRes.fileID;
    return {
      avatarUrl: new_avatarUrl
    }
  },
  onApply() {
    console.log('call onApply');
    if (this.data.avatarUrl !== "None") {
      this.uploadAvatarAndGetPath(this.data.openid, this.data.avatarUrl).then(
        res => {
          app.globalData.userInfo.avatar = res.avatarUrl
        }
      );
    }
    if (!this.data.nickname) {
      wx.showModal({
        title: '必填',
        content: '告知名号,方便联系!蟹蟹~',
        success (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
    const data = {
      "avatar": app.globalData.userInfo.avatar,
    "nickname": this.data.nickname
  };
    app.cloud.callContainer({
      config: {
        env: 'prod-9g2ku83w83a5f799', // 微信云托管的环境ID
      },
      path: 'apply_join_club/', // 填入业务自定义路径和参数，根目录，就是 /
      method: 'POST', // 按照自己的业务开发，选择对应的方法
      header: {
        'X-WX-SERVICE': 'django-8l8l', // xxx中填入服务名称（微信云托管 - 服务管理 - 服务列表 - 服务名称）
      },
      data: data,
    }).then(res => {
      console.log('call set_user_info API', res);
    })
  },
  // 事件响应函数
  viewTap: function() {
    this.setData({
      text: 'Set some data for updating view.'
    }, function() {
      // this is setData callback
    })
  }
}
})
