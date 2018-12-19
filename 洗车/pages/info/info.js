//获取应用实例
const app = getApp()
const fundata = require('../../utils/date.js');
const util = require('../../utils/util.js');
const config = require('../../utils/config.js');
Page({
  data: {
    img: '',
    xin: [1, 2, 3],
    px2rpxHeight: '',
    px2rpxWidth: "",
    shopInfo: '', //店铺信息
    coupon: '', //优惠券
    shopCode: 'RmguC3SR', //店铺code
    rowNumber: 1, //判断排好取号
    takeInfo: '', //排队信息
    phone: true, //判断用户是否绑定手机号
    imgUrl: '', //图片地址
    opid: '', //微信opid
    mask: false, //遮罩层
    ing: false, //正在取号的判断
    shopCode: '', //店铺code
  },
  onLoad: function (options) {
    let scode = '';
    if (options.scode) {
      scode = options.scode
    } else {
      scode = 'RmguC3SR'
    }
    let that = this;
    // 获取店铺信息
    let data = {
      shopCode: scode,
    };

    function calback(res) {
      console.log(res.coupon)
      that.setData({
        shopInfo: res,
        coupon: res.coupon,
        img: res.shop_logo,
        imgUrl: config.imgUrl,
        shopCode: scode
      })

      // 查询当前店铺是否正在排号
      // let scode = res.shop_code;
      wx.getStorage({
        key: 'ppid',
        success: function (res) {
          let oid = res.data.openid;
          that.setData({
            opid: res.data.openid
          })
          let cdata = {
            shopCode: scode,
            appletCode: oid
          }

          function fun(res) {
            let takeinfo = res;
            switch (res.flag) {
              case 0:
                that.setData({
                  rowNumber: 1
                })
                break;
              case 1:
                that.setData({
                  rowNumber: 2,
                  takeInfo: res
                });
                break;
              case 2:
                let qdata = {
                  shopCode: scode,
                  appletCode: oid
                }
                that.setData({
                  rowNumber: 3,
                  takeInfo: takeinfo
                })
            }
          }
          util.requestUrl(cdata, fundata.getUserWaitNum, fun, that);
        }
      })
      // 查询当前店铺是否正在排号完
    }
    util.requestUrl(data, fundata.getshop, calback, that);
    //获取缓存
    wx.getStorage({
      key: 'PX_TO_RPX',
      success: function (res) {
        that.setData({
          px2rpxHeight: res.data.px2rpxHeight,
          px2rpxWidth: res.data.px2rpxWidth,
        })
      }
    })
  },

  /**
   *领取优惠券 
   */
  getPhone: function (e) {
    let gid = e.currentTarget.dataset.gid;
    let that = this;
    let datas = {
      appletCode: that.data.opid
    };

    function calback(ress) {
      let uid = ress.userId;
      if (uid == 0) {
        wx.showToast({
          title: '请先绑定手机号',
          icon: 'none',
          duration: 1000,
        })
        setTimeout(function () {
          wx.navigateTo({
            url: '/pages/logn/logn?scode=' + that.data.shopCode,
          })
        }, 1000)
      } else {
        let data = {
          appletCode: that.data.opid,
          couponId: gid
        }

        function reture(data) {
          if (data.data.state == 1) {
            wx.showToast({
              title: '领取成功',
            })
          }
        }
        util.requestRes(data, fundata.insertCoupon, reture, that);
      }
    }
    util.requestUrl(datas, fundata.getPhone, calback, that);
  },

  /**
   * 取号
   */
  take: function (e) {
    let that = this;
    let code = e.currentTarget.dataset.code;
    let data = {
      appletCode: that.data.opid,
      shopCode: code
    }

    function calback(res) {
      if (res.flag == 1) {
        that.setData({
          takeInfo: res,
          rowNumber: 2,
          ing: true
        })
      }
    }
    util.requestUrl(data, fundata.takeNumber, calback, that);
  },

  /**
   * 取消排队
   */
  row: function (e) {
    let that = this;
    let code = e.currentTarget.dataset.code;
    let data = {
      appletCode: that.data.opid,
      shopCode: code
    }
    wx.showModal({
      title: '提示',
      content: '确认要取消此次排队吗?',
      success: function (res) {
        if (res.confirm) {
          function calback(data) {
            if (data.data.state == 1) {
              wx.showLoading({
                title: '正在取消此次排队',
              })
              setTimeout(function () {
                wx.hideLoading()
                that.setData({
                  rowNumber: 1,
                  mask: false
                })
                wx.showToast({
                  title: '取消成功',
                })
              }, 1000)
            }
          }
          util.requestRes(data, fundata.rowNumber, calback, that);
        } else {
          that.setData({
            mask: false
          })
        }
      }
    })
  },

  /**
   *遮罩 
   */
  cing: function () {
    this.setData({
      ing: false
    })
  },
  mask: function () {
    this.setData({
      mask: true
    })
  },

  /**
   *取消遮罩 
   */
  esmask: function () {
    this.setData({
      mask: false
    })
  }

})