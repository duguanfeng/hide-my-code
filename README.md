# hide-my-code README
## 配置方法
可以将匹配到的代码进行隐藏：
``` js
// setting.json
// 配置项：
"hide-my-code":{
    // 匹配到的会被隐藏起来
    "hideList": [
        "//( )?#ifdef MP-H5(.|[\r\n])*?// #( )?endif",
        "<!-- #ifdef MP-H5 -->(.|[\r\n])*?<!-- #endif -->",
    ],
    // 遮罩的颜色
    "bgColor":"green",
    // 此处可配置其他的属性
    "style":{
        "after": {
			"contentText": "代码隐藏中，请勿删除！",
			"color": "red",
			"border": "1px solid red"
		}
    }
}
```
## 使用方法
命令行执行：（command+shift+p  -> 输入下面的命令  ->  回车 ）
``` shell
hide-my-code / 显示或隐藏我的代码
```

**随缘更新!**
