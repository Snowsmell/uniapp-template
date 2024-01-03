<template>
	<view class="home" :style="{ height: windowHeight }">
		<u-navbar 
			:fixed="true"
			:border="false" 
			bgColor="transparent" 
			left-text="首页"
			leftIconColor="#fff"
			@clickLeft="toHome">
			<view slot="right" class="flex-middle" @click="handleClick">
				<text class="iconfont kmg-dingwei"></text>
				<view style="color:#000">长水机场一标段</view>
			</view>	
		</u-navbar>
		<view class="home-banner">
			<image
				src="/static/banner.png"
				mode="widthFix"
			/>
			<view class="container">
				<view class="home-banner-navs flex-middle">
					<view 
						v-for="(n, i) in navs" :key="i"
						class="flex-item tac home-banner-navs-item">
						<view class="circle" :style="{
							'background-image': `linear-gradient(to bottom, ${n.colors[0]}, ${n.colors[1]})`
						}">
							<text :class="['iconfont', n.icon]" />
						</view>						
						<view>{{ n.text }}</view>
					</view>
				</view>
			</view>

		</view>
		<view class="home-apps flex-item">
			<scroll-view scroll-y class="home-apps-list">
				<view 
					class="home-apps-block mb-20"
					v-for="(apps, i) in applications" :key="i">
					<view class="font-18 fwb pa-12">{{ apps.application_category_desc }}</view>
					<u-grid 
						class="home-apps-block-list" :border="false" col="4">
						<u-grid-item 
							v-for="(app, idx) in apps.application_list.filter(v => v.has_right)" :key="idx" class="tac mb-4">
							<image style="width:40px;height:40px" mode="widthFix" :src="!app.icon.indexOf('https') || !app.icon.indexOf('http')? app.icon : icon" />
							<text class="mt-4">{{ app.name }}</text>
						</u-grid-item>
					</u-grid>
				</view>				
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import { getApplictions } from '@/api/index'
	export default {
		data() {
			return {
				title: 'Hello',
				navs: [
					{ text: '施工铭牌', icon: 'kmg-shigongmingpai', colors: ['#7CB4FF', '#2690F7'] },
					{ text: '预警中心', icon: 'kmg-yujingzhongxin', colors: ['#FFB38C', '#FF7A38'] },
					{ text: '大数据分析', icon: 'kmg-dashujufenxi', colors: ['#9BA3FB', '#4565DD'] },
					{ text: '消息', icon: 'kmg-xiaoxi', colors: ['#8BE4B9', '#00C264'] }
				],
				applications: [],
				info: {},
				icon: 'https://static-huariot-com.oss-cn-hangzhou.aliyuncs.com/app/applications_icon/default.png'
			}
		},
		computed: {
			windowHeight() {
				const { windowHeight } = this.info
				return windowHeight ? windowHeight +'px' : '100%'
			}
		},
		onLoad() {
			this.info = uni.getWindowInfo()
			this.testapi()
		},
		methods: {
			toHome() {
				uni.switchTab({ url: '/pages/index/index' })
			},
			handleClick() {
				console.log('locationClick')
			},
			testapi() {
				getApplictions({ 
					application_type_string: '0,1', 
					project_id: 1408 
				}).then(res => {
					this.applications = res.data[0].application_type_list
				}).catch(err => {
				})
			}
		}
	}
</script>

<style lang="scss">
.home{
	display: flex;
	flex-direction: column;
	background-color: #F3F6F8;
	&-banner{
		width: 100%;
		position: relative;
		top: -44px;
		image{
			width: 100%
		}
    .container{
      box-sizing: border-box;
      padding: 0 10px;
			position: absolute;
			width: 100%;
			bottom: 0;			
    }			
		&-navs{
			padding: 12px 16px;
			background-image: linear-gradient(to bottom, rgba(185, 214, 255, 0.8), rgba(255, 255, 255, 0.6));
			border: 1px solid #fff;
			border-radius: 5px 5px 0 0;
			box-sizing: border-box;
			&-item{
				font-size: 14px;
				.circle{
					width: 48px;
					height: 48px;
					background-color: pink;
					border-radius: 50%;
					line-height: 48px;
					margin: 0 auto 4px;
				}
				.iconfont{
					font-size: 32px;
					color: #fff
				}
			}
		}
	}
	&-apps{
		margin-top: -22px;
		box-sizing: border-box;
		position: relative;
		&-list{
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			padding: 10px;
			box-sizing: border-box;
			font-size: 14px;
		}
		&-block{
			background: #fff;
			border-radius: 5px;
		}
	}
}
</style>
