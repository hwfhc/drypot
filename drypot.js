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

    function InputStream(input) {
        var pos = 0, line = 1, col = 0;

        return {
            next  : next,
            peek  : peek,
            eof   : eof,
            croak : croak,
        };

        function next() {
            var ch = input.charAt(pos);pos++;
            if (ch == "\n") line++, col = 0; else col++;
            return ch;
        }

        function peek() {
            return input.charAt(pos);
        }

        function eof() {
            return peek() == "";
        }

        function croak(msg) {
            throw new Error(msg + " (" + line + ":" + col + ")");
        }

    }

})();
