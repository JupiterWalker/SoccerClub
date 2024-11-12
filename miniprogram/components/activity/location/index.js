Page({
  data: {
    mode: '',
    datetimeVisible: false,
    datetime: new Date().getTime(),
    datetimeText: '',
    project: {}
  },
  showPicker(e) {
    const { mode } = e?.currentTarget?.dataset;
    this.setData({
      mode,
      [`${mode}Visible`]: true,
    });
  },
  hidePicker() {
    const { mode } = this.data;
    this.setData({
      [`${mode}Visible`]: false,
    });
  },
  onConfirm(e) {
    const { value } = e?.detail;
    const { mode } = this.data;

    console.log('confim', value);

    this.setData({
      [mode]: value,
      [`${mode}Text`]: value,
    });

    this.hidePicker();
  },

  onColumnChange(e) {
    console.log('pick', e?.detail?.value);
  },

  onLocation (e) {
     // 打开地图选择位置，获取 纬度 、精度
    const { latitude, longitude }  = wx.chooseLocation({
      success: res => {
      console.log(res);
    }
  })
    console.log(latitude, longitude)
},
});
