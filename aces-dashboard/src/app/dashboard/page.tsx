"use client";

import { useState, useEffect } from "react";

interface DashboardStats {
  registeredUsers: number;
  mhsArticles: number;
  forumArticles: number;
  blogPosts: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    registeredUsers: 21,
    mhsArticles: 4,
    forumArticles: 8,
    blogPosts: 12,
  });

  const [chartData] = useState([
    { day: "Monday", value: 45 },
    { day: "Tuesday", value: 52 },
    { day: "Wednesday", value: 49 },
    { day: "Thursday", value: 35 },
    { day: "Friday", value: 58 },
    { day: "Saturday", value: 62 },
    { day: "Sunday", value: 55 },
  ]);

  const [forumArticles] = useState([
    {
      id: 1,
      title: "ACES Web",
      description: "Article for web track",
      status: "Live",
    },
    {
      id: 2,
      title: "Happy Birthday Event",
      description: "Article for ACES track",
      status: "Live",
    },
    {
      id: 3,
      title: "Guidelines for Hackers",
      description: "Article for web track",
      status: "Live",
    },
    {
      id: 4,
      title: "Happy Independence Day",
      description: "Article for web track",
      status: "Live",
    },
  ]);

  const [blogPosts] = useState([
    {
      id: 1,
      title: "Most Efficient Lecturer",
      description:
        "This is a newsletter that is plotted to inspire all students",
      status: "Draft",
      image: "/placeholder.jpg",
    },
    {
      id: 2,
      title: "Theft Allegations",
      description:
        "This is a newsletter that is plotted to inspire all students",
      status: "Draft",
      image: "/placeholder.jpg",
    },
  ]);

  return (
    <div className="p-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold" style={{ color: "#166D86" }}>
          Dashboard
        </h2>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {/* Registered Users */}
        <div className="bg-white rounded-2xl shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Registered users</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.registeredUsers}
              </p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <span className="text-red-500 text-xl">👥</span>
            </div>
          </div>
        </div>

        {/* MHS Articles */}
        <div className="bg-white rounded-2xl shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">MHS Article</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.mhsArticles}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <span className="text-blue-500 text-xl">📄</span>
            </div>
          </div>
        </div>

        {/* Forum Articles */}
        <div className="bg-white rounded-2xl shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Forum Articles</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.forumArticles}
              </p>
            </div>
            <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
              <span className="text-teal-500 text-xl">💬</span>
            </div>
          </div>
        </div>

        {/* Blog Posts */}
        <div className="bg-white rounded-2xl shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Blog Posted</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.blogPosts}
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <span className="text-orange-500 text-xl">📝</span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts and Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Registered Users Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Registered Users
            </h3>
            <button className="text-gray-400 hover:text-gray-600">
              <span>•••</span>
            </button>
          </div>

          {/* Simple Chart Representation */}
          <div className="relative h-64">
            <svg viewBox="0 0 400 200" className="w-full h-full">
              {/* Chart Background Grid */}
              <defs>
                <pattern
                  id="grid"
                  width="40"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 40 0 L 0 0 0 20"
                    fill="none"
                    stroke="#f3f4f6"
                    strokeWidth="1"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />

              {/* Chart Line */}
              <polyline
                fill="none"
                stroke="#14b8a6"
                strokeWidth="3"
                points="0,150 50,120 100,140 150,100 200,130 250,90 300,110 350,85 400,70"
              />

              {/* Data Points */}
              {[
                { x: 150, y: 100, value: "Z", highlighted: true },
                { x: 250, y: 90, value: "", highlighted: false },
                { x: 350, y: 85, value: "", highlighted: false },
              ].map((point, index) => (
                <g key={index}>
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r="6"
                    fill={point.highlighted ? "#14b8a6" : "#14b8a6"}
                    stroke="white"
                    strokeWidth="2"
                  />
                  {point.highlighted && (
                    <>
                      <rect
                        x={point.x - 10}
                        y={point.y - 25}
                        width="20"
                        height="15"
                        fill="#14b8a6"
                        rx="3"
                      />
                      <text
                        x={point.x}
                        y={point.y - 15}
                        textAnchor="middle"
                        fill="white"
                        fontSize="10"
                        fontWeight="bold"
                      >
                        {point.value}
                      </text>
                    </>
                  )}
                </g>
              ))}
            </svg>

            {/* X-axis Labels */}
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>Monday</span>
              <span>Tuesday</span>
              <span>Wednesday</span>
              <span>Thursday</span>
              <span>Friday</span>
              <span>Saturday</span>
              <span>Sunday</span>
            </div>
          </div>
        </div>

        {/* Analytics Circular Chart */}
        <div className="bg-white rounded-2xl shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Analytics</h3>
            <button className="text-gray-400 hover:text-gray-600">
              <span>•••</span>
            </button>
          </div>

          <div className="flex flex-col items-center">
            {/* Circular Progress */}
            <div className="relative w-32 h-32 mb-4">
              <svg
                className="w-32 h-32 transform -rotate-90"
                viewBox="0 0 128 128"
              >
                {/* Background Circle */}
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="#f3f4f6"
                  strokeWidth="8"
                  fill="none"
                />
                {/* Progress Circle - MHS */}
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="#14b8a6"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray="351.86"
                  strokeDashoffset="246.30"
                  strokeLinecap="round"
                />
                {/* Progress Circle - Forum */}
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="#84cc16"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray="351.86"
                  strokeDashoffset="176.00"
                  strokeLinecap="round"
                />
                {/* Progress Circle - Blog */}
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="#f97316"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray="351.86"
                  strokeDashoffset="281.00"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-gray-900">30%</span>
                <span className="text-sm text-gray-500">Uploads</span>
              </div>
            </div>

            {/* Legend */}
            <div className="space-y-2 text-sm">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-teal-500 rounded-full mr-2"></div>
                <span className="text-gray-600">MHS</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-lime-500 rounded-full mr-2"></div>
                <span className="text-gray-600">Forum</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
                <span className="text-gray-600">Blog</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Management Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Forum Articles */}
        <div className="bg-white rounded-2xl shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Forum Articles
            </h3>
            <button className="text-gray-400 hover:text-gray-600">
              <span>•••</span>
            </button>
          </div>

          <div className="space-y-4">
            {forumArticles.map((article) => (
              <div
                key={article.id}
                className="flex items-center justify-between p-3 border border-gray-100 rounded-lg"
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-gray-600 text-sm">📄</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{article.title}</p>
                    <p className="text-sm text-gray-500">
                      {article.description}
                    </p>
                  </div>
                </div>
                <button
                  className="px-3 py-1 text-sm rounded-full"
                  style={{ backgroundColor: "#166D86", color: "white" }}
                >
                  {article.status}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Blog */}
        <div className="bg-white rounded-2xl shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Blog</h3>
            <button className="text-gray-400 hover:text-gray-600">
              <span>•••</span>
            </button>
          </div>

          <div className="space-y-4">
            {blogPosts.map((post) => (
              <div
                key={post.id}
                className="flex items-start space-x-3 p-3 border border-gray-100 rounded-lg"
              >
                <div className="w-12 h-12 bg-gray-200 rounded-lg flex-shrink-0"></div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 mb-1">
                    {post.title}
                  </h4>
                  <p className="text-sm text-gray-500 mb-2">
                    {post.description}
                  </p>
                  <button className="text-sm text-gray-600 border border-gray-200 rounded px-3 py-1">
                    Read More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
