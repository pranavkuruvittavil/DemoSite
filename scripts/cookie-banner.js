(function loadCookieYesBanner() {
  if (document.getElementById("cookieyes")) {
    return;
  }

  var script = document.createElement("script");
  script.id = "cookieyes";
  script.type = "text/javascript";
  script.src = "https://cdn-mojoview.uk/client_data/2f23373baba950641bd2be17efdacc7d/script.js";
  document.head.appendChild(script);
})();
