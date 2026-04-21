(function loadCookieYesBanner() {
  if (document.getElementById("cookieyes")) {
    return;
  }

  var script = document.createElement("script");
  script.id = "cookieyes";
  script.type = "text/javascript";
  script.src = "https://cdn-cookieyes.com/client_data/08edeacb8b40ff1efe0e676d78e9bc1e/script.js";
  document.head.appendChild(script);
})();
