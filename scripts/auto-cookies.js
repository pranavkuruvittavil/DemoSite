(function setDetectableCookies() {
  function setCookie(name, value, days, sameSite) {
    var cookieStr =
      encodeURIComponent(name) + "=" + encodeURIComponent(value) + "; path=/";
    if (days) {
      var d = new Date();
      d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
      cookieStr += "; expires=" + d.toUTCString();
    }
    if (sameSite) cookieStr += "; SameSite=" + sameSite;
    document.cookie = cookieStr;
  }

  var rand = function (len) {
    return Math.random().toString(36).slice(2, 2 + (len || 10));
  };

  // ── Analytics cookies (Google Analytics naming convention) ────────────────
  setCookie("_ga", "GA1.2." + Math.floor(Math.random() * 1e10) + "." + Math.floor(Date.now() / 1000), 730);
  setCookie("_gid", "GA1.2." + Math.floor(Math.random() * 1e10) + "." + Math.floor(Date.now() / 1000), 1);
  setCookie("_gat_UA-XXXXX-Y", "1", 1);

  // ── Marketing / advertising cookies ───────────────────────────────────────
  setCookie("_fbp", "fb.1." + Date.now() + "." + Math.floor(Math.random() * 1e10), 90);
  setCookie("fr", rand(20), 90);
  setCookie("MUID", rand(16).toUpperCase(), 390);
  setCookie("IDE", "AHWqTUk_" + rand(14), 390);
  setCookie("test_cookie", "CheckForPermission", 1);

  // ── Functional / preference cookies ───────────────────────────────────────
  setCookie("user_preferences", "theme=light&lang=en", 365);
  setCookie("visit_count", "1", 365, "Lax");
  setCookie("last_visit", new Date().toISOString(), 30, "Lax");

  // ── Necessary / session cookies ───────────────────────────────────────────
  setCookie("session_id", "sess_" + rand(12));
  setCookie("csrf_token", rand(18), 1, "Strict");

  // ── Custom site cookies ───────────────────────────────────────────────────
  setCookie("site_visitor", "guest_" + Date.now(), 30);
  setCookie("ab_test_group", Math.random() < 0.5 ? "A" : "B", 30);

  console.log(
    "[auto-cookies] " +
      document.cookie.split(";").length +
      " cookies present. document.cookie:\n" +
      document.cookie
  );
})();
