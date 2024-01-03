# zaiot-mobile

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

  "tabBar": {
		"color": "#646566",
		"selectedColor": "#598cff",
		"borderStyle": "black",
		"backgroundColor": "#ffffff",		
    "list": [{
      "pagePath": "pages/index/index",
      "text": "首页",
      "selectedIconPath": "static/tabbar/home_action.png",
      "iconPath": "static/tabbar/home.png"		
    },{
      "pagePath": "pages/mine/mine",
      "text": "我的",
      "selectedIconPath": "static/tabbar/my_action.png",
      "iconPath": "static/tabbar/my.png"
    }]
  },