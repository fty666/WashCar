/**
 * wx.request二次封装
 */
function requestUrl(data, url, callback, pageobj) {
  wx.request({
    url: url,
    data: data,
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    method: 'POST',
    success: function (res) {
      if (res.data.state == 1) {
        callback.apply(pageobj, [res.data.data])
        // console.log(res)
      } else {
        wx.showModal({
          title: '提示',
          content: res.data.message,
          showCancel: false
        })
      }
    },
    complete: function () {
    }
  })
}

/**
 * wx.request没有返回值
 */
function requestRes(data, url, callback, pageobj) {
  wx.request({
    url: url,
    data: data,
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    method: 'POST',
    success: function (res) {
      if (res.data.state == 1) {
        callback.apply(pageobj, [res])
        // console.log(res)
      } else {
        wx.showModal({
          title: '提示',
          content: res.data.message,
          showCancel: false
        })
      }
    },
    complete: function () {
    }
  })
}

/**
 * 验证正则
 */
function checkReg(flag, data) {
  let reg = null;
  switch (flag) {
    case 1:
      // 手机号
      reg = /^1[34578]\d{9}$/;
      break;
    case 2:
      // 身份证号
      reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
      break;
    case 3:
      // 银行卡号
      reg = /^([1-9]{1})(\d{15}|\d{18})$/;
    case 4:
      // 带小数的金额
      reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
      break;
    case 5:
      // 折扣正则(如8.8)
      reg = /[1-9](\.[1-9])?|0\.[1-9]/;
      break;
    case 6:
      reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      break;
    case 7:
      reg = /^[a-zA-Z0-9]{18,22}$/;
      break;
  }
  return reg.test(data);
}

module.exports = {
  requestUrl: requestUrl,
  requestRes: requestRes,
  checkReg: checkReg
}
