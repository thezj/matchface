//app.js
App({
    onLaunch() {
        wx.cloud.init({
            env: 'motorfleet-e80adc'
        })
        const updateManager = wx.getUpdateManager()
        updateManager.onCheckForUpdate(function (res) {
            // 请求完新版本信息的回调1
        })

        updateManager.onUpdateReady(function () {
            updateManager.applyUpdate()
        })

        updateManager.onUpdateFailed(function () {
            // 新的版本下载失败
        })
    }
})