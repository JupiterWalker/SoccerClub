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
  },
  setUserInfo(nickName, AvatartUrl, type="guest"){
    const data = {"avatar": AvatartUrl, "nickname": nickName, "type": type}
    this.cloud.callContainer({
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
  uploadAvatarAndGetPath(avatartUrl, openid){
    console.log("call app uploadAvatarAndGetPath, params: " + avatarUrl + ', ' + openid)
    const uploadRes = await app.cloud.uploadFile({
      // cloudPath: 'test/' + 'avatar' + openid + '?t=' + Date.now(),
      cloudPath: 'test/' + 'avatar' + openid,
      filePath: avatarUrl,
      config: {
        env: 'prod-9g2ku83w83a5f799' // 需要替换成自己的微信云托管环境ID
      }
    });
    console.log('uploadRes:', uploadRes);
    const new_avatarUrl = uploadRes.fileID;
    return new_avatarUrl
  }
})