export async function GET() {
  const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;
  const url = `https://newsdata.io/api/1/news?apikey=${apiKey}&q=crypto&language=en`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (!res.ok || data.status !== "success") {
      return Response.json(
        { articles: [] }, // Return empty array to prevent undefined errors
        { status: res.status }
      );
    }

    // Return in the exact format your components expect
    return Response.json({
      articles: data.results.map(item => ({
        title: item.title,
        description: item.description,
        url: item.link,
        publishedAt: item.pubDate
      }))
    });

  } catch (err) {
    return Response.json(
      { articles: [] }, // Return empty array on error
      { status: 500 }
    );
  }
}