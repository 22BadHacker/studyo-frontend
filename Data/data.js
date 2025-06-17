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
  const objectTopIds = [14, 15, 17,  23, 24, 25, 29, 33, 35, 44, 45, 72, 75, 86, 98, 99, 101, 116, 114];
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

