(function loadCookieYesBanner() {
  if (document.getElementById("cookieyes")) {
    return;
  }

  var script = document.createElement("script");
  script.id = "cookieyes";
  script.type = "text/javascript";
  script.src = "https://cdn-cookieyes.com/client_data/5112d75d24ca593b58cf8ff84c94b373/script.js";
  document.head.appendChild(script);
})();
