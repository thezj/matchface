Page({
  data: {
    version: JSON.stringify(wx.getSystemInfoSync().SDKVersion),

  },

  takePhoto() {
    let camera = wx.createCameraContext()
    camera.takePhoto({
      success(res) {
        let fr = wx.getFileSystemManager()
        let img2base64 = fr.readFileSync(res.tempImagePath, 'base64')

        wx.cloud.callFunction({
          // 云函数名称
          name: 'identifyface',
          // 传给云函数的参数
          data: {
            image1: 111,
            image2: img2base64,
          },
          success: function (res) {
            console.log(res.result.result.score) // 3
            if (res.result.result.score < 81) {
              wx.showModal({
                title: '识别结果',
                content: '你不是曾杰'
              })
            }else{
              wx.showModal({
                title: '识别结果',
                content: '欢迎你曾杰'
              })
            }

          },
          fail: console.error
        })

      }
    })
  },

  onReady() {




  },



})