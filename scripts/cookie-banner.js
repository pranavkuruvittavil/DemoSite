(function loadCookieYesBanner() {
  if (document.getElementById("cookieyes")) {
    return;
  }

  var script = document.createElement("script");
  script.id = "cookieyes";
  script.type = "text/javascript";
  script.src = "https://cdn-cookieyes.com/client_data/867a39b0688bdb20a25827873e419df0/script.js";
  document.head.appendChild(script);
})();
