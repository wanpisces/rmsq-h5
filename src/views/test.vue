<template>
  <div class="liveView">
    <!-- <h3>Vue Video.js Live Demo</h3>
    <p>Current Stream:
      <span class="badge badge-success">{{ currentStream }}</span>
    </p>
    <p>Current Tech:
      <span class="badge badge-info">{{ currentTech }}</span>
    </p> -->
    <video-player class="video-player vjs-custom-skin" ref="videoPlayer" :options="playerOptions" @ready="onPlayerReadied" @timeupdate="onTimeupdate">
    </video-player>
    <div class="live-title">四川省妇联十二届七次执委会议在成都召开</div>
    <div class="live-content">
      <p>
        四川省妇联十二届七次执委会议于7月30日在成都召开。会议学习传达了省委十一届三次全会精神，省委副书记邓小刚出席会议并作重要讲话。
      </p>
      <h4 style="font-weight:600"> 他强调：
      </h4>
      <p>
        全省各级妇联要进一步增强政治性，牢固树立“四个意识”、增强“四个自信”，坚决做到“两个维护”，始终在思想上政治上行动上同以习近平同志为核心的党中央保持高度一致，团结带领广大妇联群众坚定不移听党话跟党走，确保妇联工作沿着正确政治方向前进。

      </p>
    </div>

    <!-- <div class="selectWrapper">
      Switch Tech：
      <div class="form-check">
        <input class="form-check-input" type="radio" name="tech" id="html5" value="Html5" v-model="currentTech" @change="changeTech">
        <label class="form-check-label" for="html5">
          Html5
        </label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="radio" name="tech" id="flash" value="Flash" v-model="currentTech" @change="changeTech">
        <label class="form-check-label" for="flash">
          Flash
        </label>
      </div>
    </div>

    <h5>Enter your streams link below</h5>
    <div class="inputWrapper">
      <div class="form-group row" v-if="currentStream==='RTMP'">
        <label for="" class="col-sm-4 col-form-label">RTMP: </label>
        <div class="col-sm-8">
          <input class="form-control" type="text" placeholder="RTMP url here" v-model="streams.rtmp">
        </div>
      </div>
      <div class="form-group row" v-else>
        <label for="" class="col-sm-4 col-form-label">HLS: </label>
        <div class="col-sm-8">
          <input class="form-control" type="text" placeholder="HLS url here" v-model="streams.hls">
        </div>
      </div>
    </div>
    <div class="buttonWrapper">
      <button class="btn btn-primary" type="button" @click="enterStream">Apply</button>
    </div> -->

    <!-- <Switcher></Switcher> -->
  </div>
</template>

<script>
// const isProduction = process.env.NODE_ENV === "production";

export default {
  name: "live",

  data() {
    return {
      initialized: false,
      currentTech: "",
      streams: {
        rtmp: "",
        hls: ""
      },
      playerOptions: {
        overNative: true,
        autoplay: false,
        controls: true,
        techOrder: ["html5", "flash"],
        sourceOrder: true,
        flash: {
          hls: { withCredentials: false },
          swf: "./../../static/media/video-js.swf"
        },
        html5: { hls: { withCredentials: false } },
        sources: [
          // {
          //   type: "rtmp/mp4",
          //   src: "https://hwzbfee.yunshicloud.com/x7px03/x7px03/94zc3r/oz71qd/tg4ll1.m3u8"
          // }
          {
            withCredentials: false,
            type: "application/x-mpegURL",
            src: "https://hwzbfee.yunshicloud.com/x7px03/x7px03/yh9zk3/y8kawn/g5181v.m3u8"
          }
        ],
        poster: "../../static/img/fengmian.jpg",
        notSupportedMessage: "此视频暂无法播放，请稍后再试"
        // controlBar: {
        //   timeDivider: false, // 时间分割线
        //   durationDisplay: false, // 总时间
        //   progressControl: true, // 进度条
        //   customControlSpacer: true, // 未知
        //   fullscreenToggle: true // 全屏
        // },
      }
    };
  },
  mounted() {
    console.log("this.$refs.videoPlayer.player;", this.$refs.videoPlayer.player);
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player;
    },
    currentStream() {
      return this.currentTech === "Flash" ? "RTMP" : "HLS";
    }
  },
  methods: {
    onPlayerReadied() {
      if (!this.initialized) {
        this.initialized = true;
        this.currentTech = this.player.techName_;
      }
    },
    // record current time
    onTimeupdate(e) {
      // console.log("currentTime", e.cache_.currentTime);
    },
    enterStream() {
      this.playerOptions.sources[1].src = this.streams.hls;
      this.playerOptions.sources[0].src = this.streams.rtmp;
      this.playerOptions.autoplay = true;
    },
    changeTech() {
      if (this.currentTech === "Html5") {
        this.playerOptions.techOrder = ["html5"];
      } else if (this.currentTech === "Flash") {
        this.playerOptions.techOrder = ["flash"];
      }
      this.playerOptions.autoplay = true;
    }
  }
};
</script>

<style scoped>
.liveView {
  position: relative;
  background: #fff;
}

.selectWrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  line-height: 30px;
  margin: 20px;
  vertical-align: baseline;
}

.inputWrapper {
  width: 500px;
  margin: 0 auto;
}

.buttonWrapper {
  text-align: center;
}
.live-title {
  text-align: center;
  padding: 5vh 3%;
  font-size: 1.2rem;
  font-weight: 600;
}
.live-content {
  padding: 3vh 3%;
  background: #f8f8f8;
}
.live-content p {
  /* text-align: center; */
  padding-bottom: 3vh;
  line-height: 5vh;
  text-indent: 2rem;
  color: #666;
}
.live-content h4 {
  /* text-align: center; */
  padding-bottom: 3vh;
  text-indent: 2rem;
  color: #666;
}
</style>
