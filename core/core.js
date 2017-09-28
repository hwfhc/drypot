(function core(){
  const components_cache = {};
  const core = document.getElementById('core');
  const components = document.getElementsByClassName('core-component');

  for(var i=0;i<components.length;i++){
    let name = components[i].tagName.toLowerCase();

    // I can add a module to manage ajax request, and there is just one ajax request to the same resources at the same time
    if(components_cache[name] != undefined){
      components[i].innerHTML = components_cache[name];
    }else{
      getDataWithAJAX('GET',`/components/${name}`,components[i],function(data,component){
          components_cache[name] = data;
          components_cache[name] += `<link href="components/${name}/index.css" rel="stylesheet" type="text/css" />`;
          component.innerHTML = components_cache[name];
      });
    }
  }

  function getDataWithAJAX(method,url,component,callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        callback(this.responseText,component);
      }
    };
    xhttp.open(method,url, true);
    xhttp.send();
  }
})();
