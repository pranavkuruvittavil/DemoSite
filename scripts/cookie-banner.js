(function loadCookieYesBanner() {
  if (document.getElementById("cookieyes")) {
    return;
  }

  var script = document.createElement("script");
  script.id = "cookieyes";
  script.type = "text/javascript";
  script.src = "https://cdn-mojoview.uk/client_data/db1b7a7b3a0aaa45543691f9458b3f40/script.js";
  document.head.appendChild(script);
})();
