// miniprogram/pages/gototalkpage/gototalkpage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stateData:['到达转运站','离开转运站','到达目的地站点'],
    index:0,
    result:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.setData({
    //   index: 0
    // })
    this.weizhi()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  bindPickerChange: function(e) {
    this.setData({
      index: e.detail.value
    })
  },
  getScancode: function() {
    var that = this;
    // 允许从相机和相册扫码
    wx.scanCode({
      success: (res) => {
        // var result = res.result;;
        // var obj={};
        // obj.result=res.result;
        let ceshi = that.data.result;
        if(ceshi.indexOf(res.result) > -1){

        }else{
          ceshi.push(res.result)
        }
        
        that.setData({
          result:ceshi
        })
      }
    })
 
  },
  clear(){
    let result=[]
    this.setData({
      result
    })
  },
  delete(e){
    let index=e.currentTarget.dataset.num
    let result=this.data.result
    
    let end=result.splice(index,1)
    
    this.setData({
      result
    })
  },
  submit(){
    if(this.data.result.length==0){
      wx.showModal({  
        title: '提示',  
        content: '您没有扫描任何订单!',  
        success: function(res) {  
            if (res.confirm) {  
            console.log('用户点击确定')  
            } else if (res.cancel) {  
            console.log('用户点击取消')  
            }  
        }  
    })  
    }
  },
  weizhi(){
    wx.getLocation({
      success(res) {
        that.setData({
          currentLon: res.longitude,
          currentLat: res.latitude,
        });
      },
      fail: function () {
        wx.getSetting({
          success: function (res) {
            var statu = res.authSetting;
            if (!statu['scope.userLocation']) {
              wx.showModal({
                title: '是否授权当前位置',
                content: '需要获取您的地理位置，请确认授权，否则地图功能将无法使用',
                success: function (tip) {
                  console.log(1)
                  if (tip.confirm) {
                    console.log(1)
                    wx.openSetting({
                      success: function (data) {
                        if (data.authSetting["scope.userLocation"] === true) {
                          wx.showToast({
                            title: '授权成功',
                            icon: 'success',
                            duration: 1000
                          })
                          wx.getLocation({
                            success(res) {
                              that.setData({
                                currentLon: res.longitude,
                                currentLat: res.latitude,
                              });
                            },
                          });
                        } else {
                          wx.showToast({
                            title: '授权失败',
                            icon: 'success',
                            duration: 1000
                          })
                          wx.navigateBack({
                            delta: -1
                          });
                        }
                      }
                    })
                  }else{
                    wx.navigateBack({
                      delta: -1
                    });
                  }
                }
              })
            }
          },
          fail: function (res) {
            wx.showToast({
              title: '调用授权窗口失败',
              icon: 'success',
              duration: 1000
            })
            wx.navigateBack({
              delta: -1
            });
          }
        })
      }
    })
  }
  // a(){
  //   let result = this.data.result
  //   console.log(result)
  // }
})