<template>
  <view 
    :class="[
      'app-card',
      {'app-card--shadow': raised},
      {'app-card--border': outlined},
      {'app-card--radius': !square},
      {'app-card--divider': divided},
      {'app-card--small': size === 'small'}
    ]"
    @tap="$_handleClick"
  >
    <view v-if="title || $slots.header" :class="['app-card__hd', headClass]" :style="headStyle">
      <slot name="header">
        <view class="app-card__title" :style="titleStyle">{{ title }}</view>
        <slot name="extra">
          <view
            v-if="extra"
            class="app-card__extra"
            :style="extraColor ? `color: ${extraColor}` : ''"
            @tap.stop="$_handleExtra"
          >
            {{ extra }}
          </view>
        </slot>
      </slot>
    </view>

    <view :class="['app-card__bd', bodyClass]" :style="bodyStyle">
      <slot></slot>
    </view>

    <view v-if="$slots.footer" :class="['app-card__ft', footClass]" :style="footStyle">
      <slot name="footer"></slot>
    </view>
  </view>
</template>

<script>
/* eslint-disable */
export default {
  name: 'Card',
  props: {
    title: String,
    extra: [String, Number],
    size: String,
    raised: Boolean,      // 是否有阴影
    outlined: Boolean,    // 是否有边框
    square: Boolean,
    divided: {            // 是否有分隔线
      type: Boolean,
      default: true
    },
    titleStyle: String,
    extraColor: String,
    headStyle: String,
    headClass: String,
    bodyStyle: String,
    bodyClass: String,
    footStyle: [String, Object],
    footClass: String
  },
  methods: {
    $_handleClick (evt) {
      this.$emit('click', evt)
    },
    $_handleExtra (evt) {
      this.$emit('click-extra', evt)
    }
  }
}
</script>

<style lang="scss">
.app-card{
  position: relative;
  background-color: #fff;
  font-size: 14px;
  
  &--shadow{
    box-shadow: 0 2px 8px rgba(0, 0, 0, .09);
  }
  &--border{
    border: 1px solid $border-color;
  }
  &--radius{
    border-radius: 5px;
  }

  &__hd{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 9px 16px 8px;

    .app-card--divider > & {
      border-bottom: 1px solid $border-color;
    }
  }
  
  &__title,
  .card-title{
    font-size: 16px;
    font-weight: bold;
  }
  &__extra,
  .card-extra{
    flex-shrink: 0;
    display: flex;
    align-items: center;
    margin-left: 12px;
    color: #858b9c;
  }

  &__bd, &__ft{
    padding-left: 16px;
    padding-right: 16px;
  }

  &__ft{
    .app-card--divider > & {
      border-top: 1px solid $border-color;
    }
  }

  &--small{
    &.app-card{
      &--radius{
        border-radius: 3px;
      }
      &--shadow{
        box-shadow: 0 2px 5px rgba(0, 0, 0, .1);
      }
    }
    & > .app-card{
      &__hd{
        padding: 10px 12px 8px;
      }
      &__bd, &__ft{
        padding-left: 12px;
        padding-right: 12px;
      }
    }
    .app-card__title,
    .card-title,
    .title{
      font-size: 14px;
    }
  }
}
</style>