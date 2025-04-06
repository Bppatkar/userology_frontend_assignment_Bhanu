"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNews } from "@/store/newsSlice";

export default function NewsSection() {
  const dispatch = useDispatch();
  const { articles, status } = useSelector((state) => state.news);

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  // Debugging - log the current state
  useEffect(() => {
    console.log("Current news state:", { articles, status });
  }, [articles, status]);

  if (status === "loading") {
    return (
      <div className="bg-gray-900 p-6 rounded-xl border border-gray-700">
        <h2 className="text-xl font-semibold mb-4">📰 Crypto News</h2>
        <p className="text-gray-400">Loading news...</p>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="bg-gray-900 p-6 rounded-xl border border-gray-700">
        <h2 className="text-xl font-semibold mb-4">📰 Crypto News</h2>
        <p className="text-red-500">Failed to load news</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 p-6 rounded-xl border border-gray-700">
      <h2 className="text-xl font-semibold mb-4">📰 Crypto News</h2>
      
      <div className="space-y-4">
        {articles?.slice(0, 6).map((article, idx) => (
          <div key={`${article.publishedAt}-${idx}`} className="border-b border-gray-700 pb-4 last:border-0 last:pb-0">
            <h3 className="text-white font-medium mb-1 line-clamp-2">
              {article.title}
            </h3>
            {article.description && (
              <p className="text-sm text-gray-400 line-clamp-2 mb-2">
                {article.description}
              </p>
            )}
            <div className="flex justify-between items-center text-xs text-gray-500">
              <span>
                {new Date(article.publishedAt).toLocaleDateString('en-US', {
                  month: 'numeric',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </span>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                Read more
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}