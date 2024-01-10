<template>
  <view class="environment pa-16 bo-x" :style="{ height: windowHeight }">
    <template v-if="deviceList.length > 0">    
      <app-card bodyClass="pb-12">
        <view slot="header">
          <view class="flex-between" style="width:100%">
            <text>环境排行榜</text>
            <text @tap="$taro.navigateTo({url:`/packageEnvironment/pages/environment/rank?projectId=${projectId}`})">更多</text>
          </view>
        </view>
        <view class="card card-project">
          <view class="project-title my-12">
            <view class="flex-middle">
              <image class="environment-leaf-icon" src="/static/environment/big_data_report_pm10.png" alt="" />
              <text>环境排名：</text>
              <text class="text-rank">{{ +environment.index }}</text>
            </view>
            <view class="text-value gray">
              指数：{{ environment.sort_value || '' }}
            </view>
          </view>
          <view class="fwb font-14 mb-4">{{ environment.project_name }}</view>
          <view class="flex-middle">
            <u-tag :text="environment.city_name" mode="plain" type="primary" size="mini" />
            <text class="font-12 ml-8 sub-text">{{ environment.company_name }}</text>
          </view>
        </view>
      </app-card>
      <app-card class="mt-12" v-if="loaded">
        <u-tabs
          keyName="device_name"
          :list="deviceList"
          :current="current" 
          @change="tabChange">
        </u-tabs>


      </app-card>
    </template>    
  </view>
</template>
<script>
import {
  getEnvironmentList,
  getPanelData,
  getEnvironmentRealData,
  getEnvironmentDustStatis,
  getEnvironmentNoiseStatis,
  getEnvironmentRankDetail  
} from '@/api/index'
export default {
  name: 'environment',
  data() {
    return {
      projectId: '',
      colorConf: {
        优: '#00D287',
        良: '#99D500',
        轻度污染: '#D6CF00',
        中度污染: '#F5A623',
        重度污染: '#FF3333',
        严重污染: '#BB0000'
      },
      current: 0,
      deviceList: [],
      dustData: {
        columns: ['time', 'PM2.5', 'PM10', 'TPS'],
        rows: []
      },
      noiseData: {
        columns: ['time', '噪音'],
        rows: []
      },
      panelData: {},
      environmentData: {
        environment_quality_ratio: 0
      },
      environment: {},
      loaded: false,
      info: {},
    }
  },
  computed: {
		windowHeight() {
			const { windowHeight } = this.info
			return windowHeight ? windowHeight +'px' : '100%'
		},
    // 获取环境污染阶段
    envPhase() {
      const val = this.panelData.environment_value
      const arr = this.panelData.configuration_ranges
      if (!Array.isArray(arr)) {
        return -1
      }
      let index = -1
      if (val > arr[arr.length - 1]) {
        index = arr.length
      }

      for (let num in arr) {
        if (arr[num] >= val) {
          index = num
          break
        }
      }
      return Number(index)
    },
    // 获取环境污染表盘角度
    envAngle() {
      const phase = this.envPhase
      const val = this.panelData.environment_value
      const arr = this.panelData.configuration_ranges
      if (phase === -1 || phase === 0) {
        return 0
      }
      if (phase === arr.length) {
        return 180
      }
      let start = 0
      // let split = 180 / 6
      let split = 180 / (arr.length - 1)
      let gap = ((val - arr[phase - 1]) / (arr[phase] - arr[phase - 1])) * split
      return start + (phase - 1) * split + gap
    },
    currentDevice() {
      return this.deviceList[Number(this.current)]
    },
    workTime() {
      let time = ''
      this.deviceList.map((item, index) => {
        if (index === Number(this.current)) {
          time = item.created_time
        }
      })
      return time
    }
  },  
  onLoad(query) {
    const { projectId } = query
    this.projectId = projectId
    this.info = uni.getWindowInfo()
  },
  mounted() {
    if (!this.projectId) {
      uni.navigateBack()
      return false
    }
    this.getEnvironmentList(this.projectId)    
  },
  methods: {
    tabChange(tab) {
      console.log({ tab })
      // this.current = tab
      this.initCurrentDevice()
    },
    initCurrentDevice() {
      uni.showLoading({ title: '数据加载中...', mask: true })
      Promise.all([
        this.initEnvironment(),
        this.getEnvironmentDetail(),
        this.queryEnvironmentDustStatis(1),
        this.queryEnvironmentNoiseStatis(1)
      ]).then(() => {
        uni.hideLoading()
        this.loaded = true
      })
    },
    async getEnvironmentList(project_id) {
      const { data } = await getEnvironmentList({ project_id })
      this.deviceList = data || []
      if (this.deviceList.length > 0) {
        this.initCurrentDevice()
      }
    },
    async queryEnvironmentDustStatis(dateType) {
      const { data } = await getEnvironmentDustStatis({
        device_id: this.currentDevice.id,
        type: dateType
      })
      this.dustData.rows = data.map((v) => {
        return [v.time, v.pm_two, v.pm_ten, v.tsp]
      })
    },
    async queryEnvironmentNoiseStatis(dateType) {
      const { data } = await getEnvironmentNoiseStatis({
        device_id: this.currentDevice.id,
        type: dateType
      })
      this.noiseData.rows = data.map((v) => {
        return [v.time, v.noise]
      })
    },
    async getEnvironmentDetail() {
      const { data } = await getEnvironmentRankDetail({
        project_id: this.projectId
      })
      this.environment = data.environment || {}
    },
    initEnvironment() {
      return Promise.all([
        getPanelData({ device_id: this.currentDevice.id }),
        getEnvironmentRealData({ device_id: this.currentDevice.id })
      ]).then(([res1, res2]) => {
        this.panelData = res1.data
        this.environmentData = res2.data
      })
    },
    onChangeDust(date) {
      this.queryEnvironmentDustStatis(date.value)
    },
    onChangeNoise(date) {
      this.queryEnvironmentNoiseStatis(date.value)
    }
  }
}
</script>

<style lang="scss">
.environment {
	display: flex;
	flex-direction: column;
	background-color: #F3F6F8;
  .card-project {
    .project-title {
      background: linear-gradient(
        to right,
        rgba(0, 211, 31, 0.3),
        rgba(255, 255, 255, 0)
      );
      line-height: 32px;
      display: flex;
      justify-content: space-between;
      padding: 0 10px;
      border-radius: 5px;
      font-size: 14px;
      .environment-leaf-icon {
        margin-right: 4px;
        width: 14px;
        height: 20px;
        vertical-align: middle;
      }
      .text-rank {
        font-size: 18px;
        color: #fd910c;
      }
    }
  }
}
</style>
