<!--视频监控-->
<template>
  <view class="MonitorItem" @tap="videoMonitor">
    <image :src="data.static_picture_url" mode="widthFix" @load="loaded" />
    <text class="font-14 gray-9 place">{{ data.video_channel_name ? `${data.video_name}(${data.video_channel_name})` : data.video_name }}</text>
    <view v-if="data && data.warning_flag" class="warn-flag">
      <text class="font-14 gray-9">预警</text>
    </view>
  </view>
</template>

<script>
export default {
  name: 'MonitorItem',
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    videoMonitor () {
      this.$emit('videoMonitor')
    },
    loaded() {
      this.$emit('loaded')
    }
  }
}
</script>

<style lang='scss'>
  .MonitorItem {
    position: relative;    
    image {
      width: 100%;
      height: 100%;
    }
    .place {
      position: absolute;
      left: 24px;
      bottom: 24px;
    }
    .warn-flag {
      padding: 2px 5px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #FF3636;
      position: absolute;
      top: 16px;
      right: 16px;
    }
    &+&{
      margin-top: 16px;
    }
    .gray-9{
      color:#f1f3f5
    }
  }
</style>
