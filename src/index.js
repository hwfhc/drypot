(function (){
    const interpret = require('./interpret');

    const components = document.getElementsByClassName('dp-component');
    const dynamic = document.getElementsByClassName('dp-dynamic');

    (function initComponents(){
        for(var i=0;i<components.length;i++){
            let name = components[i].tagName.toLowerCase();

            // I can add a module to manage ajax request, and there is just one ajax request to the same resources at the same time
            getDataWithAJAX('GET',`/components/${name}`,components[i],function(data,component){
                data += `<link href="/components/${name}/index.css" rel="stylesheet" type="text/css" />`;
                component.innerHTML = data;
            });
        }
    })();

    (function initDynamic(){
        var reg = /\{\{[^\)]+\}\}/g;
        var element = dynamic;

        for(let i=0;i<element.length;i++){
            let innerHTML = element[i].innerHTML;

            interpret(innerHTML,function(result){
                element[i].innerHTML = result;
            });
        }
    })();

    function getDataWithAJAX(method,url,element,callback) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                callback(this.responseText,element);
            }
        };
        xhttp.open(method,url, true);
        xhttp.send();
    }


    function demo(){
        //var code = "asd  af{{ajax (`/homePgae/${getPathname(13 + 126,12, a  = 5,`asf449`)}/test`)}}sadfsf";
        var code = "asd  af   {{ajax (`/user/${getPathname(2)}/username`)}}  sadfsf";

        console.log(code);

        var input = inputStream(code);
        var token = tokenStream(input);
        var parse = parseDynamicHtml(token);
        interpretDynamicHtml(parse,function(result){
            console.log(result);
        });
        console.log(parse);
    }
})();
