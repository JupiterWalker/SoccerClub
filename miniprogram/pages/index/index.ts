// index.ts
// 获取应用实例
var app = getApp<IAppOption>()
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Component({
  data: {
    motto: 'Hello World',
    userInfo: {
      avatarUrl: defaultAvatarUrl,
      nickName: '',
    },
    hasUserInfo: false,
    canIUseGetUserProfile: wx.canIUse('getUserProfile'),
    canIUseNicknameComp: wx.canIUse('input.type.nickname'),
  },
  methods: {
    // 事件处理函数
    bindViewTap() {
      wx.navigateTo({
        url: '../logs/logs',
      })
    },
    onChooseAvatar(e: any) {
      console.log('onChooseAvatar', e)
      const { avatarUrl } = e.detail
      const { nickName } = this.data.userInfo
      this.setData({
        "userInfo.avatarUrl": avatarUrl,
        hasUserInfo: nickName && avatarUrl && avatarUrl !== defaultAvatarUrl,
      })
    },
    onInputChange(e: any) {
      console.log('onInputChange', e)
      const nickName = e.detail.value
      const { avatarUrl } = this.data.userInfo
      this.setData({
        "userInfo.nickName": nickName,
        hasUserInfo: nickName && avatarUrl && avatarUrl !== defaultAvatarUrl,
      })
    },
    getUserProfile() {
      // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
      wx.getUserProfile({
        desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          console.log(res)
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    },
    navigateToClubInfo() {
      wx.navigateTo({
        url: '/pages/clubInfo/index'
      });
      // const cloud = new wx.cloud.Cloud({
      //   resourceAppid: 'wx6380c8fd6bba1d82', // 微信云托管环境所属账号，服务商appid、公众号或小程序appid
      //   resourceEnv: 'prod-9g2ku83w83a5f799', // 微信云托管的环境ID
      // })
      wx.cloud.init() // init过程是异步的，需要等待init完成才可以发起调用
      wx.cloud.callFunction({
        // 需调用的云函数名
        name: 'get_user_id',
        // 传给云函数的参数
        data: {
          a: 12,
          b: 19,
        },
        // 成功回调
        complete: console.log
      })
    },
    navigateToMemberInfo() {
      wx.navigateTo({
        url: '/pages/memberInfo/index'
      });
    },
    navigateToJoinUs() {
      wx.navigateTo({
        url: '/pages/joinUs/index'
      });
    },
    navigateToMatch() {
      wx.navigateTo({
        url: '/pages/match/index'
      });
    },
    onCreateActivity() {
      wx.navigateTo({
        url: '/pages/createActivity/index'
      });
    },
    onCheckHistory() {
      wx.navigateTo({
        url: '/pages/checkHistory/index'
      });
    },
    onShareAppMessage(){
      return {
        "title": "Sign up",
        "path": "/pages/signUp/index",
        "imageUrl": ""
      }
    },
    onCheckMyInfo(){
      wx.navigateTo({
        url: '/pages/myInfo/index'
      });
    }
  },
})
