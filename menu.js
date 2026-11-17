// Speisekarte. Preise exakt von schnitzel-s.de übernommen (Stand 17.11.2026).
// img = Dateiname in img/ (KI-Symbolbild). Echtes Foto einfach unter gleichem Namen ablegen.
const MENU = [
  {
    id: "klassiker", title: "Schnitzel-Klassiker", kicker: "Ihr Schnitzel, Ihre Wahl",
    intro: "Schnitzel aussuchen (vom Schwein oder Hähnchenbrustfilet, paniert oder natur), Größe wählen, Soße wählen, Beilage dazu. Fertig.",
    prices: [
      { l: "Schwein, 1 Schnitzel", p: "13,90" }, { l: "Schwein, 2 Schnitzel", p: "17,90" },
      { l: "Hähnchen, 1 Schnitzel", p: "14,90" }, { l: "Hähnchen, 2 Schnitzel", p: "19,90" },
    ],
    items: [
      { n: "Wiener Art", d: "Mit eingekochten Preiselbeeren und Zitronenviertel", img: "k-wiener" },
      { n: "Zwiebelduett", d: "Aus geschmorten und frittierten Tränenmachern", img: "k-zwiebel" },
      { n: "Champignonrahm", d: "Aus frischen Champignons mit Butterschalotten, verfeinert mit Sherry, Sahne und Schmand", img: "k-champignon" },
      { n: "Jägersoß’", d: "Frische Champignons, in Rot- und Portwein geschmort, eingekocht mit unserer selber g’machten Jus", img: "k-jaeger" },
      { n: "Rahmsoß’", d: "Aus Sahne, Schmand und unserer selber g’machten Jus", img: "k-rahm" },
      { n: "Zigeunersoß’", d: "Geschmorte frische Paprika, Peperoni und Zwiebeln, aufgegossen mit unserer selber g’machten Jus", img: "k-zigeuner" },
      { n: "Pfefferrahmsoß’", d: "Grüner Amazonaspfeffer, eingekocht mit Cognac, verfeinert mit Sahne, Schmand und unserer Jus", img: "k-pfeffer" },
      { n: "Currysoß’", d: "Aus frischer Ananas und Mango, angeschwitzt mit Mandrokas-Curry, verfeinert mit Sahne und Schmand", img: "k-curry" },
      { n: "Habaneros Soß’", d: "Frische Habaneros mit Knobi, Schalotten und Tomatenstückerl eingekocht, frischer Koriander drüber", img: "k-habanero" },
    ],
  },
  {
    id: "spezialitaeten", title: "Schnitzel-Spezialitäten", kicker: "Hausgemacht",
    items: [
      { n: "Schnitzel Mahattma", d: "In der Knusperpanade gebratenes Hähnchenbrustfilet auf Ananas-Curry-Soß’ mit frischer Ananas und Mango", img: "s-mahattma", p: [["1 Schnitzel", "14,90"], ["2 Schnitzel", "19,90"]] },
      { n: "Schnitzel Almöhi", d: "Paniertes Schweinsschnitzel unter geschmorten und frittierten Zwiebeln, knusprigem Bacon und einem Spiegelei drüber", img: "s-almoehi", p: [["1 Schnitzel", "15,90"], ["2 Schnitzel", "19,90"]] },
      { n: "Original Wiener Schnitzel", d: "Paniertes Kalbsschnitzel mit eing’machten Preiselbeeren und Zitronenviertel", img: "s-wiener", p: [["", "25,90"]] },
    ],
  },
  {
    id: "gefuellt", title: "Gefüllte Schnitzel", kicker: "Innen wird’s spannend",
    items: [
      { n: "Gordon blö", d: "Mit Emmentaler und Schinken gefülltes, paniertes Schweinsschnitzel", img: "g-gordon", p: [["", "17,90"]] },
      { n: "Louis Trenker", d: "Mit Bacon, Schmorzwiebeln, Cornichons und frischem Kren gefülltes, paniertes Schweinsschnitzel", img: "g-trenker", p: [["", "17,90"]] },
      { n: "Hiartenschnitzel", d: "Mit Schafskäse, frischer Paprika und Peperoni gefülltes, paniertes Schweinsschnitzel", img: "g-hiarten", p: [["", "18,90"]] },
    ],
  },
  {
    id: "kreationen", title: "Schnitzel-Kreationen", kicker: "Ausgesuchte Zutaten, nie da gewesener Geschmack",
    items: [
      { n: "Jean Gabin", d: "Paniertes Schweinsschnitzel unter eingekochten Preiselbeeren und Sauce Hollandaise, mit Brie überbacken", img: "c-gabin", p: [["Magdteller", "15,90"], ["Knechtteller", "19,90"]] },
      { n: "Weit, weit weg", d: "Paniertes Hähnchenbrustfilet mit frischer Ananas und eingekochten Preiselbeeren auf Currysoß’, mit Käse überbacken", img: "c-weitweg", p: [["Magdteller", "15,90"], ["Knechtteller", "19,90"]] },
      { n: "Mexico", d: "Paniertes Schweinsschnitzel mit feurigem Chili con Carne, Sour Cream und mit Käse überbacken", img: "c-mexico", p: [["Magdteller", "16,90"], ["Knechtteller", "20,90"]] },
      { n: "NYC Steuben", d: "Paniertes Schweineschnitzel mit Sour Cream, Pastrami und Sauerkraut, mit Vorarlberger Bergkäs’ überbacken", img: "c-nyc", p: [["", "19,90"]] },
      { n: "Ösi Schnitzel", d: "Paniertes Schweinsschnitzel mit frittierten und geschmorten Zwiebeln, Ketchup und Mayo, mit Bergkäse überbacken", img: "c-oesi", p: [["", "19,90"]] },
    ],
  },
  {
    id: "beilagen", title: "Beilagen", kicker: "Was dazu?",
    items: [
      { n: "Steakhouse-Fritten", d: "Eine Portion resch gebackene Fritten", img: "b-fritten", p: [["", "4,50"]] },
      { n: "Kartoffelecken", d: "Selber g’macht, mit Spezialgewürz und Sour Cream", img: "b-ecken", p: [["", "4,50"]] },
      { n: "Bratkartoffeln", d: "Unsrige Bratkartoffeln", img: "b-brat", p: [["", "5,90"]] },
      { n: "Kroketten oder Butterspätzle", d: "Ganz nach Wahl", img: "b-kroketten", p: [["", "4,80"]] },
      { n: "Beilagensalat", d: "Knackig und frisch", img: "b-salat", p: [["klein", "5,90"], ["groß", "9,90"]] },
    ],
  },
  {
    id: "salate", title: "Salate", kicker: "Erfrischend anders",
    intro: "Salate der Saison und Wildkräuter wie roter Feldsalat, Mangold, Rucola, Spinat und Sauerampfer. Dressings hausgemacht, ohne Konservierungsstoffe und Geschmacksverstärker. Auf Wunsch auch mit Himbeer-Dressing.",
    items: [
      { n: "Backhendl-Salat", d: "Knusprig gebackene Streifen vom Hähnchenbrustfilet auf Blattsalaten der Saison, Joghurt-Dressing, dazu Baguette", img: "sa-backhendl", p: [["", "17,90"]] },
      { n: "Salat Schnitzel’s", d: "Knusprig gebratene Streifen vom Schweinsschnitzel auf Blattsalaten der Saison, Joghurt-Dressing, dazu Baguette", img: "sa-schnitzels", p: [["", "17,90"]] },
      { n: "Salat Federvieh", d: "Gebratene Hähnchenbrustfiletstreifen auf Blattsalaten der Saison, Joghurt-Dressing, dazu Baguette", img: "sa-federvieh", p: [["", "17,90"]] },
      { n: "Salat Hemingway", d: "Blattsalate der Saison mit Thunfisch, Käse, Zwiebeln und gekochtem Ei, Joghurt-Dressing, dazu Baguette", img: "sa-hemingway", p: [["", "17,90"]] },
      { n: "Salat Nico", d: "Gebackener Schafskäse auf Salaten der Saison, Joghurt-Dressing, dazu Kartoffelecken, Sour Cream Dip und Baguette", img: "sa-nico", p: [["", "17,90"]] },
    ],
  },
  {
    id: "schmankerl", title: "Schmankerl", kicker: "Für alle, die mal was anderes wollen",
    items: [
      { n: "Paniertes Sellerieschnitzel", d: "Mit Kartoffelecken und Sour-Creme-Dip", img: "m-sellerie", p: [["", "14,90"]] },
      { n: "Kässpatzen", d: "Spätzle mit Emmentaler und Bergkäs’, frischen Schnittlauchröllchen und gerösteten Zwiebeln drüber", img: "m-kaesspatzen", p: [["", "15,50"]] },
      { n: "Schnitzel’s-Max", d: "Paniertes Schweinsschnitzel auf gerösteter Scheibe Bauernbrot, mit Emmentaler und 2 Spiegeleiern, an einem Salathaufen", img: "m-max", p: [["", "20,90"]] },
      { n: "Lady-Steak", d: "Kleines Rumpsteak vom Grill auf Rucola mit Himbeer-Dressing, Cocktailtomaten und frischen Parmesanspänen", img: "m-lady", p: [["", "23,90"]] },
    ],
  },
  {
    id: "steaks", title: "Rumpsteaks", kicker: "Argentinisches Black Angus, gut abgehangen, mit feinem Fettrand",
    items: [
      { n: "Rumpsteak ca. 300 g vom Grill", d: "Englisch, medium oder tot. Wahlweise mit selber g’machter Kräuterbutter, feuriger Pfefferrahm-Soß’ oder geschmorten und frittierten Zwiebeln", img: "m-rump", p: [["je", "25,90"]], wide: true },
    ],
  },
  {
    id: "kinder", title: "Für Kinder", kicker: "Alles mit Pommes, Ketchup oder Mayo und 1 Kugel Eis",
    items: [
      { n: "Chicken Nuggets", d: "Mit Pommes, Ketchup oder Mayo und 1 Kugel Eis", img: "ki-nuggets", p: [["", "6,90"]] },
      { n: "Kinder-Schnitzel", d: "Mit Pommes, Ketchup oder Mayo und 1 Kugel Eis", img: "ki-schnitzel", p: [["", "6,90"]] },
      { n: "Fischstäbchen", d: "Mit Pommes, Ketchup oder Mayo und 1 Kugel Eis", img: "ki-fisch", p: [["", "6,90"]] },
      { n: "Räuberteller", d: "Teller mit Gabel, Ketchup und Mayo. Den Rest klaut ihr euch bei euren Eltern!", img: "ki-raeuber", p: [["", "0,00"]] },
    ],
  },
  {
    id: "suesses", title: "Süßes", kicker: "Falls noch was reingeht",
    items: [
      { n: "Kaiserschmarrn", d: "Selber g’macht, mit Preiselbeeren", img: "d-kaiserschmarrn", p: [["", "12,90"]] },
      { n: "Apfelstrudel", d: "Mit Vanilleeis und Sahne", img: "d-strudel", p: [["", "8,90"]] },
      { n: "Gemischtes Eis", d: "3 Kugeln nach Wahl (Vanille, Erdbeere oder Schokolade) mit Sahne", img: "d-eis", p: [["", "7,50"]] },
    ],
  },
];

// Getränke: [Name, Zusatz, [[Menge, Preis], ...]]
const DRINKS = [
  { t: "Paulaner vom Fass’l", rows: [
    ["Paulaner Pils", "", [["0,25 l", "3,00"], ["0,5 l", "5,00"]]],
    ["Original Münchner Hell", "", [["0,25 l", "3,00"], ["0,5 l", "5,00"]]],
    ["Original Münchner Dunkel", "", [["0,25 l", "3,00"], ["0,5 l", "5,00"]]],
    ["Jedes davon als Maß", "", [["1,0 l", "9,50"]]],
  ]},
  { t: "Paulaner aus der Flasch’n", rows: [
    ["Hefe-Weißbier", "hell, dunkel oder kristallklar", [["0,5 l", "5,00"]]],
    ["Salvator", "Starkbier-Spezialität", [["0,5 l", "5,00"]]],
    ["Hefe-Weißbier alkoholfrei", "", [["0,5 l", "5,00"]]],
    ["Münchner Hell alkoholfrei", "", [["0,5 l", "5,00"]]],
    ["Malzbier", "", [["0,33 l", "3,90"]]],
  ]},
  { t: "… oder g’mixt", rows: [
    ["Radler", "", [["0,25 l", "3,00"], ["0,5 l", "5,00"]]],
    ["Hacker-Pschorr Radler", "alkoholfrei", [["0,5 l", "5,00"]]],
    ["Poidl", "Hefeweizen mit Coca-Cola", [["0,5 l", "5,00"]]],
    ["Russ’n", "Hefeweizen mit Limo", [["0,5 l", "5,00"]]],
  ]},
  { t: "Alkoholfrei", rows: [
    ["Almdudler", "", [["0,3 l", "3,50"]]],
    ["Taunusquelle", "Mineralwasser oder still", [["0,25 l", "2,80"], ["0,75 l", "7,50"]]],
    ["Gletscherwasser", "Grapefruitsaft mit Tonic und Eis", [["0,4 l", "4,50"]]],
    ["Coca-Cola, Fanta, Sprite, Spezi", "", [["0,2 l", "2,80"], ["0,4 l", "4,50"]]],
    ["Apfelsaftschorle", "", [["0,2 l", "2,80"], ["0,4 l", "4,50"]]],
    ["Apfelsaft, Orangensaft", "", [["0,2 l", "3,00"], ["0,4 l", "4,80"]]],
    ["Bitter Lemon, Tonic Water, Ginger Ale", "", [["0,25 l", "3,00"]]],
  ]},
  { t: "Heiße Getränke", rows: [
    ["Haferl Kaffee", "", [["", "3,00"]]],
    ["Haferl Cappuccino", "", [["", "3,50"]]],
    ["Latte Macchiato", "", [["", "4,30"]]],
    ["Espresso", "", [["", "3,00"]]],
    ["Doppelter Espresso", "", [["", "4,50"]]],
    ["Espresso Macchiato", "", [["", "3,30"]]],
    ["Tasse Tee", "", [["", "3,50"]]],
  ]},
  { t: "Weine & Sekt", rows: [
    ["Sandgrube 13, Grüner Veltliner", "trocken, Krems", [["Glas", "3,50"], ["Karaffe", "6,50"]]],
    ["Peter und Peter, Riesling", "lieblich, Mosel", [["Glas", "3,50"], ["Karaffe", "6,50"]]],
    ["Sandgrube 13, Zweigelt Rosé", "trocken, Krems", [["Glas", "3,50"], ["Karaffe", "6,50"]]],
    ["Sandgrube 13, Blauer Zweigelt", "trocken, Krems", [["Glas", "3,50"], ["Karaffe", "6,50"]]],
    ["Doppio Passo Primitivo", "trocken, Apulien", [["Glas", "3,90"], ["Karaffe", "7,50"]]],
    ["Freixenet Carta Nevada Seco", "trocken", [["0,1 l", "7,50"], ["0,75 l", "19,90"]]],
    ["Aperol Spritz", "", [["Glas", "7,90"]]],
    ["Hugo", "", [["Glas", "7,90"]]],
  ]},
  { t: "Für hinterher (2 cl)", rows: [
    ["Waldhex", "25 %", [["", "3,50"]]], ["Osserriesin", "21 %", [["", "3,50"]]],
    ["Lustige Tante", "32 %", [["", "3,50"]]], ["Alter Oberförster", "32 %", [["", "3,50"]]],
    ["Stierhakler", "50 %", [["", "3,50"]]], ["Stierhaxl", "40 %", [["", "3,50"]]],
    ["Kufstein Wasserl", "40 %", [["", "3,50"]]], ["Hirschensteiner", "50 %", [["", "3,50"]]],
    ["Waldschratzl", "40 %", [["", "3,50"]]], ["Blutwurst", "56 %", [["", "3,50"]]],
  ]},
];
