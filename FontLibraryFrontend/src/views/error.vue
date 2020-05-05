<template>
  <div
    id="error"
    :style="{
      'background-color': darkMode ? 'var(--dark-gray)' : 'var(--white-gray)'
    }">
    <pf-drawer :dark-mode.sync="darkMode"></pf-drawer>
    <pf-header
      :dark-mode="darkMode"
      logo="logo.png"
      title="洋芋田字体库"
      subtitle="提供百余种商用免费字体的下载"></pf-header>
    <div
      id="main"
      :style="{
        'color': darkMode ? 'var(--white-gray)' : 'var(--dark-gray)'
      }">
      <div id="code-wrapper">
        <div
          id="code"
          :style="{
            'background-color': darkMode ? 'var(--black-gray)' : 'var(--white)',
            'box-shadow': '0 0 12px ' + (darkMode ? 'var(--black-gray)' : 'var(--gray)'),
            'color': darkMode ? 'var(--white-gray)' : 'var(--dark-gray)'
          }">404</div>
      </div>
      <div id="tip">别看啦，这里什么都没有</div>
      <router-link
        class="link"
        :to="{
          name: 'index'
        }">返回首页</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'error',
  data() {
    return {
      darkMode: false
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
#error {
  height: 100vh;
  display: flex;
  flex-direction: column;

  #main {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @keyframes rotation {
      0% {
        transform: rotate(0deg);
      }

      50% {
        transform: rotate(180deg);
      }

      100% {
        transform: rotate(360deg);
      }
    }

    #code-wrapper {
      animation: rotation 5s infinite linear;

      #code {
        display: flex;
        justify-content: center;
        align-items: center;
        transition: 0.5s;

        &:hover {
          transform: scale(1.05);
        }
      }

      @media screen and (max-height: 600px) {
        #code {
          width: 100px;
          height: 100px;
          border-radius: 50px;
          font-size: 40px;
        }
      }

      @media screen and (min-height: 600px) and (max-height: 800px) {
        #code {
          width: 150px;
          height: 150px;
          border-radius: 75px;
          font-size: 60px;
        }
      }

      @media screen and (min-height: 800px) {
        #code {
          width: 200px;
          height: 200px;
          border-radius: 100px;
          font-size: 80px;
        }
      }
    }

    #tip {
      font-size: 16px;
    }

    @media screen and (max-height: 600px) {
      #tip {
        margin-top: 20px;
        margin-bottom: 20px;
      }
    }

    @media screen and (min-height: 600px) {
      #tip {
        margin-top: 40px;
        margin-bottom: 40px;
      }
    }

    .link {
      font-size: 16px;
      transition: 0.5s;

      &:hover {
        color: var(--main-color);
      }
    }
  }
}
</style>