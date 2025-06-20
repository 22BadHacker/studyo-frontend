import SearchClient from "@/Component/SearchClient";
export const metadata = {
  title: "Search — 𝗦𝘁ü𝗱𝘆𝗼 ",
}

export default function SearchResults({ params }) {
  const query = decodeURIComponent(params.query);
  
  return <SearchClient query={query} />;
}