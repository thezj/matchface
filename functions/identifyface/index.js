// 云函数入口文件
const cloud = require('wx-server-sdk')
var qs = require('querystring')
var axios = require('axios')

var AipFaceClient = require("baidu-aip-sdk").face;

// 设置APPID/AK/SK
var APP_ID = "14712028";
var API_KEY = "teZli0TzEWbEHieNGqcFATk8";
var SECRET_KEY = "ctMzO0Sndz0Ghcm15HWSK9ZX9obaQGVC";

// 新建一个对象，建议只保存一个对象调用服务接口
var client = new AipFaceClient(APP_ID, API_KEY, SECRET_KEY);

var HttpClient = require("baidu-aip-sdk").HttpClient;

// 设置request库的一些参数，例如代理服务地址，超时时间等
// request参数请参考 https://github.com/request/request#requestoptions-callback
HttpClient.setRequestOptions({
    timeout: 5000
});

// 也可以设置拦截每次请求（设置拦截后，调用的setRequestOptions设置的参数将不生效）,
// 可以按需修改request参数（无论是否修改，必须返回函数调用参数）
// request参数请参考 https://github.com/request/request#requestoptions-callback
HttpClient.setRequestInterceptor(function (requestOptions) {
    // 查看参数
    console.log(requestOptions)
    // 修改参数
    requestOptions.timeout = 5000;
    // 返回参数
    return requestOptions;
});

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
    let {
        image1,
        image2
    } = event

    const param = `grant_type=client_credentials&client_id=${'teZli0TzEWbEHieNGqcFATk8'}&client_secret=${'ctMzO0Sndz0Ghcm15HWSK9ZX9obaQGVC'}`

    let result = await new Promise((resolve, reject) => {
        axios.post('https://aip.baidubce.com/oauth/2.0/token?' + param, {})
            .then(function (response) {



                client.match([{
                    image: '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',
                    image_type: 'BASE64'
                }, {
                    image: image2,
                    image_type: 'BASE64'
                }]).then(function (result) {
                    console.log(result)
                    resolve(result)
                })




            })
    })

    return result



}