Component({
  data: {
  },
  properties: {
    // 这里定义了组件的属性
    latitude: {
      type: Float32Array,
      value: 31.114569
    },
      longitude: {
      type: Float32Array,
      value: 121.379577
    },
    locationText: {
      type: String,
      value: null
    },
  },
  methods:{
    onOpenLocation (e) {
      console.log('location onLocation e: ', e)
      console.log('location onLocation this.properties: ', this.properties)
       // 打开地图选择位置，获取 纬度 、精度
      wx.openLocation(
        {      
          latitude: this.properties.latitude,
          longitude: this.properties.longitude,
        success: res => {
        console.log(res);
      }
    })
  },
  },
//   lifetimes: {
//     attached() {
//       console.log("show-location-com attached: ", this.properties)
//   }
// }
});
