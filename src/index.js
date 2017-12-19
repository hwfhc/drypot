(function (){
    const ENV  = require('./interpreter/env');
    const scope  = ENV.scope;
    const compiler = require('./interpreter/spec');

    const dp_component = document.getElementsByClassName('dp-component');
    const dp_dynamic = document.getElementsByClassName('dp-dynamic');
    const dp_for = document.getElementsByClassName('dp-for');
    const dp_if = document.getElementsByClassName('dp-if');

    (function initComponent(){
        var elements = dp_component;

        for(var i=0;i<elements.length;i++){
            let name = dp_component[i].tagName.toLowerCase();

            getDataWithAJAX('GET',`/components/${name}`,dp_component[i],function(data,component){
                data += `<link href="/components/${name}/index.css" rel="stylesheet" type="text/css" />`;
                component.innerHTML = data;
            });
        }
    })();

    (function initDynamic(){
        var elements = dp_dynamic;

        for(let i=0;i<elements.length;i++){
            let node = elements[i];
            let html = elements[i].innerHTML;
            let name = elements[i].getAttribute('dp-name');
            let data = elements[i].getAttribute('dp-data');

            if(data){
                new Promise((resolve,reject) => {
                    compiler(data,(err,result) => {
                        scope.set(name,JSON.parse(result));
                        resolve(result);
                    })

                }).then(result =>
                    compiler(html,result =>{
                        removeTag(node);
                        node.innerHTML = result;
                    })
                );
            }else{
                compiler(html,(err,result) => {
                    removeTag(node);
                    node.innerHTML = result;
                });
            }
        }
    })();

    (function initFor(){
        var elements = dp_for;

        for(let i=0;i<elements.length;i++){
            let parent = elements[i].parentNode;
            let last = elements[i].nextSibling;
            let node = elements[i];
            let html = node.innerHTML;
            let data = node.getAttribute('dp-data');

            parent.removeChild(node);
            i--;

            new Promise((resolve,reject) => {
                compiler(data,(err,result) => {
                    scope.set('tem',JSON.parse(result));
                    removeTag(node);

                    resolve(result);
                });

            }).then(result => {

                var length = JSON.parse(result).length;

                for(let j=0;j<length;j++){
                    scope.setItem();
                    compiler(html,(err,result) => {
                        let child = node.cloneNode(true);
                        child.innerHTML = result;

                        parent.insertBefore(child,last);
                    });
                }
            });
        }
    })();

    (function initIf(){
        var elements = dp_if;

        for(let i=0;i<elements.length;i++){
            let node = elements[i];
            let bool = node.getAttribute('dp-var');

            compiler(bool,(err,result) => {
                if(result === 'false')
                    node.parentNode.removeChild(node);
            });
        }
    })();

    function removeTag(item){
        item.removeAttribute('dp-name');
        item.removeAttribute('dp-data');
        item.removeAttribute('dp-var');
    }

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
