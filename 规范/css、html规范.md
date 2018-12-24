[toc]
# HTML
## 属性顺序
HTML 属性应该按照特定的顺序出现以保证易读性。

- class

- id, name

- data-*

- src, for, type, href, value

- title, alt

- role, aria-*
# css书写规范

## CSS书写顺序
1. 位置属性(position, top, right, z-index, display, float等)
2. 大小(width, height, padding, margin)
3. 文字系列(font, line-height, letter-spacing, color- text-align等)
4. 背景(background, border等)
5. 其他(animation, transition等)
 
##  去掉小数点前的“0”
```
font-size:0.6em; font-size:.6em;
```

## 连字符CSS选择器命名规范
1. 长名称或词组可以使用中横线来为选择器命名。
2. 不建议使用“_”下划线来命名CSS选择器，为什么呢？
- 输入的时候少按一个shift键；
- 览器兼容问题 （比如使用_tips的选择器命名，在IE6是无效的）

##  不要随意使用Id
id在JS是唯一的，不能多次使用，而使用class类选择器却可以重复使用，另外id的优先级优先与class，所以id应该按需使用，而不能滥用。

##  为选择器添加状态前缀
有时候可以给选择器添加一个表示状态的前缀，让语义更明了，比如下图是添加了“.is-”前缀。

# CSS命名规范
## LESS 和 SASS 中的嵌套
避免不必要的嵌套。可以进行嵌套，不意味着你应该这样做。只有在需要给父元素增加样式并且同时存在多个子元素时才需要考虑嵌套。

## 选择器
减少选择器的长度，每个组合选择器选择器的条目应该尽量控制在 3 个以内。
## Class 命名
- 使用有意义的名称；使用结构化或者作用目标相关，而不是抽象的名称。
- 命名时使用最近的父节点或者父 class 作为前缀

## 常用css命名规则
- 头：header
- 内容：content/container
- 尾：footer
- 导航：nav
- 侧栏：sidebar
- 栏目：column
- 页面外围控制整体布局宽度：wrapper
- 左右中：left right center
- 登录条：loginbar
- 标志：logo
- 广告：banner
- 页面主体：main
- 热点：hot
- 新闻：news
- 下载：download
- 子导航：subnav
- 菜单：menu
- 子菜单：submenu
- 搜索：search
- 友情链接：friendlink
- 页脚：footer
- 版权：copyright
- 滚动：scroll
- 内容：content
- 标签页：tab
- 文章列表：list
- 提示信息：msg
- 小技巧：tips
- 栏目标题：title
- 加入：joinus
- 指南：guide
- 服务：service
- 注册：register
- 状态：status
- 投票：vote
- 合作伙伴：partner

### 页面结构

- 容器: container
- 页头：header
- 内容：content/container
- 页面主体：main
- 页尾：footer
- 导航：nav
- 侧栏：sidebar
- 栏目：column
- 页面外围控制整体布局宽度：wrapper
- 左右中：left right center

### 导航

- 导航：nav
- 主导航：mainnav
- 子导航：subnav
- 顶导航：topnav
- 边导航：sidebar
- 左导航：leftsidebar
- 右导航：rightsidebar
- 菜单：menu
- 子菜单：submenu
- 标题: title
- 摘要: summary

### 功能
- 标志：logo
- 广告：banner
- 登陆：login
- 登录条：loginbar
- 注册：regsiter
- 搜索：search
- 功能区：shop
- 标题：title
- 加入：joinus
- 状态：status
- 按钮：btn
- 滚动：scroll
- 标签页：tab
- 文章列表：list
- 提示信息：msg
- 当前的: current
- 小技巧：tips
- 图标: icon
- 注释：note
- 指南：guide
- 服务：service
- 热点：hot
- 新闻：news
- 下载：download
- 投票：vote
- 合作伙伴：partner
- 友情链接：link
- 版权：copyright
- 刷新：refresh 

## css命名组合
###  页面保持个位数，单独clas页面结构命名如：
```
<div class="content"></div>
```
### 组合命名
#### *-group 表示一个分组集合如：
```
.list-group
.page-group
```
#### *-block表示块区域，具有margin/padding

#### *-link 可点击链接地址/跳转页面的

#### *-item 父级下的多个子级具有相同结构

#### *-row 对多个子级转化为内联，使其结构形成行

#### *-inner 表示弹性（flex）容器 

#### .label 与其他控件相关联的text

#### .icon 图标类使用

#### .overlay 背景遮罩

#### .active表示选中状态/点击状态统一使用

#### .pull-left/.pull-right浮动左右

# 参考
## [设计达人](http://www.shejidaren.com/css-written-specifications.html)

## [http://zoomzhao.github.io](https://codeguide.bootcss.com/#html-reducing-markup)
## [腾讯前端AlloyTeam](http://www.alloyteam.com/2011/10/css-on-team-naming/)
## [淘宝移动端ui框架SUI](http://m.sui.taobao.org/components/#)