// Loads a view from the insights service. Sends the signed-in session (if any) so entitled clients get the paid layer.
(function () {
  var URL_ = "https://qmmtlyqxtiovkxezldtg.supabase.co", KEY = "sb_publishable_cWjKONdeCpTiuFdtI0MNpQ_bBT7u5ls";
  window.DSN = {
    load: async function (view) {
      var h = {};
      try {
        if (window.supabase) {
          var sb = window.supabase.createClient(URL_, KEY, { auth: { persistSession: true, autoRefreshToken: true } });
          var s = await sb.auth.getSession();
          if (s.data && s.data.session) h.Authorization = "Bearer " + s.data.session.access_token;
        }
      } catch (e) { /* signed out */ }
      var r = await fetch(URL_ + "/functions/v1/insights?view=" + encodeURIComponent(view), { headers: h });
      if (!r.ok) throw new Error("unavailable");
      return r.json();
    },
    dd: function (s) { return s ? s.slice(8, 10) + "." + s.slice(5, 7) + "." + s.slice(0, 4) : ""; },
    latest: function (o) { return Object.values(o || {}).filter(Boolean).sort().pop(); }
  };
})();
