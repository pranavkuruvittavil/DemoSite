(function loadCookieYesBanner() {
  if (document.getElementById("cookieyes")) {
    return;
  }

  var script = document.createElement("script");
  script.id = "cookieyes";
  script.type = "text/javascript";
  script.src = "https://cdn-cookieyes.com/client_data/57f11eb573b9f6b3071ffa32f4a1d13c/script.js";
  document.head.appendChild(script);
})();
