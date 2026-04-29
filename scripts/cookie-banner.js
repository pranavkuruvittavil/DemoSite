(function loadCookieYesBanner() {
  if (document.getElementById("cookieyes")) {
    return;
  }

  var script = document.createElement("script");
  script.id = "cookieyes";
  script.type = "text/javascript";
  script.src = "https://cdn-mojoview.uk/client_data/2c8dfe454311be7f3f1915c5f5a87b79/script.js";
  document.head.appendChild(script);
})();
