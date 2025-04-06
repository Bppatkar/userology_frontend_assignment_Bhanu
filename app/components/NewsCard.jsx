"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNews } from "@/store/newsSlice";
import Skeleton from "./Skeleton";

export default function NewsCard() {
  const dispatch = useDispatch();
  const { articles, status } = useSelector((state) => state.news);

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  if (status === "loading") return <Skeleton type="news" />;
  if (status === "failed") return <p>Failed to load news.</p>;

  return (
    <div className="bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-700">
      <h2 className="text-xl font-semibold mb-4">📰 Latest News</h2>
      <ul className="space-y-3">
        {articles.slice(0, 5).map((article, idx) => (
          <li key={idx}>
            <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
              {article.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
