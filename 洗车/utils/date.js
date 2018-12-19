const config=require('./config.js');
module.exports={
  // 查询店铺信息
  getshop: config.host +'washcar/applet/getShop',
  //用户叫号
  takeNumber: config.host +'washcar/applet/insertWaitNum',
  //取消叫号
  rowNumber: config.host + 'washcar/applet/updateUserNumStatus',
  //绑定手机号
  getPhone: config.host + 'washcar/applet/getUserByCode',
  //获取验证码
  getSms: config.host + 'washcar/applet/getSms',
  //绑定手机号，
  checkSms: config.host + 'washcar/applet/checkSms',
  //领取优惠券
  insertCoupon: config.host + 'washcar/applet/insertUserCoupon',
  //用户查询历史记录
  getHistory: config.host + 'washcar/applet/getHistory',
  //轮播图
  getCarousel: config.host + 'washcar/applet/getCarousel',
  //查询店铺是否排队
  getUserWaitNum: config.host + 'washcar/applet/getUserWaitNum',
  
}