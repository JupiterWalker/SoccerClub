var app = getApp()

Page({
  data: {
    historyDataList: []
  },
  onLoad: function() {
    app.getActivityHistory(null, null
      ).then(res => {
        console.log("my info res: ", res)
        let historyDataList = []; // 用于存储处理后的数据

        for (let item of res.activity_history_list) {
          let status;
          let color;
          if (item.status === "published") {
            status = '火热报名中';
            color = "red";
          } else if (item.status === "cancelled") {
            status = '已取消';
            color = "gray"; // 注意这里是 "gray" 而不是 "greay"
          } else if (item.status === "completed") {
            status = '已结束';
            color = "green";
          }

          let rendered_type;
          if (item.type === "match") {
            rendered_type = '球赛⚽';
          } else if (item.type === "tb") {
            rendered_type = '聚餐🍻';
          } else {
            rendered_type = '其他';
          }

          // 将处理后的数据添加到historyDataList数组中
          // 注意：原伪代码中的 'appen' 应为 'push'，且 'activity_id' 应为 'item.activity_id' 而不是 'item.datetime'
          historyDataList.push({
            'datetime': item.datetime,
            'location': item.location,
            'status': status,
            'color': color,
            'activity_id': item.activity_id, // 假设item中有一个activity_id字段
            'type': rendered_type
          });
        }
        this.setData({
          "historyDataList": historyDataList
        })
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
  // 事件响应函数
  viewTap: function() {
    this.setData({
      text: 'Set some data for updating view.'
    }, function() {
      // this is setData callback
    })
  },
  // 自由数据
  customData: {
    hi: 'MINA'
  }
})