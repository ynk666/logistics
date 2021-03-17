//index.js
const app = getApp()
  
Page({
  data: {
    result:[]
  },

  onLoad: function() {
    
  },

  
  getScancode: function() {
    var that = this;
    // 允许从相机和相册扫码
    wx.scanCode({
      success: (res) => {
        // var result = res.result;;
        var obj={};
        obj.result=res.result;
        obj.zhuangtai='已接送';
        let ceshi = that.data.result;
        ceshi.push(obj)
        that.setData({
          result:ceshi
        })
      }
    })
 
  },
  goToTalkPage(){
    wx.navigateTo({ url: '/pages/gototalkpage/gototalkpage', })
  }
})
