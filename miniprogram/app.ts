// app.ts
const cloud = wx.cloud
// 初始化云开发环境
cloud.init(); // init过程是异步的，需要等待init完成才可以发起调用

App<IAppOption>({
  globalData: {},
  cloud: cloud,
  onLaunch() {
    // 登录
    // wx.login({
    //   success: res => {
    //     console.log('wx login: ', res.code)
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   },
    // })
    this.cloud.callContainer({
        config: {
          env: 'prod-9g2ku83w83a5f799', // 微信云托管的环境ID
        },
        path: 'get_user_info/', // 填入业务自定义路径和参数，根目录，就是 / 
        method: 'GET', // 按照自己的业务开发，选择对应的方法
        header: {
          'X-WX-SERVICE': 'django-8l8l', // xxx中填入服务名称（微信云托管 - 服务管理 - 服务列表 - 服务名称）
        }
      }).then(res => {
        console.log('call API success', res);
        this.globalData.userInfo = res.data;
        // 在这里处理成功的返回值
      })
      .catch(err => {
        console.error('call API failed', err);
        // 在这里处理失败的错误信息
      });
    wx.getLocation({
      type: 'wgs84',
      success(res) {
      this.globalData.latitude = res.latitude
      this.globalData.longitude = res.longitude
      // const speed = res.speed
      // const accuracy = res.accuracy
      console.log(latitude,longitude)
      }
    })
    console.log("wx.getLocation done")
  },
  setUserInfo(nickName, AvatartUrl, type="guest"){
    const data = {"avatar": AvatartUrl, "nickname": nickName, "type": type}
    return this.cloud.callContainer({
      config: {
        env: 'prod-9g2ku83w83a5f799', // 微信云托管的环境ID
      },
      path: 'set_user_info/', // 填入业务自定义路径和参数，根目录，就是 /
      method: 'PUT', // 按照自己的业务开发，选择对应的方法
      header: {
        'X-WX-SERVICE': 'django-8l8l', // xxx中填入服务名称（微信云托管 - 服务管理 - 服务列表 - 服务名称）
      },
      data: data,
    }).then(res => {
      console.log('update app.globalData.userInfo', res);
      return res.data
    })
  },
  uploadAvatarAndGetPath(avatarUrl, openid){
    console.log("call app uploadAvatarAndGetPath, params: " + avatarUrl + ', ' + openid)
    return this.cloud.uploadFile({
      cloudPath: 'test/' + 'avatar' + openid,
      filePath: avatarUrl,
      config: {
        env: 'prod-9g2ku83w83a5f799' // 需要替换成自己的微信云托管环境ID
      }
    }).then(uploadRes => {
      console.log('uploadRes:', uploadRes);
      const new_avatarUrl = uploadRes.fileID;
      return new_avatarUrl;
    });
  },
  getActivityHistory(openid, activity_id){
    console.log("call app getActivityHistory, params: " + openid)
    let url;

    if (!openid && !activity_id) {
        url = 'activity/';
    } else {
        url = !openid ? 'activity/' + (activity_id ? activity_id + '/' : '') : 'member_activity/';
    }
  
    return this.cloud.callContainer({
      config: {
        env: 'prod-9g2ku83w83a5f799', // 微信云托管的环境ID
      },
      path: url, // 填入业务自定义路径和参数，根目录，就是 /
      method: 'GET', // 按照自己的业务开发，选择对应的方法
      header: {
        'X-WX-SERVICE': 'django-8l8l', // xxx中填入服务名称（微信云托管 - 服务管理 - 服务列表 - 服务名称）
      },
    }).then(res => {
      console.log('update app.globalData.userInfo', res);
      return res.data
    })
  }
})