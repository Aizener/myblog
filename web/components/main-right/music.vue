<template>
  <div class="main-right-music">
    <div id="audio" class="audio"></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import 'aplayer/dist/APlayer.min.css'

export default Vue.extend({
  data() {
    return {
      ap: null
    }
  },
  mounted() {
    const APlayer = require('aplayer')
    this.ap = new APlayer({
      container: document.getElementById('audio'),
      listFolded: false,
      listMaxHeight: '220px',
      lrcType: 3,
      audio: [{
          name: 'kabuda',
          artist: 'artist',
          url: 'https://mp3.9ku.com/hot/2004/07-17/42620.mp3',
          cover: 'https://img.xiaoyou66.com/images/2020/02/06/tKb5.jpg'
      }, {
          name: 'kabuda',
          artist: 'artist',
          url: 'https://mp3.9ku.com/hot/2004/07-17/42620.mp3',
          cover: 'https://img.xiaoyou66.com/images/2020/02/06/tKb5.jpg'
      }, {
          name: 'kabuda',
          artist: 'artist',
          url: 'https://mp3.9ku.com/hot/2004/07-17/42620.mp3',
          cover: 'https://img.xiaoyou66.com/images/2020/02/06/tKb5.jpg'
      }, {
          name: 'kabuda',
          artist: 'artist',
          url: 'https://mp3.9ku.com/hot/2004/07-17/42620.mp3',
          cover: 'https://img.xiaoyou66.com/images/2020/02/06/tKb5.jpg'
      }, {
          name: 'kabuda',
          artist: 'artist',
          url: 'https://mp3.9ku.com/hot/2004/07-17/42620.mp3',
          cover: 'https://img.xiaoyou66.com/images/2020/02/06/tKb5.jpg'
      }, {
          name: 'kabuda',
          artist: 'artist',
          url: 'https://mp3.9ku.com/hot/2004/07-17/42620.mp3',
          cover: 'https://img.xiaoyou66.com/images/2020/02/06/tKb5.jpg'
      }, {
          name: 'kabuda',
          artist: 'artist',
          url: 'https://mp3.9ku.com/hot/2004/07-17/42620.mp3',
          cover: 'https://img.xiaoyou66.com/images/2020/02/06/tKb5.jpg'
      }, {
          name: 'kabuda',
          artist: 'artist',
          url: 'https://mp3.9ku.com/hot/2004/07-17/42620.mp3',
          cover: 'https://img.xiaoyou66.com/images/2020/02/06/tKb5.jpg'
      }, {
          name: 'kabuda',
          artist: 'artist',
          url: 'https://mp3.9ku.com/hot/2004/07-17/42620.mp3',
          cover: 'https://img.xiaoyou66.com/images/2020/02/06/tKb5.jpg'
      }, {
          name: 'kabuda',
          artist: 'artist',
          url: 'https://mp3.9ku.com/hot/2004/07-17/42620.mp3',
          cover: 'https://img.xiaoyou66.com/images/2020/02/06/tKb5.jpg'
      }, {
          name: 'kabuda',
          artist: 'artist',
          url: 'https://mp3.9ku.com/hot/2004/07-17/42620.mp3',
          cover: 'https://img.xiaoyou66.com/images/2020/02/06/tKb5.jpg'
      }, {
          name: 'kabuda',
          artist: 'artist',
          url: 'https://mp3.9ku.com/hot/2004/07-17/42620.mp3',
          cover: 'https://img.xiaoyou66.com/images/2020/02/06/tKb5.jpg'
      }, {
          name: 'kabuda',
          artist: 'artist',
          url: 'https://mp3.9ku.com/hot/2004/07-17/42620.mp3',
          cover: 'https://img.xiaoyou66.com/images/2020/02/06/tKb5.jpg'
      }, {
          name: 'kabuda',
          artist: 'artist',
          url: 'https://mp3.9ku.com/hot/2004/07-17/42620.mp3',
          cover: 'https://img.xiaoyou66.com/images/2020/02/06/tKb5.jpg'
      }]
    });
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