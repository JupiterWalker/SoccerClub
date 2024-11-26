var app = getApp()

Component({
  data: {
    text: "This is page data.",
    openid: null,
    avatarUrl: null,
    nickName: null,
    showModalStatus: false,
    datetime: "null",
    location: "null",
    headCount: 0,
    comment: "no comment",
    isJoinButtonContentDisable: false,
    isAbsentButtonContentDisable: false,
    showJoinButton: true,
    showAbsentButton: false,
    absentButtonContent: "鸽",
    joinButtonContent: "报名",
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
    console.log('signUp onLoad options: ', options)
    if (options.id) {
      // load activity info by id
      console.log("load activity info by id");
      this.setData({
        datetime: "2024-11-25 12:25:38.053749",
        location: "chusheng",
        headCount: 25,
        comment: "no comment"
      })
    }else{};
    // 页面创建时执行
    console.log("signUp onload");
    // check if current activity is joined
    // - if joined, then show "ask leave"
    // - else show "join"
    this.setData({
    })
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
    console.log("onJoin: ", app.globalData.userInfo.create_time);
    if (app.globalData.userInfo.create_time===null) {
      // - if not popup user info collect Page, then when click button to join game
      this.util("open")
    }else{
      // - else join game
      console.log("should join the game here")
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
    this.setData({
      showJoinButton: false,
      isAbsentButtonContentDisable: true,
      absentButtonContent: "已鸽"
  });
},
  onSaveInfoAndJoin() {
    // create new user
    console.log("create new user", this.data.avatarUrl, this.data.nickName);
    console.log("should join game here");
      // join button change text to "already", and enable the "ask leave" button
    this.setData({
      joinButtonContent: "已报名",
      isJoinButtonContentDisable: true,
      showAbsentButton: true,
      showModalStatus: false
    })
  },
  onInputChange(e: any) {
    const nickName = e.detail.value
    console.log('onInputChange', nickName)
    this.setData({
      "nickName": nickName,
    });
  },
  onChooseAvatar(e: any) {
    console.log('onChooseAvatar', e)
    const { avatarUrl } = e.detail
    this.setData({
      "avatarUrl": avatarUrl
    });
  }
}
})