<template>
  <div
    id="header"
    :style="{
      'height': smallScreen ? (showHeader ? (showSearch ? '356px' : '286px') : '70px') : (showSearch ? '270px' : '200px'),
      'background-color': darkMode ? 'var(--black-gray)' : 'var(--white)',
      'color': darkMode ? 'var(--white-gray)' : 'var(--dark-gray)',
      'box-shadow': '0 0 12px ' + (darkMode ? 'var(--black)' : 'var(--dark-gray)')
    }">
    <transition name="fade">
      <div v-if="showHeader && (logo || title || subtitle)" id="content-wrapper">
        <img v-if="logo" id="logo" :src="logo">
        <div id="title-container">
          <div v-if="title" id="main-title">{{ title }}</div>
          <div v-if="subtitle" id="subtitle">{{ subtitle }}</div>
        </div>
      </div>
    </transition>
    <div
      key="closeSearch"
      v-if="showSearchButton && showSearch"
      @click="closeSearch"
      class="search-button"
      :style="{
        'color': darkMode ? 'var(--white-gray)' : 'var(--dark-gray)'
      }">
      <span class="fas fa-chevron-up"></span>
    </div>
    <div
      key="openSearch"
      v-if="showSearchButton && !showSearch"
      @click="openSearch"
      class="search-button">
      <span class="fas fa-search"></span>
    </div>
    <transition name="fade">
      <el-input
        v-if="showSearch"
        v-model="searchKeyword"
        @input="handleSearchInput"
        id="search-input"
        :placeholder="searchPlaceholder ? searchPlaceholder : '输入搜索关键词'"
        :style="{
          'padding-top': showHeader ? null : '15px',
          'padding-left': showHeader ? null : '70px',
          'padding-right': showHeader ? null : '70px',
          'padding-bottom': showHeader ? null : '0'
        }">
        <el-button
          @click="handleSearchButton"
          slot="append">{{ autoSearch ? '清空' : (searchButtonText ? searchButtonText : '搜索') }}</el-button>
      </el-input>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'pf-header',
  data() {
    return {
      smallScreen: false,
      showHeader: true,
      showSearch: false,
      searchKeyword: ''
    }
  },
  props: {
    darkMode: Boolean,
    showSearchButton: Boolean,
    searchPlaceholder: String,
    autoSearch: Boolean,
    searchButtonText: String,
    searchFunction: Function,
    logo: String,
    title: String,
    subtitle: String
  },
  methods: {
    setScreenSize() {
      if (window.innerWidth < 900) {
        this.smallScreen = true
        this.setHeaderShow()
      } else {
        this.smallScreen = false
        this.setHeaderShow()
      }
    },
    setHeaderShow() {
      if (this.smallScreen) {
        let bodyScrollTop = 0
        let documentScrollTop = 0
        if (document.body){
          bodyScrollTop = document.body.scrollTop
        }
        if (document.documentElement){
          documentScrollTop = document.documentElement.scrollTop
        }
        let scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop
        if (scrollTop > 0) {
          this.showHeader = false
        } else {
          this.showHeader = true
        }
      } else {
        this.showHeader = true
      }
    },
    openSearch() {
      this.showSearch = true
    },
    closeSearch() {
      this.showSearch = false
    },
    handleSearchInput(value) {
      if (this.autoSearch && (typeof this.searchFunction == 'function')) {
        this.searchFunction(value)
      }
    },
    handleSearchButton() {
      if (this.autoSearch) {
        this.searchKeyword = ''
        this.handleSearchInput()
      } else {
        if (typeof this.searchFunction == 'function') {
          this.searchFunction(this.searchKeyword)
        }
      }
    }
  },
  mounted() {
    window.onresize = () => {
      this.setScreenSize()
      this.setHeaderShow()
    }
    window.onscroll = (event) => {
      this.setHeaderShow()
    }
    this.$nextTick(() => {
      this.setScreenSize()
    })
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

#header {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 70px;
  overflow: hidden;
  box-sizing: border-box;
  position: sticky;
  top: 0;
  z-index: 1000;
  transition: 0.5s;

  #content-wrapper {
    display: flex;
    padding-top: 50px;
    padding-bottom: 50px;
    height: fit-content;
    box-sizing: border-box;
    align-items: center;
    justify-content: center;

    #logo {
      height: 100px;
    }

    #title-container {
      display: flex;
      flex-direction: column;
    }

    @media screen and (min-width: 900px) {
      #title-container {
        margin-left: 50px;
        height: 100px;
        justify-content: space-between;

        #main-title {
          font-size: 48px;
          line-height: 1em;
        }

        #subtitle {
          font-size: 18px;
          line-height: 1em;
        }
      }
    }

    @media screen and (max-width: 900px) {
      #title-container {
        align-items: center;

        #main-title {
          font-size: 32px;
          line-height: 1em;
          margin-top: 20px;
          margin-bottom: 20px;
        }

        #subtitle {
          font-size: 14px;
          line-height: 1em;
        }
      }
    }
  }

  @media screen and (max-width: 900px) {
    #content-wrapper {
      flex-direction: column;
      justify-content: center;
    }
  }

  .search-button {
    position: absolute;
    right: 20px;
    top: 20px;
    width: 30px;
    height: 30px;
    transition: 0.5s;
    z-index: 1;
    cursor: pointer;

    svg {
      width: 100%;
      height: 100%;
    }

    &:hover {
      filter: brightness(0.7);
    }
  }

  .el-input {
    width: 100%;
    box-sizing: border-box;
    padding: 0 30px 30px 30px;
  }
}
</style>