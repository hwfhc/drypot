(function (){
    const compiler = require('./compiler');
    const scope = require('./compiler/lib/scope');

    const dp_component = document.getElementsByClassName('dp-component');
    const dp_dynamic = document.getElementsByClassName('dp-dynamic');
    const dp_item = document.getElementsByClassName('dp-item');
    const dp_for = document.getElementsByClassName('dp-for');
    const dp_if = document.getElementsByClassName('dp-if');

    (function initComponent(){
        for(var i=0;i<dp_component.length;i++){
            let name = dp_component[i].tagName.toLowerCase();

            // I can add a module to manage ajax request, and there is just one ajax request to the same resources at the same time
            getDataWithAJAX('GET',`/components/${name}`,dp_component[i],function(data,component){
                data += `<link href="/components/${name}/index.css" rel="stylesheet" type="text/css" />`;
                component.innerHTML = data;
            });
        }
    })();

    (function initDynamic(){
        var element = dp_dynamic;

        for(let i=0;i<element.length;i++){
            let innerHTML = element[i].innerHTML;

            compiler(innerHTML,function(result){
                element[i].innerHTML = result;
            });
        }
    })();

    (function initItem(){
        var element = dp_item;

        for(let i=0;i<element.length;i++){
            let innerHTML = element[i].innerHTML;
            let name = element[i].getAttribute('dp-name');

            compiler(element[i].getAttribute('dp-data'),function(result){
                scope.set(name,JSON.parse(result));

                compiler(innerHTML,function(result){
                    element[i].innerHTML = result;
                });
            });
        }
    })();



    (function initFor(){
        var element = dp_for;

        for(let i=0;i<element.length;i++){
            let item = element[i];
            let html = item.innerHTML;
            let name = item.getAttribute('dp-name');
            let data = item.getAttribute('dp-data');

            item.innerHTML = '';

            compiler(data,function(result){
                var length = JSON.parse(result).length;
                scope.set('tem',JSON.parse(result));

                for(let j=0;j<length;j++){
                    scope.setItem();

                    compiler(html,function(result){
                        item.innerHTML += result;
                    });

                }
            });
        }
    })();

    (function initIf(){
        var element = dp_if;

        for(let i=0;i<element.length;i++){
            let item = element[i];
            let bool = item.getAttribute('dp-var');

            compiler(bool,result => {
                if(result === 'false') element[i].style.display = 'none';
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
