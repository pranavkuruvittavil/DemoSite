(function loadCookieYesBanner() {
  if (document.getElementById("cookieyes")) {
    return;
  }

  var script = document.createElement("script");
  script.id = "cookieyes";
  script.type = "text/javascript";
  script.src = "https://cdn-mojoview.uk/client_data/6e77a596f9a1aac668d1bf42d1ebb015/script.js";
  document.head.appendChild(script);
})();
