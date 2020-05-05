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
      v-for="(version, index) in versions"
      :key="index"
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
        <div class="code">{{ version.code }}</div>
        <a class="download" :href="version.download" target="_blank">下载</a>
      </div>
      <div class="feature" v-for="(feature, index) in version.features.split('\n')" :key="index">{{ feature }}</div>
      <div class="footer">
        <div>发布日期</div>
        <div>{{ version.pub_date.slice(0, 4) + " 年 "
          + version.pub_date.slice(5, 7) + " 月 "
          + version.pub_date.slice(8, 10) + " 日" }}</div>
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
      versions: []
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
    let loading = Loading.service()
    this.$http.get('https://api.potatofield.cn/imagetoolkit/versions').catch((error) => {
      this.$notify.error({
        title: '出现错误',
        message: '加载版本历史失败，请检查您的网络！',
        duration: 0,
        position: 'bottom-right'
      })
    }).then((res) => {
      this.versions = res.data
      loading.close()
    })
  }
}
</script>

<style lang="scss" scoped>
#index {
  transition: 0.5s;

  .card {
    width: 80%;
    max-width: 800px;
    margin-top: 20px;
    margin-bottom: 20px;
    margin-left: auto;
    margin-right: auto;
    border-radius: 12px;
    transition: 0.5s;

    .header {
      padding-top: 10px;
      padding-bottom: 10px;
      padding-left: 10px;
      padding-right: 30px;
      border-bottom-width: 1px;
      border-bottom-style: solid;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .code {
        height: 32px;
        font-size: 18px;
        border-radius: 6px;
        padding-left: 12px;
        padding-right: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: var(--main-color);
        color: var(--white);
      }

      .download {
        font-size: 16px;
        transition: 0.5s;
        cursor: pointer;

        &:hover {
          color: var(--main-color);
        }
      }
    }

    .feature {
      padding-left: 30px;
      padding-right: 30px;
      font-size: 16px;
      line-height: 1.6em;
      margin-top: 0.6em;
      margin-bottom: 0.6em;
    }

    .footer {
      padding-top: 10px;
      padding-bottom: 10px;
      padding-left: 30px;
      padding-right: 30px;
      font-size: 12px;
      color: var(--gray);
      display: flex;
      justify-content: space-between;
      align-items: center;
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
}
</style>
