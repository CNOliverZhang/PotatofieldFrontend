<template>
  <div
    id="index"
    :style="{
      'background-color': darkMode ? 'var(--dark-gray)' : 'var(--white-gray)'
    }">
    <pf-drawer :dark-mode.sync="darkMode">
      <div id="language-select">
        选择语言
        <el-select v-model="language" @change="initLoadedPageCount">
          <el-option label="全部" value=""></el-option>
          <el-option label="中文" value="中文"></el-option>
          <el-option label="英文" value="英文"></el-option>
        </el-select>
      </div>
    </pf-drawer>
    <pf-header
      :dark-mode="darkMode"
      logo="logo.png"
      title="洋芋田字体库"
      subtitle="提供百余种商用免费字体的下载"
      show-search-button
      auto-search
      :search-function="search"></pf-header>
    <div id="fonts">
      <div v-for="(font, index) in displayFonts.slice(0, this.loadedPageCount * 16)" class="font-container" :key="index">
        <div
          class="font"
          :style="{
            'background-color': darkMode ? 'var(--black-gray)' : 'var(--white)',
            'box-shadow': '0 0 12px ' + (darkMode ? 'var(--black-gray)' : 'var(--gray)'),
            'color': darkMode ? 'var(--white-gray)' : 'var(--dark-gray)'
          }">
          <div>
            <img
              :src="font.image"
              :style="{
                'filter': darkMode ? 'invert(100%)' : null
              }"
              class="preview">
            <div class="text">名称：{{ font.verbose }}</div>
            <div class="text">字形：{{ font.style }}</div>
          </div>
          <div @click="downloadFont(font.src)" class="action">
            <span class="fa fa-download"></span>
            <div>下载字体</div>
          </div>
        </div>
      </div>
    </div>
    <div
      id="random-buttom"
      @click="random"
      :style="{
        'box-shadow': '0 0 12px ' + (darkMode ? 'var(--black-gray)' : 'var(--gray)')
      }">
      <span class="fa fa-dice"></span>
    </div>
    <transition name="fade">
      <div id="random-font-container" v-if="randomFont">
        <div
          id="random-font"
          :style="{
            'background-color': darkMode ? 'var(--black-gray)' : 'var(--white)',
            'color': darkMode ? 'var(--white-gray)' : 'var(--dark-gray)'
          }">
          <div>
            <img
              :src="randomFont.image"
              :style="{
                'filter': darkMode ? 'invert(100%)' : null
              }"
              class="preview">
            <div class="text">名称：{{ randomFont.verbose }}</div>
            <div class="text">字形：{{ randomFont.style }}</div>
          </div>
          <div @click="downloadFont(randomFont.src)" class="action">
            <span class="fa fa-download"></span>
            <div>下载字体</div>
          </div>
        </div>
        <div id="actions">
          <div @click="random" class="action">
            <span class="fa fa-dice"></span>
            <div>再来一次</div>
          </div>
          <div @click="clearRandom" class="action">
            <span class="fa fa-times"></span>
            <div>关闭</div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { Loading } from 'element-ui'

export default {
  name: 'index',
  data() {
    return {
      darkMode: false,
      fonts: [],
      filteredFonts: [],
      language: '',
      loadedPageCount: 1,
      randomFont: null
    }
  },
  watch: {
    darkMode(value) {
      document.body.style.backgroundColor = (value ? 'var(--dark-gray)' : 'var(--white-gray)')
      localStorage.setItem('darkMode', value)
    }
  },
  computed: {
    displayFonts() {
      return this.filteredFonts.filter((font) => {
        return font.language.includes(this.language)
      })
    }
  },
  methods: {
    initLoadedPageCount() {
      document.body.scrollTop = document.documentElement.scrollTop = 0
      this.loadedPageCount = 1
    },
    search(keyword) {
      if (keyword == '') {
        this.filteredFonts = this.fonts
      } else {
        this.filteredFonts = this.fonts.filter(font => {
          return font.verbose.includes(keyword)
        })
      }
      this.initLoadedPageCount()
    },
    downloadFont(url) {
      window.open(url, '_blank')
    },
    random() {
      this.$http.get('https://api.potatofield.cn/fontlibrary/fonts/random').catch((error) => {
        this.$notify.error({
          title: '出现错误',
          message: '加载随机字体失败，请检查您的网络！',
          position: 'bottom-right'
        })
      }).then((res) => {
        this.randomFont = res.data
      })
    },
    clearRandom() {
      this.randomFont = null
    }
  },
  mounted() {
    let darkMode = localStorage.getItem('darkMode')
    if (darkMode === 'true') {
      this.darkMode = true
    } else {
      this.darkMode = false
    }
    document.body.style.backgroundColor = (this.darkMode ? 'var(--dark-gray)' : 'var(--white-gray)')
    let loading = Loading.service()
    this.$http.get('https://api.potatofield.cn/fontlibrary/fonts').catch((error) => {
      this.$notify.error({
        title: '出现错误',
        message: '加载字体列表失败，请检查您的网络！',
        duration: 0,
        position: 'bottom-right'
      })
    }).then((res) => {
      this.fonts = res.data
      this.filteredFonts = this.fonts
      loading.close()
    })
    let scrollFunction = () => {}
    if (window.onscroll) {
      scrollFunction = window.onscroll
    }
    window.onscroll = () => {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      let windowHeight = window.innerHeight || Math.min(document.documentElement.clientHeight, document.body.clientHeight)
      let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight)
      if (Math.ceil(scrollTop + windowHeight) >= scrollHeight) {
        if (this.loadedPageCount * 16 < this.displayFonts.length) {
          this.loadedPageCount += 1
        }
      }
      scrollFunction()
    }
  }
}
</script>

<style lang="scss" scoped>
.fade-enter-to, .fade-leave, .fade-enter-active {
  opacity: 1;
  transition: 0.5s;
}

.fade-enter, .fade-leave-to, .fade-leave-active {
  opacity: 0;
  transition: 0.5s;
}

#index {
  transition: 0.5s;

  #language-select {
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 20px;
  }

  #fonts {
    display: flex;
    flex-wrap: wrap;
    margin-left: auto;
    margin-right: auto;
    box-sizing: border-box;
    padding: 10px;
    transition: 0.5s;

    .font-container {
      height: 250px;
      padding: 10px;
      box-sizing: border-box;

      .font {
        width: 100%;
        height: 100%;
        border-radius: 12px;
        padding: 30px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        transition: 0.5s;

        .preview {
          width: 100%;
        }

        .text {
          font-size: 16px;
          margin-top: 10px;
          margin-bottom: 10px;
        }

        .action {
          width: fit-content;
          display: flex;
          align-items: center;
          font-size: 16px;
          transition: 0.5s;
          cursor: pointer;

          svg {
            margin-right: 10px;
          }

          &:hover {
            color: #2196F3;
          }
        }

        &:hover {
          transform: scale(1.05);
        }
      }
    }
  }

  @media screen and (max-width: 400px) {
    #fonts {
      width: 100%;

      .font-container {
        width: 100%;
      }
    }
  }

  @media screen and (min-width: 400px) and (max-width: 800px) {
    #fonts {
      width: 400px;

      .font-container {
        width: 100%;
      }
    }
  }

  @media screen and (min-width: 800px) and (max-width: 1200px) {
    #fonts {
      width: 800px;

      .font-container {
        width: 50%;
      }
    }
  }

  @media screen and (min-width: 1200px) and (max-width: 1600px) {
    #fonts {
      width: 1200px;

      .font-container {
        width: calc(100% / 3);
      }
    }
  }

  @media screen and (min-width: 1600px) {
    #fonts {
      width: 1600px;

      .font-container {
        width: 25%;
      }
    }
  }

  #random-buttom {
    position: fixed;
    z-index: 1000;
    background-color: var(--main-color);
    color: var(--white);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: 0.5s;

    &:hover {
      transform: scale(1.05);
    }
  }

  @media screen and (max-width: 800px) {
    #random-buttom {
      width: 60px;
      height: 60px;
      border-radius: 30px;
      font-size: 30px;
      bottom: 30px;
      right: 30px;
    }
  }

  @media screen and (min-width: 800px) {
    #random-buttom {
      width: 80px;
      height: 80px;
      border-radius: 40px;
      font-size: 40px;
      bottom: 40px;
      right: 40px;
    }
  }

  #random-font-container {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 2000;
    background-color: var(--transparent-black-cover);

    #random-font {
      max-width: calc(100% - 40px);
      width: 360px;
      height: 230px;
      border-radius: 12px;
      padding: 30px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      box-shadow: 0 0 12px var(--black-gray);
      transition: 0.5s;

      .preview {
        width: 100%;
      }

      .text {
        font-size: 16px;
        margin-top: 10px;
        margin-bottom: 10px;
      }

      .action {
        width: fit-content;
        display: flex;
        align-items: center;
        font-size: 16px;
        transition: 0.5s;
        cursor: pointer;

        svg {
          margin-right: 10px;
        }

        &:hover {
          color: #2196F3;
        }
      }
    }

    #actions {
      margin-top: 30px;
      max-width: calc(100% - 40px);
      width: 360px;
      display: flex;
      justify-content: space-between;
      color: var(--white);

      .action {
        width: fit-content;
        display: flex;
        align-items: center;
        font-size: 16px;
        transition: 0.5s;
        cursor: pointer;

        svg {
          margin-right: 10px;
        }

        &:hover {
          color: #2196F3;
        }
      }
    }
  }
}
</style>
