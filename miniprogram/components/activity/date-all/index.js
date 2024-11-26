Page({
  data: {
    mode: '',
    datetimeVisible: false,
    datetime: new Date().getTime(),
    datetimeText: '',
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
    var myEventDetail = {"datetime": value} // detail对象，提供给事件监听函数
    var myEventOption = {} // 触发事件的选项
    this.triggerEvent('DatetimeEvent', myEventDetail, myEventOption)
    console.log('triggered DatetimeEvent: ', value);

    this.setData({
      [mode]: value,
      [`${mode}Text`]: value,
    });

    this.hidePicker();
  },

  onColumnChange(e) {
    console.log('pick', e?.detail?.value);
  },
});
