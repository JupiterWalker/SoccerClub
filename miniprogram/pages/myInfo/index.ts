// index.ts

import { useParamsEaseFuncs } from "XrFrame/xrFrameSystem";
import Upload from "../../components/upload/upload"

// 获取应用实例
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'


var app = getApp<IAppOption>()
Component({
  data: {
    openid: null,
    avatar: null,
    nickname: null,
    motto: 'Hello World',
    userInfo: app.globalData.userInfo,
    hasUserInfo: false,
    canIUseGetUserProfile: wx.canIUse('getUserProfile'),
    canIUseNicknameComp: wx.canIUse('input.type.nickname'),
  },
  methods: {
    async getCurrentUserInfo() {
    },
    async onLoad() {
      console.log("[my info] on load")
      console.log("[my info] avatar: ", app.globalData.userInfo.avatar)
      var avatar;
      if (app.globalData.userInfo.local_avatar) {
        console.log('load local avatar')
        avatar = app.globalData.userInfo.local_avatar;
      }  
      else {
        console.log('load cloud avatar')
        avatar = app.globalData.userInfo.avatar;
      }
      this.setData({
        "openid": app.globalData.userInfo.openid,
        "avatar": avatar,
        "nickname": app.globalData.userInfo.nickname,
      })
    },
    // 事件处理函数
    bindViewTap() {
      wx.navigateTo({
        url: '../logs/logs',
      })
    },
    async uploadAvatarAndGetPath(openid, avatarUrl) {
      console.log("call clound func uploadAvatarAndGetOpenid in  uploadAvatarAndGetPath, params: " + avatarUrl + ', ' + openid)
      var uploadRes;
      uploadRes = await app.cloud.uploadFile({
        // cloudPath: 'test/' + 'avatar' + openid + '?t=' + Date.now(),
        cloudPath: 'test/' + 'avatar' + openid,
        filePath: avatarUrl,
        config: {
          env: 'prod-9g2ku83w83a5f799' // 需要替换成自己的微信云托管环境ID
        }
      });
      console.log('uploadRes:', uploadRes);
      const new_avatarUrl = uploadRes.fileID;
      app.globalData.userInfo.avatar = new_avatarUrl
      return {
        "avatarUrl": new_avatarUrl
      }
    },
    updateUserInfo(opendid, key, value) {
      console.log('call updateUserInfo key: ' + key + ' value: '+value)
      const data = {};
      data[key] = value;
    
      app.cloud.callContainer({
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
      })
    },
    onChooseAvatar(e: any) {
      console.log('onChooseAvatar', e)
      const { avatarUrl } = e.detail
      this.setData({
        "avatar": avatarUrl
      });
      app.globalData.userInfo.local_avatar = avatarUrl
      this.uploadAvatarAndGetPath(this.data.openid, avatarUrl).then(
        res => {
          this.updateUserInfo(this.data.openid, 'avatar', res.avatarUrl)
        }
      );
    },
    onSave(){
      // openid, avatarUrl = this.uploadAvatarAndGetPath()
      // updateUserInfo(openid, avatarUrl, nickName)
    },
    onInputChange(e: any) {
      const nickName = e.detail.value
      console.log('onInputChange', nickName)
      const { avatarUrl } = this.data.userInfo
      this.setData({
        "userInfo.nickname": nickName,
      });
      app.globalData.userInfo.nickname = nickName
      this.updateUserInfo(this.data.openid, 'nickname', nickName)
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
    }
  }
})
