import fs from 'node:fs';
import path from 'node:path';

const rawTs = fs.readFileSync('src/data/routes.ts', 'utf8');
const jsonText = rawTs.replace(/^[\s\S]*?export const routesData: RouteItem\[\] = /, '').replace(/;?\s*$/, '');
const routes = JSON.parse(jsonText);

const locations = {
  "Marrakech Airport": {
    fr: "Aéroport de Marrakech",
    es: "Aeropuerto de Marrakech",
    de: "Flughafen Marrakesch",
    it: "Aeroporto di Marrakech"
  },
  "Marrakech": {
    fr: "Marrakech",
    es: "Marrakech",
    de: "Marrakesch",
    it: "Marrakech"
  },
  "Essaouira": {
    fr: "Essaouira",
    es: "Esauira",
    de: "Essaouira",
    it: "Essaouira"
  },
  "Essaouira Airport (ESU)": {
    fr: "Aéroport d'Essaouira (ESU)",
    es: "Aeropuerto de Esauira (ESU)",
    de: "Flughafen Essaouira (ESU)",
    it: "Aeroporto di Essaouira (ESU)"
  },
  "Casablanca": {
    fr: "Casablanca",
    es: "Casablanca",
    de: "Casablanca",
    it: "Casablanca"
  },
  "Casablanca Airport": {
    fr: "Aéroport de Casablanca",
    es: "Aeropuerto de Casablanca",
    de: "Flughafen Casablanca",
    it: "Aeroporto di Casablanca"
  },
  "Agadir": {
    fr: "Agadir",
    es: "Agadir",
    de: "Agadir",
    it: "Agadir"
  },
  "Agadir Airport": {
    fr: "Aéroport d'Agadir",
    es: "Aeropuerto de Agadir",
    de: "Flughafen Agadir",
    it: "Aeroporto di Agadir"
  },
  "Taghazout": {
    fr: "Taghazout",
    es: "Taghazout",
    de: "Taghazout",
    it: "Taghazout"
  },
  "Imlil": {
    fr: "Imlil",
    es: "Imlil",
    de: "Imlil",
    it: "Imlil"
  },
  "Agafay Desert": {
    fr: "Désert d'Agafay",
    es: "Desierto de Agafay",
    de: "Agafay-Wüste",
    it: "Deserto di Agafay"
  },
  "Imsouane": {
    fr: "Imsouane",
    es: "Imsouane",
    de: "Imsouane",
    it: "Imsouane"
  },
  "Sidi Kaouki": {
    fr: "Sidi Kaouki",
    es: "Sidi Kaouki",
    de: "Sidi Kaouki",
    it: "Sidi Kaouki"
  },
  "Tangier": {
    fr: "Tanger",
    es: "Tánger",
    de: "Tanger",
    it: "Tangeri"
  },
  "Fes": {
    fr: "Fès",
    es: "Fez",
    de: "Fès",
    it: "Fes"
  },
  "Ourika Valley": {
    fr: "Vallée de l'Ourika",
    es: "Valle de Ourika",
    de: "Ourika-Tal",
    it: "Valle dell'Ourika"
  },
  "Oukaimeden (ski resort)": {
    fr: "Station de ski d'Oukaïmeden",
    es: "Estación de esquí de Oukaïmeden",
    de: "Skigebiet Oukaïmeden",
    it: "Stazione sciistica di Oukaïmeden"
  },
  "Setti Fatma": {
    fr: "Setti Fatma",
    es: "Setti Fatma",
    de: "Setti Fatma",
    it: "Setti Fatma"
  },
  "Chefchaouen": {
    fr: "Chefchaouen",
    es: "Chefchaouen",
    de: "Chefchaouen",
    it: "Chefchaouen"
  },
  "Rabat": {
    fr: "Rabat",
    es: "Rabat",
    de: "Rabat",
    it: "Rabat"
  },
  "Ouarzazate": {
    fr: "Ouarzazate",
    es: "Ouarzazate",
    de: "Ouarzazate",
    it: "Ouarzazate"
  },
  "Ait Ben Haddou": {
    fr: "Aït Ben Haddou",
    es: "Aït Ben Haddou",
    de: "Aït Ben Haddou",
    it: "Aït Ben Haddou"
  },
  "Oualidia": {
    fr: "Oualidia",
    es: "Oualidia",
    de: "Oualidia",
    it: "Oualidia"
  },
  "Moulay Bouzerktoune": {
    fr: "Moulay Bouzerktoune",
    es: "Moulay Bouzerktoune",
    de: "Moulay Bouzerktoune",
    it: "Moulay Bouzerktoune"
  },
  "Palmeraie (Marrakech)": {
    fr: "Palmeraie de Marrakech",
    es: "Palmeraie de Marrakech",
    de: "Palmeraie von Marrakesch",
    it: "Palmeraie di Marrakech"
  }
};

const highways = {
  "Scenic Moroccan Highway": {
    fr: "Route marocaine pittoresque",
    es: "Ruta panorámica marroquí",
    de: "Malerische marokkanische Route",
    it: "Strada panoramica marocchina"
  },
  "Highway R207 & N8": {
    fr: "Autoroute R207 & N8",
    es: "Carretera R207 y N8",
    de: "Schnellstraße R207 & N8",
    it: "Strada R207 & N8"
  },
  "Motorway A7": {
    fr: "Autoroute A7",
    es: "Autopista A7",
    de: "Autobahn A7",
    it: "Autostrada A7"
  },
  "Motorway A7 (Atlas Mountain Route)": {
    fr: "Autoroute A7 (Route des montagnes de l'Atlas)",
    es: "Autopista A7 (Ruta de las montañas del Atlas)",
    de: "Autobahn A7 (Atlasgebirgsroute)",
    it: "Autostrada A7 (Percorso delle montagne dell'Atlante)"
  },
  "Motorway A7 & Coastal Route N1": {
    fr: "Autoroute A7 & Route Côtière N1",
    es: "Autopista A7 y Ruta Costera N1",
    de: "Autobahn A7 & Küstenstraße N1",
    it: "Autostrada A7 & Strada Costiera N1"
  },
  "Route R203 (High Atlas Valley)": {
    fr: "Route R203 (Vallée du Haut Atlas)",
    es: "Ruta R203 (Valle del Alto Atlas)",
    de: "Route R203 (Hohes Atlas-Tal)",
    it: "Strada R203 (Valle dell'Alto Atlante)"
  },
  "National Route N2": {
    fr: "Route Nationale N2",
    es: "Carretera Nacional N2",
    de: "Nationalstraße N2",
    it: "Strada Statale N2"
  },
  "National Route N13 & N2 (Rif Mountains)": {
    fr: "Route Nationale N13 & N2 (Montagnes du Rif)",
    es: "Carretera Nacional N13 y N2 (Montañas del Rif)",
    de: "Nationalstraße N13 & N2 (Rif-Gebirge)",
    it: "Strada Statale N13 & N2 (Montagne del Rif)"
  },
  "Motorway A1": {
    fr: "Autoroute A1",
    es: "Autopista A1",
    de: "Autobahn A1",
    it: "Autostrada A1"
  },
  "National Route N9 (Tizi n'Tichka Pass)": {
    fr: "Route Nationale N9 (Col du Tizi n'Tichka)",
    es: "Carretera Nacional N9 (Paso Tizi n'Tichka)",
    de: "Nationalstraße N9 (Tizi n'Tichka-Pass)",
    it: "Strada Statale N9 (Passo del Tizi n'Tichka)"
  }
};

const highlightsMap = {
  "Private door-to-door transfer in a dedicated, air-conditioned vehicle": {
    fr: "Transfert privé de porte à porte dans un véhicule climatisé dédié",
    es: "Traslado privado puerta a puerta en vehículo exclusivo con aire acondicionado",
    de: "Privater Tür-zu-Tür-Transfer im klimatisierten Einzelfahrzeug",
    it: "Transfer privato porta a porta in veicolo dedicato e climatizzato"
  },
  "Professional licensed Moroccan chauffeur with fluent English and French": {
    fr: "Chauffeur professionnel marocain agréé parlant couramment l'anglais et le français",
    es: "Chófer marroquí profesional autorizado con inglés y francés fluidos",
    de: "Professioneller, lizenzierter Chauffeur mit fließenden Englisch- und Französischkenntnissen",
    it: "Autista professionista marocchino autorizzato con inglese e francese fluenti"
  },
  "All highway tolls, fuel, parking, and luggage assistance included in flat rate": {
    fr: "Tous les péages autoroutiers, carburant, stationnement et assistance bagages inclus dans le forfait",
    es: "Todos los peajes, combustible, estacionamiento y asistencia de equipaje incluidos en la tarifa plana",
    de: "Alle Autobahnmauten, Kraftstoff, Parkgebühren und Gepäckservice im Festpreis enthalten",
    it: "Tutti i pedaggi autostradali, carburante, parcheggi e assistenza bagagli inclusi nella tariffa fissa"
  },
  "Free infant, toddler, or child booster seats available on request": {
    fr: "Sièges bébé et rehausseurs pour enfants gratuits disponibles sur simple demande",
    es: "Sillas de bebé y elevadores infantiles gratuitos disponibles bajo petición",
    de: "Kostenlose Babyschalen und Sitzerhöhungen auf Anfrage verfügbar",
    it: "Seggiolini per neonati e rialzi per bambini gratuiti disponibili su richiesta"
  },
  "Scenic drive through the endemic Moroccan argan tree groves": {
    fr: "Route panoramique à travers les plantations d'arganiers endémiques du Maroc",
    es: "Ruta panorámica a través de los bosques de argán endémicos de Marruecos",
    de: "Malerische Fahrt durch die endemischen marokkanischen Arganbaumhaine",
    it: "Viaggio panoramico attraverso gli arganeti endemici del Marocco"
  },
  "Optional photo rest stop at a certified women's argan oil cooperative": {
    fr: "Arrêt photo facultatif dans une coopérative féminine d'huile d'argan certifiée",
    es: "Parada fotográfica opcional en una cooperativa femenina de aceite de argán certificada",
    de: "Optionaler Fotostopp bei einer zertifizierten Frauen-Arganölkooperative",
    it: "Sosta fotografica opzionale presso una cooperativa femminile di olio d'argan certificata"
  },
  "Door-to-door luggage assistance directly to your medina riad or oceanfront hotel": {
    fr: "Assistance bagages porte-à-porte directement jusqu'à votre riad en médina ou hôtel en bord de mer",
    es: "Asistencia de equipaje puerta a puerta directamente hasta su riad en la medina u hotel frente al mar",
    de: "Tür-zu-Tür-Gepäckservice direkt zu Ihrem Medina-Riad oder Strandhotel",
    it: "Assistenza bagagli porta a porta direttamente al tuo riad nella medina o hotel sul mare"
  },
  "Comfortable highway cruising with fresh Atlantic breeze on arrival": {
    fr: "Trajet autoroutier confortable avec brise fraîche de l'Atlantique à l'arrivée",
    es: "Conducción cómoda por autopista con brisa fresca del Atlántico a la llegada",
    de: "Komfortable Autobahnfahrt mit frischer Atlantikbrise bei der Ankunft",
    it: "Piacevole viaggio in autostrada con fresca brezza atlantica all'arrivo"
  },
  "Direct nonstop travel along Morocco's modern A7 expressway": {
    fr: "Voyage direct et sans escale sur l'autoroute moderne A7 du Maroc",
    es: "Viaje directo sin paradas por la moderna autopista A7 de Marruecos",
    de: "Direkte Nonstop-Fahrt auf der modernen marokkanischen Autobahn A7",
    it: "Viaggio diretto senza soste lungo la moderna autostrada A7 del Marocco"
  },
  "Complimentary airport meet & greet with flight tracking at CMN": {
    fr: "Accueil personnalisé gratuit à l'aéroport avec suivi des vols à CMN",
    es: "Servicio de bienvenida gratuito en el aeropuerto con seguimiento de vuelos en CMN",
    de: "Kostenlose persönliche Abholung am Flughafen mit Live-Flugverfolgung am CMN",
    it: "Accoglienza personalizzata gratuita in aeroporto con monitoraggio del volo a CMN"
  },
  "Flexible departure timing adapted to your flight arrival or hotel checkout": {
    fr: "Horaires de départ flexibles adaptés à l'arrivée de votre vol ou au départ de l'hôtel",
    es: "Horarios de salida flexibles adaptados a su vuelo o salida del hotel",
    de: "Flexible Abfahrtszeiten, angepasst an Ihre Flugzeiten oder den Hotel-Check-out",
    it: "Orari di partenza flessibili adattati al volo o al check-out in hotel"
  },
  "Bottled mineral water, onboard Wi-Fi, and climate-controlled comfort": {
    fr: "Bouteilles d'eau minérale, Wi-Fi à bord et confort climatisé",
    es: "Agua mineral embotellada, Wi-Fi a bordo y confort con aire acondicionado",
    de: "Mineralwasserflaschen, WLAN an Bord und klimatisierter Reisekomfort",
    it: "Acqua minerale in bottiglia, Wi-Fi a bordo e comfort climatizzato"
  },
  "Spectacular descent from the western High Atlas foothills to the Atlantic coast": {
    fr: "Descente spectaculaire depuis les contreforts du Haut Atlas occidental vers la côte atlantique",
    es: "Descenso espectacular desde las estribaciones del Alto Atlas occidental hasta la costa atlántica",
    de: "Spektakuläre Abfahrt von den Ausläufern des Hohen Atlas zur Atlantikküste",
    it: "Discesa spettacolare dai piedi dell'Alto Atlante occidentale verso la costa atlantica"
  },
  "Clean modern rest stop with Moroccan tea, espresso, and clean amenities": {
    fr: "Halte propre et moderne avec thé marocain, espresso et sanitaires soignés",
    es: "Parada limpia y moderna con té marroquí, café espresso y servicios impecables"
    ,de: "Saubere moderne Raststätte mit marokkanischem Tee, Espresso und gepflegten Sanitäranlagen",
    it: "Sosta moderna e pulita con tè marocchino, espresso e servizi curati"
  },
  "Direct delivery to your surf camp, beachfront resort, or private villa": {
    fr: "Dépôt direct à votre surf camp, complexe balnéaire ou villa privée",
    es: "Llegada directa a su surf camp, complejo frente a la playa o villa privada",
    de: "Direkte Anfahrt zu Ihrem Surfcamp, Strandresort oder Ihrer Privatvilla",
    it: "Consegna diretta al tuo surf camp, resort sulla spiaggia o villa privata"
  },
  "Spacious luggage capacity for surfboards and family luggage": {
    fr: "Grande capacité de bagages pour planches de surf et valises familiales",
    es: "Amplia capacidad de equipaje para tablas de surf y maletas familiares",
    de: "Großzügiges Gepäckvolumen für Surfbretter und Familienkoffer",
    it: "Ampia capacità di carico per tavole da surf e bagagli familiari"
  },
  "Breathtaking climb through the Asni valley and High Atlas Berber villages": {
    fr: "Ascension spectaculaire à travers la vallée d'Asni et les villages berbères du Haut Atlas",
    es: "Ascenso espectacular por el valle de Asni y pueblos bereberes del Alto Atlas",
    de: "Atemberaubender Aufstieg durch das Asni-Tal und Berberdörfer des Hohen Atlas",
    it: "Salita spettacolare attraverso la valle di Asni e i villaggi berberi dell'Alto Atlante"
  },
  "Views of walnut groves, terraced apple orchards, and snow-capped Mount Toubkal": {
    fr: "Vues sur les noyeraies, les vergers de pommiers en terrasse et le mont Toubkal enneigé",
    es: "Vistas de nogales, huertos de manzanos en terrazas y el monte Toubkal nevado",
    de: "Blicke auf Walnusshaine, terrassierte Apfelgärten und den schneebedeckten Toubkal",
    it: "Viste su noccioleti, meleti terrazzati e la vetta innevata del Monte Toubkal"
  },
  "Experienced mountain-route chauffeur trained in alpine curves and safety": {
    fr: "Chauffeur expérimenté en haute montagne formé aux lacets alpins et à la sécurité",
    es: "Chófer experto en rutas de montaña entrenado en curvas alpinas y máxima seguridad",
    de: "Erfahrener Bergstrecken-Chauffeur, geschult auf alpinen Kurven und Fahrsicherheit",
    it: "Autista esperto di percorsi montani addestrato su tornanti alpini e massima sicurezza"
  },
  "Direct drop-off at your mountain lodge, kasbah, or trek trailhead": {
    fr: "Dépôt direct à votre écolodge de montagne, kasbah ou point de départ de randonnée",
    es: "Llegada directa a su refugio de montaña, kasbah o inicio de ruta de senderismo",
    de: "Direkter Transfer zu Ihrer Berglodge, Kasbah oder zum Trekking-Startpunkt",
    it: "Arrivo diretto al tuo lodge di montagna, kasbah o punto di partenza del trekking"
  },
  "Winding through the lush green peaks and cedar forests of the Rif Mountains": {
    fr: "Traversée des sommets verdoyants et des forêts de cèdres des montagnes du Rif",
    es: "Paseo entre picos verdes y bosques de cedros en las montañas del Rif",
    de: "Fahrt durch die grünen Gipfel und Zedernwälder des Rif-Gebirges",
    it: "Attraversamento delle cime verdeggianti e delle foreste di cedri delle montagne del Rif"
  },
  "Smooth transit avoiding confusing local buses and shared grand taxi stops": {
    fr: "Trajet fluide évitant les bus locaux déroutants et les arrêts de grands taxis collectifs",
    es: "Tránsito fluido evitando autobuses locales confusos y paradas de taxis compartidos",
    de: "Reibungsloser Transfer ohne unübersichtliche Busverbindungen oder Sammeltaxis",
    it: "Viaggio fluido evitando autobus locali e fermate caotiche di taxi collettivi"
  },
  "Direct arrival at the blue gates of Bab Bou Jeloud or Bab El Ain": {
    fr: "Arrivée directe aux portes bleues de Bab Bou Jeloud ou Bab El Ain",
    es: "Llegada directa a las puertas azules de Bab Bou Jeloud o Bab El Ain",
    de: "Direkte Ankunft an den blauen Toren von Bab Bou Jeloud oder Bab El Ain",
    it: "Arrivo diretto alle porte blu di Bab Bou Jeloud o Bab El Ain"
  },
  "Punctual, professional driver with local northern route expertise": {
    fr: "Chauffeur ponctuel et professionnel avec une expertise locale des routes du Nord",
    es: "Conductor puntual y profesional con amplio conocimiento de las rutas del norte",
    de: "Pünktlicher, professioneller Chauffeur mit umfassender Streckenkenntnis im Norden",
    it: "Autista puntuale e professionale con profonda esperienza delle rotte del Nord"
  },
  "Crossing the legendary Tizi n'Tichka mountain pass at 2,260 meters elevation": {
    fr: "Franchissement du col légendaire du Tizi n'Tichka à 2 260 mètres d'altitude",
    es: "Cruce del legendario paso de montaña Tizi n'Tichka a 2.260 metros de altitud",
    de: "Überquerung des legendären Gebirgspasses Tizi n'Tichka auf 2.260 Metern Höhe",
    it: "Attraversamento del leggendario valico del Tizi n'Tichka a 2.260 metri di quota"
  },
  "Panoramas of ancient red-clay kasbahs and fortified adobe ksour": {
    fr: "Panoramas sur les anciennes kasbahs en terre rouge et les ksour fortifiés",
    es: "Panorámicas de antiguas kasbahs de arcilla roja y ksour fortificados",
    de: "Panoramen uralter Lehmkasbahs und befestigter Ksour",
    it: "Panorami di antiche kasbah in argilla rossa e ksour fortificati"
  },
  "Flexible photo stops at scenic valley viewpoints and Berber roadside cafés": {
    fr: "Arrêts photo flexibles aux belvédères de vallée et cafés berbères en bord de route",
    es: "Paradas fotográficas flexibles en miradores y cafés bereberes de carretera",
    de: "Flexible Fotostopps an Tal-Aussichtspunkten und Berber-Straßencafés",
    it: "Soste fotografiche flessibili presso punti panoramici e caffè berberi lungo la strada"
  },
  "Heavy-duty Prado 4x4 or Mercedes van engineered for high-altitude comfort": {
    fr: "4x4 Prado robuste ou van Mercedes conçu pour le confort en haute altitude",
    es: "Robusto 4x4 Prado o van Mercedes acondicionado para confort en alta montaña",
    de: "Robuster Prado 4x4 oder Mercedes-Van, ausgelegt auf Hochgebirgskomfort",
    it: "Robusto 4x4 Prado o minivan Mercedes allestito per il comfort ad alta quota"
  }
};

function getLoc(name, lang) {
  if (locations[name] && locations[name][lang]) return locations[name][lang];
  return name;
}

function getHw(name, lang) {
  if (highways[name] && highways[name][lang]) return highways[name][lang];
  return name;
}

function getHl(hl, lang) {
  if (highlightsMap[hl] && highlightsMap[hl][lang]) return highlightsMap[hl][lang];
  return hl;
}

const templates = {
  fr: {
    h1: (f, t) => `Transfert Privé de ${f} à ${t}`,
    seoTitle: (f, t, p) => `Transfert Privé ${f} à ${t} | Prix Fixe ${p} € | Roam Morocco`,
    seoDescription: (f, t, p) => `Réservez votre transfert privé de ${f} à ${t} avec Roam Morocco. Forfait fixe garanti de ${p} €, chauffeur agréé, flotte Mercedes de luxe, porte-à-porte.`,
    faq1_q: (f, t) => `Combien coûte un transfert privé de ${f} à ${t} ?`,
    faq1_a: (f, t, ps, pv) => `Un transfert privé de ${f} à ${t} commence à ${ps} € pour une berline confort privée (1–4 passagers) et à ${pv} € pour un minivan exécutif Mercedes-Benz (5–7 passagers). Tous les tarifs sont fixes et transparents par véhicule, incluant l'ensemble des péages autoroutiers, le carburant et l'assistance bagages.`,
    faq2_q: (f, t) => `Combien de temps dure le trajet entre ${f} et ${t} ?`,
    faq2_a: (dist, dur) => `Le trajet s'étend sur environ ${dist} et dure environ ${dur} à bord de notre véhicule privé. Contrairement aux transports partagés ou aux correspondances en train, vous profitez d'un trajet direct porte-à-porte sans détours imprévus.`,
    faq3_q: `Pouvons-nous nous arrêter pour des photos, un café ou le déjeuner en cours de route ?`,
    faq3_a: `Oui ! Comme il s'agit d'un service de chauffeur 100% privé, vous donnez le tempo. Votre chauffeur fera volontiers une halte aux points de vue panoramiques, sur des aires de repos propres pour un jus d'orange pressé ou un thé à la menthe marocain, ou dans des coopératives locales sur demande.`,
    faq4_q: `Des sièges de sécurité pour enfants sont-ils disponibles ?`,
    faq4_a: `Oui, nous fournissons gratuitement des sièges bébé et rehausseurs pour enfants certifiés ISOFIX. Précisez simplement l'âge de vos enfants lors de votre confirmation sur WhatsApp.`,
    faq5_q: `Comment réserver et régler ce transfert ?`,
    faq5_a: `Vous pouvez réserver instantanément via WhatsApp sans aucun prépaiement. Votre chauffeur est confirmé immédiatement, et le règlement se fait en espèces (Euros ou Dirhams marocains) directement au chauffeur à la fin du voyage.`
  },
  es: {
    h1: (f, t) => `Traslado Privado de ${f} a ${t}`,
    seoTitle: (f, t, p) => `Traslado Privado ${f} a ${t} | Tarifa Fija ${p} € | Roam Morocco`,
    seoDescription: (f, t, p) => `Reserve su traslado privado de ${f} a ${t} con Roam Morocco. Tarifa plana garantizada de ${p} €, chófer profesional autorizado, flota Mercedes de lujo, servicio puerta a puerta.`,
    faq1_q: (f, t) => `¿Cuánto cuesta un traslado privado de ${f} a ${t}?`,
    faq1_a: (f, t, ps, pv) => `Un traslado privado de ${f} a ${t} comienza en ${ps} € para un sedán confort privado (1–4 pasajeros) y ${pv} € para una minivan ejecutiva Mercedes-Benz (5–7 pasajeros). Todos los precios son fijos y transparentes por vehículo, incluidos todos los peajes de autopista, combustible y asistencia con el equipaje.`,
    faq2_q: (f, t) => `¿Cuánto tiempo dura el trayecto entre ${f} y ${t}?`,
    faq2_a: (dist, dur) => `El trayecto abarca aproximadamente ${dist} y dura unas ${dur} en nuestro vehículo privado. A diferencia de autobuses masivos o trenes, disfrutará de un viaje directo puerta a puerta sin desvíos imprevistos.`,
    faq3_q: `¿Podemos detenernos para tomar fotos, un café o almorzar en el camino?`,
    faq3_a: `¡Sí! Al ser un servicio de chófer 100% privado, usted marca el ritmo. Su conductor con gusto se detendrá en miradores panorámicos, áreas de descanso limpias para un zumo de naranja o té con menta, o cooperativas locales bajo petición.`,
    faq4_q: `¿Disponen de sillas de seguridad para niños?`,
    faq4_a: `Sí, proporcionamos sillas de bebé y elevadores infantiles certificados ISOFIX sin cargo adicional. Indíquenos la edad de sus hijos al confirmar su reserva por WhatsApp.`,
    faq5_q: `¿Cómo reservo y pago este traslado?`,
    faq5_a: `Puede reservar al instante por WhatsApp sin necesidad de anticipo con tarjeta. Su conductor queda confirmado de inmediato y el pago se efectúa en efectivo (euros o dirhams marroquíes) directamente al conductor al finalizar el trayecto.`
  },
  de: {
    h1: (f, t) => `Privater Transfer von ${f} nach ${t}`,
    seoTitle: (f, t, p) => `Privater Transfer ${f} nach ${t} | Festpreis ${p} € | Roam Morocco`,
    seoDescription: (f, t, p) => `Buchen Sie Ihren privaten Transfer von ${f} nach ${t} mit Roam Morocco. Garantierter Festpreis von ${p} €, lizenzierter Chauffeur, luxuriöser Mercedes-Fuhrpark, Tür-zu-Tür-Service.`,
    faq1_q: (f, t) => `Wie viel kostet ein privater Transfer von ${f} nach ${t}?`,
    faq1_a: (f, t, ps, pv) => `Ein privater Transfer von ${f} nach ${t} beginnt bei ${ps} € für eine private Komfort-Limousine (1–4 Fahrgäste) und ${pv} € für einen luxuriösen Mercedes-Benz Minivan (5–7 Fahrgäste). Alle Preise sind transparente Festpreise pro Fahrzeug, inklusive aller Autobahnmauten, Kraftstoff und Gepäckservice.`,
    faq2_q: (f, t) => `Wie lange dauert die Fahrt zwischen ${f} und ${t}?`,
    faq2_a: (dist, dur) => `Die Strecke umfasst etwa ${dist} und dauert in unserem Privatfahrzeug rund ${dur}. Im Gegensatz zu überfüllten Linienbussen oder Zügen genießen Sie eine direkte, entspannte Tür-zu-Tür-Reise ohne ungeplante Zwischenstopps.`,
    faq3_q: `Können wir unterwegs für Fotos, Kaffee oder Mittagessen anhalten?`,
    faq3_a: `Ja! Da es sich um einen 100% privaten Chauffeurservice handelt, bestimmen Sie das Reisetempo. Ihr Fahrer hält auf Wunsch gerne an Panorama-Aussichtspunkten, sauberen Raststätten für frischen Orangensaft oder Minztee sowie bei lokalen Frauen-Kooperativen.`,
    faq4_q: `Sind Kindersicherheitssitze verfügbar?`,
    faq4_a: `Ja, wir stellen zertifizierte ISOFIX-Babyschalen und Sitzerhöhungen für Kinder völlig kostenfrei bereit. Teilen Sie uns einfach das Alter Ihrer Kinder bei der Bestätigung via WhatsApp mit.`,
    faq5_q: `Wie buche und bezahle ich diesen Transfer?`,
    faq5_a: `Sie können sofort und bequem über WhatsApp buchen — ganz ohne Vorauszahlung. Ihr Chauffeur wird umgehend reserviert, und die Bezahlung erfolgt einfach in bar (Euro oder marokkanische Dirham) direkt beim Fahrer am Zielort.`
  },
  it: {
    h1: (f, t) => `Transfer Privato da ${f} a ${t}`,
    seoTitle: (f, t, p) => `Transfer Privato ${f} a ${t} | Prezzo Fisso ${p} € | Roam Morocco`,
    seoDescription: (f, t, p) => `Prenota il tuo transfer privato da ${f} a ${t} con Roam Morocco. Prezzo fisso garantito di ${p} €, autista professionista autorizzato, flotta Mercedes di lusso, servizio porta a porta.`,
    faq1_q: (f, t) => `Quanto costa un transfer privato da ${f} a ${t}?`,
    faq1_a: (f, t, ps, pv) => `Un transfer privato da ${f} a ${t} parte da ${ps} € per una berlina comfort privata (1–4 passeggeri) e ${pv} € per un minivan executive Mercedes-Benz (5–7 passeggeri). Tutti i prezzi sono fissi e trasparenti per veicolo, inclusi pedaggi autostradali, carburante e assistenza bagagli.`,
    faq2_q: (f, t) => `Quanto tempo dura il tragitto tra ${f} e ${t}?`,
    faq2_a: (dist, dur) => `Il percorso copre circa ${dist} e dura all'incirca ${dur} a bordo del nostro veicolo privato. A differenza dei pullman affollati o dei treni, godrai di un viaggio diretto porta a porta senza soste impreviste.`,
    faq3_q: `Possiamo fermarci per foto, caffè o pranzo lungo il tragitto?`,
    faq3_a: `Sì! Essendo un servizio con autista 100% privato, sei tu a decidere i tempi. L'autista sarà felice di sostare in punti panoramici spettacolari, aree di servizio curate per una spremuta d'arancia fresca o tè alla menta marocchino, o cooperative locali su richiesta.`,
    faq4_q: `Sono disponibili seggiolini di sicurezza per bambini?`,
    faq4_a: `Sì, forniamo gratuitamente seggiolini per neonati e rialzi per bambini certificati ISOFIX. È sufficiente specificare l'età dei tuoi bambini durante la conferma su WhatsApp.`,
    faq5_q: `Come posso prenotare e pagare questo transfer?`,
    faq5_a: `Puoi prenotare all'istante su WhatsApp senza dover versare alcun anticipo con carta di credito. L'autista è confermato subito e il pagamento avviene comodamente in contanti (Euro o Dirham marocchini) direttamente all'autista all'arrivo.`
  }
};

const langs = ['fr', 'es', 'de', 'it'];

for (const lang of langs) {
  const t = templates[lang];
  const translated = routes.map((route) => {
    const locFrom = getLoc(route.from, lang);
    const locTo = getLoc(route.to, lang);
    const hw = getHw(route.highway, lang);

    const h1 = t.h1(locFrom, locTo);
    const seoTitle = t.seoTitle(locFrom, locTo, route.price_sedan);
    const seoDescription = t.seoDescription(locFrom, locTo, route.price_sedan);

    const highlights = route.highlights.map(h => getHl(h, lang));

    const faqs = [
      {
        q: t.faq1_q(locFrom, locTo),
        a: t.faq1_a(locFrom, locTo, route.price_sedan, route.price_van)
      },
      {
        q: t.faq2_q(locFrom, locTo),
        a: t.faq2_a(route.distance, route.duration)
      },
      {
        q: t.faq3_q,
        a: t.faq3_a
      },
      {
        q: t.faq4_q,
        a: t.faq4_a
      },
      {
        q: t.faq5_q,
        a: t.faq5_a
      }
    ];

    return {
      ...route,
      from: locFrom,
      to: locTo,
      fromRaw: getLoc(route.fromRaw, lang),
      toRaw: getLoc(route.toRaw, lang),
      highway: hw,
      h1,
      seoTitle,
      seoDescription,
      highlights,
      faqs
    };
  });

  const targetPath = path.resolve(`src/data/routes-${lang}.json`);
  fs.writeFileSync(targetPath, JSON.stringify(translated, null, 2), 'utf8');
  console.log(`✅ Successfully generated ${translated.length} routes for [${lang.toUpperCase()}] -> ${targetPath}`);
}

console.log('🎉 Multilingual routes data generated cleanly for all 4 European languages!');
