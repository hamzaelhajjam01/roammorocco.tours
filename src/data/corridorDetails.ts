/**
 * Route Corridor Intelligence & Differentiation System
 * Generates unique, corridor-specific road terrain insights, medina/luggage logistics,
 * waypoint recommendations, and differentiated FAQs for Roam Morocco private transfers.
 */

import type { RouteItem } from './routes';

export interface ScenicStop {
  title: string;
  desc: string;
}

export interface MedinaLogistics {
  title: string;
  description: string;
  tips: string[];
}

export interface RouteCorridorDetails {
  corridorKey: 'airport' | 'high-atlas' | 'coastal' | 'imperial' | 'desert' | 'rif';
  badge: string;
  terrainKicker: string;
  terrainTitle: string;
  terrainOverview: string;
  scenicStops: ScenicStop[];
  medinaLogistics: MedinaLogistics;
  faqs: { q: string; a: string }[];
}

// Helper to determine corridor type
export function classifyRouteCorridor(from: string, to: string, highway: string): RouteCorridorDetails['corridorKey'] {
  const f = from.toLowerCase();
  const t = to.toLowerCase();
  const h = (highway || '').toLowerCase();

  // 1. Airport routes
  if (f.includes('airport') || t.includes('airport') || f.includes('(rak)') || t.includes('(rak)') || f.includes('(cmn)') || t.includes('(cmn)') || f.includes('(esu)') || t.includes('(esu)')) {
    return 'airport';
  }

  // 2. High Atlas / Mountain routes
  if (
    f.includes('imlil') || t.includes('imlil') ||
    f.includes('ourika') || t.includes('ourika') ||
    f.includes('ouaimeden') || t.includes('ouaimeden') ||
    f.includes('setti fatma') || t.includes('setti fatma') ||
    f.includes('ait ben haddou') || t.includes('ait ben haddou') ||
    f.includes('ouarzazate') || t.includes('ouarzazate') ||
    h.includes("tizi n'tichka") || h.includes('r203') || h.includes('atlas')
  ) {
    return 'high-atlas';
  }

  // 3. Chefchaouen / Rif routes
  if (f.includes('chefchaouen') || t.includes('chefchaouen') || h.includes('rif')) {
    return 'rif';
  }

  // 4. Desert / Agafay routes
  if (f.includes('agafay') || t.includes('agafay') || f.includes('palmeraie') || t.includes('palmeraie')) {
    return 'desert';
  }

  // 5. Coastal / Surf routes
  if (
    f.includes('essaouira') || t.includes('essaouira') ||
    f.includes('taghazout') || t.includes('taghazout') ||
    f.includes('imsouane') || t.includes('imsouane') ||
    f.includes('sidi kaouki') || t.includes('sidi kaouki') ||
    f.includes('oualidia') || t.includes('oualidia') ||
    f.includes('moulay bouzerktoune') || t.includes('moulay bouzerktoune') ||
    (f.includes('agadir') && !t.includes('casablanca') && !t.includes('rabat')) ||
    (t.includes('agadir') && !f.includes('casablanca') && !f.includes('rabat')) ||
    h.includes('r207') || h.includes('coastal')
  ) {
    return 'coastal';
  }

  // 6. Imperial / Autoroute tollways (Casablanca, Rabat, Fes, Tangier, Marrakech)
  return 'imperial';
}

export function getRouteCorridorDetails(route: RouteItem): RouteCorridorDetails {
  const corridorKey = classifyRouteCorridor(route.from, route.to, route.highway);

  switch (corridorKey) {
    case 'airport':
      return {
        corridorKey: 'airport',
        badge: 'VIP AIRPORT MEET & GREET · FLIGHT RADAR MONITORED',
        terrainKicker: 'TERMINAL TO RIAD PROTOCOL',
        terrainTitle: `Airport Terminal to Doorstep Logistics on the ${route.from} → ${route.to} Corridor`,
        terrainOverview: `Navigating an arrival or departure between ${route.from} and ${route.to} requires zero guesswork with Roam Morocco. Your licensed English-speaking chauffeur tracks your incoming flight in real time using live aviation radar, automatically adjusting your meet time for any early touchdown or air traffic delay. After collecting your luggage and clearing customs, you will find your driver waiting directly at the terminal arrivals exit holding a professional board with your name. You bypass aggressive curbside taxi touts, stepping straight into a sanitized, dual-zone air-conditioned vehicle waiting in reserved tourist parking.`,
        scenicStops: [
          {
            title: 'Flight Tracking & Free 60-Min Customs Buffer',
            desc: 'We include 60 minutes of complimentary waiting time after physical touchdown, providing ample time for customs stamps, baggage carousel delays, and buying local SIM cards.'
          },
          {
            title: 'Luggage Cart & Gate Transfer',
            desc: 'For accommodations inside pedestrian medinas, your chauffeur escorts you to the nearest vehicle gate and coordinates a trusted riad porter with a luggage cart ("chariot").'
          },
          {
            title: 'Direct Expressway Transit',
            desc: 'Smooth transit along dedicated airport parkways and express avenues, avoiding urban traffic bottlenecks for punctual arrival.'
          }
        ],
        medinaLogistics: {
          title: `Doorstep Drop-off & Medina Access in ${route.to}`,
          description: `If your accommodation in ${route.to} is located within a historic pedestrian medina, motor vehicles cannot drive directly to the doorway. Our chauffeur drives to the closest legal vehicle gate, calls your riad reception in advance, and arranges a licensed local porter with a wooden cart to roll your luggage safely to your room. For modern hotels or coastal villas, direct curb-to-lobby service is provided.`,
          tips: [
            'Chauffeur monitors flight radar; no delay surcharges for delayed flights',
            'Driver meets you right past the baggage carousel with your name sign',
            'Full assistance lifting suitcases into spacious cargo holds',
            'Direct coordination with your riad host before you arrive at the gate'
          ]
        },
        faqs: [
          {
            q: `How much does a private transfer from ${route.from} to ${route.to} cost?`,
            a: `A private transfer from ${route.from} to ${route.to} starts at €${route.price_sedan} for a private comfort sedan (1–4 passengers) and €${route.price_van} for an executive Mercedes-Benz minivan (5–7 passengers). All prices are flat, transparent, and per vehicle, covering fuel, tolls, terminal parking, and meet-and-greet.`
          },
          {
            q: `What happens if my inbound flight into ${route.from} is delayed or lands early?`,
            a: `We monitor your exact flight number via live flight radar. If your flight is delayed or arrives ahead of schedule, your chauffeur automatically adjusts pickup time. Your complimentary 60-minute wait window begins only once your aircraft physically docks, so you will never incur late penalties.`
          },
          {
            q: `Where will our private driver meet us at ${route.from}?`,
            a: `Your chauffeur will be waiting inside the airport terminal immediately outside the customs and baggage claim exit hall, holding a professional sign with your name. We also send you your driver's WhatsApp contact and vehicle license plate 12 hours prior to arrival.`
          },
          {
            q: `Can the vehicle drive all the way to our riad in ${route.to}?`,
            a: `Morocco's historic medinas are pedestrian-only zones. Your driver parks at the closest historic gate to your riad (such as Bab Doukkala or Bab Laksour in Marrakech, or Bab Bou Jeloud in Fes), contacts your host, and coordinates a local luggage cart handler to guide you directly to reception.`
          },
          {
            q: `Are child safety car seats and bottled water included?`,
            a: `Yes! We provide certified ISOFIX infant and toddler booster seats free of charge upon request. Every transfer vehicle also includes complimentary chilled bottled mineral water and mobile device charging ports.`
          }
        ]
      };

    case 'high-atlas':
      return {
        corridorKey: 'high-atlas',
        badge: 'HIGH ATLAS ALPINE CORRIDOR · LICENSED MOUNTAIN CHAUFFEUR',
        terrainKicker: 'MOUNTAIN PASS & ELEVATION PROFILE',
        terrainTitle: `High Atlas Mountain Driving & Route Safety: ${route.from} to ${route.to}`,
        terrainOverview: `The route between ${route.from} and ${route.to} traverses the dramatic High Atlas range via ${route.highway}. Climbing past terraced walnut groves and red mudbrick Berber villages, the highway ascends through engineered mountain passes—such as the iconic Tizi n'Tichka pass reaching 2,260 meters in altitude. Recent multi-year civil works have widened the trans-Atlas corridor into a modern, heavy-duty asphalt highway with reinforced steel guardrails and paved overtaking lanes. Our alpine-trained chauffeurs practice gentle, measured driving dynamics, avoiding sharp braking or aggressive cornering to ensure passengers susceptible to motion sickness travel in absolute calm.`,
        scenicStops: [
          {
            title: 'Tizi n’Tichka Summit Panorama (2,260m)',
            desc: 'Pause at the pass summit for crisp mountain air and sweeping panoramic photographs of the snow-kissed High Atlas peaks and serpentine valleys below.'
          },
          {
            title: 'Authentic Berber Village Cafes',
            desc: 'Enjoy freshly brewed Moroccan mint tea, roasted mountain walnuts, and fresh orange juice at scenic cliffside rest points overlooking ancient kasbahs.'
          },
          {
            title: 'Optional Telouet Kasbah Detour',
            desc: 'For routes crossing the Atlas toward Ouarzazate, our private chauffeur can include a detour to the historic Glaoui Palace in Telouet along the Ounila Valley.'
          }
        ],
        medinaLogistics: {
          title: `Mountain Lodge & Village Arrival Logistics in ${route.to}`,
          description: `Arriving in mountain destinations like Imlil, Ourika, or ancient ksour like Ait Ben Haddou involves varied terrain. Your chauffeur navigates directly to your lodge or kasbah driveway. For properties perched along pedestrian mountain footpaths (such as Kasbah du Toubkal), our chauffeur assists in coordinating with local lodge porters or mule transfers to deliver your luggage safely up to your room.`,
          tips: [
            'Experienced alpine chauffeurs with specialized mountain driving licenses',
            'Paced, smooth driving to prevent travel fatigue and motion sickness',
            'Dual-zone climate control with powerful heating in winter and AC in summer',
            'Flexibility to stop at any scenic mountain overlook for photography'
          ]
        },
        faqs: [
          {
            q: `How much does a private transfer from ${route.from} to ${route.to} cost?`,
            a: `A private transfer from ${route.from} to ${route.to} starts at €${route.price_sedan} for a private comfort sedan (1–4 passengers) and €${route.price_van} for an executive Mercedes-Benz minivan (5–7 passengers). All prices are flat, transparent, and per vehicle, covering all fuel, highway tolls, and mountain parking.`
          },
          {
            q: `Is the road between ${route.from} and ${route.to} safe and prone to motion sickness?`,
            a: `The mountain corridor (${route.highway}) is fully paved and widened with protective barriers. Our chauffeurs are trained in smooth alpine pacing, taking gentle lines through curves to prevent motion sickness. You can request a scenic pause for fresh mountain air whenever you wish.`
          },
          {
            q: `Can we stop along the High Atlas for photos or lunch?`,
            a: `Yes! Because this is a 100% private chauffeur service, you dictate the schedule. Your driver knows the most spectacular scenic lookouts over Berber valleys, clean mountain cafes for fresh mint tea, and authentic roadside restaurants.`
          },
          {
            q: `What happens if there is snow on the mountain pass during winter?`,
            a: `Our operations team monitors road bulletins from Morocco's Ministry of Equipment and Transport daily. Our vehicles feature high-traction tires and experienced mountain drivers. If winter conditions require snow plows, we adjust departure timing to ensure effortless, safe passage.`
          },
          {
            q: `How do we book and pay for this mountain transfer?`,
            a: `You can reserve instantly on WhatsApp with zero deposit or prepayment required. Pay cash (Euros or Moroccan Dirhams) directly to your chauffeur upon arrival at your destination.`
          }
        ]
      };

    case 'coastal':
      return {
        corridorKey: 'coastal',
        badge: 'ATLANTIC COASTAL EXPRESS · SURF & EXPEDITION READY',
        terrainKicker: 'ARGAN BIOSPHERE & ATLANTIC HIGHWAYS',
        terrainTitle: `Atlantic Ocean Corridor Experience: ${route.from} to ${route.to}`,
        terrainOverview: `Traveling between ${route.from} and ${route.to} follows ${route.highway}, crossing the UNESCO-protected Arganeraie Biosphere Reserve and the scenic Atlantic coastal plain. The route features smooth, well-maintained asphalt traversing open semi-arid plateaus dotted with endemic argan trees before descending toward coastal ocean bluffs. As you approach the Atlantic, the dry inland heat gives way to refreshing maritime breezes. Our spacious fleet of comfort vans and 4WD vehicles is tailored for coastal travelers, with deep luggage holds capable of accommodating surfboards (up to 9'2"), kiteboards, golf bags, and family luggage without cramming passenger cabin space.`,
        scenicStops: [
          {
            title: 'Chichaoua Highway Oasis Rest Stop',
            desc: 'The classic halfway oasis on the Marrakech-Essaouira route, offering spotless restrooms, fresh espresso, freshly squeezed orange juice, and shaded cafe seating.'
          },
          {
            title: 'Certified Women’s Argan Oil Cooperative',
            desc: 'An authentic cultural stop where Berber women press culinary and cosmetic argan oil by hand using traditional millstones. Free from commercial tourist markups.'
          },
          {
            title: 'Panoramic Ocean Surf Break Lookouts',
            desc: 'For routes connecting Agadir, Taghazout, and Imsouane, enjoy elevated cliffside viewpoints overlooking legendary Atlantic point breaks and fishing coves.'
          }
        ],
        medinaLogistics: {
          title: `Medina Gates & Beachfront Arrival Logistics in ${route.to}`,
          description: `In seaside medinas like Essaouira, the historic fortified ramparts are completely closed to automobile traffic. Your chauffeur parks at the official gateway (Bab Marrakech or Bab Doukkala), contacts your riad, and arranges a registered municipal baggage handler with a traditional blue wooden cart to transport your bags safely. In surf towns like Taghazout, Imsouane, or Sidi Kaouki, our vehicles pull right up to your beachfront hotel or surf lodge doorway.`,
          tips: [
            'Oversized cargo holds for surfboard bags, kite gear, and sports equipment',
            'Chauffeurs familiar with surf break access and tide-sensitive arrival schedules',
            'Complimentary bottled water and phone charging throughout the drive',
            'Full door-to-door coordination with seaside riads and cliffside retreats'
          ]
        },
        faqs: [
          {
            q: `How much does a private transfer from ${route.from} to ${route.to} cost?`,
            a: `A private transfer from ${route.from} to ${route.to} starts at €${route.price_sedan} for a private comfort sedan (1–4 passengers) and €${route.price_van} for an executive Mercedes-Benz minivan (5–7 passengers). All prices are flat, transparent, and per vehicle, covering all fuel, highway tolls, and luggage.`
          },
          {
            q: `Can you transport surfboards, kite bags, or oversized luggage to ${route.to}?`,
            a: `Yes! Our comfort vans and 4WD vehicles easily accommodate surfboard travel bags up to 9ft, kite gear, golf clubs, and bulky sports equipment at no additional surcharge. Simply inform us of your board lengths when confirming on WhatsApp.`
          },
          {
            q: `Can we visit a certified women's argan cooperative along the route?`,
            a: `Yes. Your driver can pause at an authentic, government-certified Berber women's argan cooperative where you can watch traditional cold-pressed argan oil production and purchase culinary Amlou or cosmetic oil directly from the makers.`
          },
          {
            q: `How does luggage drop-off work if our stay is in the pedestrian medina of ${route.to}?`,
            a: `Motor vehicles cannot enter historical ramparts like Essaouira's medina. Your driver parks at the primary accessible gate (Bab Marrakech or Bab Doukkala), contacts your riad, and coordinates a licensed cart handler to guide you directly to your accommodation.`
          },
          {
            q: `How long is the drive and can we make spontaneous coffee or photo stops?`,
            a: `The drive covers approximately ${route.distance} and takes about ${route.duration}. Because your transfer is entirely private, you can pause whenever you like for fresh coffee, restroom breaks, or coastal photography.`
          }
        ]
      };

    case 'imperial':
      return {
        corridorKey: 'imperial',
        badge: 'AUTOROUTE DU MAROC VIP CHAUFFEUR · DOOR-TO-DOOR REPLACES TRAIN',
        terrainKicker: 'DIVIDED HIGH-SPEED EXPRESSWAY NETWORK',
        terrainTitle: `Fast-Track Intercity Expressway: ${route.from} to ${route.to}`,
        terrainOverview: `Connecting ${route.from} and ${route.to} follows Morocco’s modern divided tollway infrastructure (${route.highway}). Operated by Société Nationale des Autoroutes du Maroc (ADM), these multi-lane highways feature regulated 120 km/h cruising, automated Jawaz electronic toll lanes for zero queueing, overhead illumination at junctions, and emergency roadside patrols. Traveling by private chauffeur completely eliminates the friction of train travel—no lugging heavy suitcases through crowded railway stations, no rigid departure timetables, no unassigned train seats, and no negotiating with street taxis at your arrival city. You enjoy seamless point-to-point luxury from your riad doorstep straight to your destination hotel.`,
        scenicStops: [
          {
            title: 'Modern Highway Service Plazas (Afriquia / Total / Shell)',
            desc: 'Spotless air-conditioned rest stations every 40 to 50 km featuring clean restrooms, Starbucks/Illy espresso bars, fresh pastry bakeries, and convenience stores.'
          },
          {
            title: 'Settat & Chaouia Agricultural Plains',
            desc: 'Rolling fertile wheat fields and pastoral Moroccan countryside flanking the A7 corridor between Casablanca and Marrakech.'
          },
          {
            title: 'Optional Cultural Detours (Meknes / Volubilis)',
            desc: 'For routes passing through central Morocco toward Fes or Rabat, customize your private transfer to include a 1-2 hour pause at the Roman ruins of Volubilis or Bab Mansour in Meknes.'
          }
        ],
        medinaLogistics: {
          title: `Door-to-Door Riad & Hotel Logistics in ${route.to}`,
          description: `Arriving in major imperial cities like Fes, Marrakech, or Rabat requires distinct logistics. In modern metropolitan districts, your chauffeur delivers you directly to the hotel lobby or residence curb. In ancient walled cities like Fes el-Bali (the largest car-free urban zone on Earth), your driver parks at the primary pedestrian gateway (such as Bab Bou Jeloud or Bab Rcif), contacts your riad host, and arranges an official luggage porter so you never navigate confusing alleys with heavy luggage alone.`,
          tips: [
            'Automated electronic toll tags (Jawaz) for non-stop express highway travel',
            'Full luggage handling at your riad doorstep, hotel lobby, or villa curb',
            'Bottled mineral water, device charging cables, and high-speed onboard AC',
            'Far more comfortable, private, and flexible than public train schedules'
          ]
        },
        faqs: [
          {
            q: `How much does a private transfer from ${route.from} to ${route.to} cost?`,
            a: `A private transfer from ${route.from} to ${route.to} starts at €${route.price_sedan} for a private comfort sedan (1–4 passengers) and €${route.price_van} for an executive Mercedes-Benz minivan (5–7 passengers). All prices are flat, transparent, and per vehicle, covering all highway toll tickets, fuel, and luggage service.`
          },
          {
            q: `Why choose a private chauffeur between ${route.from} and ${route.to} over the ONCF train?`,
            a: `While Morocco has good trains, they require carrying luggage to the station 45 minutes early, walking through crowded concourses, and haggling with local petit taxis at both ends. Our private transfer picks you up directly at your riad door, carries your luggage, stops whenever you want for coffee, and delivers you straight to your destination on your own schedule.`
          },
          {
            q: `What are the highway conditions and rest stops like along ${route.highway}?`,
            a: `The expressway (${route.highway}) is a divided multi-lane tollway with a 120 km/h speed limit. Modern service stations (Afriquia Oasis, TotalEnergies, Shell) are located every 40-50 km, offering spotless restrooms, gourmet espresso, and fresh food.`
          },
          {
            q: `Can we customize the trip with sightseeing stops along the way?`,
            a: `Yes! Because this is a private vehicle dedicated exclusively to your group, we can incorporate cultural detours—such as visiting the Roman ruins of Volubilis, the imperial monuments of Meknes, or coastal lagoons. Simply let us know your preferences on WhatsApp.`
          },
          {
            q: `How do I book and pay for this intercity transfer?`,
            a: `You can reserve instantly via WhatsApp with zero prepayment required. Your booking is confirmed immediately, and payment is made in cash (Euros or Moroccan Dirhams) directly to your driver at the end of the trip.`
          }
        ]
      };

    case 'desert':
      return {
        corridorKey: 'desert',
        badge: 'DESERT EXPEDITION CHAUFFEUR · UNPAVED PISTE & CAMP EXPERT',
        terrainKicker: 'LUNAR STONE DUNES & DESERT TRACK NAVIGATION',
        terrainTitle: `Desert Piste Navigation & Luxury Camp Access: ${route.from} to ${route.to}`,
        terrainOverview: `Departing the vibrant avenues of Marrakech toward ${route.to} takes you into the arid moonscape of the Agafay stone desert or the historic palm oasis of the Palmeraie. Traveling along ${route.highway}, asphalt roads transition into unpaved desert tracks ("pistes"). Navigating to secluded luxury camps (such as Inara Camp, Scarabeo, Caravan by Habitas, The White Camel, or Oxygen Lodge) requires an experienced driver who knows exact GPS landmarks, dry riverbed crossings, and seasonal track conditions. Our vehicles feature high-clearance suspension to glide over rocky desert tracks, alongside sealed luggage compartments that keep your bags completely protected from fine desert dust.`,
        scenicStops: [
          {
            title: 'Panoramic Desert Ridge Photo Stops',
            desc: 'Elevated stone ridges where you can photograph the surreal white-clay dunes of Agafay with the snow-capped High Atlas peaks towering in the background.'
          },
          {
            title: 'Golden Hour & Sunset Timing',
            desc: 'We coordinate departure times so you arrive at your desert camp just as the golden hour illuminates the dunes and lantern pathways are lit.'
          },
          {
            title: 'Traditional Berber Mint Tea Welcome',
            desc: 'Arrive relaxed and refreshed directly at your luxury camp reception lounge, greeted by camp hosts with fresh mint tea and local dates.'
          }
        ],
        medinaLogistics: {
          title: `Direct Tent Arrival & Camp Coordination in ${route.to}`,
          description: `Finding remote desert camps without local guidance can be stressful. Your Roam Morocco chauffeur communicates directly with camp managers prior to departure, confirming your tent reservation and arrival window. Our vehicles drive directly into the camp reception parking, where camp porters transfer your bags straight to your private canvas suite.`,
          tips: [
            'Chauffeurs experienced with off-road desert tracks and camp navigation',
            'High-clearance comfort vans and 4WD vehicles for smooth travel',
            'Sealed luggage compartments preventing desert dust infiltration',
            'Easy coordination for return pickups back to Marrakech or airport departures'
          ]
        },
        faqs: [
          {
            q: `How much does a private transfer from ${route.from} to ${route.to} cost?`,
            a: `A private transfer from ${route.from} to ${route.to} starts at €${route.price_sedan} for a private comfort sedan (1–4 passengers) and €${route.price_van} for an executive Mercedes-Benz minivan (5–7 passengers). All prices are flat, transparent, and per vehicle, covering all fuel and desert piste access.`
          },
          {
            q: `Can standard vehicles access luxury desert camps in Agafay or do we need a 4x4?`,
            a: `Most luxury camps in Agafay are located 5 to 15 minutes down unpaved stone tracks. While standard low-clearance city cars struggle, our entire fleet—including our comfort vans and 4WD vehicles—features high ground clearance and chauffeurs who know every camp track intimately.`
          },
          {
            q: `What time should we depart to experience sunset at our Agafay camp?`,
            a: `We recommend departing Marrakech approximately 90 minutes before scheduled sunset. This allows a relaxed 45-minute drive, smooth check-in at your tented retreat, and a welcome glass of Moroccan mint tea right as the sun dips behind the Atlas horizon.`
          },
          {
            q: `Can you arrange our return transfer back from the desert camp?`,
            a: `Yes! We provide seamless round-trip transfers. Your chauffeur can return to your camp at your designated checkout time or morning departure hour to transfer you directly to your Marrakech riad or airport flight.`
          },
          {
            q: `How do I book and pay for this desert transfer?`,
            a: `You can reserve instantly on WhatsApp with zero prepayment required. Your driver is locked in immediately, and you pay cash (Euros or Moroccan Dirhams) directly to your chauffeur upon arrival at your camp.`
          }
        ]
      };

    case 'rif':
      return {
        corridorKey: 'rif',
        badge: 'RIF MOUNTAIN PASS EXPRESS · BLUE CITY PEDESTRIAN ACCESS',
        terrainKicker: 'RIF MOUNTAIN RIDGES & HISTORIC GATEWAYS',
        terrainTitle: `Rif Mountain Road & Blue City Logistics: ${route.from} to ${route.to}`,
        terrainOverview: `The route between ${route.from} and ${route.to} winds through the green, fertile limestone ridges of the Rif mountain chain along ${route.highway}. The landscape shifts between olive orchards, river gorges, pine-covered mountain flanks, and turquoise dam reservoirs (such as Barrage Sidi Chahed). The road is fully paved with sweeping switchbacks and scenic valley vistas. Our experienced mountain chauffeurs maintain a calm, steady rhythm through mountain turns, prioritizing comfort and passenger relaxation throughout the journey.`,
        scenicStops: [
          {
            title: 'Sidi Chahed Dam Panorama',
            desc: 'A gorgeous emerald lake overlook between Fes and Chefchaouen, perfect for stretching your legs, drinking fresh coffee, and capturing panoramic photos.'
          },
          {
            title: 'Ouezzane Olive Foothills',
            desc: 'Scenic hillside villages famous for traditional Moroccan olive oil, wild mountain honey, and artisan wool weaving.'
          },
          {
            title: 'Chefchaouen Valley Viewpoint',
            desc: 'The iconic high mountain viewpoint where Chefchaouen first comes into view, its blue-washed houses glowing like a sapphire against the limestone peaks.'
          }
        ],
        medinaLogistics: {
          title: `Pedestrian Gate & Blue Medina Arrival in ${route.to}`,
          description: `Chefchaouen is built upon steep mountain slopes with narrow cobbled stairs that no motor vehicle can enter. Your chauffeur drives directly to the primary pedestrian gate (Bab El Ain or Bab Souk), assists with your luggage from the vehicle trunk, and coordinates with your guesthouse host or a local porter to guide you smoothly to your blue-washed door.`,
          tips: [
            'Experienced drivers adept at Rif mountain roads and curve pacing',
            'Direct drop-off at primary pedestrian gates (Bab El Ain or Bab Souk)',
            'Chilled bottled mineral water and charging ports in every vehicle',
            'Full luggage assistance directly from vehicle to local guesthouse porter'
          ]
        },
        faqs: [
          {
            q: `How much does a private transfer from ${route.from} to ${route.to} cost?`,
            a: `A private transfer from ${route.from} to ${route.to} starts at €${route.price_sedan} for a private comfort sedan (1–4 passengers) and €${route.price_van} for an executive Mercedes-Benz minivan (5–7 passengers). All prices are flat, transparent, and per vehicle, covering all fuel, tolls, and parking.`
          },
          {
            q: `Where does the driver drop us off in Chefchaouen?`,
            a: `Because Chefchaouen’s blue medina consists of steep cobbled stairs where cars cannot enter, your driver will drop you off at the primary entrance gate (Bab El Ain or Bab Souk). Your driver will assist with luggage and help contact your guesthouse host directly.`
          },
          {
            q: `Is the drive through the Rif mountains scenic and comfortable?`,
            a: `Yes, the drive winds through the Rif mountain range with spectacular vistas of olive groves, limestone peaks, and serene dam reservoirs. Our chauffeurs take the mountain curves gently to ensure passenger comfort, with plenty of opportunities to pause for photos.`
          },
          {
            q: `Can we stop for photos or coffee along the route?`,
            a: `Yes! Because this is a private journey, you can stop whenever you like. Popular stops include panoramic cafes overlooking Lake Sidi Chahed or roadside cooperative stands in the olive-growing regions.`
          },
          {
            q: `How do I book and pay for this transfer?`,
            a: `You can reserve instantly on WhatsApp with zero prepayment required. Your driver is locked in immediately, and payment is made in cash (Euros or Moroccan Dirhams) directly to your chauffeur upon arrival.`
          }
        ]
      };
  }
}
