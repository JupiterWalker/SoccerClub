var app = getApp()

Component({
  data: {
    activity: {
      id: null,
      datetime: null,
      location: null,
      headcount: 0,
      comment: "no comment",
      longitude: 121.379577,
      latitude: 31.114569,
      status: null,
      type: null
    },
    user: {
      openid: null,
      avatarUrl: null,
      nickName: null,
    },
    isCancelled: false,
    isCompleted: false,
    activity_member_id: null,
    showModalStatus: false,
    isJoinButtonContentDisable: false,
    isAbsentButtonContentDisable: false,
    showJoinButton: true,
    showAbsentButton: false,
    absentButtonContent: "鸽",
    joinButtonContent: "报名",
    
    memberInfo: [
      // {"avatar": "https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg", "nickname": "Jim"}
      // {"avatar": "https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg", "nickname": "Jimmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm"}
    ]
  },
  methods: {
  setLeaved(){
    this.setData({
      "isJoinButtonContentDisable": false,
      "isAbsentButtonContentDisable": true,
      "showJoinButton": false,
      "showAbsentButton": true,
    })
  },
  setJoined(){
    this.setData({
      "isJoinButtonContentDisable": true,
      "isAbsentButtonContentDisable": false,
      "showJoinButton": true,
      "showAbsentButton": true,
    })
  },

  onLoad(options) {
    // 
    console.log('signUp onLoad options: ', options)
    if (options.id) {
      this.setData({
        "activity.id": options.id
      });
      // load activity info by id
      console.log("load activity info by id");
      app.cloud.callContainer({
        config: {
          env: 'prod-9g2ku83w83a5f799', // 微信云托管的环境ID
        },
        path: 'activity/'+options.id, // 填入业务自定义路径和参数，根目录，就是 /
        method: 'GET', // 按照自己的业务开发，选择对应的方法
        header: {
          'X-WX-SERVICE': 'django-8l8l', // xxx中填入服务名称（微信云托管 - 服务管理 - 服务列表 - 服务名称）
        },
      }).then(res => {
        console.log("call activity res: ", res)
        let data = res.data["activity_history_list"]["activity_info"];
        let memberInfo = res.data["activity_history_list"]["member_infos"].map(item => {
          let transformedItem = {};
          transformedItem['avatarUrl'] = item['avatar'];
          transformedItem['nickName'] = item['nickname'];
          transformedItem['type'] = item['type'];
          if (item['openid'] == app.globalData.userInfo.openid){
            if (item['type'] == "present"){
              this.setJoined()
            }else if(item['type'] == "take_leave"){
              this.setLeaved()
            }
          }
          return transformedItem;
        });
        this.setData({
          "activity.datetime": data["datetime"],
          "activity.location": data["location"],
          "activity.latitude": data["latitude"],
          "activity.longitude": data["longitude"],
          "activity.headcount": data["headcount"],
          "activity.comment": data["comment"],
          "activity.status": data["status"],
          "activity.type": data["type"],
          memberInfo: memberInfo,
          "user.openid": app.globalData.userInfo.openid,
          "isCancelled": data["status"] == "completed",
          "isCompleted": data["status"] == "cancelled",
        });
        if((data["status"] == "completed") || (data["status"] == "cancelled")) {
          this.setData({
            "isCancelled": data["status"] == "cancelled",
            "isCompleted": data["status"] == "completed",
            "showJoinButton": false,
            "showAbsentButton": false,
          })
        }
      });
    }else{
      console.log("signUp onload got no activity id");
    };
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
  onShareAppMessage() {
    // 页面被用户分享时执行
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
    }, function() {
      // this is setData callback
    })
  },
  powerDrawer(e) {  
    var currentStatu = e.currentTarget.dataset.statu;  
    this.util(currentStatu)  
  },  
  util(currentStatu){  
    /* 动画部分 */  
    // 第1步：创建动画实例   
    var animation = wx.createAnimation({  
      duration: 200,  //动画时长  
      timingFunction: "linear", //线性  
      delay: 0  //0则不延迟  
    });  
      
    // 第2步：这个动画实例赋给当前的动画实例  
    this.animation = animation;  
  
    // 第3步：执行第一组动画：Y轴偏移240px后(盒子高度是240px)，停  
    animation.translateY(240).step();  
  
    // 第4步：导出动画对象赋给数据对象储存  
    this.setData({  
      animationData: animation.export()  
    })  
      
    // 第5步：设置定时器到指定时候后，执行第二组动画  
    setTimeout(function () {  
      // 执行第二组动画：Y轴不偏移，停  
      animation.translateY(0).step()  
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象  
      this.setData({  
        animationData: animation  
      })  
        
      //关闭抽屉  
      if (currentStatu == "close") {  
        this.setData(  
          {  
            showModalStatus: false  
          }  
        );  
      }  
    }.bind(this), 200)  
    
    // 显示抽屉  
    if (currentStatu == "open") {  
      this.setData(  
        {  
          showModalStatus: true  
        }  
      );  
    }  
  },
  onJoin() {
    // check if user exist
    console.log("onJoin app.globalData: ", app.globalData);
    console.log("onJoin: ", app.globalData.userInfo.create_time);
    if (app.globalData.userInfo.create_time===null) {
      // - if not popup user info collect Page, then when click button to join game
      this.util("open")
    }else{
      // - else join game
      console.log("should join the game here, this.data: ", this.data)
      app.cloud.callContainer({
        config: {
          env: 'prod-9g2ku83w83a5f799', // 微信云托管的环境ID
        },
        path: 'member_activity/', // 填入业务自定义路径和参数，根目录，就是 /
        method: 'POST', // 按照自己的业务开发，选择对应的方法
        header: {
          'X-WX-SERVICE': 'django-8l8l', // xxx中填入服务名称（微信云托管 - 服务管理 - 服务列表 - 服务名称）
        },
        data: {
          "openid": this.data.user.openid, 
          "activity_id": this.data.activity.id
        },
      }).then(res => {
        console.log('update app.globalData.userInfo', res);
        let memberInfo = res.data["member_infos"].map(item => {
          let transformedItem = {};
          transformedItem['avatarUrl'] = item['avatar'];
          transformedItem['nickName'] = item['nickname'];
          return transformedItem;
        });
        this.setData({
          memberInfo: memberInfo,
          "activity.datetime": res.data["activity"]["datetime"],
          "activity.location": res.data["activity"]["location"],
          "activity.headcount": res.data["activity"]["headcount"],
          "activity.comment": res.data["activity"]["comment"],
          "activity.longitude": res.data["activity"]["longitude"],
          "activity.latitude": res.data["activity"]["latitude"],
          "activity_member_id": res.data["activity_member_id"]
        })
      })
      // join button change text to "already", and enable the "ask leave" button
      this.setData({
        joinButtonContent: "已报名",
        isJoinButtonContentDisable: true,
        showAbsentButton: true
      })
    }
},
 onAbsent() {
    //
    console.log("should absent absent game here");
    app.cloud.callContainer({
      config: {
        env: 'prod-9g2ku83w83a5f799', // 微信云托管的环境ID
      },
      path: 'member_activity/', // 填入业务自定义路径和参数，根目录，就是 /
      method: 'PUT', // 按照自己的业务开发，选择对应的方法
      header: {
        'X-WX-SERVICE': 'django-8l8l', // xxx中填入服务名称（微信云托管 - 服务管理 - 服务列表 - 服务名称）
      },
      data: {
        "openid": this.data.user.openid, 
        "activity_id": this.data.activity.id,
        "activity_member_id": this.data.activity_member_id,
        "type": "take_leave"
      },
    }).then(res => {
      console.log('update app.globalData.userInfo', res);
      let memberInfo = res.data["member_infos"].map(item => {
        let transformedItem = {};
        transformedItem['avatarUrl'] = item['avatar'];
        transformedItem['nickName'] = item['nickname'];
        transformedItem['type'] = item['type'];
        return transformedItem;
      });
      this.setData({
        "memberInfo": memberInfo,
        "activity.datetime": res.data["activity"]["datetime"],
        "activity.location": res.data["activity"]["location"],
        "activity.headcount": res.data["activity"]["headcount"],
        "activity.comment": res.data["activity"]["comment"],
        "activity.longitude": res.data["activity"]["longitude"],
        "activity.latitude": res.data["activity"]["latitude"],
      })
    })
    this.setData({
      showJoinButton: false,
      isAbsentButtonContentDisable: true,
      absentButtonContent: "已鸽"
  });
},
  onSaveInfoAndJoin() {
    // create new user
    console.log("create new user", this.data.user.avatarUrl, this.data.user.nickName);
    if (this.data.user.nickName === null || this.data.user.avatarUrl === null) {
      wx.showModal({
        title: '必填',
        content: '报个名，露个脸!蟹蟹~',
        success (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
          return
        }
      })
    }
    app.setUserInfo(this.data.user.nickName, this.data.user.avatarUrl
      ).then(userInfo => {
        //update global userinfo here
        app.globalData.userInfo = userInfo
        // join button change text to "already", and enable the "ask leave" button
        this.onJoin()
        this.setData({
          showModalStatus: false
        })
      })
  },
  onInputChange(e: any) {
    const nickName = e.detail.value
    console.log('onInputChange', nickName)
    this.setData({
      "user.nickName": nickName,
    });
  },
  onChooseAvatar(e: any) {
    console.log('onChooseAvatar', e);
    const avatarUrl = e.detail.avatarUrl
    this.setData({
      "user.avatarUrl": avatarUrl
    });
    console.log('avatarUrl', avatarUrl);
    app.uploadAvatarAndGetPath(avatarUrl, this.data.user.openid
      ).then(newAvatarUrl => {
        this.setData({
          "user.avatarUrl": newAvatarUrl
        });
      })
    
  }
}
})