<template>
  <div class="main-right-music">
    <div id="audio" class="audio"></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import 'aplayer/dist/APlayer.min.css'
import { getMusicList } from '~/utils/api/music'

export default Vue.extend({
  data() {
    return {
      ap: null as any
    }
  },
  async mounted() {
    const res: any = await getMusicList(0, 20);
    if (res && res.code === 200) {
      const audios = res.data.map((item: any) => {
        return {
          name: item.title,
          artist: 'artist',
          url: item.url,
          cover: 'https://img.xiaoyou66.com/images/2020/02/06/tKb5.jpg'
        }
      });

      const APlayer = require('aplayer')
      this.ap = new APlayer({
        container: document.getElementById('audio'),
        listFolded: false,
        listMaxHeight: '220px',
        lrcType: 3,
        audio: audios
      });

      this.$root.$on('music-last', () => {
        this.ap.play();
        this.ap.skipBack();
      })
      this.$root.$on('music-next', () => {
        this.ap.play();
        this.ap.skipForward();
      })
      this.$root.$on('music-toggle', () => {
        const isPause = this.ap.audio.paused;
        isPause ? this.ap.play() : this.ap.pause();
      })
    }
  }
})
</script>

<style lang="scss">
.main-right-music {
  width: 100%;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 0 5px #ccc;
  .audio {
    margin: 0;
  }
}
</style>