/* AI Article Hub — public domain (CC0 1.0) client script. No dependencies. */
(function () {
  "use strict";

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
  var store = {
    get: function (k, d) { try { var v = localStorage.getItem(k); return v === null ? d : v; } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };

  /* ---------- Toast ---------- */
  var toastEl = null, toastTimer = null;
  function toast(msg) {
    if (!toastEl) {
      toastEl = document.createElement("div");
      toastEl.className = "toast";
      toastEl.setAttribute("role", "status");
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove("show"); }, 2400);
  }

  /* ---------- Theme ---------- */
  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    store.set("aah-theme", theme);
    $$("[data-theme-toggle]").forEach(function (b) {
      b.textContent = theme === "dark" ? "☀" : "☾";
      b.setAttribute("aria-label", theme === "dark" ? "Switch to light theme" : "Switch to dark theme");
    });
  }
  var saved = store.get("aah-theme", null);
  if (!saved) {
    saved = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  applyTheme(saved);
  document.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-theme-toggle]");
    if (!btn) return;
    applyTheme(document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark");
  });

  /* ---------- Mobile menu ---------- */
  document.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-menu-toggle]");
    if (!btn) return;
    var nav = $("#site-nav");
    if (nav) nav.classList.toggle("open");
  });

  /* ---------- Anchor headings + copy buttons on code blocks ---------- */
  function enhanceProse() {
    $$(".prose pre").forEach(function (pre) {
      var code = pre.querySelector("code");
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "code-copy";
      btn.textContent = "Copy";
      btn.addEventListener("click", function () {
        copy(code ? code.innerText : pre.innerText).then(function () { toast("Code copied"); });
      });
      pre.appendChild(btn);
    });
  }

  function copy(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function (resolve, reject) {
      try {
        var ta = document.createElement("textarea");
        ta.value = text;
        ta.className = "offscreen-copy";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
        resolve();
      } catch (e) { reject(e); }
    });
  }

  /* ---------- File download ---------- */
  function download(filename, text, mime) {
    var blob = new Blob([text], { type: (mime || "text/plain") + ";charset=utf-8" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(url); }, 1500);
  }

  function slug(s) {
    return (s || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 70);
  }

  function stripHtml(html) {
    var el = document.createElement("div");
    el.innerHTML = html;
    return el.textContent.replace(/\n{3,}/g, "\n\n").trim();
  }

  function articleData() {
    var el = $("#article-source");
    if (!el) return null;
    try { return JSON.parse(el.textContent); } catch (e) { return null; }
  }

  function standaloneHtml(data, bodyText) {
    return [
      "<!doctype html>",
      '<html lang="en">',
      "<head>",
      '<meta charset="utf-8">',
      '<meta name="viewport" content="width=device-width, initial-scale=1">',
      "<title>" + esc(data.title) + " — CC0 1.0</title>",
      '<meta name="author" content="' + esc(data.author) + '">',
      '<meta name="description" content="' + esc(data.description) + '">',
      '<meta name="license" content="CC0 1.0 Universal (Public Domain Dedication)">',
      '<meta name="dcterms.license" content="https://creativecommons.org/publicdomain/zero/1.0/">',
      "</head>",
      "<body>",
      "<article>",
      "<h1>" + esc(data.title) + "</h1>",
      "<p><em>" + esc(data.description) + "</em></p>",
      "<p><small>" + esc(data.category) + " · " + esc(data.date) + " · " + esc(data.readingTime) +
      " · Part " + esc(data.number) + " of 27</small></p>",
      bodyText,
      "</article>",
      "<hr>",
      '<p><small>Released into the public domain under CC0 1.0 Universal. ' +
      'Dedication: https://creativecommons.org/publicdomain/zero/1.0/</small></p>',
      "</body>",
      "</html>",
      ""
    ].join("\n");
  }

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  document.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-dl]");
    if (!btn) return;
    e.preventDefault();
    var data = articleData();
    if (!data) return;
    var kind = btn.getAttribute("data-dl");
    var base = data.number + "-" + slug(data.title);
    var prose = $(".prose");

    if (kind === "md") {
      download(base + ".md", data.markdown, "text/markdown");
    } else if (kind === "txt") {
      download(base + ".txt",
        data.title + "\n" + "=".repeat(data.title.length) + "\n\n" +
        data.description + "\n\n" +
        "Part " + data.number + " of 27  |  " + data.category + "  |  " + data.date +
        "  |  " + data.readingTime + "\n" +
        "Author: " + data.author + "\n" +
        "License: CC0 1.0 Universal (Public Domain Dedication)\n" +
        "https://creativecommons.org/publicdomain/zero/1.0/\n\n" +
        "----------------------------------------------------------------\n\n" +
        (prose ? stripHtml(prose.innerHTML) : "") + "\n");
    } else if (kind === "html") {
      download(base + ".html", standaloneHtml(data, prose ? prose.innerHTML : ""), "text/html");
    } else if (kind === "pdf") {
      toast("Opening print dialog — choose 'Save as PDF'");
      setTimeout(function () { window.print(); }, 120);
    } else if (kind === "copy") {
      copy(prose ? prose.innerText : "").then(function () { toast("Article text copied to clipboard"); });
    } else if (kind === "json") {
      download(base + ".json", JSON.stringify({
        number: data.number, title: data.title, description: data.description,
        category: data.category, tags: data.tags, date: data.date, author: data.author,
        readingTime: data.readingTime, license: "CC0-1.0", licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
        markdown: data.markdown
      }, null, 2), "application/json");
    }
    toast("Download started");
  });

  /* ---------- Copy the CC0 dedication / publish snippets ---------- */
  document.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-copy]");
    if (!btn) return;
    e.preventDefault();
    var sel = btn.getAttribute("data-copy");
    var src = sel === "this" ? btn : $(sel);
    if (!src) return;
    var text = src.tagName === "TEXTAREA" ? src.value : src.innerText;
    copy(text.trim()).then(function () { toast("Copied to clipboard"); });
  });

  /* ---------- Reading progress ---------- */
  function initProgress() {
    var bar = $("[data-progress]");
    if (!bar) return;
    function update() {
      var doc = document.documentElement;
      var max = doc.scrollHeight - doc.clientHeight;
      var pct = max > 0 ? (doc.scrollTop / max) * 100 : 0;
      pct = Math.min(100, Math.max(0, pct));
      bar.value = pct;
      bar.textContent = Math.round(pct) + "%";
    }
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
  }

  /* ---------- Index: search + category filter ---------- */
  function initIndex() {
    var grid = $("#article-grid");
    if (!grid) return;
    var cards = $$("[data-card]", grid);
    var input = $("#search");
    var chips = $$("[data-filter]");
    var count = $("#result-count");
    var empty = $("#empty-state");
    var q = "", cat = "all";

    function apply() {
      var visible = 0;
      cards.forEach(function (card) {
        var hay = (card.getAttribute("data-search") || "").toLowerCase();
        var c = card.getAttribute("data-category") || "";
        var okQ = !q || hay.indexOf(q) !== -1;
        var okC = cat === "all" || c === cat;
        var show = okQ && okC;
        card.classList.toggle("hidden", !show);
        if (show) visible++;
      });
      if (count) count.textContent = visible === cards.length
        ? cards.length + " articles"
        : visible + " of " + cards.length + " articles";
      if (empty) empty.classList.toggle("hidden", visible !== 0);
    }

    if (input) {
      var t = null;
      input.addEventListener("input", function () {
        clearTimeout(t);
        t = setTimeout(function () {
          q = input.value.trim().toLowerCase();
          apply();
        }, 90);
      });
    }
    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        chips.forEach(function (c) { c.setAttribute("aria-pressed", "false"); });
        chip.setAttribute("aria-pressed", "true");
        cat = chip.getAttribute("data-filter");
        apply();
      });
    });
    apply();
  }

  /* ---------- Deep link: index.html?cat=LLM opens a filtered view ---------- */
  function initDeepLink() {
    var grid = $("#article-grid");
    if (!grid) return;
    var params = new URLSearchParams(window.location.search);
    var cat = params.get("cat");
    if (!cat) return;
    var chip = $('[data-filter="' + CSS.escape(cat) + '"]');
    if (chip) chip.click();
  }

  /* ---------- Tabs on the publish page ---------- */
  document.addEventListener("click", function (e) {
    var tab = e.target.closest("[data-tab]");
    if (!tab) return;
    var group = tab.closest("[data-tabs]");
    if (!group) return;
    $$("[data-tab]", group).forEach(function (t) {
      t.setAttribute("aria-selected", t === tab ? "true" : "false");
    });
    $$("[data-tab-panel]", group).forEach(function (p) {
      p.classList.toggle("hidden", p.getAttribute("data-tab-panel") !== tab.getAttribute("data-tab"));
    });
  });

  enhanceProse();
  initProgress();
  initIndex();
  initDeepLink();
})();
