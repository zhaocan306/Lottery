//计数器
var interval = null;
//值越大旋转时间越长  即旋转速度
var intime = 100;
Page({
  data: {
    isWinning: false,
    isNoWinning: false,
    color: [1, 1, 1, 1, 1, 1, 1, 1],
    block: '/images/bg-block.png',
    unblock: '/images/bg-unblock.png',
    clickName: 'clikWinning'
  },
  /** 中奖显示弹窗 */
  clikWinning() {
    let self = this,
      num = parseInt(Math.random() * 9, 10); //抽奖随机数
    self.data.color = [1, 1, 1, 1, 1, 1, 1, 1];
    var index = 0;
    self.setData({
      clickName: ''
    })
    //循环设置每一项的透明度
    interval = setInterval(() => {
      if (index > 7) {
        index = 0;
        self.data.color[7] = 1
      } else if (index != 0) {
        self.data.color[index - 1] = 1
      }
      self.data.color[index] = 0.5
      self.setData({
        color: self.data.color,
      })
      index++;
    }, intime);

    //模拟网络请求时间  设为一秒
    setTimeout(() => {
      self.stop(num);
    }, 1000)
  },
  // 停止旋转
  stop(which) {
    let self = this;
    //清空计数器
    clearInterval(interval);
    //初始化当前位置
    var current = 1;
    var color = self.data.color;
    // for (let i in color) {
    //   if (color[i] == 0.5) {
    //     current = i;
    //   }
    // }
    //下标从1开始
    var index = current;
    self.stopLuck(which, index, intime, 10);
  },
  /**
  * which:中奖位置
  * index:当前位置
  * time：时间标记
  * splittime：每次增加的时间 值越大减速越快
  */
  stopLuck(which, index, time, splittime) {
    var self = this;

    //值越大出现中奖结果后减速时间越长
    var color = self.data.color;
    setTimeout(() => {
      //重置前一个位置
      if (index > 7) {
        index = 0;
        color[7] = 1
      } else if (index != 0) {
        color[index - 1] = 1
      }
      //当前位置为选中状态
      color[index] = 0.5
      self.setData({
        color: color,
      })
      //如果旋转时间过短或者当前位置不等于中奖位置则递归执行
      //直到旋转至中奖位置
      if (time < 400 || index != which) {
        //越来越慢
        splittime++;
        time += splittime;
        //当前位置+1
        index++;
        self.stopLuck(which, index, time, splittime);
      } else {
        if (which == 2 || which == 6) {
          setTimeout(() => {
            self.setData({
              isNoWinning: true,
              clickName: 'clikWinning'
            })
          }, 1000)
        } else {
          setTimeout(() => {
            self.setData({
              isWinning: true,
              clickName: 'clikWinning'
            })
          }, 1000)
        }
      }
    }, time);
  },
  /** 关闭中奖弹窗 */
  cancelWinning() {
    this.setData({
      isWinning: false
    })
  },
  // 再来一次
  continueWinning() {
    this.setData({
      isWinning: false,
      isNoWinning: false
    })
    this.clikWinning();
  },
  // 关闭没有中奖弹窗
  confirmNoWinning() {
    this.setData({
      isNoWinning: false
    })
  },
  // 关闭没有中奖弹窗
  cancelNoWinning() {
    this.setData({
      isNoWinning: false
    })
  }
})