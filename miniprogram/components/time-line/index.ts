var app = getApp<IAppOption>()


Component({
  data:{
    dataList1:[
      {'datetime':'2023-05-27 18:00-20:00','location':'初晟足球场', 'latitude': 1.111, 'longitude': 1.1111, 'status': '火热报名中', 'color': 'red', 'activity_id': 1, 'type': '球赛⚽', 'headcount': 25, 'comment': ''},
      {'datetime':'2023-05-27 18:00-20:00','location':'初晟足球场', 'latitude': 1.111, 'longitude': 1.1111, 'status': '已结束', 'color': 'green', 'activity_id': 2, 'type': '球赛⚽', 'headcount': 25, 'comment': ''},
      {'datetime':'2023-05-27 18:00-20:00','location':'初晟足球场', 'latitude': 1.111, 'longitude': 1.1111, 'status': '已取消', 'color': 'gray', 'activity_id': 3, 'type': '球赛⚽', 'headcount': 25, 'comment': ''},
      {'datetime':'2023-05-27 18:00-20:00','location':'东北地锅鸡', 'latitude': 1.111, 'longitude': 1.1111, 'status': '已结束', 'color': 'green', 'activity_id': 4, 'type': '聚餐🍻', 'headcount': 25, 'comment': ''},
      {'datetime':'2023-05-27 18:00-20:00','location':'初晟足球场', 'latitude': 1.111, 'longitude': 1.1111, 'status': '已结束', 'color': 'green', 'activity_id': 5, 'type': '球赛⚽', 'headcount': 25, 'comment': ''},
    ],
  },
  properties: {
    dataList: {
      type: Array,
      default: []
    }
  },
  methods: {
    onCheckDetail(e) {
    console.log("time-line onCheckDetail e: ", e)
    const url = `/pages/signUp/index?id=${e.currentTarget.dataset.id}`;

        // 使用 wx.navigateTo 跳转到详情页面，并传递所有参数
        wx.navigateTo({
          url: url
        });
    }
  }
})


