(function loadCookieYesBanner() {
  if (document.getElementById("cookieyes")) {
    return;
  }

  var script = document.createElement("script");
  script.id = "cookieyes";
  script.type = "text/javascript";
  script.src = "https://cdn-cookieyes.com/client_data/83b79e389430c402c7cb74f3b0975783/script.js";
  document.head.appendChild(script);
})();
