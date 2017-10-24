(function (){
    const compiler = require('./compiler');
    const scope = require('./compiler/lib/scope');

    const dp_component = document.getElementsByClassName('dp-component');
    const dp_dynamic = document.getElementsByClassName('dp-dynamic');
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
        var elements = dp_dynamic;

        for(let i=0;i<elements.length;i++){
            let innerHTML = elements[i].innerHTML;
            let name = elements[i].getAttribute('dp-name');
            let data = elements[i].getAttribute('dp-data');

            if(data){
                new Promise((resolve,reject) => {

                    compiler(data,result => {
                        scope.set(name,JSON.parse(result));
                        resolve(result);
                    })

                }).then(result =>
                    compiler(innerHTML,result =>{
                        elements[i].innerHTML = result;
                    })
                );
            }else{
                compiler(innerHTML,result => {
                    elements[i].innerHTML = result;
                });
            }
        }
    })();

    (function initFor(){
        var element = dp_for;

        for(let i=0;i<element.length;i++){
            let parent = element[i].parentNode;
            let item = element[i];
            let html = item.innerHTML;
            let data = item.getAttribute('dp-data');

            parent.removeChild(item);
            i--;

            new Promise((resolve,reject) => {
                console.log(element.length);
                compiler(data,result => {
                    scope.set('tem',JSON.parse(result));

                    resolve(result);
                });

            }).then(result => {

                var length = JSON.parse(result).length;

                for(let j=0;j<length;j++){
                    scope.setItem();

                    compiler(html,result => {
                        let child = item.cloneNode(true);
                        child.innerHTML = result;

                        parent.appendChild(child);
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
