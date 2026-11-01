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
      "Mijn cijfers haalde ik uit de schermtijd-overzichten van mijn telefoon en laptop. Die heb ik een week lang bijgehouden en daarna per apparaat en per app gemiddeld. De eerste versie stond nog te vol met getallen. Na feedback heb ik de informatie teruggebracht tot de kern, de hiërarchie duidelijker gemaakt en meer gewerkt met iconen, zodat de poster in een paar seconden te lezen is.",
      "De poster is ontworpen voor medestudenten. Daarom zou hij geprint op A3 in de gangen van de hogeschool hangen, op de plek waar studenten even stilstaan. Hij werkt ook digitaal: als PDF of als post op Instagram, waar dezelfde doelgroep zelf de hele dag zit.",
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
      "Overige iconen en vormen: zelf getekend",
      "Gemaakt in Adobe Illustrator",
    ],
  },

  "mm-video": {
    kop: "Wat zit er in een naam?",
    title: "Het Bjorn Lagendijk Interview",
    module: "Media Maker",
    year: "2026",
    verhaal: [
      "Achter elke bedrijfsnaam zit een verhaal. Voor deze opdracht interviewde ik Bjorn Lagendijk, oud-student van Inholland. Hij vertelt over zijn bedrijf: waar de naam voor staat en wat er allemaal gaat veranderen.",
      "Ik schreef vooraf een lijst met open vragen over de naam, het ontstaan en de toekomst van het bedrijf. We filmden op een rustige plek met goed licht, met een vast shot op Bjorn en close-ups voor afwisseling. In Premiere Pro heb ik het gesprek ingekort tot de sterkste antwoorden en de beelden en het geluid op elkaar afgestemd.",
      "Ter voorbereiding heb ik me verdiept in Bjorn en zijn bedrijf en heb ik voorbeeldinterviews bekeken op YouTube. Daaruit nam ik mee dat de interviewer zo min mogelijk in beeld en geluid moet zitten: de vragen staan niet in de video, de antwoorden vertellen zelf het verhaal. Ook leerde ik dat een stilte laten vallen vaak een beter antwoord oplevert dan meteen de volgende vraag stellen.",
      "Het interview duurt tweeënhalve minuut en is gefilmd in Full HD (1920×1080).",
      "Ik zou het interview publiceren op LinkedIn en YouTube. Op LinkedIn bereik je studenten en ondernemers die geïnteresseerd zijn in het bedrijf, en een video van tweeënhalve minuut past goed bij hoe mensen daar scrollen. YouTube is de vaste plek waar de video te vinden blijft en waarnaar je kunt doorlinken.",
    ],
    media: {
      kind: "video",
      src: "assets/projecten_stuff/interview_bjorn_web.mp4",
      poster: "assets/projecten_stuff/interview_bjorn_poster.jpg",
      caption: "Interview, 2 min 30 s.",
    },
    bronnen: [
      "Geïnterviewde: Bjorn Lagendijk, oud-student Inholland (met toestemming)",
      "Alle beelden zijn zelf gefilmd",
      "Gemonteerd in Adobe Premiere Pro",
    ],
  },

  "mm-teaser": {
    kop: "Het beste interview ooit?",
    title: "Teaser: het Bjorn Lagendijk Interview",
    module: "Media Maker",
    year: "2026",
    verhaal: [
      "Een interview moet je eerst nog laten zien aan mensen. Daarom maakte ik een teaser van 36 seconden die nieuwsgierig maakt naar het gesprek met Bjorn Lagendijk, zonder al te verklappen wat hij vertelt.",
      "De teaser wisselt korte shots van Bjorn af met titelkaarten: \"Ben je klaar?\", \"Voor het beste interview ooit?\" en \"Nog nooit eerder gezien\". Pas aan het eind valt de titel: Het Bjorn Lagendijk Interview.",
      // Invullen: hoe je de teaser hebt gemaakt (keuze van shots, muziek, de titelkaarten, en dat je een versie A en B hebt gemaakt)
      "TODO: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      // Invullen: waar je de teaser zou publiceren en waarom (bijv. Instagram Reels, LinkedIn, YouTube Shorts)
      "TODO: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
    ],
    media: {
      kind: "video",
      src: "assets/projecten_stuff/bjorn_teaser_web.mp4",
      poster: "assets/projecten_stuff/bjorn_teaser_poster.jpg",
      caption: "Teaser, 36 s.",
    },
    bronnen: [
      "Geïnterviewde: Bjorn Lagendijk, oud-student Inholland (met toestemming)",
      "Alle beelden zijn zelf gefilmd",
      "Gemonteerd in Adobe Premiere Pro",
    ],
  },

  "mm-podcast": {
    kop: "Wie ben ik als je me alleen kunt horen?",
    title: "Audio-zelfportret",
    module: "Media Maker",
    year: "2026",
    verhaal: [
      "Hoe laat je zien wie je bent als niemand je kan zien? Dat was de vraag achter deze opdracht: een zelfportret, alleen in geluid. Het werd een portret van 59 seconden.",
      "Ik laat mezelf horen via mijn stem, mijn muziek en geluiden uit mijn dagelijks leven. Ik vertel kort wie ik ben, en daaronder loopt muziek die ik zelf in FL Studio heb geproduceerd. Ik nam de stem apart op en bouwde het portret laag voor laag op. Daarna mixte ik alles zo dat de stem altijd verstaanbaar blijft en de muziek de sfeer draagt.",
      "Als voorbereiding luisterde ik naar korte podcasts en audiodocumentaires. Daaruit nam ik mee dat geluid sneller een sfeer neerzet dan uitleg, en dat je in een minuut niet alles hoeft te vertellen. Liever één duidelijk beeld van wie ik ben dan een opsomming.",
      "Ik zou het zelfportret publiceren op Spotify als korte podcastaflevering, of op SoundCloud, waar ik als producer ook mijn muziek deel. Op die platforms luisteren mensen bewust met een koptelefoon op, en dat past bij een portret dat je alleen kunt horen.",
    ],
    media: {
      kind: "audio",
      src: "assets/projecten_stuff/Podcast_Zelfportret_762963.mp3",
      caption: "Audio-zelfportret, 59 s.",
    },
    bronnen: [
      "Muziek: zelf geproduceerd in FL Studio",
      "Opgenomen en gemixt in Adobe Audition en FL Studio",
    ],
  },
};
