<template>
  <div id="drawer">
    <div
      @click="openDrawer"
      class="drawer-button"
      :style="{
        'color': darkMode ? 'var(--white-gray)' : 'var(--dark-gray)',
        'z-index': '1'
      }">
      <span class="fas fa-bars"></span>
    </div>
    <transition name="fade">
      <div
        v-if="showDrawer"
        id="panel"
        :style="{
          'background-color': darkMode ? 'var(--black-gray)' : 'var(--white)',
          'color': darkMode ? 'var(--white-gray)' : 'var(--dark-gray)',
          'box-shadow': '0 0 12px ' + (darkMode ? 'var(--black)' : 'var(--dark-gray)')
        }">
        <div
          id="title"
          :style="{
            'background-color': darkMode ? 'var(--black-gray)' : 'var(--white)',
            'border-bottom-color': darkMode ? 'var(--dark-gray)' : 'var(--light-gray)'
          }">
          <div
            @click="closeDrawer"
            class="drawer-button"
            :style="{
              'color': darkMode ? 'var(--white-gray)' : 'var(--dark-gray)',
              'z-index': '4'
            }">
            <span class="fas fa-times"></span>
          </div>
          洋芋田网站导航
        </div>
        <div id="nav-menu">
          <div
            v-for="(item, index) in navMenu"
            :key="index">
            <div
              class="nav"
              @click="clickNav(index)"
              :style="{
                'background-color': darkMode ? 'var(--black-gray)' : 'var(--white)'
              }">
              <div>{{ item.title }}</div>
              <div
                class="collapse-button"
                v-if="item.submenu.length > 0"
                :style="{
                  'transform': item.collapsed ? 'rotate(0deg)' : 'rotate(180deg)'
                }">
                <span class="fas fa-chevron-down"></span>
              </div>
            </div>
            <div
              class="subnavs"
              :style="{
                'height': ((item.submenu && !item.collapsed) ? 48 : 0) * (item.submenu ? item.submenu.length : 0) + 'px'
              }">
              <div v-for="(subitem, index) in item.submenu" :key="index">
                <div
                  class="subnav"
                  @click="openUrl(subitem.url)"
                  :style="{
                    'background-color': darkMode ? 'var(--black-gray)' : 'var(--white)'
                  }">
                  <div>{{ subitem.title }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          id="drawer-footer"
          :style="{
            'background-color': darkMode ? 'var(--black-gray)' : 'var(--white)',
            'border-top-color': darkMode ? 'var(--dark-gray)' : 'var(--light-gray)'
          }">
          <slot></slot>
          <div
            id="dark-mode-switch"
            @click="changedarkMode"
            :style="{
              'background-color': darkMode ? 'var(--black-gray)' : 'var(--white)'
            }">
            <div
              key="enabledarkMode"
              class="dark-mode-button"
              v-if="!darkMode">
              <span class="fas fa-moon"></span>
            </div>
            <div
              key="disabledarkMode"
              class="dark-mode-button"
              v-else>
              <span class="fas fa-sun"></span>
            </div>
            {{ darkMode ? '关闭夜间模式' : '开启夜间模式'}}
          </div>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div v-if="showDrawer" id="mask" @click="closeDrawer"></div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'pf-drawer',
  data() {
    return {
      showDrawer: false,
      navMenu: []
    }
  },
  props: {
    darkMode: Boolean
  },
  methods: {
    openDrawer() {
      this.showDrawer = true
    },
    closeDrawer() {
      this.showDrawer = false
    },
    clickNav(index) {
      if (this.navMenu[index].submenu.length > 0) {
        let navMenu = JSON.parse(JSON.stringify(this.navMenu))
        navMenu[index].collapsed = !navMenu[index].collapsed
        this.navMenu = navMenu
      } else {
        this.openUrl(this.navMenu[index].url)
      }
    },
    openUrl(url) {
      window.open(url, '_blank')
    },
    changedarkMode() {
      this.$emit('update:dark-mode', !this.darkMode)
    }
  },
  mounted() {
    this.$http.get('https://api.potatofield.cn/menu').then((res) => {
      this.navMenu = res.data
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

#drawer {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  z-index: 2000;
  pointer-events: none;

  #panel {
    height: 100%;
    z-index: 1;
    pointer-events: all;
    overflow: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    z-index: 2;

    #title {
      font-size: 32px;
      line-height: 70px;
      text-align: center;
      position: sticky;
      z-index: 3;
      top: 0;
      border-bottom-style: solid;
      border-bottom-width: 1px;
    }

    #nav-menu {
      min-height: fit-content;
      flex-grow: 1;

      .nav {
        height: 60px;
        font-size: 20px;
        padding-left: 20px;
        padding-right: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        transition: 0.5s;
        cursor: pointer;

        &:hover {
          filter: brightness(0.9);
          color: var(--main-color);
        }

        .collapse-button {
          width: 20px;
          height: 20px;
          line-height: 60px;
          transition: 0.5s;
          display: flex;
          justify-content: center;
          align-items: center;

          svg {
            width: 100%;
            height: 100%;
          }
        }
      }

      .subnavs {
        overflow: hidden;
        transition: 0.5s;
      }

      .subnav {
        height: 48px;
        font-size: 16px;
        padding-left: 40px;
        padding-right: 40px;
        transition: 0.5s;
        display: flex;
        align-items: center;
        cursor: pointer;

        &:hover {
          filter: brightness(0.9);
          color: var(--main-color);
        }
      }
    }

    #drawer-footer {
      width: 100%;
      position: sticky;
      bottom: 0;
      z-index: 3;
      border-top-style: solid;
      border-top-width: 1px;

      #dark-mode-switch {
        height: 60px;
        font-size: 20px;
        line-height: 60px;
        padding-left: 20px;
        padding-right: 20px;
        display: flex;
        align-items: center;
        transition: 0.5s;
        cursor: pointer;

        &:hover {
          filter: brightness(0.9);
          color: var(--main-color);
        }

        .dark-mode-button {
          width: 20px;
          height: 20px;
          margin-right: 10px;
          transition: 0.5s;
          display: flex;
          justify-content: center;
          align-items: center;

          svg {
            width: 100%;
            height: 100%;
          }
        }
      }
    }

    &::-webkit-scrollbar {
      width: 8px;
    }
        
    &::-webkit-scrollbar-track {
      background-color: var(--white-gray);
      
      &:hover {
        background-color: var(--light-gray);
      }
    }
    
    &::-webkit-scrollbar-thumb {
      background-color: var(--gray);
      transition: 0.2s;
      
      &:hover {
        background-color: var(--dark-gray);
      }
    }
  }

  @media screen and (max-width: 800px) {
    #panel {
      width: 100%;
    }
  }

  @media screen and (min-width: 800px) {
    #panel {
      width: 600px;
    }
  }

  #mask {
    height: 100%;
    width: 0;
    flex-grow: 1;
    background-color: var(--transparent-black-cover);
    pointer-events: all;
  }

  .drawer-button {
    position: absolute;
    left: 20px;
    top: 20px;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.5s;
    pointer-events: all;
    cursor: pointer;

    svg {
      width: 100%;
      height: 100%;
    }

    &:hover {
      filter: brightness(0.7);
    }
  }
}
</style>