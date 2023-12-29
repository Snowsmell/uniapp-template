<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
      <view class="text-area-sub" @click="testapi">sssss</view>
      <text class="iconfont kmg-FOBtance"></text>
		</view>
		<view>
			我是接口返回的信息{{ info }}
		</view>
	</view>
</template>

<script>
	import { getBanners, getApplictions } from '@/api/index'
	export default {
		data() {
			return {
				title: 'Hello',
				info: ''
			}
		},
		onLoad() {

		},
		methods: {
			testapi() {
				getBanners().then(res => {
					this.info = res.data
					console.log({ res })
				}).catch(() => {
					
				})
			}
		}
	}
</script>

<style lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin: 200rpx auto 50rpx auto;
	}

	.text-area {
		display: flex;
		justify-content: center;
		&-sub{
			color: red
		}    
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
