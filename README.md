# core
 隔壁答题系统使用的前端代码复用解决方案
 
---
## 如何使用
1. 需要使用此功能的html页面在body下添加此代码
```html
<script src="core" charset="utf-8"></script>
```  

2. 同时在html中添加组件标签名（标签名为自定义）,标签的class中必须有core-component   
例如：
```html
<list class="core-component">
</list>
```   

3. 然后在components文件夹中添加相应组件的文件夹，并加入index.html与index.css文件   
例如：
```
components
  list
    index.html
    index.less
    index.css
```

4. index.html中为组件内部的html代码，index.less（index.css由less编译而成）中为组件的样式代码  
建议组件内部样式高宽为100%，占满父元素（即list标签），即可在各个页面中直接修改父元素高宽度来定制组件大小
需要如下形式:
```html
//index.html
<ul class="list">
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
