<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@100&display=swap');

:root {
  --main-font: "Noto Sans SC";
  --main-color: #2196F3;
  --warning-red: #F56C6C;
  --black-gray: #303133;
  --dark-gray: #606266;
  --gray: #C0C4CC;
  --light-gray: #DCDFE6;
  --white-gray: #F5F7FA;
  --white: #FFFFFF;
  --black: #000000;
  --transparent: rgba(255, 255, 255, 0);
  --transparent-black-cover: rgba(0, 0, 0, 0.3);
  --transparent-white-cover: rgba(255, 255, 255, 0.7);
}

body {
  margin: 0;
  font-family: var(--main-font);
  cursor: default;
  -webkit-app-region: drag;
  user-select: none;
  color: var(--dark-gray);
}

a {
  color: unset;
  cursor: pointer;
  text-decoration: unset;
}

.link {
  font-size: 18px;
  transition: 0.5s;

  &:hover {
    color: var(--main-color)!important;
  }

  &:active {
    filter: brightness(0.7);
  }
}
</style>
