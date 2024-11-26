Component({
  properties: {
    // 这里定义了组件的属性
    commentContent: {
      type: String,
      value: null
    },
    isReadonly: {
      type: Boolean,
      value: false
    },
    headCount: {
      type: Number,
      value: null
    },
    recievedDatetimeText: {
      type: String,
      value: null
    },
    longitude: {
      type: Float32Array,
      value: null
    },
    latitude: {
      type: Float32Array,
      value: null
    },
    locationText: {
      type: String,
      value: null
    },

  },
  data: {
    autosize: {
      maxHeight: 120,
      minHeight: 20,
    },
    // 组件的内部数据
  },
  methods: {
    // 组件的方法
    forwardDatetimeEvent(e) {
      console.log('triggered forwardDatetimeEvent: ', e);
      var myEventDetail = e.detail // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent('DatetimeEvent', myEventDetail, myEventOption)
    },
    forwardLocationEvent(e) {
      console.log('triggered forwardLocationEvent: ', e);
      var myEventDetail = e.detail // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent('LocationEvent', myEventDetail, myEventOption)
    },
    forwardHeadcountEvent(e) {
      console.log('triggered forwardHeadcountEvent: ', e);
      var myEventDetail = e.detail // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent('HeadcountEvent', myEventDetail, myEventOption)
    },
    forwardCommentEvent(e) {
      console.log('triggered forwardCommentEvent: ', e);
      var myEventDetail = e.detail // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent('CommentEvent', myEventDetail, myEventOption)
    },
},
lifetimes: {
  attached() {
  }
}
}
)