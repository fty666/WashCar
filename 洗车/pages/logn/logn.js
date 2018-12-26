// pages/logn/logn.js
const app = getApp()
const fundata = require('../../utils/date.js');
const util = require('../../utils/util.js');
var iu = 60;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    px2rpxHeight: '',
    px2rpxWidth: '',
    time: '', //获取验证码时间
    code: true, //判断显示code显示
    mobile: '', //手机号
    sms: '', //验证码
    mask: false, //遮罩层
    scode: '', //店铺coe
    opid: '', //oppid
    isIphoneX:false,//ipx
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    let that = this;
    //获取缓存
    wx.getStorage({
      key: 'PX_TO_RPX',
      success: function(res) {
        that.setData({
          px2rpxHeight: res.data.px2rpxHeight,
          px2rpxWidth: res.data.px2rpxWidth,
          scode: options.scode
        })
      }
    })
    wx.getStorage({
      key: 'ppid',
      success: function(res) {
        let oids = res.data.openid;
        that.setData({
          opid: oids
        })
      }
    })

    wx.getSystemInfo({
      success: function (res) {
        console.log(res)
        if (res.model == 'iPhone X') {
          that.setData({
            isIphoneX: true
          })
        }
      }
    })
  },


  /**
   *获取手机号 
   */
  phone(e) {
    let phone = e.detail.value;
    let res = util.checkReg(1, phone);
    if (res == false) {
      wx.showToast({
        title: '手机号输入有误',
        icon: 'none',
        duration: 3000
      })
      return false;
    }
    this.setData({
      mobile: phone
    })
  },

  /**
   *获取验证码 
   */
  getSms: function(e) {
    this.setData({
      sms: e.detail.value
    })
  },
  /**
   *获取验证码 
   */
  getCode: function() {
    let that = this;
    console.log(that.data.mobile);
    //判断手机号
    if (that.data.mobile == false) {
      wx.showToast({
        title: '请重新输入手机号',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    let setint = setInterval(function() {
      if (iu == 60) {
        //获取验证码
        let data = {
          mobile: that.data.mobile
        };

        function calback(res) {
          console.log(res);
        }
        util.requestUrl(data, fundata.getSms, calback, that);
      }
      iu--;
      that.setData({
        code: false,
        time: iu
      });
      if (iu == 0 || iu == '') {
        iu = 60;
        clearInterval(setint);
        that.setData({
          code: true,
        })
      }
    }, 1000)

  },

  /**
   *绑定 
   */
  bound: function() {
    let that = this;
    // console.log(that.data.opid); 
    let data = {
      mobile: that.data.mobile,
      smsCode: that.data.sms,
      appletCode: that.data.opid
    };

    function calback(res) {
      if (res.data.state == 1) {
        that.setData({
          mask: true
        })
      }
    }
    util.requestRes(data, fundata.checkSms, calback, that);
  },

  /**
   *跳转 
   */
  row: function() {
    wx.redirectTo({
      url: '/pages/info/info?scode=' + this.data.scode,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
})