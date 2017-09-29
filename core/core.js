(function core(){
    const core = document.getElementById('core');
    const components = document.getElementsByClassName('core-component');
    const dynamic = document.getElementsByClassName('core-dynamic');

    (function initComponents(){
        for(var i=0;i<components.length;i++){
            let name = components[i].tagName.toLowerCase();

            // I can add a module to manage ajax request, and there is just one ajax request to the same resources at the same time
            getDataWithAJAX('GET',`/components/${name}`,components[i],function(data,component){
                data += `<link href="components/${name}/index.css" rel="stylesheet" type="text/css" />`;
                component.innerHTML = data;
            });
        }
    })();

    (function initDynamic(){
        var reg = /\{\{[^\)]+\}\}/g;
        var element = dynamic;

        for(var i=0;i<element.length;i++){
            let url = '';
            let innerHTML = element[i].innerHTML;
            let isReadUrl = 0;

            for(var j=0;j<innerHTML.length;j++){
                var char = innerHTML[j];

                if(isReadUrl == 2 && char != '{' && char != '}'){
                    url += char;
                }

                if(char === '{') isReadUrl++;
                if(char === '}') isReadUrl--;
            }

            getDataWithAJAX('GET',`${url}`,element[i],function(data,element){
                element.innerHTML = data;
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
})();
