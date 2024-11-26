Component({
  data: {
    locationTitle: "选择位置",
    locationText: ""
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
    isReadonly: {
      type: Boolean,
      value: false
    },
  },
  methods: {
    onLocation (e) {
      console.log('location onLocation e: ', e)
      console.log('location onLocation this.properties: ', this.properties)
      if (this.properties.isReadonly){
          wx.openLocation(
            {      
              latitude: this.properties.latitude,
              longitude: this.properties.longitude,
            success: res => {
            console.log(res);
          }
        })
      }else {
        // 打开地图选择位置，获取 纬度 、精度
        wx.chooseLocation({
          success: res => {
          console.log('chooseLocation: ', res);
          var myEventDetail = {
            "location": res.name, 
            "latitude": res.latitude, 
            "longitude": res.longitude
          } // detail对象，提供给事件监听函数
          var myEventOption = {} // 触发事件的选项
          this.setData({
            locationText: res.name
          });
          this.triggerEvent('LocationEvent', myEventDetail, myEventOption)
        }
        })
      }
       
    },
  },
  lifetimes: {
    attached() {
      if (this.properties.isReadonly){
          this.setData({
            locationTitle: "活动位置"
          })
      }else{
        this.setData({
          locationTitle: "选择位置"
        })
      }
      }
      
  }
});
