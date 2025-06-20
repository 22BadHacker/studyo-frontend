export const tracks = [
  {
    id: 1,
    title: "Dreaming Awake",
    artist: "Faouzia",
    cover: "/images/img32.jpg",
    src: "/girl.mp3",
  },
  {
    id: 2,
    title: "Ocean Breeze",
    artist: "Sunset Riders",
    cover: "https://images.unsplash.com/photo-1508973371-d647d6f8abc2",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  },
  {
    id: 3,
    title: "Neon Lights",
    artist: "City Vibes",
    cover: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  },
];


// utils/genreHashtags.js
export const genreHashtags = {
  "made for you": ["#MadeForYou", "#PersonalizedPlaylist", "#YourVibeOnly"],
  "classical music": ["#ClassicalVibes", "#OrchestralMagic", "#TimelessTunes"],
  "new releases": ["#FreshDrops", "#JustReleased", "#NowStreaming"],
  "Top hits": ["#GlobalHits", "#HitZone", "#BangersOnly"],
  "country": ["#CountryVibes", "#SouthernSound", "#HeartlandHits"],
  "instrumental": ["#InstrumentalSoul", "#NoWordsNeeded", "#CinematicSounds"],
  "podcasts": ["#PodCulture", "#TalkTime", "#VoicesThatMatter"],
  "Moroccan Rap": ["#MoroccanRap", "#RapMaghribi", "#CasablancaBeats"],
  "workout": ["#WorkoutWave", "#BeastModeOn", "#PumpUpPlaylist"],
  "dance/electronic": ["#DanceBeats", "#FestivalAnthems"],
  "Hip Hop": ["#HipHopMusic", "#UndergroundHipHop"],
  "k-pop": ["#KpopFandom", "#IdolLife"],
  "Anime": ["#AnimeMusic", "#AnimeOpening", "#OtakuBeats"],
  "karaoke": ["#KaraokeTime", "#SingYourHeartOut"],
  "tv & movies": ["#MovieMusic", "#NetflixPlaylist", "#ScreenSounds"],
  "chill": ["#LofiVibes", "#SoothingSounds", "#EveningVibes"],
  "folk & acoustic": ["#GuitarSessions", "#AcousticVibes"],
  "arab": ["#ArabicVibes", "#MiddleEasternVibes", "#MusiqaArabiya"],
  "live events": ["#EventOfTheYear", "#BackstagePass", "#LiveMusic"],
  "latin": ["#MusicaLatina", "#BailaConmigo", "#SalsaNight"],
  "music": ["#MusicLovers", "#CurrentlyListening", "#TopTracks"],
  "music festivals": ["#BigStageEnergy", "#FestivalWeekend", "#MusicMadness"],
  "Bands": ["#BandLife", "#ConcertVibes", "#OnStage"],
  "Trending": ["#TrendingNow", "#CurrentlyListening", "#TopHits"],

};




export const getUserImageClasses = (id) => {
  const objectTopIds = [14, 15, 17,  23, 24, 25, 29, 33, 35, 44, 45, 72, 75, 86, 98, 99, 101, 116, 114,115, 118, 120];
  const saturateIds = [16, 26, 33, 57, 65, 36,];
  const saturate = [52,];

  const extraClasses = [
    objectTopIds.includes(id) && 'object-top',
    saturateIds.includes(id) && 'saturate-[1.05]',
    saturate.includes(id) && 'saturate-[1]',
  ]
    .filter(Boolean)
    .join(' ');

  return `${extraClasses} size-full p saturate-[1.3] object-center object-cover`;
};




export const trackss = [
    {
      title: 'Messy',
      artist: 'Lola Young',
      cover: '/images/Lolaa.jpg',
      src: '/music/Lola.mp3',
      id: 1,
      profileImage: '/artists/Lola.jpg',
      link: '/artist/xakRTPDf8uRWi4hKnSX8Hx',
    },
    
    
    {
      title: "Pink Pony Club",
      artist: 'Chappell Roan',
      cover: '/Songs/chappel.jpg',
      src: '/music/Cc.mp3',
      id: 3,
      profileImage: "/artists/cc.jpg",
      link: '/artist/ACjwcgWz1fXx2svdG03O0L',
    },

    {
      title: 'Tenshi to Akuma',
      artist: 'GRe4N BOYZ',
      cover: '/Songs/lofi.jpg',
      src: '/music/lofii.mp3',
      id: 2,
      profileImage: "/artists/green.jpg",
      link: '/artist/kZiKRYm8iLLytqBH4gHF0K',
    },

    {
      title: "Zombie",
      artist: 'YUNGBLUD',
      cover: '/Songs/Yung.jpg',
      src: '/music/Yung.mp3',
      id: 5,
      profileImage: "/artists/yung.jpg",
      link: '/artist/zEeYTYfMSx2XEJZ4xnAQSn'

    },  
    
    
     {
      title: "Sweet but Psycho",
      artist: 'Ava Max',
      cover: '/Songs/sweet.jpg',
      src: '/music/sweet.mp3',
      id: 5,
      profileImage: "/artists/ava.jpg",
      link: '/artist/sHHTP8llVzmNOHLA9X4ugv'

    },
    
    
     {
      title: "Flowers",
      artist: 'Miley Cyrus',
      cover: '/Songs/Mily.jpg',
      src: '/music/mily.mp3',
      id: 5,
      profileImage: "/artists/mily.jpg",
      link: '/artist/s9VaIEfTMT3SWpogm7dYDm'

    },
     

    {
      title: 'They not like us',
      artist: 'kendrick Lamar',
      cover: '/artists/notlike.webp',
      src: '/music/Noot.mp3',
      id: 2,
      profileImage: "/artists/kk.webp",
      link: '/artist/kZiKRYm8iLLytqBH4gHF0K',
    },

    {
      title: "that's so true",
      artist: 'gracie abrams',
      cover: '/Songs/garcia.webp',
      src: '/music/abram.mp3',
      id: 3,
      profileImage: "/artists/Gracie.jpg",
      link: '/artist/EuZaNtPdc4PTmoEAhUFC7r',
    },
    
    {
      title: "APT.",
      artist: 'Rosé',
      artist2: 'bruno mars',
      cover: '/Songs/appt.jpg',
      src: '/music/apt.mp3',
      id: 3,
      profileImage: "/artists/rose.jpg",
      profileImage2: "/artists/mars.webp",
      link: '/artist/skDzNmRmxIVi9TeDcsF2xA',
      link2: '/artist/sxBvL0puKK77fAay5bo1J1',
    },

    
    {
      title: 'Gangsta',
      artist: 'Kehlani',
      cover: '/Songs/gangsta.jpg',
      src: '/music/kkk.mp3',
      id: 3,
      profileImage: "/artists/kk.avif",
      link: '/artist/kZiKRYm8iLLytqBH4gHF0K',
    },

    // {
    //   title: "Sprinter",
    //   artist: 'Central Cee',
    //   artist2: 'Dave',
    //   cover: '/Songs/ssp.jpg',
    //   src: '/music/ssp.mp3',
    //   id: 3,
    //   profileImage: "/artists/rose.jpg",
    //   profileImage2: "/artists/mars.webp",
    //   link: '/artist/skDzNmRmxIVi9TeDcsF2xA',
    //   link2: '/artist/sxBvL0puKK77fAay5bo1J1',
    // },

    {
      title: 'Cliché',
      artist: 'MGK',
      cover: '/Songs/cliche.jpg',
      src: '/music/MGK.mp3',
      id: 3,
      profileImage: "/artists/mgk.jpg",
      link: '/artist/kZiKRYm8iLLytqBH4gHF0K',
    },
   
    
  ];



export const trackss2 = [
    {
      title: 'Manchild',
      artist: 'Sabrina Carpenter',
      cover: '/Songs/manchild.jpg',
      src: '/music/manchild.mp3',
      id: 1,
      profileImage: '/artists/Lola.jpg',
      link: '/artist/y582AITbRnGl9GUXUBQf1z',
    },
    
    {
      title: "Ordinary",
      artist: 'Alex Warren',
      cover: '/Songs/alex.jpg',
      src: '/music/alex.mp3',
      id: 3,
      profileImage: "/artists/alex.png",
      link: '/artist/4TBltsCY9ZT5ZU7SSTl95m',
    },

    {
      title: 'Bad Romance',
      artist: 'Lady Gaga',
      cover: '/Songs/bad.jpg',
      src: '/music/bad.mp3',
      id: 3,
      profileImage: "/artists/lady.jpg",
      link: '/artist/GOX4TSqGSHEwbQzPNB2DTh',
    },


    {
      title: "Spiser-Man",
      artist: 'John Paesano',
      cover: '/Songs/spider.jpg',
      src: '/music/Spider-Man.mp3',
      id: 3,
      profileImage: "/artists/john.jpg",
      link: '/artist/r46shAEhwb9toSemK2ITyC',
    },

    

    {
      title: "twilight zone",
      artist: 'Ariana Grande',
      cover: '/Songs/ariana.png',
      src: '/music/arii.mp3',
      id: 3,
      profileImage: "/artists/arii.webp",
      link: '/artist/ZRzVZCrRLsMAz5euTHlupi',
    },
    
    

    {
      title: 'Back To Friends ',
      artist: 'Sombr',
      cover: '/Songs/sombr.jpg',
      src: '/music/sombr.mp3',
      id: 3,
      profileImage: "/artists/sombr.jpg",
      link: '/artist/Ag4e5neR0z0DPqEcbymOCX',
    },

    {
      title: "Daredevil",
      artist: 'The Newton Brothers',
      cover: '/Songs/dare.jpg',
      src: '/music/dare.mp3',
      id: 3,
      profileImage: "/artists/dare.jpg",
      link: '/artist/5pr5BuWUPa8e4AIF5lQB4g',
    },
    

    {
      title: "Sapphire",
      artist: 'Ed Sheeran',
      cover: '/Songs/ed.jpg',
      src: '/music/Cc.mp3',
      id: 3,
      profileImage: "/artists/ed.jpg",
      link: '/artist/5pr5BuWUPa8e4AIF5lQB4g',
    },
    
    
    
    
  ];
  
  
  
  export const moroccan = [
      {
        title: 'Belbala',
        artist: 'douaa lahyaoui ',
        cover: '/Songs/doaa.jpg',
        src: '/music/dd.mp3',
        id: 3,
        link: '/artist/hBb5I2qSU2lSVBWyT3Drh9',
      },
      {
        title: 'Pirate',
        artist: 'Don Bigg',
        cover: '/Songs/pp.jpg',
        src: '/music/ss.mp3',
        id: 2,
        link: '/artist/QDNOeVpoiNpfBuWsXb9D1W',
      },
      {
        title: 'Taj Li Watani',
        artist: 'Rym',
        cover: '/Songs/rym.jpg',
        src: '/music/Rym.mp3',
        id: 3,
        link: '/artist/QDNOeVpoiNpfBuWsXb9D1W',
      },
      {
        title: 'Bouhali',
        artist: 'ElGrandeToto',
        cover: '/Songs/el.jpg',
        src: '/music/BOUHALI.mp3',
        id: 4,
        link: '/artist/UbEIFacanfpjhJhOARo8u9',
      },
      {
        title: 'Influence Z',
        artist: 'Don Bigg',
        cover: '/Songs/influnce.jpg',
        src: '/music/biig.mp3',
        id: 5,
        link: '/artist/UbEIFacanfpjhJhOARo8u9',
      },
      {
        artist: 'Manal',
        title: 'Mahboula',
        cover: '/Songs/mm.jpg',
        src: '/music/mm.mp3',
        id: 6,
        link: '/artist/RUgVc52dBM4xTeNxh8EdGX',
      },
      {
        title: 'Chouwafat',
        artist: 'Houssainy',
        artist2: ' Mocci',
        artist3: 'Kouz1',
        cover: '/Songs/chouwafat.jpg',
        src: '/music/hh.mp3',
        id: 7,
        link: '',
      },
      {
        artist: 'LFERDA',
        title: 'Ma Jolie',
        cover: '/Songs/ma.jpg',
        src: '/music/ff.mp3',
        id: 8,
        link: '/artist/RUgVc52dBM4xTeNxh8EdGX',
      },
  
]
