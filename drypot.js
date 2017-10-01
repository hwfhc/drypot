(function core(){
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

        for(var i=0;i<element.length;i++){
            let front = '';
            let back = '';
            let url = '';

            let innerHTML = element[i].innerHTML;
            let isReadUrl = 0;
            let hadReadUrl = false;

            for(var j=0;j<innerHTML.length;j++){
                var char = innerHTML[j];
                if(char === '{'){
                    isReadUrl++;
                    continue;
                }
                if(char === '}'){
                    isReadUrl--;
                    hadReadUrl = true;
                    continue;
                }

                if(isReadUrl === 0 && hadReadUrl === false) front += char;
                if(isReadUrl === 0 && hadReadUrl === true) back += char;

                if(isReadUrl == 2 && char != '{' && char != '}'){
                    url += char;
                }

            }

            url = parse(url);
            getDataWithAJAX('GET',`${url}`,element[i],function(data,element){
                element.innerHTML = front + data + back;
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

    /*
     *just insert data into url now
     *
     * @param {String} url
     * @return {String}
     *
     */

    function parse(url){
        let front = '';
        let back = '';
        let variant = '';

        let innerHTML = url;
        let isReadVar = 0;
        let hadReadVar = false;

        for(var j=0;j<innerHTML.length;j++){
            var char = innerHTML[j];
            if(char === '('){
                isReadVar++;
                continue;
            }
            if(char === ')'){
                isReadVar--;
                hadReadVar = true;
                continue;
            }

            if(isReadVar === 0 && hadReadVar === false) front += char;
            if(isReadVar === 0 && hadReadVar === true) back += char;

            if(isReadVar == 1 && char != '(' && char != ')'){
                variant += char;
            }
        }

        var split = window.location.pathname.split('/');

        return front + split[variant] + back;
    }
})();
