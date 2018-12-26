App({
  onLaunch: function() {
    // 登录
    wx.login({
      success: function(res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'http://192.168.1.107:8080//washcar/applet/userLogin',
            method: 'POST',
            data: {
              code: res.code
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function(data) {
              console.log(data)
              // 把用户信息加入缓存
              //将oppid放到缓存中
              wx.setStorageSync('ppid', {
                openid: data.data.data.user.applet_code
              });
              console.log(data.data.data.user.applet_code)
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    });
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    // 获取页面信息
    let systemInfo = wx.getSystemInfoSync();
    wx.setStorageSync('PX_TO_RPX', {
      px2rpxWidth: systemInfo.windowWidth / 750,
      px2rpxHeight: systemInfo.screenHeight / 1334
    });
  },
  globalData: {
    userInfo: null,
    Rcode:'false'//二维码扫描的code
  }
})