var app = getApp<IAppOption>()


Component({
  data:{
    dataList:[
      {'date':'2023-05-27','part':'18:00-20:00','content':'地点:初晟足球场\n参加人数: 24'},
      {'date':'2023-05-28','part':'18:00-20:00','content':'地点:初晟足球场\n参加人数: 24'},
      {'date':'2023-05-29','part':'18:00-20:00','content':'地点:初晟足球场\n参加人数: 24'},
      {'date':'2023-05-30','part':'18:00-20:00','content':'地点:初晟足球场\n参加人数: 24'},
      {'date':'2023-05-31','part':'18:00-20:00','content':'地点:初晟足球场\n参加人数: 24'},
    ],
  },
  methods: {
    onCheckDetail() {
    console.log("time-line onCheckDetail")
    wx.navigateTo({
      url: '/pages/historyActivity/index'
    });
  }
  },
})


