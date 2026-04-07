(function loadCookieYesBanner() {
  if (document.getElementById("cookieyes")) {
    return;
  }

  var script = document.createElement("script");
  script.id = "cookieyes";
  script.type = "text/javascript";
  script.src = "https://cdn-staging.cookieyes.com/client_data/beda82ce7b9b186d23210629861ff360/script.js";
  document.head.appendChild(script);
})();
