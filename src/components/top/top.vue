<template>
  <div :style="{height:height+'px',zIndex:zIndex}">
    <div :class="className" :style="{top:stickyTop+'px',zIndex:zIndex,position:position,width:width,height:height+'px'}">
      <slot>
        <div></div>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Sticky",
  props: {
    stickyTop: {
      type: Number,
      default: 0
    },
    zIndex: {
      type: Number,
      default: 1
    },
    className: {
      type: String
    }
  },
  data() {
    return {
      active: false,
      position: "",
      currentTop: "",
      width: undefined,
      height: undefined,
      child: null,
      stickyHeight: 0
    };
  },
  mounted() {
    this.height = this.$el.getBoundingClientRect().height;
    window.addEventListener("scroll", this.handleScroll);
  },
  activated() {
    this.handleScroll();
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    sticky() {
      if (this.active) {
        return;
      }
      console.log("aaaa");
      this.position = "fixed";
      this.active = true;
      this.width = this.width + "px";
    },
    reset() {
      if (!this.active) {
        return;
      }
      this.position = "";
      this.width = "auto";
      this.active = false;
    },
    handleScroll() {
      this.width = this.$el.getBoundingClientRect().width;
      const offsetTop = this.$el.getBoundingClientRect().top;
      console.log("dddd", this.with, offsetTop);
      if (offsetTop <= this.stickyTop) {
        // console.log("aaaaaaaaa___________");
        this.sticky();
        return;
      }
      // console.log(11111111111);
      this.reset();
    }
  }
};
</script>
