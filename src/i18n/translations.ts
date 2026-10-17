export type Lang = 'en' | 'fr' | 'es' | 'de' | 'it';

export interface Translations {
  nav: {
    ticker1Title: string;
    ticker1Desc: string;
    ticker2Title: string;
    ticker2Desc: string;
    ticker3Title: string;
    ticker3Desc: string;
    transfers: string;
    transfersKicker: string;
    transfersSub: string;
    viewAllTransfers: string;
    tours: string;
    toursKicker: string;
    toursSub: string;
    viewAllTours: string;
    privateChauffeur: string;
    destinations: string;
    chooseLang: string;
    europeanTravelers: string;
    costCalculator: string;
    travelDeals: string;
    aboutUs: string;
    chatWhatsApp: string;
    tour1Title: string;
    tour1Meta: string;
    tour2Title: string;
    tour2Meta: string;
    tour3Title: string;
    tour3Meta: string;
    tour4Title: string;
    tour4Meta: string;
    tour5Title: string;
    tour5Meta: string;
    tour6Title: string;
    tour6Meta: string;
    routeMeta1: string;
    routeMeta2: string;
    routeMeta3: string;
    routeMeta4: string;
    routeMeta5: string;
    routeMeta6: string;
  };
  footer: {
    tagline: string;
    destinationsCol: string;
    travelSuiteCol: string;
    connectCol: string;
    saharaDesert: string;
    marrakech: string;
    fes: string;
    chefchaouen: string;
    costEstimator: string;
    privateChauffeur: string;
    customTours: string;
    travelBlog: string;
    copyright: string;
    terms: string;
    privacy: string;
    refund: string;
    travelPolicy: string;
  };
  wizard: {
    title: string;
    subtitle: string;
    pickupLabel: string;
    pickupPlaceholder: string;
    groupAirports: string;
    groupCities: string;
    destLabel: string;
    destPlaceholder: string;
    groupIntercity: string;
    groupMarrakech: string;
    groupDayTrips: string;
    paxLabel: string;
    tabSedan: string;
    tabVan: string;
    tabMinibus: string;
    tabQuote: string;
    unfilledReply: string;
    unfilledPayLater: string;
    swapBtn: string;
    roundTrip: string;
    roundTripDiscount: string;
    forGroup: string;
    includedSummary: string;
    pickupDateLabel: string;
    pickupTimeLabel: string;
    flightNumLabel: string;
    flightPlaceholder: string;
    tripDetailsLabel: string;
    tripDetailsPlaceholder: string;
    childSeatAdd: string;
    childSeatInc: string;
    payCash: string;
    payCard: string;
    payNoteCash: string;
    payNoteCard: string;
    trustReply: string;
    trustFlight: string;
    bookNowBtn: string;
    bottomNote: string;
  };
  concierge: {
    triggerLabel: string;
    modalTitle: string;
    modalStatus: string;
    bubbleTag: string;
    welcomeTitle: string;
    welcomeDesc: string;
    choice1Title: string;
    choice1Desc: string;
    choice2Title: string;
    choice2Desc: string;
    verifiedDesk: string;
    startOver: string;
  };
  common: {
    viewDetails: string;
    bookViaWhatsApp: string;
    fromPrice: string;
    perVehicle: string;
    luggage: string;
  };
}

export const translations: Record<Lang, Translations> = {
  en: {
    nav: {
      ticker1Title: "2026 PRIVATE EXPEDITIONS",
      ticker1Desc: "Tailored Private Journeys Across Sahara & High Atlas",
      ticker2Title: "LUXURY RIADS & DESERT CAMPS",
      ticker2Desc: "Custom Circuits From Marrakech, Fes & Casablanca",
      ticker3Title: "FEEL THE KINGDOM",
      ticker3Desc: "Private Drivers, Expert Local Guides & Unhurried Pacing",
      transfers: "Transfers",
      transfersKicker: "POPULAR PRIVATE TRANSFERS",
      transfersSub: "Fixed door-to-door rates · Licensed chauffeur · Luggage included",
      viewAllTransfers: "⚡ View all 120+ Moroccan private transfers & rates",
      tours: "Tours & Day Trips",
      toursKicker: "PRIVATE EXPEDITIONS & CIRCUITS",
      toursSub: "100% Private · Dedicated Prado 4x4 or Mercedes Van · Unhurried",
      viewAllTours: "✨ View full catalog of private tours & day trips",
      privateChauffeur: "Private Chauffeur",
      destinations: "Destinations",
      chooseLang: "Choose Language",
      europeanTravelers: "EUROPEAN TRAVELERS",
      costCalculator: "Cost Calculator",
      travelDeals: "Travel Deals",
      aboutUs: "About Us",
      chatWhatsApp: "WhatsApp",
      tour1Title: "3-Day Merzouga Sahara Desert Tour",
      tour1Meta: "High Atlas · Erg Chebbi Luxury Camp · Camel Trek",
      tour2Title: "Agafay Desert Sunset Dinner & Camel Ride",
      tour2Meta: "45m from Medina · Candlelit Berber Tent & Campfire",
      tour3Title: "Essaouira Coastal Bastion Day Trip",
      tour3Meta: "Full Day · Atlantic Ramparts · Fresh Seafood & Souks",
      tour4Title: "Ourika Valley & Atlas Mountains Hike",
      tour4Meta: "Full Day · Waterfalls · Authentic Berber Home Lunch",
      tour5Title: "Aït Benhaddou & Ouarzazate Kasbah Tour",
      tour5Meta: "Full Day · Tizi n'Tichka Pass 2,260m · UNESCO Kasbah",
      tour6Title: "Custom Multi-Day Bespoke Tour",
      tour6Meta: "7 to 14 Days · Tailored Itinerary & Boutique Riads",
      routeMeta1: "2h 30m · Highway R207 · Door to Door",
      routeMeta2: "2h 45m · Highway A1 · Door to Door",
      routeMeta3: "2h 30m · Flight Tracking & Name-Sign Pickup",
      routeMeta4: "20m · Direct Riad Luggage Assistance",
      routeMeta5: "30m · Luxury Resort Drop-off",
      routeMeta6: "3h 00m · Atlantic Coast Expressway"
    },
    footer: {
      tagline: "Let's feel Morocco together",
      destinationsCol: "Destinations",
      travelSuiteCol: "Travel Suite",
      connectCol: "Connect",
      saharaDesert: "Sahara Desert",
      marrakech: "Marrakech",
      fes: "Fes",
      chefchaouen: "Chefchaouen",
      costEstimator: "Cost Estimator",
      privateChauffeur: "Private Chauffeur",
      customTours: "Custom Tours",
      travelBlog: "Travel Blog",
      copyright: "© 2026 Roam Morocco Tours. All Rights Reserved.",
      terms: "Terms of Service",
      privacy: "Privacy Policy",
      refund: "Refund Policy",
      travelPolicy: "Travel Policy"
    },
    wizard: {
      title: "Check your price instantly",
      subtitle: "Pick your route and group size · No commitment",
      pickupLabel: "Pickup Location",
      pickupPlaceholder: "Select pickup location",
      groupAirports: "Airports",
      groupCities: "Cities & Hubs",
      destLabel: "Destination",
      destPlaceholder: "Select destination",
      groupIntercity: "Airports & Intercity Hubs",
      groupMarrakech: "Marrakech Areas",
      groupDayTrips: "Day Trips & Excursions",
      paxLabel: "HOW MANY PASSENGERS?",
      tabSedan: "sedan",
      tabVan: "van",
      tabMinibus: "minibus",
      tabQuote: "quote",
      unfilledReply: "⏱ We reply within 10 minutes",
      unfilledPayLater: "• No charge now — confirm via WhatsApp, pay later.",
      swapBtn: "Swap",
      roundTrip: "Round trip",
      roundTripDiscount: "-10% return",
      forGroup: "for your group · cash to driver",
      includedSummary: "Per vehicle — fuel, tolls and luggage included",
      pickupDateLabel: "PICKUP DATE (OPTIONAL)",
      pickupTimeLabel: "TIME (OPTIONAL)",
      flightNumLabel: "FLIGHT NUMBER (OPTIONAL)",
      flightPlaceholder: "e.g. AT800, BA2662, AF1476",
      tripDetailsLabel: "TRIP DETAILS",
      tripDetailsPlaceholder: "Your name, hotel or riad pickup, special requests...",
      childSeatAdd: "+ Child seat",
      childSeatInc: "✓ Child seat included",
      payCash: "Cash to the driver",
      payCard: "Card via secure link",
      payNoteCash: "ⓘ Pay the driver on the day, in euros or dirhams.",
      payNoteCard: "ⓘ We will send a secure online payment link via WhatsApp after confirmation.",
      trustReply: "We reply within 10 minutes",
      trustFlight: "We track your flight, so delays are covered, and your driver waits in arrivals with a name sign until you come out — no time limit and no waiting fee.",
      bookNowBtn: "Book Now",
      bottomNote: "Cash to the driver on the day · No charge now"
    },
    concierge: {
      triggerLabel: "Plan a Trip",
      modalTitle: "Roam Concierge",
      modalStatus: "Marrakech Travel Desk • Online",
      bubbleTag: "✨ Marhaba • Private Concierge",
      welcomeTitle: "Welcome to Roam Morocco",
      welcomeDesc: "I am your 24/7 personal travel advisor. How would you like to begin your journey?",
      choice1Title: "Custom Morocco Private Tour",
      choice1Desc: "Private 4x4 driver, Sahara glamping & tailor-made route",
      choice2Title: "Flights & Global Travel Deals",
      choice2Desc: "Compare airfare, boutique hotels & instant eSIMs",
      verifiedDesk: "Verified Roam Morocco Desk",
      startOver: "Start Over"
    },
    common: {
      viewDetails: "View Details",
      bookViaWhatsApp: "Book on WhatsApp",
      fromPrice: "From",
      perVehicle: "per vehicle",
      luggage: "Luggage included"
    }
  },

  fr: {
    nav: {
      ticker1Title: "EXPÉDITIONS PRIVÉES 2026",
      ticker1Desc: "Voyages privés sur mesure à travers le Sahara et le Haut Atlas",
      ticker2Title: "RIADS DE LUXE & CAMPS DU DÉSERT",
      ticker2Desc: "Circuits personnalisés au départ de Marrakech, Fès et Casablanca",
      ticker3Title: "RESSENTEZ LE ROYAUME",
      ticker3Desc: "Chauffeurs privés, guides locaux experts et rythme sans précipitation",
      transfers: "Transferts",
      transfersKicker: "TRANSFERTS PRIVÉS POPULAIRES",
      transfersSub: "Tarifs fixes porte-à-porte · Chauffeur agréé · Bagages inclus",
      viewAllTransfers: "⚡ Voir les 120+ transferts privés au Maroc & tarifs",
      tours: "Circuits & Excursions",
      toursKicker: "EXPÉDITIONS & CIRCUITS PRIVÉS",
      toursSub: "100% Privé · 4x4 Prado ou Van Mercedes dédié · Sans précipitation",
      viewAllTours: "✨ Voir tout le catalogue de circuits privés & excursions",
      privateChauffeur: "Chauffeur Privé",
      destinations: "Destinations",
      chooseLang: "Choisir la langue",
      europeanTravelers: "VOYAGEURS INTERNATIONAUX",
      costCalculator: "Calculateur de budget",
      travelDeals: "Offres de voyage",
      aboutUs: "À propos",
      chatWhatsApp: "WhatsApp",
      tour1Title: "Circuit 3 Jours Désert Merzouga",
      tour1Meta: "Haut Atlas · Bivouac de luxe Erg Chebbi · Balade en dromadaire",
      tour2Title: "Dîner Coucher de Soleil Désert Agafay",
      tour2Meta: "45 min de la Médina · Tente berbère aux chandelles & feu de camp",
      tour3Title: "Excursion d'une journée à Essaouira",
      tour3Meta: "Journée complète · Remparts atlantiques · Poissons frais & souks",
      tour4Title: "Vallée de l'Ourika & Haut Atlas",
      tour4Meta: "Journée complète · Cascades · Déjeuner chez l'habitant berbère",
      tour5Title: "Visite Kasbah Aït Benhaddou & Ouarzazate",
      tour5Meta: "Journée complète · Col Tizi n'Tichka 2 260m · Kasbah UNESCO",
      tour6Title: "Grand Circuit Sur Mesure Plusieurs Jours",
      tour6Meta: "7 à 14 Jours · Itinéraire personnalisé & Riads de charme",
      routeMeta1: "2h 30m · Route R207 · Porte-à-porte direct",
      routeMeta2: "2h 45m · Autoroute A1 · Porte-à-porte direct",
      routeMeta3: "2h 30m · Suivi de vol & Accueil avec pancarte",
      routeMeta4: "20m · Assistance bagages directe jusqu'au Riad",
      routeMeta5: "30m · Dépose dans votre resort de luxe",
      routeMeta6: "3h 00m · Voie express côte atlantique"
    },
    footer: {
      tagline: "Ressentons le Maroc ensemble",
      destinationsCol: "Destinations",
      travelSuiteCol: "Services Voyage",
      connectCol: "Contact",
      saharaDesert: "Désert du Sahara",
      marrakech: "Marrakech",
      fes: "Fès",
      chefchaouen: "Chefchaouen",
      costEstimator: "Estimateur de budget",
      privateChauffeur: "Chauffeur Privé",
      customTours: "Circuits Sur Mesure",
      travelBlog: "Journal de Voyage",
      copyright: "© 2026 Roam Morocco Tours. Tous droits réservés.",
      terms: "Conditions Générales",
      privacy: "Politique de Confidentialité",
      refund: "Politique de Remboursement",
      travelPolicy: "Conditions de Voyage"
    },
    wizard: {
      title: "Calculez votre tarif instantanément",
      subtitle: "Choisissez votre trajet et la taille de votre groupe · Sans engagement",
      pickupLabel: "Lieu de départ",
      pickupPlaceholder: "Sélectionnez le lieu de départ",
      groupAirports: "Aéroports",
      groupCities: "Villes & Centres",
      destLabel: "Destination",
      destPlaceholder: "Sélectionnez la destination",
      groupIntercity: "Aéroports & Trajets interurbains",
      groupMarrakech: "Zones de Marrakech",
      groupDayTrips: "Excursions & Découvertes",
      paxLabel: "COMBIEN DE PASSAGERS ?",
      tabSedan: "berline",
      tabVan: "van",
      tabMinibus: "minibus",
      tabQuote: "devis",
      unfilledReply: "⏱ Nous répondons sous 10 minutes",
      unfilledPayLater: "• Aucun paiement maintenant — confirmez via WhatsApp, payez plus tard.",
      swapBtn: "Inverser",
      roundTrip: "Aller-retour",
      roundTripDiscount: "-10% retour",
      forGroup: "pour votre groupe · règlement au chauffeur",
      includedSummary: "Par véhicule — carburant, péages et bagages inclus",
      pickupDateLabel: "DATE DE PRISE EN CHARGE (OPTIONNEL)",
      pickupTimeLabel: "HEURE (OPTIONNEL)",
      flightNumLabel: "NUMÉRO DE VOL (OPTIONNEL)",
      flightPlaceholder: "ex: AT800, AF1476, TO4320",
      tripDetailsLabel: "DÉTAILS DU TRAJET",
      tripDetailsPlaceholder: "Votre nom, hôtel ou riad de départ, demandes particulières...",
      childSeatAdd: "+ Siège enfant",
      childSeatInc: "✓ Siège enfant inclus",
      payCash: "Espèces au chauffeur",
      payCard: "Carte par lien sécurisé",
      payNoteCash: "ⓘ Réglez votre chauffeur le jour même, en euros ou en dirhams.",
      payNoteCard: "ⓘ Nous vous enverrons un lien de paiement sécurisé via WhatsApp après confirmation.",
      trustReply: "Réponse en moins de 10 minutes",
      trustFlight: "Nous suivons votre vol en direct, les retards sont couverts et votre chauffeur vous attend aux arrivées avec une pancarte nominative — sans limite de temps ni frais d'attente.",
      bookNowBtn: "Réserver",
      bottomNote: "Règlement au chauffeur le jour même · Aucun prélèvement maintenant"
    },
    concierge: {
      triggerLabel: "Créer un voyage",
      modalTitle: "Conciergerie Roam",
      modalStatus: "Bureau Marrakech • En ligne",
      bubbleTag: "✨ Marhaba • Concierge Privé",
      welcomeTitle: "Bienvenue chez Roam Morocco",
      welcomeDesc: "Je suis votre conseiller voyage personnel 24/7. Comment souhaitez-vous commencer votre aventure ?",
      choice1Title: "Circuit Privé Sur Mesure au Maroc",
      choice1Desc: "Chauffeur 4x4 privé, bivouac de luxe au Sahara & itinéraire personnalisé",
      choice2Title: "Vols & Offres Mondiales de Voyage",
      choice2Desc: "Comparez les vols, riads de charme & forfaits eSIM instantanés",
      verifiedDesk: "Bureau Vérifié Roam Morocco",
      startOver: "Recommencer"
    },
    common: {
      viewDetails: "Voir les détails",
      bookViaWhatsApp: "Réserver sur WhatsApp",
      fromPrice: "À partir de",
      perVehicle: "par véhicule",
      luggage: "Bagages inclus"
    }
  },

  es: {
    nav: {
      ticker1Title: "EXPEDICIONES PRIVADAS 2026",
      ticker1Desc: "Viajes privados a medida por el Sahara y el Alto Atlas",
      ticker2Title: "RIADS DE LUJO Y CAMPAMENTOS EN EL DESIERTO",
      ticker2Desc: "Circuitos personalizados desde Marrakech, Fez y Casablanca",
      ticker3Title: "SIENTE EL REINO",
      ticker3Desc: "Chóferes privados, guías locales expertos y ritmo sin prisas",
      transfers: "Traslados",
      transfersKicker: "TRASLADOS PRIVADOS POPULARES",
      transfersSub: "Tarifas fijas puerta a puerta · Chófer con licencia · Equipaje incluido",
      viewAllTransfers: "⚡ Ver los más de 120 traslados privados en Marruecos y tarifas",
      tours: "Tours y Excursiones",
      toursKicker: "EXPEDICIONES Y CIRCUITOS PRIVADOS",
      toursSub: "100% Privado · 4x4 Prado o Van Mercedes dedicada · Sin prisas",
      viewAllTours: "✨ Ver catálogo completo de tours privados y excursiones",
      privateChauffeur: "Chófer Privado",
      destinations: "Destinos",
      chooseLang: "Elegir idioma",
      europeanTravelers: "VIAJEROS INTERNACIONALES",
      costCalculator: "Calculadora de viaje",
      travelDeals: "Ofertas de viaje",
      aboutUs: "Sobre nosotros",
      chatWhatsApp: "WhatsApp",
      tour1Title: "Tour Privado 3 Días al Desierto de Merzouga",
      tour1Meta: "Alto Atlas · Campamento de lujo Erg Chebbi · Paseo en camello",
      tour2Title: "Cena al Atardecer en el Desierto de Agafay",
      tour2Meta: "A 45m de la Medina · Carpa bereber a la luz de las velas y hoguera",
      tour3Title: "Excursión de un Día a Essaouira",
      tour3Meta: "Día completo · Murallas atlánticas · Pescado fresco y zocos",
      tour4Title: "Senderismo Valle de Ourika y Montañas del Atlas",
      tour4Meta: "Día completo · Cascadas · Almuerzo en casa bereber tradicional",
      tour5Title: "Tour Kasbah Aït Benhaddou y Ouarzazate",
      tour5Meta: "Día completo · Paso Tizi n'Tichka 2.260m · Kasbah UNESCO",
      tour6Title: "Gran Circuito a Medida de Varios Días",
      tour6Meta: "De 7 a 14 Días · Itinerario a medida y riads con encanto",
      routeMeta1: "2h 30m · Carretera R207 · Puerta a puerta",
      routeMeta2: "2h 45m · Autovía A1 · Puerta a puerta",
      routeMeta3: "2h 30m · Seguimiento de vuelo y cartel con tu nombre",
      routeMeta4: "20m · Asistencia con equipaje directa al riad",
      routeMeta5: "30m · Llegada directa a tu resort de lujo",
      routeMeta6: "3h 00m · Autovía directa costa atlántica"
    },
    footer: {
      tagline: "Sintamos Marruecos juntos",
      destinationsCol: "Destinos",
      travelSuiteCol: "Servicios de Viaje",
      connectCol: "Contacto",
      saharaDesert: "Desierto del Sahara",
      marrakech: "Marrakech",
      fes: "Fez",
      chefchaouen: "Chefchaouen",
      costEstimator: "Estimador de Costes",
      privateChauffeur: "Chófer Privado",
      customTours: "Tours a Medida",
      travelBlog: "Diario de Viaje",
      copyright: "© 2026 Roam Morocco Tours. Todos los derechos reservados.",
      terms: "Términos del Servicio",
      privacy: "Política de Privacidad",
      refund: "Política de Reembolso",
      travelPolicy: "Condiciones de Viaje"
    },
    wizard: {
      title: "Consulta tu precio al instante",
      subtitle: "Elige tu ruta y el tamaño de tu grupo · Sin compromiso",
      pickupLabel: "Lugar de recogida",
      pickupPlaceholder: "Selecciona el punto de recogida",
      groupAirports: "Aeropuertos",
      groupCities: "Ciudades y Centros",
      destLabel: "Destino",
      destPlaceholder: "Selecciona el destino",
      groupIntercity: "Aeropuertos y Rutas Interurbanas",
      groupMarrakech: "Zonas de Marrakech",
      groupDayTrips: "Excursiones de un Día",
      paxLabel: "¿CUÁNTOS PASAJEROS?",
      tabSedan: "sedán",
      tabVan: "van",
      tabMinibus: "minibús",
      tabQuote: "cotizar",
      unfilledReply: "⏱ Respondemos en menos de 10 minutos",
      unfilledPayLater: "• Sin cobros ahora — confirma por WhatsApp y paga después.",
      swapBtn: "Cambiar",
      roundTrip: "Ida y vuelta",
      roundTripDiscount: "-10% vuelta",
      forGroup: "para tu grupo · pago en efectivo al chófer",
      includedSummary: "Por vehículo — combustible, peajes y equipaje incluidos",
      pickupDateLabel: "FECHA DE RECOGIDA (OPCIONAL)",
      pickupTimeLabel: "HORA (OPCIONAL)",
      flightNumLabel: "NÚMERO DE VUELO (OPCIONAL)",
      flightPlaceholder: "ej: AT800, IB3340, VY7350",
      tripDetailsLabel: "DETALLES DEL VIAJE",
      tripDetailsPlaceholder: "Tu nombre, hotel o riad de recogida, peticiones especiales...",
      childSeatAdd: "+ Silla infantil",
      childSeatInc: "✓ Silla infantil incluida",
      payCash: "Efectivo al chófer",
      payCard: "Tarjeta vía enlace seguro",
      payNoteCash: "ⓘ Paga al conductor el mismo día, en euros o dirhams.",
      payNoteCard: "ⓘ Te enviaremos un enlace de pago seguro por WhatsApp tras la confirmación.",
      trustReply: "Respondemos en 10 minutos",
      trustFlight: "Rastreamos tu vuelo para cubrir cualquier retraso. Tu chófer te esperará en llegadas con un cartel con tu nombre — sin límite de tiempo ni suplementos de espera.",
      bookNowBtn: "Reservar Ahora",
      bottomNote: "Pago al chófer en el momento · Sin cargos inmediatos"
    },
    concierge: {
      triggerLabel: "Planear un viaje",
      modalTitle: "Conserje Roam",
      modalStatus: "Oficina Marrakech • En línea",
      bubbleTag: "✨ Marhaba • Asesoría Privada",
      welcomeTitle: "Bienvenido a Roam Morocco",
      welcomeDesc: "Soy tu asesor personal de viajes 24/7. ¿Cómo te gustaría comenzar tu viaje por Marruecos?",
      choice1Title: "Tour Privado a Medida por Marruecos",
      choice1Desc: "Chófer en 4x4 privado, glamping en el Sahara y ruta personalizada",
      choice2Title: "Vuelos y Ofertas Globales de Viaje",
      choice2Desc: "Compara vuelos, riads con encanto y tarjetas eSIM inmediatas",
      verifiedDesk: "Oficina Verificada Roam Morocco",
      startOver: "Reiniciar"
    },
    common: {
      viewDetails: "Ver Detalles",
      bookViaWhatsApp: "Reservar por WhatsApp",
      fromPrice: "Desde",
      perVehicle: "por vehículo",
      luggage: "Equipaje incluido"
    }
  },

  de: {
    nav: {
      ticker1Title: "PRIVATE EXPEDITIONEN 2026",
      ticker1Desc: "Maßgeschneiderte Privatreisen durch die Sahara und den Hohen Atlas",
      ticker2Title: "LUXUS-RIADS & WÜSTENCAMPS",
      ticker2Desc: "Individuelle Rundreisen ab Marrakesch, Fès und Casablanca",
      ticker3Title: "ERLEBEN SIE DAS KÖNIGREICH",
      ticker3Desc: "Private Chauffeure, erfahrene lokale Guides und entspanntes Reisetempo",
      transfers: "Transfers",
      transfersKicker: "BELIEBTE PRIVATE TRANSFERS",
      transfersSub: "Feste Tür-zu-Tür-Preise · Lizenzierter Chauffeur · Gepäck inklusive",
      viewAllTransfers: "⚡ Alle 120+ privaten Marokko-Transfers & Preise ansehen",
      tours: "Touren & Ausflüge",
      toursKicker: "PRIVATE EXPEDITIONEN & RUNDREISEN",
      toursSub: "100% Privat · Eigener Prado 4x4 oder Mercedes Van · Ohne Hektik",
      viewAllTours: "✨ Gesamten Katalog für private Touren & Tagesausflüge ansehen",
      privateChauffeur: "Privater Fahrer",
      destinations: "Reiseziele",
      chooseLang: "Sprache wählen",
      europeanTravelers: "INTERNATIONALE REISENDE",
      costCalculator: "Kostenrechner",
      travelDeals: "Reiseangebote",
      aboutUs: "Über uns",
      chatWhatsApp: "WhatsApp",
      tour1Title: "3-Tage Merzouga Sahara Wüstentour",
      tour1Meta: "Hoher Atlas · Erg Chebbi Luxuscamp · Kameltrekking",
      tour2Title: "Agafay Wüste Sonnenuntergang & Kamelritt",
      tour2Meta: "45 Min. von der Medina · Kerzenbeleuchtetes Berberzelt & Lagerfeuer",
      tour3Title: "Tagesausflug an die Atlantikküste nach Essaouira",
      tour3Meta: "Ganzer Tag · Atlantikfestung · Frische Meeresfrüchte & Souks",
      tour4Title: "Ourika-Tal & Hoher Atlas Wanderung",
      tour4Meta: "Ganzer Tag · Wasserfälle · Authentisches Berber-Mittagessen",
      tour5Title: "Aït Benhaddou & Ouarzazate Kasbah Tour",
      tour5Meta: "Ganzer Tag · Tizi n'Tichka-Pass 2.260m · UNESCO Kasbah",
      tour6Title: "Individuelle Mehrtägige Marokko-Rundreise",
      tour6Meta: "7 bis 14 Tage · Maßgeschneiderte Route & Boutique-Riads",
      routeMeta1: "2h 30m · Schnellstraße R207 · Direkt von Tür zu Tür",
      routeMeta2: "2h 45m · Autobahn A1 · Direkt von Tür zu Tür",
      routeMeta3: "2h 30m · Flugverfolgung & Abholung mit Namensschild",
      routeMeta4: "20m · Direkter Gepäckservice bis in Ihr Riad",
      routeMeta5: "30m · Transfer direkt zu Ihrem Luxusresort",
      routeMeta6: "3h 00m · Schnellstraße entlang der Atlantikküste"
    },
    footer: {
      tagline: "Lassen Sie uns Marokko gemeinsam erleben",
      destinationsCol: "Reiseziele",
      travelSuiteCol: "Reise-Services",
      connectCol: "Kontakt",
      saharaDesert: "Sahara-Wüste",
      marrakech: "Marrakesch",
      fes: "Fès",
      chefchaouen: "Chefchaouen",
      costEstimator: "Kostenrechner",
      privateChauffeur: "Privater Fahrer",
      customTours: "Maßgeschneiderte Touren",
      travelBlog: "Reise-Journal",
      copyright: "© 2026 Roam Morocco Tours. Alle Rechte vorbehalten.",
      terms: "Allgemeine Geschäftsbedingungen",
      privacy: "Datenschutzerklärung",
      refund: "Rückerstattungsrichtlinie",
      travelPolicy: "Reiserichtlinien"
    },
    wizard: {
      title: "Sofortigen Festpreis berechnen",
      subtitle: "Wählen Sie Route und Gruppengröße · Unverbindlich",
      pickupLabel: "Abholort",
      pickupPlaceholder: "Abholort auswählen",
      groupAirports: "Flughäfen",
      groupCities: "Städte & Zentren",
      destLabel: "Zielort",
      destPlaceholder: "Zielort auswählen",
      groupIntercity: "Flughäfen & Fernstrecken",
      groupMarrakech: "Stadtteile Marrakesch",
      groupDayTrips: "Tagesausflüge & Exkursionen",
      paxLabel: "WIE VIELE PERSONEN?",
      tabSedan: "Limousine",
      tabVan: "Van",
      tabMinibus: "Minibus",
      tabQuote: "Anfrage",
      unfilledReply: "⏱ Antwort innerhalb von 10 Minuten",
      unfilledPayLater: "• Keine Vorauszahlung — Bestätigung per WhatsApp, Barzahlung vor Ort.",
      swapBtn: "Tauschen",
      roundTrip: "Hin- & Rückfahrt",
      roundTripDiscount: "-10% Rückfahrt",
      forGroup: "für Ihre Gruppe · Barzahlung an den Fahrer",
      includedSummary: "Pro Fahrzeug — Treibstoff, Mautgebühren und Gepäck inklusive",
      pickupDateLabel: "ABHOLDATUM (OPTIONAL)",
      pickupTimeLabel: "UHRZEIT (OPTIONAL)",
      flightNumLabel: "FLUGNUMMER (OPTIONAL)",
      flightPlaceholder: "z.B. LH4370, EW9750, AT800",
      tripDetailsLabel: "REISE-DETAILS",
      tripDetailsPlaceholder: "Ihr Name, Hotel- oder Riad-Adresse, Sonderwünsche...",
      childSeatAdd: "+ Kindersitz",
      childSeatInc: "✓ Kindersitz inklusive",
      payCash: "Bar beim Fahrer",
      payCard: "Karte via gesicherten Link",
      payNoteCash: "ⓘ Bezahlen Sie den Fahrer am Reisetag in Euro oder Dirham.",
      payNoteCard: "ⓘ Nach Bestätigung senden wir Ihnen einen sicheren Zahlungslink per WhatsApp.",
      trustReply: "Antwort in unter 10 Minuten",
      trustFlight: "Wir verfolgen Ihren Flug live: Flugverspätungen sind abgesichert, Ihr Fahrer wartet mit Namensschild in der Ankunftshalle — ohne Zeitlimit und ohne Wartegebühren.",
      bookNowBtn: "Jetzt Buchen",
      bottomNote: "Zahlung am Reisetag beim Fahrer · Jetzt keine Belastung"
    },
    concierge: {
      triggerLabel: "Reise planen",
      modalTitle: "Roam Concierge",
      modalStatus: "Büro Marrakesch • Online",
      bubbleTag: "✨ Marhaba • Ihr Privater Concierge",
      welcomeTitle: "Willkommen bei Roam Morocco",
      welcomeDesc: "Ich bin Ihr persönlicher 24/7-Reiseberater. Wie möchten Sie Ihr Marokko-Abenteuer starten?",
      choice1Title: "Private Maßgeschneiderte Marokko-Tour",
      choice1Desc: "Eigener 4x4-Chauffeur, Luxus-Glamping in der Sahara & Wunschroute",
      choice2Title: "Flüge & Globale Reise-Deals",
      choice2Desc: "Flüge vergleichen, Boutique-Riads entdecken & sofortige eSIM",
      verifiedDesk: "Verifiziertes Roam Morocco Büro",
      startOver: "Neu starten"
    },
    common: {
      viewDetails: "Details ansehen",
      bookViaWhatsApp: "Per WhatsApp buchen",
      fromPrice: "Ab",
      perVehicle: "pro Fahrzeug",
      luggage: "Gepäck inklusive"
    }
  },

  it: {
    nav: {
      ticker1Title: "SPEDIZIONI PRIVATE 2026",
      ticker1Desc: "Viaggi privati su misura attraverso il Sahara e l'Alto Atlante",
      ticker2Title: "RIAD DI LUSSO & ACCAMPAMENTI NEL DESERTO",
      ticker2Desc: "Circuiti personalizzati con partenza da Marrakech, Fes e Casablanca",
      ticker3Title: "VIVI IL REGNO",
      ticker3Desc: "Autisti privati, guide locali esperte e ritmo rilassato",
      transfers: "Trasferimenti",
      transfersKicker: "TRASFERIMENTI PRIVATI POPOLARI",
      transfersSub: "Tariffe fisse porta a porta · Autista autorizzato · Bagagli inclusi",
      viewAllTransfers: "⚡ Visualizza oltre 120 trasferimenti privati in Marocco e tariffe",
      tours: "Tour ed Escursioni",
      toursKicker: "SPEDIZIONI E CIRCUITI PRIVATI",
      toursSub: "100% Privato · Fuoristrada 4x4 Prado o Van Mercedes dedicato · Senza fretta",
      viewAllTours: "✨ Visualizza l'intero catalogo di tour privati ed escursioni",
      privateChauffeur: "Autista Privato",
      destinations: "Destinazioni",
      chooseLang: "Scegli la lingua",
      europeanTravelers: "VIAGGIATORI INTERNAZIONALI",
      costCalculator: "Calcolatore costi",
      travelDeals: "Offerte di viaggio",
      aboutUs: "Chi siamo",
      chatWhatsApp: "WhatsApp",
      tour1Title: "Tour Privato 3 Giorni nel Deserto di Merzouga",
      tour1Meta: "Alto Atlante · Accampamento di lusso Erg Chebbi · Escursione in dromedario",
      tour2Title: "Cena al Tramonto nel Deserto di Agafay",
      tour2Meta: "A 45m dalla Medina · Tenda berbera a lume di candela e falò",
      tour3Title: "Escursione di un Giorno a Essaouira",
      tour3Meta: "Giornata intera · Bastioni sull'Atlantico · Pesce fresco e souk",
      tour4Title: "Trekking nella Valle dell'Ourika e Alto Atlante",
      tour4Meta: "Giornata intera · Cascate · Pranzo in famiglia berbera autentica",
      tour5Title: "Tour della Kasbah di Aït Benhaddou e Ouarzazate",
      tour5Meta: "Giornata intera · Passo Tizi n'Tichka 2.260m · Kasbah UNESCO",
      tour6Title: "Grande Spedizione su Misura di Più Giorni",
      tour6Meta: "Da 7 a 14 Giorni · Itinerario personalizzato e riad di charme",
      routeMeta1: "2h 30m · Strada R207 · Porta a porta",
      routeMeta2: "2h 45m · Autostrada A1 · Porta a porta",
      routeMeta3: "2h 30m · Monitoraggio del volo e cartello con nome",
      routeMeta4: "20m · Assistenza bagagli diretta al riad",
      routeMeta5: "30m · Consegna diretta al vostro resort di lusso",
      routeMeta6: "3h 00m · Autostrada panoramica costiera atlantica"
    },
    footer: {
      tagline: "Viviamo il Marocco insieme",
      destinationsCol: "Destinazioni",
      travelSuiteCol: "Servizi di Viaggio",
      connectCol: "Contatti",
      saharaDesert: "Deserto del Sahara",
      marrakech: "Marrakech",
      fes: "Fes",
      chefchaouen: "Chefchaouen",
      costEstimator: "Calcolatore Costi",
      privateChauffeur: "Autista Privato",
      customTours: "Tour su Misura",
      travelBlog: "Diario di Viaggio",
      copyright: "© 2026 Roam Morocco Tours. Tutti i diritti riservati.",
      terms: "Termini di Servizio",
      privacy: "Informativa sulla Privacy",
      refund: "Politica di Rimborso",
      travelPolicy: "Condizioni di Viaggio"
    },
    wizard: {
      title: "Calcola il tuo prezzo all'istante",
      subtitle: "Scegli il percorso e le dimensioni del gruppo · Senza impegno",
      pickupLabel: "Punto di partenza",
      pickupPlaceholder: "Seleziona il punto di partenza",
      groupAirports: "Aeroporti",
      groupCities: "Città e Centri",
      destLabel: "Destinazione",
      destPlaceholder: "Seleziona la destinazione",
      groupIntercity: "Aeroporti e Tratte Interurbane",
      groupMarrakech: "Zone di Marrakech",
      groupDayTrips: "Escursioni e Gite di un Giorno",
      paxLabel: "QUANTI PASSEGGERI?",
      tabSedan: "berlina",
      tabVan: "van",
      tabMinibus: "minibus",
      tabQuote: "preventivo",
      unfilledReply: "⏱ Rispondiamo entro 10 minuti",
      unfilledPayLater: "• Nessun addebito ora — conferma via WhatsApp, paga dopo.",
      swapBtn: "Inverti",
      roundTrip: "Andata e ritorno",
      roundTripDiscount: "-10% ritorno",
      forGroup: "per il tuo gruppo · pagamento in contanti all'autista",
      includedSummary: "Per veicolo — carburante, pedaggi e bagagli inclusi",
      pickupDateLabel: "DATA DI RITIRO (FACOLTATIVO)",
      pickupTimeLabel: "ORARIO (FACOLTATIVO)",
      flightNumLabel: "NUMERO DI VOLO (FACOLTATIVO)",
      flightPlaceholder: "es: AT800, AZ8750, FR4320",
      tripDetailsLabel: "DETTAGLI DEL VIAGGIO",
      tripDetailsPlaceholder: "Il tuo nome, hotel o riad di partenza, richieste particolari...",
      childSeatAdd: "+ Seggiolino",
      childSeatInc: "✓ Seggiolino incluso",
      payCash: "Contanti all'autista",
      payCard: "Carta con link sicuro",
      payNoteCash: "ⓘ Paga l'autista il giorno del servizio, in euro o dirham.",
      payNoteCard: "ⓘ Ti invieremo un link di pagamento sicuro su WhatsApp dopo la conferma.",
      trustReply: "Risposta in meno di 10 minuti",
      trustFlight: "Monitoriamo il tuo volo in tempo reale per coprire eventuali ritardi; il tuo autista ti aspetterà nell'area arrivi con un cartello a tuo nome — senza limiti di tempo né costi di attesa.",
      bookNowBtn: "Prenota Ora",
      bottomNote: "Pagamento all'autista il giorno del viaggio · Nessun addebito immediato"
    },
    concierge: {
      triggerLabel: "Pianifica un viaggio",
      modalTitle: "Concierge Roam",
      modalStatus: "Ufficio Marrakech • Online",
      bubbleTag: "✨ Marhaba • Concierge Privato",
      welcomeTitle: "Benvenuti a Roam Morocco",
      welcomeDesc: "Sono il tuo consulente di viaggio personale 24/7. Come desideri iniziare il tuo viaggio in Marocco?",
      choice1Title: "Tour Privato su Misura in Marocco",
      choice1Desc: "Autista in 4x4 privato, glamping nel Sahara e itinerario personalizzato",
      choice2Title: "Voli & Offerte di Viaggio Globali",
      choice2Desc: "Confronta voli, riad boutique e pacchetti eSIM immediati",
      verifiedDesk: "Ufficio Verificato Roam Morocco",
      startOver: "Ricomincia"
    },
    common: {
      viewDetails: "Visualizza Dettagli",
      bookViaWhatsApp: "Prenota su WhatsApp",
      fromPrice: "Da",
      perVehicle: "per veicolo",
      luggage: "Bagagli inclusi"
    }
  }
};

export function getTranslations(lang?: string): Translations {
  const code = (lang || 'en').toLowerCase() as Lang;
  return translations[code] || translations.en;
}
