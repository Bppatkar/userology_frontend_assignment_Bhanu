// components/Skeleton.jsx
"use client";

export default function Skeleton({ type }) {
  return (
    <div className={`card ${type}-skeleton`}>
      {type === 'crypto' ? (
        <>
          <div className="h-6 w-32 bg-gray-200 rounded mb-4 animate-pulse" />
          <div className="grid grid-cols-2 gap-4">
            {[...Array(2)].map((_, i) => (
              <div key={i}>
                <div className="h-5 w-24 bg-gray-200 rounded mb-2 animate-pulse" />
                <div className="h-6 w-20 bg-gray-200 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="h-6 w-32 bg-gray-200 rounded mb-4 animate-pulse" />
          <div className="space-y-3">
            <div className="h-5 w-24 bg-gray-200 rounded animate-pulse" />
            <div className="h-5 w-20 bg-gray-200 rounded animate-pulse" />
            <div className="h-5 w-16 bg-gray-200 rounded animate-pulse" />
          </div>
        </>
      )}
    </div>
  );
}