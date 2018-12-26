// pages/record/record.js
const app = getApp()
const fundata = require('../../utils/date.js');
const util = require('../../utils/util.js');
const config = require('../../utils/config.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    img: '', //轮播图
    px2rpxHeight: '',
    px2rpxWidth: '',
    histroy: '', //历史记录
    imgUrl: '', //url地址
    opid: '', //oppid
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    //判断二维码传过来的参数 
    if (decodeURIComponent(options.scene) == 'undefined' || decodeURIComponent(options.scene) == undefined) {

    } else {
      let scene = decodeURIComponent(options.scene);
      console.log(decodeURIComponent(options.scene))
      wx.navigateTo({
        url: '/pages/info/info?scode=' + scene,
      })
      return false;
    }
    let data = {};

    function calback(res) {
      console.log(res)
      that.setData({
        img: res.carousels
      })
    }
    util.requestUrl(data, fundata.getCarousel, calback, that);

    //获取缓存
    wx.getStorage({
      key: 'PX_TO_RPX',
      success: function(res) {
        that.setData({
          px2rpxHeight: res.data.px2rpxHeight,
          px2rpxWidth: res.data.px2rpxWidth,
        })
      }
    })
    wx.getStorage({
      key: 'ppid',
      success: function(res) {
        console.log('缓存opid')
        console.log(res)
        that.setData({
          opid: res.data.openid
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    let that = this;
    // 判断二维码的code,跳转店铺
    let Rcode = app.globalData.Rcode;
    if (Rcode == 'false') {} else {
      wx.navigateTo({
        url: '/pages/info/info?scode=' + Rcode,
      })
      return false;
    }
    // 获取opid查看历史记录
    wx.getStorage({
      key: 'ppid',
      success: function(res) {
        let data = {
          appletCode: res.data.openid.user.applet_code,
        };

        function calback(res) {
          that.setData({
            histroy: res,
            imgUrl: config.imgUrl
          })
        }
        util.requestUrl(data, fundata.getHistory, calback, that);
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 跳转店铺
   */
  goshop: function(e) {
    let scode = e.currentTarget.dataset.scode;
    wx.navigateTo({
      url: '/pages/info/info?scode=' + scode,
    })
  },

  /**
   *扫码
   */
  code: function() {
    wx.scanCode({})
  }

})