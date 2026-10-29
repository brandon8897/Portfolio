// =========================================================
//  Projectgegevens voor de projectpagina's
//  ---------------------------------------------------------
//  Elk project hoort bij een kaart (data-project="...").
//  Per project:
//    kop      pakkende titel boven het verhaal
//    title    naam van het product zelf
//    verhaal  het verhaal, één alinea per regel in de lijst.
//             Samen beschrijven de alinea's het doel, het concept en
//             de aanpak, het onderzoek en het gekozen mediakanaal.
//    bronnen  bronnen en materiaal van derden (onder het verhaal)
//
//  Tekst die begint met "TODO:" is nog lorem ipsum en verschijnt op de
//  site in rood met het label "Nog invullen". De regel "// Invullen: ..."
//  erboven zegt wat je daar moet schrijven. Vervang dan de hele tekst,
//  inclusief "TODO:", door je eigen tekst.
//
//  media.kind: "image" | "video" | "audio" | "embed" | "link"
//    - image/video/audio: zet het bestand in assets/ en vul src in
//    - embed: een YouTube/Spotify-insluitlink in src
//    Laat src leeg ("") om een placeholder te tonen.
//  media.alt: beschrijving van een afbeelding (voor schermlezers)
//  media.poster: stilstaand beeld dat een video toont voor het afspelen
//  media.download + downloadLabel: optionele extra link, bijv. naar een PDF
// =========================================================

const PROJECTS = {
  // ---------- Module: Media Maker ----------
  "mm-poster": {
    kop: "Zes uur per dag in mijn broekzak",
    title: "Mijn digitale dagboek",
    module: "Media Maker",
    year: "2026",
    verhaal: [
      "Hoeveel tijd besteed ik eigenlijk aan media? Voor Media Maker kreeg ik de opdracht om mijn eigen mediagebruik te laten zien in de vorm van een poster. Ik maakte er een infographic van voor medestudenten: hoe ziet het dagelijkse mediagebruik van een student eruit?",
      "Het antwoord was best confronterend. Gemiddeld zit ik zes uur per dag op mijn telefoon en vier uur op mijn laptop. Spotify neemt daarvan de helft voor zijn rekening, YouTube en TikTok elk twee uur, en Snapchat een uur.",
      "Ik bouwde de poster op in drie lagen: eerst mijn schermtijd per apparaat, daarna per app en wat die media met mij doen, en tot slot per kanaal de mediavorm, het format en waarom ik het gebruik. Elk kanaal kreeg zijn eigen merkkleur, zodat je het in één oogopslag terugvindt.",
      // Invullen: Vertel hoe je aan je cijfers kwam (bijv. de schermtijd op je telefoon een week bijhouden) en wat je na feedback hebt veranderd.
      "TODO: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      // Invullen: Vertel waar de poster zou verschijnen en in welk formaat, bijv. geprint op A3 of als Instagram-post.
      "TODO: Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    ],
    media: {
      kind: "image",
      src: "assets/projecten_stuff/infographic_762963.png",
      alt: "Infographic Mijn digitale dagboek: schermtijd per apparaat en per app, en waarom ik Spotify, YouTube, Snapchat en TikTok gebruik",
      download: "assets/projecten_stuff/infographic_762963.pdf",
      downloadLabel: "Open de poster als PDF",
      caption: "Infographic, 1 pagina.",
    },
    bronnen: [
      "Logo's van Spotify, YouTube, Snapchat en TikTok zijn eigendom van die merken",
      // Invullen: Bron van de overige iconen en het lettertype
      "TODO: Lorem ipsum dolor sit amet, consectetur adipiscing",
      // Invullen: Programma waarin je de poster maakte (bijv. Illustrator)
      "TODO: Lorem ipsum dolor sit amet, consectetur adipiscing",
    ],
  },

  "mm-video": {
    kop: "Wat zit er in een naam?",
    title: "Het Bjorn Lagendijk Interview",
    module: "Media Maker",
    year: "2026",
    verhaal: [
      "Achter elke bedrijfsnaam zit een verhaal. Voor deze opdracht interviewde ik Bjorn Lagendijk, oud-student van Inholland. Hij vertelt over zijn bedrijf: waar de naam voor staat en wat er allemaal gaat veranderen.",
      // Invullen: Vertel hoe je het interview hebt opgezet: de vragen, de locatie, de camerastandpunten en hoe je het hebt gemonteerd.
      "TODO: Curabitur pretium tincidunt lacus, nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris.",
      // Invullen: Vertel hoe je je hebt voorbereid (achtergrond van Bjorn, voorbeeldinterviews) en wat je daardoor anders deed.
      "TODO: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      "Het interview duurt tweeënhalve minuut en is gefilmd in Full HD (1920×1080).",
      // Invullen: Vertel op welk platform je het zou publiceren en waarom.
      "TODO: Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    ],
    media: {
      kind: "video",
      src: "assets/projecten_stuff/interview_bjorn_web.mp4",
      poster: "assets/projecten_stuff/interview_bjorn_poster.jpg",
      caption: "Interview, 2 min 30 s.",
    },
    bronnen: [
      "Geïnterviewde: Bjorn Lagendijk, oud-student Inholland (met toestemming)",
      // Invullen: Muziek of beeldmateriaal van derden, met bron en licentie
      "TODO: Lorem ipsum dolor sit amet, consectetur adipiscing",
      // Invullen: Programma's voor opname en montage (bijv. Premiere Pro)
      "TODO: Lorem ipsum dolor sit amet, consectetur adipiscing",
    ],
  },

  "mm-podcast": {
    kop: "Wie ben ik als je me alleen kunt horen?",
    title: "Audio-zelfportret",
    module: "Media Maker",
    year: "2026",
    verhaal: [
      "Hoe laat je zien wie je bent als niemand je kan zien? Dat was de vraag achter deze opdracht: een zelfportret, alleen in geluid. Het werd een portret van 59 seconden.",
      // Invullen: Vertel hoe je jezelf liet horen (stem, muziek, geluiden) en hoe je het hebt opgebouwd en gemixt.
      "TODO: Curabitur pretium tincidunt lacus, nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris.",
      // Invullen: Vertel welke voorbeelden je hebt beluisterd en wat je daarvan meenam.
      "TODO: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      // Invullen: Vertel op welk platform je het zou publiceren, bijv. Spotify of SoundCloud.
      "TODO: Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    ],
    media: {
      kind: "audio",
      src: "assets/projecten_stuff/Podcast_Zelfportret_762963.mp3",
      caption: "Audio-zelfportret, 59 s.",
    },
    bronnen: [
      // Invullen: Muziek, samples of geluidseffecten van derden, met bron en licentie
      "TODO: Lorem ipsum dolor sit amet, consectetur adipiscing",
      // Invullen: Programma's voor opname en mix (bijv. Audition of FL Studio)
      "TODO: Lorem ipsum dolor sit amet, consectetur adipiscing",
    ],
  },
};
