// components/dialog/dialog.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isShow: Boolean,
    title: {
      type: String,
      value: '恭喜您，中奖啦！'
    },
    content: {
      type: String,
      value: '恭喜获得2元维他柠檬茶饮料优惠券'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    touchMove() {

    },
    hideModal() {
      this.triggerEvent('cancel')
    },
    showRecord() {
      
    },
    continue() {
      this.triggerEvent('continue')
    }
  }
})
