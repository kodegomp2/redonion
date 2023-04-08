import Link from "next/link";

export default async function WebSearchPage({searchParams}) {
  const response = await fetch(
    `https://www.googleapis.com/customsearch/v1?key=${process.env.GOOGLE_SEARCH_API_KEY}&cx=${process.env.SEARCH_ENGINE_ID}&q=${searchParams.searchTerm}`
  );

  if (!response.ok) {
    throw new Error("Something went wrong!");
  }

  const data = await response.json();

  const results = data.items;

  if (!results) {
    return (
      <div className="flex flex-col justify-center items-center pt-10">
        <h1 className="text-3xl mb-4">No results found</h1>
        <p className="text-lg">Try searching for something else or go back to <Link href="/" className="text-[#993366]">homepage</Link>.</p>
      </div>
    )
  }

  return (
    <>
      {results && results.map(result => <h1 key={result.title}>{result.title}</h1>)}
    </>
  )
}
