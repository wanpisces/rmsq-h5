<template>
  <div id="app">
    <router-view/>
    <lg-preview></lg-preview>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style >
@import "../static/style/iconfont.css";
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  /* max-width: 750px;
  margin: 0 auto; */
  /* height: 100vh;
  overflow: hidden;
  overflow-y: scroll; */
}
body,
div,
dl,
dt,
dd,
ul,
ol,
li,
h1,
h2,
h3,
h4,
h5,
h6,
pre,
form,
fieldset,
input,
textarea,
p,
blockquote,
th,
td {
  margin: 0;
  padding: 0;
}
ul,
ol {
  list-style: none;
}
a {
  text-decoration: none;
}
img {
  border: 0;
  vertical-align: middle;
}
input,
select,
button {
  vertical-align: middle;
  outline: none;
  border: none;
}
textarea {
  outline: none;
  border: none;
  resize: none;
}
.lf {
  float: left;
}
.rt {
  float: right;
}
.tab-swicth .van-tabs__wrap {
  width: 90%;
}
.tab-swicth .van-tab--active {
  color: #66c6f2 !important;
}
.tab-swicth .van-tabs__nav-bar {
  background: #66c6f2 !important;
}
.tab-swicth .van-search__action-text {
  color: #66c6f2 !important;
}
.tab-swicth .van-tab {
  flex: none !important;
  padding: 0 10px !important;
}
.attr-page .van-tab--active {
  color: #66c6f2 !important;
}
.attr-page .van-tabs__wrap {
  top: 0 !important;
  padding: 3px 0;
  background-color: #fff;
}
.attr-page .van-tabs__nav--card {
  margin: 0 8px;
}

.attr-page .van-tabs__nav--card .van-tab.van-tab--active {
  color: #ffffff !important;
}
.attr-page .van-tabs__nav--card .van-tab {
  color: #66c6f2 !important;
}
.attr-page .van-tabs__nav--card .van-tab.van-tab--active {
  background: #66c6f2 !important;
}

.attr-page .van-tabs__nav--card {
  border: 1px solid #66c6f2;
}

.attr-page .van-tabs__nav--card .van-tab {
  border-right: 1px solid #66c6f2;
}

html,
body,
#app,
#app > div,
#app > div > div {
  height: 100%;
}
.van-dialog__confirm,
.van-dialog__confirm:active {
  color: #ff7e00 !important;
}
.van-tree-select__nav {
  background-color: #eee !important;
}
.van-tree-select,
.van-tree-select__content {
  height: 100% !important;
}
.van-tree-select__nitem {
  text-align: center;
  background-color: transparent !important;
}
.van-tree-select__content {
  padding: 0px !important;
}
.van-tree-select__item {
  text-align: center;
  border-bottom: 1px solid #eee;
  background-color: none;
}
.van-tree-select__nitem--active {
  background-color: #fff !important;
  color: #66c6f2;
}
.van-swipe__indicators .van-swipe__indicator--active {
  background-color: #66c6f2 !important;
}

.van-tabs__line {
  background-color: #66c6f2 !important;
}
</style>
