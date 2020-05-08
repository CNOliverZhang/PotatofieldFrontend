<template>
  <div
    id="index"
    :style="{
      'background-color': darkMode ? 'var(--black-gray)' : 'var(--white)',
      'color': darkMode ? 'var(--white-gray)' : 'var(--dark-gray)'
    }">
    <pf-drawer :dark-mode.sync="darkMode"></pf-drawer>
    <div
      id="page-wrapper"
      :style="{
        'top': - currentIndex * 100 + 'vh'
      }">
      <div id="index" class="page">
        <img src="logo.png" id="logo"/>
        <div id="title">洋芋田图像工具箱</div>
        <div id="subtitle">一个适用于创意行业从业者的图像工具箱</div>
        <div id="actions">
          <div
            class="action"
            @click="jumpToPage(tools.length + 1)"
            :style="{
              'border-color': darkMode ? 'var(--white-gray)' : 'var(--dark-gray)'
            }">下载</div>
          <div
            class="action"
            @click="jumpToPage(currentIndex + 1)"
            :style="{
              'border-color': darkMode ? 'var(--white-gray)' : 'var(--dark-gray)'
            }">了解更多</div>
        </div>
      </div>
      <div
        class="page"
        v-for="(tool, index) in tools"
        :key="index">
        <div class="tool-name">{{ tool.name }}</div>
        <div class="content">
          <div class="tool-intro">{{ tool.introduction }}</div>
          <img :src="tool.image" class="tool-image" />
        </div>
        <div class="next" @click="jumpToPage(currentIndex + 1)">
          <span class="fa fa-chevron-down"></span>
          <div class="next-text">继续了解</div>
        </div>
      </div>
      <div id="download" class="page">
        <div id="download-title">现在下载</div>
        <div id="content" v-if="latestVersion">
          <div id="version">
            <div class="version-title">当前最新版</div>
            <div class="version-text">版本 {{ latestVersion.code }} 正式版</div>
            <div class="version-title">更新日志</div>
            <div
              class="version-text version-log"
              v-for="(feature, index) in latestVersion.features.split('\n')"
              :key="index">{{ feature }}</div>
            <div class="version-title">发布时间</div>
            <div class="version-text">{{ latestVersion.pub_date.slice(0, 4) + " 年 "
            + latestVersion.pub_date.slice(5, 7) + " 月 "
            + latestVersion.pub_date.slice(8, 10) + " 日" }}</div>
          </div>
          <div id="buttons">
            <a
              class="button"
              :style="{
                'border-color': darkMode ? 'var(--white-gray)' : 'var(--dark-gray)'
              }"
              :href="latestVersion.download"
              target="_blank">下载最新版</a>
            <router-link
              class="button"
              :style="{
                'border-color': darkMode ? 'var(--white-gray)' : 'var(--dark-gray)'
              }"
              :to="{
              name: 'history'
              }">查看历史版本</router-link>
            <el-popover
              width="200"
              trigger="hover">
              <a
                slot="reference"
                class="button"
                :style="{
                  'border-color': darkMode ? 'var(--white-gray)' : 'var(--dark-gray)'
                }"
                href="https://jq.qq.com/?_wv=1027&k=58umP3m"
                target="_blank">加入用户群</a>
              <img class="popover-image" src="qrcode.png" />
              <div id="group-number">QQ 群号：769574565</div>
            </el-popover>
          </div>
        </div>
        <router-link id="about" :to="{
          name: 'about'
        }">
          <span class="fa fa-info"></span>
          <div id="about-text">关于本软件</div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { Loading } from 'element-ui'

export default {
  name: 'index',
  data() {
    return {
      darkMode: false,
      tools: [],
      latestVersion: null,
      currentIndex: 0
    }
  },
  watch: {
    darkMode(value) {
      document.body.style.backgroundColor = (value ? 'var(--black-gray)' : 'var(--white)')
      localStorage.setItem('darkMode', value)
    }
  },
  methods: {
    jumpToPage(index) {
      this.currentIndex = index
    },
    disableTouchMove(event) {
      event.preventDefault()
    }
  },
  mounted() {
    let darkMode = localStorage.getItem('darkMode')
    if (darkMode === 'true') {
      this.darkMode = true
    } else {
      this.darkMode = false
    }
    document.body.style.backgroundColor = (this.darkMode ? 'var(--black-gray)' : 'var(--white)')
    let loading = Loading.service()
    new Promise((resolve, reject) => {
      this.$http.get('https://api.potatofield.cn/imagetoolkit/tools').catch((error) => {
        reject()
      }).then((res) => {
        this.tools = res.data
        this.$http.get('https://api.potatofield.cn/imagetoolkit/versions/latest').catch((error) => {
          reject()
        }).then((res) => {
          this.latestVersion = res.data
          resolve()
        })
      })
    }).catch((error) => {
      loading.close()
      this.$notify.error({
        title: '出现错误',
        message: '加载内容失败，请检查您的网络！',
        duration: 0,
        position: 'bottom-right'
      })
    }).then(() => {
      loading.close()
    })
    let timer = null
    window.addEventListener('mousewheel', (event) => {
      if (!timer) {
        if (event.wheelDelta < 0) {
          this.currentIndex = (this.currentIndex <= this.tools.length) ? (this.currentIndex + 1) : this.currentIndex
          timer = setTimeout(() => {
            timer = null
          }, 1000)
        } else if (event.wheelDelta > 0) {
          this.currentIndex = (this.currentIndex > 0) ? (this.currentIndex - 1) : this.currentIndex
          timer = setTimeout(() => {
            timer = null
          }, 1000)
        }
      }
    })
    window.addEventListener('DOMMouseScroll', (event) => {
      if (!timer) {
        if (event.detail > 0) {
          this.currentIndex = (this.currentIndex <= this.tools.length) ? (this.currentIndex + 1) : this.currentIndex
          timer = setTimeout(() => {
            timer = null
          }, 1000)
        } else if (event.detail < 0) {
          this.currentIndex = (this.currentIndex > 0) ? (this.currentIndex - 1) : this.currentIndex
          timer = setTimeout(() => {
            timer = null
          }, 1000)
        }
      }
    })
    let startX = 0
    let startY = 0
    window.addEventListener('touchstart', (event) => {
      startX = event.touches[0].pageX
      startY = event.touches[0].pageY
    })
    window.addEventListener('touchend', (event) => {
      let changedX = event.changedTouches[0].pageX - startX
      let changedY = event.changedTouches[0].pageY - startY
      if (!timer && (Math.abs(changedY) > Math.abs(changedX))) {
        if (changedY < 0) {
          this.currentIndex = (this.currentIndex <= this.tools.length) ? (this.currentIndex + 1) : this.currentIndex
          timer = setTimeout(() => {
            timer = null
          }, 500)
        } else {
          this.currentIndex = (this.currentIndex > 0) ? (this.currentIndex - 1) : this.currentIndex
          timer = setTimeout(() => {
            timer = null
          }, 500)
        }
      }
    })
    window.addEventListener('touchmove', this.disableTouchMove, {
      passive: false
    })
  },
  destroyed() {
    window.removeEventListener('touchmove', this.disableTouchMove, {
      passive: false
    })
  }
}
</script>

<style lang="scss" scoped>
.popover-image {
  width: 100%;
}

#group-number {
  font-size: 16px;
  text-align: center;
}

#index {
  transition: 0.5s;
  overflow: hidden;

  #page-wrapper {
    position: fixed;
    left: 0;
    transition: 0.5s;

    #index {
      flex-direction: column;
      justify-content: center;
      align-items: center;

      @media (orientation: portrait) {
        #logo {
          width: 30vh;
          height: 30vh;
        }

        #title {
          font-size: 4vh;
          margin-top: 3vh;
          margin-bottom: 3vh;
        }

        #subtitle {
          font-size: 1.8vh;
        }

        #actions {
          margin-top: 3vh;
          font-size: 2.4vh;

          .action {
            width: 24vh;
            height: 4.8vh;
            line-height: 4.8vh;
            display: flex;
            justify-content: center;
            align-items: center;
            box-sizing: border-box;
            border-style: solid;
            border-width: 0.2vh;
            border-radius: 2.4vh;
            cursor: pointer;
            transition: 0.5s;
            margin-top: 2vh;
            margin-bottom: 2vh;

            &:hover {
              background-color: var(--main-color);
              color: var(--white);
              border-width: 0;
            }

            &:first-child {
              margin-top: 0;
            }

            &:last-child {
              margin-bottom: 0;
            }
          }
        }
      }

      @media (orientation: landscape) {
        #logo {
          width: 45vh;
          height: 45vh;
        }

        #title {
          font-size: 6vh;
          margin-top: 4.5vh;
          margin-bottom: 4.5vh;
        }

        #subtitle {
          font-size: 2.7vh;
        }

        #actions {
          margin-top: 4.5vh;
          width: 70vh;
          display: flex;
          justify-content: space-between;
          font-size: 3.6vh;
          
          .action {
            width: 32vh;
            height: 7.2vh;
            line-height: 7.2vh;
            display: flex;
            justify-content: center;
            align-items: center;
            box-sizing: border-box;
            border-style: solid;
            border-width: 0.3vh;
            border-radius: 3.6vh;
            cursor: pointer;
            transition: 0.5s;

            &:hover {
              background-color: var(--main-color);
              color: var(--white);
              border-width: 0;
            }
          }
        }
      }
    }

    .page {
      width: 100vw;
      height: 100vh;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;

      .next {
        display: flex;
        align-items: center;
        cursor: pointer;
        transition: 0.5s;

        @keyframes wave {
          0% {
            top: 0
          }
          50% {
            top: 0.3em;
          }
          100% {
            top: 0em;
          }
        }

        svg {
          position: relative;
          animation: wave 2s infinite;
        }

        .next-text {
          margin-left: 1em;
        }

        &:hover {
          color: var(--main-color);
        }
      }

      @media (orientation: portrait) {
        .tool-name {
          font-size: 3.6vh;
          margin-top: 8vh;
        }

        .content {
          margin-left: 6vh;
          margin-right: 6vh;
          flex-grow: 1;
          text-align: center;
          display: flex;
          flex-direction: column;

          .tool-intro {
            margin-top: 4vh;
            margin-bottom: 4vh;
            font-size: 2.4vh;
            text-align: justify;
            text-indent: 2em;
            line-height: 2em;
          }

          .tool-image {
            width: 100%;
            height: 0;
            flex-grow: 1;
            object-fit: contain;
          }
        }

        .next {
          font-size: 2.4vh;
          margin-top: 2em;
          margin-bottom: 2em;
        }
      }

      @media (orientation: landscape) {
        .tool-name {
          font-size: 5.4vh;
          margin-top: 12vh;
        }

        .content {
          width: 120vh;
          max-width: 80%;
          height: 0;
          flex-grow: 1;
          display: flex;
          justify-content: space-between;
          align-items: center;

          .tool-intro {
            flex-grow: 1;
            margin-right: 10vh;
            font-size: 3.6vh;
            text-align: justify;
            text-indent: 2em;
            line-height: 2em;
          }

          .tool-image {
            max-width: 45%;
            max-height: 80%;
          }
        }

        .next {
          font-size: 3.6vh;
          margin-bottom: 2em;
        }
      }
    }

    #download {

      #about {
        display: flex;
        align-items: center;
        cursor: pointer;
        transition: 0.5s;

        @keyframes circle {
          0% {
            transform: rotate(0);
          }
          
          100% {
            transform: rotate(360deg);
          }
        }

        svg {
          animation: circle 2s infinite linear;
        }

        #about-text {
          margin-left: 1em;
        }

        &:hover {
          color: var(--main-color);
        }
      }

      @media (orientation: portrait) {
        #download-title {
          font-size: 3.6vh;
          margin-top: 8vh;
        }

        #content {
          width: 100%;
          padding-left: 6vh;
          padding-right: 6vh;
          box-sizing: border-box;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          
          #version {
            width: 100%;
            text-align: center;
            margin-top: 4vh;
            margin-bottom: 4vh;

            .version-title {
              font-size: 2.4vh;
              line-height: 2em;
            }

            .version-text {
              font-size: 1.6vh;
              line-height: 1.6em;
              margin-top: 0.6em;
              margin-bottom: 0.6em;
            }

            .version-log {
              text-align: justify;
            }
          }

          #buttons {
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            font-size: 2.4vh;
            margin-bottom: 4vh;

            .button {
              width: 24vh;
              height: 4.8vh;
              line-height: 4.8vh;
              display: flex;
              justify-content: center;
              align-items: center;
              box-sizing: border-box;
              border-style: solid;
              border-width: 0.2vh;
              border-radius: 2.4vh;
              cursor: pointer;
              transition: 0.5s;
              margin-top: 1vh;
              margin-bottom: 1vh;
              margin-left: auto;
              margin-right: auto;

              &:hover {
                background-color: var(--main-color);
                color: var(--white);
                border-width: 0;
              }
            }
          }
        }

        #about {
          font-size: 2.4vh;
          margin-bottom: 2em;
        }
      }

      @media (orientation: landscape) {
        #download-title {
          font-size: 5.4vh;
          margin-top: 12vh;
        }

        #content {
          max-width: 120vh;
          width: 80%;
          height: 0;
          flex-grow: 1;
          display: flex;
          justify-content: space-between;
          align-items: center;

          #version {
            flex-grow: 1;
            margin-right: 10vh;

            .version-title {
              font-size: 3.6vh;
              line-height: 2em;
            }

            .version-text {
              font-size: 2.4vh;
              line-height: 1.6em;
              margin-top: 0.6em;
              margin-bottom: 0.6em;
            }
          }

          #buttons {
            width: 30vh;
            font-size: 3.6vh;

            .button {
              width: 100%;
              height: 7.2vh;
              line-height: 7.2vh;
              display: flex;
              justify-content: center;
              align-items: center;
              box-sizing: border-box;
              border-style: solid;
              border-width: 0.3vh;
              border-radius: 3.6vh;
              cursor: pointer;
              transition: 0.5s;
              margin-top: 2vh;
              margin-bottom: 2vh;

              &:hover {
                background-color: var(--main-color);
                color: var(--white);
                border-width: 0;
              }

              &:first-child {
                margin-top: 0;
              }

              &:last-child {
                margin-bottom: 0;
              }
            }
          }
        }

        #about {
          font-size: 3.6vh;
          margin-bottom: 2em;
        }
      }
    }
  }
}
</style>
