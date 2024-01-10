<template>
<view class="monitor">
  <u-collapse :value="activeNames" @change="handlechange" ref="collapse">
    <u-collapse-item
      v-for="(item, idx) in locations" :key="`location_${item.id}`" :name="idx"
      :title="`${item.name}(${item.device_count || 0})`">
      <view v-if="item.list && item.list.length > 0">
        <MonitorItem
          v-for="(video, index) in item.list"
          :key="index"         
          :data="video"
          @loaded="reflowWindow"
          @videoMonitor="onViewMonitor(item, video)" 
        >
        </MonitorItem>
      </view>     
    </u-collapse-item>
  </u-collapse>
</view>
</template>

<script>
import MonitorItem from './components/MonitorItem'
import { getVideoLocation, getVideoLocationDevice  } from '@/api/index'
export default {
  name: 'monitor',
  components: {
    MonitorItem
  },
  data() {
    return {
      projectId: '',
      activeNames: [0],
      locations: [],
      locationIndex: 0,
      videos: []
    }
  },
  computed: {
  },
  onLoad(query) {
    this.projectId = query.projectId
  },
  mounted() {
    this.getLocations()
    const domain = process.env.APP_MONITOR_DOMAIN
    console.log('domain', domain)
  },
  methods: {
    getLocations () {
      this.locations = []
      uni.showLoading({ title: '获取安装地点...', mask: true })
      getVideoLocation({
        project_id: this.projectId
      }).then(res => {
        uni.hideLoading()
        const data = res.data
        if (data && data.length > 0) {
          this.locations = data.map(v => {
            v.isqueryed = false
            v.list = []
            return v
          })
          this.getVideos(this.locations[0])        
        }
      }).catch(err => {})
    },
    getVideos (current) {
      uni.showLoading({ title: '获取监控设备...', mask: true })
      return getVideoLocationDevice({
        install_location_id: current.id
      }).then(res => {
        uni.hideLoading()
        const data = res.data
        if (data.video_list && data.video_list.length > 0) {
          current.list = data.video_list.slice()
          current.isqueryed = true
        }
        this.reflowWindow()
        return data 
      })
    },
    handlechange($event) {
      const val = $event.filter(item => item.status === 'open').map(item => item.name)
      this.activeNames = val
      val.map(num => {
        let location = this.locations[num]
        if (!location.isqueryed && location.device_count) {
          this.getVideos(location).then(res => {
            uni.hideLoading()
          })        
        }       
      })  
    },
    reflowWindow() {
      this.$nextTick(() => {
        this.$refs.collapse.init()
      }) 
    },
    onViewMonitor(location, monitor) {
      uni.navigateTo({
        url: `/pages/live/live?deviceSerial=${monitor.device_serial}&channelNo=${monitor.channel_number}&projectId=${this.projectId}`
      })

    }
  }
}
</script>