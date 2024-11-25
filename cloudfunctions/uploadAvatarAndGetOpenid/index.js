// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  console.log("call uploadAvatarAndGetOpenid ok")
  const wxContext = cloud.getWXContext()
  avatarUrl = event.avatarUrl
  var uploadRes;

  try {
    uploadRes = await cloud.uploadFile({
      cloudPath: 'test/' + 'avatar' + wxContext.OPENID,
      fileContent: avatarUrl,
    });
    console.log('uploadRes:', uploadRes);
    return {
      uploadRes,
      openid: wxContext.OPENID,
      appid: wxContext.APPID,
      unionid: wxContext.UNIONID,
    }
  } catch (err) {
    console.error('uploadFile failed:', err);
    return {
      result: 'failed',
      error: err,
    };
  }
}