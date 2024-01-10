<template>
<view class="monitor-live">
	<u-navbar 
		:fixed="true"
    :autoBack="true"
    :border="true" 
    :title="playType === 'rec' ? '监控回放' : '监控直播'">
		<view slot="right" class="flex-middle">
      <text button @click="onToggle">{{ playType === 'rec' ? '直播' : '回放' }}</text>
		</view>	
	</u-navbar>
  <view>我是内容</view>  
  <web-view
    v-if="liveUrl"
    :src="liveUrl"
    :id="iframeId"
    ref="playerIframe"
    name="playerIframe"
    allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true" oallowfullscreen="true" msallowfullscreen="true"
    allow="microphone;camera;midi;encrypted-media;"
    width="100%"
    height="100%"
    scrolling="auto"
    frameborder="0">
  </web-view>
</view>
</template>

<script>
import { getMonitorDeviceDetail } from '@/api/index'
import { randomStr } from '@/utils'
const domain = process.env.APP_MONITOR_DOMAIN

export default {
  name: 'monitor-live',
  data() {
    return {
      deviceSerial: '',
      channelNo: '',      
      monitor: null,
      playType: 'live',
      iframeId: randomStr()
    }
  },
  computed: {
    liveUrl() {
      const { monitor } = this
      if (!monitor) return ''

      const params = {
        deviceSerial: monitor.device_serial,
        channelNo: monitor.channel_number || 1,
        accessToken: monitor.access_token,
        title: monitor.video_channel_name ? `${monitor.video_name}(${monitor.video_channel_name})` : monitor.video_name,
        talk: monitor.voice_flag,
        pantile: monitor.intelligence_property !== 0,
        buttons: 1
      }
      const paramStr = Object.keys(params).map(key => `${key}=${encodeURIComponent(params[key])}`).join('&')

      if (this.playType === 'rec') {
        return domain + '/app/monitor/hik/mobile/rec.html?' + paramStr
      } else {
        return domain + '/app/monitor/hik/mobile/live.html?' + paramStr
      }
    }
  },
  watch: {
    liveUrl() {
      this.iframeId = randomStr()
    }
  },
  onLoad(query) {
    const { deviceSerial, channelNo } = query
    if (!deviceSerial || !channelNo) {
      return uni.navigateBack()
    }
    if (this.monitor) return
    this.getDetail(deviceSerial, channelNo)
    // this.deviceSerial = deviceSerial
    // this.channelNo = channelNo
  },
  mounted() {
    // #ifdef APP-PLUS
    
    // #endif
  },
  methods: {
    getDetail(device_number, channel_number) {
      uni.showLoading({ title: '获取监控设备数据...', mask: true })
      return getMonitorDeviceDetail({ device_number, channel_number }).then(({ data }) => {
        this.monitor = data
        uni.hideLoading()
      })
    },
    onToggle() {
      this.playType = this.playType === 'rec' ? 'live' : 'rec'
    },  
  }
}
</script>