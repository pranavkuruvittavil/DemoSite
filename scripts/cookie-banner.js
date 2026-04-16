(function loadCookieYesBanner() {
  if (document.getElementById("cookieyes")) {
    return;
  }

  var script = document.createElement("script");
  script.id = "cookieyes";
  script.type = "text/javascript";
  script.src = "https://cdn-mojoview.uk/client_data/5b33ce7f66e8b82bac20a20712cb6dc0/script.js";
  document.head.appendChild(script);
})();
