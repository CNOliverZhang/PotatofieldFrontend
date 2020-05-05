<template>
  <div
    id="index"
    :style="{
      'background-color': darkMode ? 'var(--dark-gray)' : 'var(--white-gray)'
    }">
    <pf-drawer :dark-mode.sync="darkMode"></pf-drawer>
    <pf-header
      :dark-mode="darkMode"
      logo="logo.png"
      title="洋芋田图像工具箱"
      subtitle="一个适用于创意行业从业者的图像工具箱"></pf-header>
    <div
      class="card"
      :style="{
        'background-color': darkMode ? 'var(--black-gray)' : 'var(--white)',
        'box-shadow': '0 0 12px ' + (darkMode ? 'var(--black-gray)' : 'var(--gray)'),
        'color': darkMode ? 'var(--white-gray)' : 'var(--dark-gray)'
      }">
      <div
        class="header"
        :style="{
          'border-color': darkMode ? 'var(--dark-gray)' : 'var(--light-gray)'
        }">
        版权信息
      </div>
      <div id="copyright">
        <div>Copyright © 2020 张志毅</div>
        <el-popover
          width="200"
          trigger="hover">
          <div class="link" slot="reference">联系</div>
          <img id="email" src="email.png" />
        </el-popover>
      </div>
      <div class="content">
        洋芋田图像工具箱遵循 MIT 协议发布。您可以自由地下载、使用或再分发本软件及其源代码，也可以基于本软件的源代码修改衍生以及开发新的软件。
      </div>
      <div class="content">
        本软件源代码托管在
        <a href="https://github.com/CNOliverZhang/PotatofieldImageToolkit" class="link" target="_blank"> GitHub </a>
        和
        <a href="https://gitee.com/cnoliverzhang/PotatofieldImageToolkit" class="link" target="_blank"> 码云 </a>
        ，您从这两种途径都能够获取完整的源代码，请点击前面的文本打开链接。
      </div>
      <div class="content">
        本软件开发过程中使用了下列开源软件或组件：
      </div>
      <div id="resources">
        <el-button
          v-for="(resource) in resources"
          :key="resource.title"
          class="interactable"
          size="mini"
          type="primary"
          @click="open(resource.url)">{{ resource.title }}
        </el-button>
      </div>
    </div>
    <div
      class="card"
      :style="{
        'background-color': darkMode ? 'var(--black-gray)' : 'var(--white)',
        'box-shadow': '0 0 12px ' + (darkMode ? 'var(--black-gray)' : 'var(--gray)'),
        'color': darkMode ? 'var(--white-gray)' : 'var(--dark-gray)'
      }">
      <div
        class="header"
        :style="{
          'border-color': darkMode ? 'var(--dark-gray)' : 'var(--light-gray)'
        }">
        反馈交流
      </div>
      <div class="content">
        开源软件的发展离不开开发者的贡献，同样离不开用户的反馈和建议，真诚希望并欢迎您针对本软件的问题提出问题和建议。您可以通过
        <el-popover
          width="200"
          trigger="hover">
          <span class="link heavy" slot="reference">鼠标移到这里</span>
          <img id="email" src="email.png" />
        </el-popover>
        获取邮箱地址，给开发者发邮件反馈；也可以通过
        <el-popover
          width="200"
          trigger="hover">
          <span class="link heavy" slot="reference">鼠标移到这里</span>
          <img id="email" src="qrcode.png" />
        </el-popover>
        ，手机扫描二维码加入用户交流群更直接地与开发者交流。如果您不方便扫码，也可以直接通过
        <a class="link heavy" href="https://jq.qq.com/?_wv=1027&k=58umP3m" target="_blank">点击这个链接</a>
        或直接搜索群号“769574565”添加用户群。
      </div>
    </div>
    <router-link
      id="home-buttom"
      :style="{
        'box-shadow': '0 0 12px ' + (darkMode ? 'var(--black-gray)' : 'var(--gray)')
      }"
      :to="{
        name: 'index'
      }">
      <span class="fa fa-home"></span>
    </router-link>
  </div>
</template>

<script>
import { Loading } from 'element-ui'

export default {
  name: 'index',
  data() {
    return {
      darkMode: false,
      resources: [
        {
          title: 'Electron',
          url: 'https://github.com/electron/electron'
        },
        {
          title: 'electron-promise-ipc',
          url: 'https://github.com/sibnerian/electron-promise-ipc'
        },
        {
          title: 'electron-buider',
          url: 'https://github.com/electron-userland/electron-builder'
        },
        {
          title: 'Vue.js',
          url: 'https://github.com/vuejs/vue'
        },
        {
          title: 'Vue Router',
          url: 'https://github.com/vuejs/vue-router'
        },
        {
          title: 'Vuex',
          url: 'https://github.com/vuejs/vuex'
        },
        {
          title: 'Vuex Electron',
          url: 'https://github.com/vue-electron/vuex-electron'
        },
        {
          title: 'vue-clamp',
          url: 'https://github.com/Justineo/vue-clamp'
        },
        {
          title: 'Element UI',
          url: 'https://github.com/ElemeFE/element'
        },
        {
          title: 'Font Awesome',
          url: 'https://github.com/FortAwesome/Font-Awesome'
        },
        {
          title: 'html2canvas',
          url: 'https://github.com/niklasvh/html2canvas'
        },
        {
          title: 'CKEditor 5',
          url: 'https://github.com/ckeditor/ckeditor5'
        },
        {
          title: 'EXIF.js',
          url: 'https://github.com/exif-js/exif-js'
        },
        {
          title: 'Cropper.js',
          url: 'https://github.com/fengyuanchen/cropperjs'
        },
        {
          title: 'Color Thief',
          url: 'https://github.com/lokesh/color-thief'
        }
      ]
    }
  },
  watch: {
    darkMode(value) {
      document.body.style.backgroundColor = (value ? 'var(--dark-gray)' : 'var(--white-gray)')
      localStorage.setItem('darkMode', value)
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
  }
}
</script>

<style lang="scss" scoped>
#email {
  width: 100%;
}

#index {
  transition: 0.5s;

  .card {
    width: 80%;
    max-width: 800px;
    margin-top: 20px;
    margin-bottom: 20px;
    margin-left: auto;
    margin-right: auto;
    padding-bottom: 10px;
    border-radius: 12px;
    transition: 0.5s;

    .header {
      padding-top: 10px;
      padding-bottom: 10px;
      padding-left: 30px;
      padding-right: 30px;
      font-size: 24px;
      border-bottom-width: 1px;
      border-bottom-style: solid;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .content {
      padding-left: 30px;
      padding-right: 30px;
      font-size: 16px;
      line-height: 1.6em;
      text-indent: 2em;
      text-align: justify;
      margin-top: 0.6em;
      margin-bottom: 0.6em;
    }

    #copyright {
      display: flex;
      justify-content: space-between;
      padding-left: 30px;
      padding-right: 30px;
      font-size: 16px;
      line-height: 1.6em;
      margin-top: 0.6em;
      margin-bottom: 0.6em;
    }

    #resources {
      display: flex;
      flex-wrap: wrap;
      margin-left: -5px;
      margin-right: -5px;
      margin-top: 10px;
      margin-bottom: 10px;
      padding-left: 30px;
      padding-right: 30px;
      
      button {
        margin: 5px;
      }
    }

    &:hover {
      transform: scale(1.05);
    }
  }

  #home-buttom {
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
    #home-buttom {
      width: 60px;
      height: 60px;
      border-radius: 30px;
      font-size: 30px;
      bottom: 30px;
      right: 30px;
    }
  }

  @media screen and (min-width: 800px) {
    #home-buttom {
      width: 80px;
      height: 80px;
      border-radius: 40px;
      font-size: 40px;
      bottom: 40px;
      right: 40px;
    }
  }

  .link {
    transition: 0.5s;
    
    &:hover {
      color: var(--main-color);
    }
  }

  .heavy {
    font-weight: bolder;
  }
}
</style>
