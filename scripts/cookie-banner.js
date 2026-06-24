(function loadCookieYesBanner() {
  if (document.getElementById("cookieyes")) {
    return;
  }

  var script = document.createElement("script");
  script.id = "cookieyes";
  script.type = "text/javascript";
  script.src = "https://cdn-mojoview.uk/client_data/76f90690c7905f06baa8876bc7c4f0ac/script.js";
  document.head.appendChild(script);
})();
