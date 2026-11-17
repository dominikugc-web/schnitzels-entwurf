// Schnitzelteller-Assistent: Schritt für Schritt auswählen, am Ende Übersicht mit Summe.
// Nutzt MENU/DRINKS (menu.js) sowie t, esc und lang aus dem Hauptskript.
(() => {
  const num = p => parseFloat(p.replace(",", "."));
  const eur = n => n.toFixed(2).replace(".", ",") + " €";
  const cat = id => MENU.find(c => c.id === id);
  const kl = cat("klassiker");

  const schnitzel = [
    { id: "kl-schwein", meat: "schwein", n: "Klassiker vom Schwein", sub: "Mit Soße nach Wahl", img: "k-wiener", kl: true, p: [["1 Schnitzel", kl.prices[0].p], ["2 Schnitzel", kl.prices[1].p]] },
    { id: "kl-huhn", meat: "huhn", n: "Klassiker vom Hähnchen", sub: "Mit Soße nach Wahl", img: "k-rahm", kl: true, p: [["1 Schnitzel", kl.prices[2].p], ["2 Schnitzel", kl.prices[3].p]] },
    ...["spezialitaeten", "gefuellt", "kreationen"].flatMap(id => cat(id).items.map(it => {
      // Fleisch aus der Beschreibung; Kalb steht bei beiden Auswahlen
      const meat = /Hähnchen/.test(it.d) ? "huhn" : /Kalb/.test(it.d) ? "kalb" : "schwein";
      return { ...it, id: it.img, meat, sub: meat === "kalb" ? "vom Kalb" : "" };
    })),
  ];
  // jede Preisvariante (klein/groß, 0,2 l/0,4 l) ist eine eigene Auswahl
  const flat = id => cat(id).items.flatMap(it => it.p.map(([l, p], i) => ({ id: `${it.img}-${i}`, n: it.n, sub: l, img: it.img, price: p })));
  const sides = flat("beilagen"), sweets = flat("suesses");
  const drinks = DRINKS.flatMap((g, gi) => g.rows.flatMap(([n, d, ps], ri) =>
    ps.map(([s, p], si) => ({ id: `d${gi}-${ri}-${si}`, n, sub: s, price: p, hot: g.t === "Heiße Getränke" }))));

  const STEPS = {
    sch: ["Welches Schnitzel?", "Erst Schwein oder Hähnchen wählen, dann Ihr Schnitzel"],
    size: ["Wie viele Schnitzel?", ""],
    sauce: ["Welche Soße?", "Bei den Klassikern ist die Soße im Preis drin"],
    sides: ["Welche Beilage?", "Sie können mehrere auswählen oder ohne weitermachen"],
    sweets: ["Noch was Süßes?", "Sie können mehrere auswählen oder ohne weitermachen"],
    drinks: ["Was möchten Sie trinken?", "Kalt, heiß oder beides"],
    sum: ["Ihre Übersicht", ""],
  };

  let S;
  const reset = () => (S = { i: 0, meat: "schwein", sch: null, size: null, prep: "paniert", sauce: null, sides: new Set(), sweets: new Set(), drinks: new Set() });
  const cur = () => schnitzel.find(x => x.id === S.sch);
  const steps = () => ["sch", "size", ...(cur()?.kl ? ["sauce"] : []), "sides", "sweets", "drinks", "sum"];
  const valid = k => (k === "sch" ? !!S.sch : k === "size" ? S.size != null : k === "sauce" ? !!S.sauce : true);

  const dlg = document.getElementById("wiz"), body = document.getElementById("wiz-body"), foot = document.getElementById("wiz-foot");

  const card = (o, on, extra) => `
    <button type="button" class="wcard${on ? " on" : ""}" data-id="${o.id}" aria-pressed="${on}">
      <img src="img/${o.img}.webp" alt="" loading="lazy" width="900" height="675">
      <span class="wt"><b>${esc(t(o.n))}</b>${o.sub ? `<small>${esc(t(o.sub))}</small>` : ""}${extra ? `<em>${extra}</em>` : ""}</span>
    </button>`;
  const row = (o, on) => `
    <button type="button" class="wrow${on ? " on" : ""}" data-id="${o.id}" aria-pressed="${on}">
      <span><b>${esc(t(o.n))}</b>${o.sub ? ` <small>${esc(t(o.sub))}</small>` : ""}</span><em>${o.price} €</em>
    </button>`;

  // Übersicht als Zeilen [Name, Zusatz, Preis]
  function lines() {
    const c = cur(), [l, p] = c.p[S.size], out = [];
    out.push([t(c.n) + (c.kl ? `, ${t(S.prep)}` : ""), t(l || "Portion"), num(p)]);
    if (c.kl) out.push([t(kl.items.find(i => i.img === S.sauce).n), t("inkl."), 0]);
    for (const [set, list] of [[S.sides, sides], [S.sweets, sweets], [S.drinks, drinks]])
      list.filter(o => set.has(o.id)).forEach(o => out.push([t(o.n), t(o.sub), num(o.price)]));
    return out;
  }

  function content(k) {
    const c = cur();
    if (k === "sch") return `<div class="chips">${[["schwein", "Schwein"], ["huhn", "Hähnchen"]].map(([m, l]) =>
        `<button type="button" class="chip${S.meat === m ? " on" : ""}" data-meat="${m}" aria-pressed="${S.meat === m}">${t(l)}</button>`).join("")}</div>
      <div class="wgrid">${schnitzel.filter(o => o.meat === S.meat || o.meat === "kalb")
        .map(o => card(o, S.sch === o.id, `${t("ab")} ${o.p[0][1]} €`)).join("")}</div>`;
    if (k === "size") return (c.kl ? `<div class="chips">${["paniert", "natur"].map(x =>
        `<button type="button" class="chip${S.prep === x ? " on" : ""}" data-prep="${x}" aria-pressed="${S.prep === x}">${t(x)}</button>`).join("")}</div>` : "")
      + c.p.map(([l, p], i) => row({ id: i, n: l || "Portion", price: p }, S.size === i)).join("");
    if (k === "sauce") return `<div class="wgrid">${kl.items.map(o => card({ ...o, id: o.img }, S.sauce === o.img, t("inkl."))).join("")}</div>`;
    if (k === "sides" || k === "sweets") {
      const list = k === "sides" ? sides : sweets;
      return `<div class="wgrid">${list.map(o => card(o, S[k].has(o.id), `${o.price} €`)).join("")}</div>`;
    }
    if (k === "drinks") return [[t("Kalte Getränke"), false], [t("Heiße Getränke"), true]].map(([h, hot]) =>
      `<div class="wsec"><h3>${esc(h)}</h3>${drinks.filter(o => o.hot === hot).map(o => row(o, S.drinks.has(o.id))).join("")}</div>`).join("");
    const ls = lines(), sum = ls.reduce((a, x) => a + x[2], 0);
    return `<div class="wsum">${ls.map(([n, s, p]) => `<div><span><b>${esc(n)}</b>${s ? ` <small>${esc(s)}</small>` : ""}</span><em>${p ? eur(p) : ""}</em></div>`).join("")}
      <div class="wtotal"><span>${t("Gesamt")}</span><em>${eur(sum)}</em></div></div>
      <p class="whint">${t("Preise laut Speisekarte. Bestellt wird direkt im Restaurant.")}</p>`;
  }

  function render(keepScroll) {
    const st = steps(), k = st[S.i], [h, hint] = STEPS[k], top = body.scrollTop;
    document.getElementById("wiz-step").textContent = lang === "ru" ? `Шаг ${S.i + 1} из ${st.length}` : `Schritt ${S.i + 1} von ${st.length}`;
    document.getElementById("wiz-h").textContent = t(h);
    document.getElementById("wiz-hint").textContent = hint ? t(hint) : "";
    document.getElementById("wiz-bar").style.width = `${(S.i / (st.length - 1)) * 100}%`;
    document.getElementById("wiz-x").setAttribute("aria-label", t("Schließen"));
    body.innerHTML = content(k);
    body.scrollTop = keepScroll ? top : 0;
    foot.innerHTML = k === "sum"
      ? `<button type="button" class="btn btn-line" data-act="new">${t("Neu zusammenstellen")}</button>
         <button type="button" class="btn btn-gold" data-act="share">${t("Auswahl teilen")}</button>`
      : `<button type="button" class="btn btn-line" data-act="back"${S.i ? "" : " hidden"}>${t("Zurück")}</button>
         <button type="button" class="btn btn-gold" data-act="next"${valid(k) ? "" : " disabled"}>${t(k === "drinks" ? "Zur Übersicht" : "Weiter")}</button>`;
  }

  async function share(btn) {
    const ls = lines(), sum = ls.reduce((a, x) => a + x[2], 0);
    const text = `${t("Mein Schnitzelteller")}:\n` + ls.map(([n, s, p]) => `${n}${s ? ` (${s})` : ""}${p ? `: ${eur(p)}` : ""}`).join("\n") + `\n${t("Gesamt")}: ${eur(sum)}`;
    try { if (navigator.share) return await navigator.share({ text }); } catch (e) { if (e.name === "AbortError") return; }
    try { await navigator.clipboard.writeText(text); btn.textContent = t("Kopiert!"); } catch {}
  }

  body.addEventListener("click", e => {
    const b = e.target.closest("button");
    if (!b) return;
    const k = steps()[S.i];
    if (b.dataset.meat) {
      S.meat = b.dataset.meat;
      if (cur() && cur().meat !== S.meat && cur().meat !== "kalb") S.sch = S.size = S.sauce = null;
    }
    else if (b.dataset.prep) S.prep = b.dataset.prep;
    else if (k === "sch") { S.sch = b.dataset.id; S.sauce = null; S.size = cur().p.length === 1 ? 0 : null; }
    else if (k === "size") S.size = +b.dataset.id;
    else if (k === "sauce") S.sauce = b.dataset.id;
    else if (S[k] instanceof Set) S[k].has(b.dataset.id) ? S[k].delete(b.dataset.id) : S[k].add(b.dataset.id);
    render(true);
  });

  foot.addEventListener("click", e => {
    const act = e.target.closest("button")?.dataset.act;
    if (act === "next" && valid(steps()[S.i])) S.i++;
    else if (act === "back") S.i--;
    else if (act === "new") reset();
    else if (act === "share") return share(e.target.closest("button"));
    else return;
    render();
  });

  document.getElementById("wiz-x").addEventListener("click", () => dlg.close());
  document.querySelectorAll("[data-wiz]").forEach(b => b.addEventListener("click", () => {
    if (!S) reset();
    render();
    dlg.showModal();
  }));
})();
