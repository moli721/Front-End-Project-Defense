document.addEventListener('DOMContentLoaded', function () {


    const panelWrappers = document.querySelectorAll('.panel-wrapper')

    panelWrappers.forEach(wrapper => {
        wrapper.addEventListener('click', () => {
            removeActiveClasses()
            wrapper.classList.add('active')

            // 获取当前点击的面板中的视频元素
            const video = wrapper.querySelector('video')
            if (video) {
                // 重置视频播放时间到开始
                video.currentTime = 0
                // 重新播放视频
                video.play()
            }
        })
    })

    function removeActiveClasses() {
        panelWrappers.forEach(wrapper => {
            wrapper.classList.remove('active')
        })
    }
})