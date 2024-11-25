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
    
},
lifetimes: {
  attached() {
    console.log("activiti-com attached")
  }
}
}
)