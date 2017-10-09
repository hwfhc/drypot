# drypot
 隔壁答题系统使用的前端代码复用解决方案
 
---
## 如何使用
使用drypot的html页面在body下方添加此代码，引用drypot文件   
当然你需要先下载一个drypot.js文件
```html
<script src="/drypot.js" charset="utf-8"></script>
```  
## 组件
在html中添加组件标签名（标签名为自定义）,标签的class中必须有dp-component   
例如：
```html
<list class="dp-component">
</list>
```   
然后在components文件夹中添加相应组件的文件夹，并加入index.html与index.css文件  
例如：
```
- components
  - list
    - index.html
    - index.less
    - index.css
```

index.html中为组件内部的html代码，index.less（index.css由less编译而成）中为组件的样式代码  
建议组件内部样式高宽为100%，占满父元素（即list标签），即可在各个页面中直接修改父元素高宽度来定制组件大小
需要如下形式:
```html
//index.html
<ul>
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
    <li>5</li>
</ul>
```

```less
//index.less
list{
  ul{
    background-color: green;
  }
}
```

```css
//index.css
list ul{
    background-color: green;
}
```
## 动态html
在html中写一段代码,动态生成html,标签的class中必须有dp-dynamic  
代码包裹在 {{  }} 中
```html
//url: https://github.com/hwfhc/drypot/edit/master/README.md
<p class="dp-dynamic">{{getPathname(2)}} test</p>

//output
<p class="dp-dynamic">drypot test</p>
```
### 字符串
字符串使用 ` 标识，字符串中的变量写在${}中
```html
<p class="dp-dynamic">{{ajax (`/user/${getPathname(2)}/username`)}}</p>
```
### 函数
+ ajax(url):传入一个url，发送http请求获取数据并返回
+ getPathname(number):传入数字n，获取url的pathname第n项
