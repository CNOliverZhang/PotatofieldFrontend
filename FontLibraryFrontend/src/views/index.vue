<template>
  <div
    id="index"
    :style="{
      'background-color': darkMode ? 'var(--dark-gray)' : 'var(--white-gray)'
    }">
    <pf-drawer :dark-mode.sync="darkMode">
      <div id="language-select">
        选择语言
        <el-select v-model="language">
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
      <div v-for="(font, index) in displayFonts" class="font-container" :key="index">
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
      language: ''
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
    search(keyword) {
      if (keyword == '') {
        this.filteredFonts = this.fonts
      } else {
        this.filteredFonts = this.fonts.filter(font => {
          return font.verbose.includes(keyword)
        })
      }
    },
    downloadFont(url) {
      window.open(url, '_blank')
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
      loading.close()
      this.$message.error('加载字体列表失败，请检查您的网络！')
    }).then((res) => {
      this.fonts = res.data
      this.filteredFonts = this.fonts
      loading.close()
    })
  }
}
</script>

<style lang="scss" scoped>
#index {
  min-height: 100vh;
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
}
</style>
