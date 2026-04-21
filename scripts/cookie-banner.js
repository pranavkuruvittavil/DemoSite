(function loadCookieYesBanner() {
  if (document.getElementById("cookieyes")) {
    return;
  }

  var script = document.createElement("script");
  script.id = "cookieyes";
  script.type = "text/javascript";
  script.src = "https://cdn-cookieyes.com/client_data/d7f0c55ba995b598ff1c2b2750d5b486/script.js";
  document.head.appendChild(script);
})();
