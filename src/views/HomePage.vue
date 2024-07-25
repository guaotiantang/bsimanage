<script setup>

</script>

<template>
  <div class="home">
    <h1>BSIManage</h1>
    <p>Version 1.0 Base</p>
  </div>
</template>

<style scoped>
  .home {
    height: 98%;
    width: 100%;
    font-family: "TypoGraphica", sans-serif;
    font-size: 64px;
    letter-spacing: 6px; /* 字间距 */
    text-align: center;
    background: linear-gradient(90deg, grey, cornflowerblue, coral, darkgoldenrod);
    background-size: 100% 100%;  /* 增大背景尺寸以使渐变滚动效果更加明显 */
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;  /* 针对 Safari 的额外规则 */
    color: transparent;  /* 针对非 Safari 浏览器 */
    display: inline-block;  /* 确保背景覆盖整个文本 */
  }
</style>