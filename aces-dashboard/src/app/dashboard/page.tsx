"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Dynamically import ApexCharts to avoid SSR issues
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface DailyCount {
  day: string;
  count: number;
}

interface RegisteredUsers {
  dailyCounts: DailyCount[];
  total: number;
}

interface Analytics {
  uploadPercentage: number;
  counts: {
    blog: number;
    mhs: number;
    forum: number;
  };
}

interface DashboardData {
  registeredUsers: RegisteredUsers;
  analytics: Analytics;
}

interface DashboardStats {
  registeredUsers: number;
  mhsArticles: number;
  forumArticles: number;
  blogPosts: number;
}

interface BlogPost {
  id: string;
  title: string;
  Description: string;
  datePublished: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

interface ForumPost {
  id: string;
  title: string;
  Description: string;
  datePublished: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

interface BlogApiResponse {
  entries: BlogPost[];
  total: number;
  page: number;
  pages: number;
}

interface ForumApiResponse {
  entries: ForumPost[];
  total: number;
  page: number;
  pages: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    registeredUsers: 0,
    mhsArticles: 0,
    forumArticles: 0,
    blogPosts: 0,
  });

  const [chartData, setChartData] = useState<DailyCount[]>([
    { day: "Monday", count: 0 },
    { day: "Tuesday", count: 0 },
    { day: "Wednesday", count: 0 },
    { day: "Thursday", count: 0 },
    { day: "Friday", count: 0 },
    { day: "Saturday", count: 0 },
    { day: "Sunday", count: 0 },
  ]);

  const [uploadPercentage, setUploadPercentage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [forumPosts, setForumPosts] = useState<ForumPost[]>([]);
  const [isBlogLoading, setIsBlogLoading] = useState(true);
  const [isForumLoading, setIsForumLoading] = useState(true);

  // Chart configuration for ApexCharts
  const chartOptions = {
    chart: {
      type: "line" as const,
      height: 300,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      sparkline: {
        enabled: false,
      },
      parentHeightOffset: 0,
      redrawOnParentResize: true,
    },
    stroke: {
      curve: "smooth" as const,
      width: 3,
      colors: ["#166D86"],
    },
    grid: {
      show: true,
      borderColor: "#f1f5f9",
      strokeDashArray: 0,
      position: "back" as const,
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 6,
      colors: ["#166D86"],
      strokeColors: "#ffffff",
      strokeWidth: 2,
      hover: {
        size: 8,
      },
    },
    xaxis: {
      categories: chartData.map((item) => item.day),
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: "#64748b",
          fontSize: "12px",
        },
        offsetY: 5,
      },
    },
    yaxis: {
      show: true,
      min: 0,
      max: 100,
      tickAmount: 5,
      labels: {
        style: {
          colors: "#64748b",
          fontSize: "12px",
        },
        formatter: function (val: number) {
          return Math.round(val).toString();
        },
      },
    },
    tooltip: {
      enabled: true,
      theme: "dark" as const,
      shared: false,
      intersect: false,
      custom: function ({ series, seriesIndex, dataPointIndex, w }: any) {
        const value = series[seriesIndex][dataPointIndex];
        const category = w.globals.labels[dataPointIndex];

        return `
          <div style="
            background: #166D86;
            color: white;
            padding: 8px 12px;
            border-radius: 8px;
            font-size: 12px;
            font-weight: 500;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            border: none;
          ">
            <div style="text-align: center;">
              <div style="font-weight: 600; margin-bottom: 2px;">Registered users</div>
              <div style="font-size: 14px; font-weight: bold;">${value}</div>
            </div>
          </div>
        `;
      },
    },
    colors: ["#166D86"],
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "vertical",
        shadeIntensity: 0.3,
        gradientToColors: ["#0f4c5c"],
        inverseColors: false,
        opacityFrom: 0.8,
        opacityTo: 0.1,
        stops: [0, 100],
      },
    },
  };

  const chartSeries = [
    {
      name: "Registered Users",
      data: chartData.map((item) => item.count),
    },
  ];

  // Fetch dashboard data from API
  const fetchDashboardData = async () => {
    try {
      if (typeof window === "undefined") return;

      const token = localStorage.getItem("adminToken");
      if (!token) {
        console.log("No token found in localStorage");
        alert("Authentication token not found. Please log in again.");
        window.location.href = "/";
        return;
      }

      console.log("Fetching dashboard data...");
      const response = await fetch(
        "https://aces-utky.onrender.com/api/admin/dashboard",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const dashboardData: DashboardData = await response.json();
        console.log("Dashboard data received:", dashboardData);

        // Update stats
        setStats({
          registeredUsers: dashboardData.registeredUsers.total,
          mhsArticles: dashboardData.analytics.counts.mhs,
          forumArticles: dashboardData.analytics.counts.forum,
          blogPosts: dashboardData.analytics.counts.blog,
        });

        // Update chart data
        setChartData(dashboardData.registeredUsers.dailyCounts);

        // Update upload percentage
        setUploadPercentage(dashboardData.analytics.uploadPercentage);
      } else if (response.status === 401) {
        localStorage.removeItem("adminToken");
        alert("Your session has expired. Please log in again.");
        window.location.href = "/";
      } else {
        console.error("Failed to fetch dashboard data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch blog data from API
  const fetchBlogData = async () => {
    try {
      if (typeof window === "undefined") return;

      const token = localStorage.getItem("adminToken");
      if (!token) {
        console.log("No token found for blog fetch");
        return;
      }

      console.log("Fetching blog data...");
      const response = await fetch(
        "https://aces-utky.onrender.com/api/admin/blog/read",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const blogData: BlogApiResponse = await response.json();
        console.log("Blog data received:", blogData);

        // Get the first 2 blog posts for dashboard display
        const recentBlogs = blogData.entries.slice(0, 2);
        setBlogPosts(recentBlogs);
      } else if (response.status === 401) {
        console.log("Unauthorized access for blog data");
        // Don't redirect here since main dashboard handles auth
      } else {
        console.error("Failed to fetch blog data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching blog data:", error);
    } finally {
      setIsBlogLoading(false);
    }
  };

  // Fetch forum data from API
  const fetchForumData = async () => {
    try {
      if (typeof window === "undefined") return;

      const token = localStorage.getItem("adminToken");
      if (!token) {
        console.log("No token found for forum fetch");
        return;
      }

      console.log("Fetching forum data...");
      const response = await fetch(
        "https://aces-utky.onrender.com/api/admin/forum/read",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const forumData: ForumApiResponse = await response.json();
        console.log("Forum data received:", forumData);

        // Get the first 2 forum posts for dashboard display
        const recentForums = forumData.entries.slice(0, 2);
        setForumPosts(recentForums);
      } else if (response.status === 401) {
        console.log("Unauthorized access for forum data");
        // Don't redirect here since main dashboard handles auth
      } else {
        console.error("Failed to fetch forum data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching forum data:", error);
    } finally {
      setIsForumLoading(false);
    }
  };

  // Fetch dashboard data on component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchDashboardData();
      fetchBlogData();
      fetchForumData();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="p-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold" style={{ color: "#166D86" }}>
          Dashboard
        </h2>
        {isLoading && (
          <div className="flex items-center text-gray-500">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-400 mr-2"></div>
            Loading...
          </div>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {/* Registered Users */}
        <div className="bg-white rounded-2xl shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Registered users</p>
              <p className="text-2xl font-bold text-gray-900">
                {isLoading ? (
                  <div className="animate-pulse bg-gray-200 h-8 w-12 rounded"></div>
                ) : (
                  stats.registeredUsers
                )}
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
                {isLoading ? (
                  <div className="animate-pulse bg-gray-200 h-8 w-12 rounded"></div>
                ) : (
                  stats.mhsArticles
                )}
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
                {isLoading ? (
                  <div className="animate-pulse bg-gray-200 h-8 w-12 rounded"></div>
                ) : (
                  stats.forumArticles
                )}
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
                {isLoading ? (
                  <div className="animate-pulse bg-gray-200 h-8 w-12 rounded"></div>
                ) : (
                  stats.blogPosts
                )}
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
            <h3 className="text-lg font-semibold" style={{ color: "#166D86" }}>
              Registered Users
            </h3>
            <button className="text-gray-400 hover:text-gray-600">
              <span>•••</span>
            </button>
          </div>

          {/* ApexCharts Line Chart */}
          <div className="relative h-80">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <div className="animate-pulse bg-gray-200 h-32 w-full rounded"></div>
              </div>
            ) : (
              <Chart
                options={chartOptions}
                series={chartSeries}
                type="line"
                height={275}
              />
            )}
          </div>
        </div>

        {/* Analytics Upload Percentage */}
        <div className="bg-white rounded-2xl shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold" style={{ color: "#166D86" }}>
              Upload Analytics
            </h3>
            <button className="text-gray-400 hover:text-gray-600">
              <span>•••</span>
            </button>
          </div>

          <div className="flex flex-col items-center">
            {isLoading ? (
              <div className="animate-pulse">
                <div className="w-32 h-32 bg-gray-200 rounded-full mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-20"></div>
              </div>
            ) : (
              <>
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
                    {/* Progress Circle */}
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke={uploadPercentage >= 0 ? "#14b8a6" : "#ef4444"}
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray="351.86"
                      strokeDashoffset={
                        351.86 - (Math.abs(uploadPercentage) / 100) * 351.86
                      }
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span
                      className={`text-2xl font-bold ${
                        uploadPercentage >= 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {uploadPercentage}%
                    </span>
                    <span className="text-sm text-gray-500">Upload Change</span>
                  </div>
                </div>

                {/* Content Stats */}
                <div className="space-y-2 text-sm w-full">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                      <span className="text-gray-600">MHS Articles</span>
                    </div>
                    <span className="font-medium">{stats.mhsArticles}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-teal-500 rounded-full mr-2"></div>
                      <span className="text-gray-600">Forum Posts</span>
                    </div>
                    <span className="font-medium">{stats.forumArticles}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
                      <span className="text-gray-600">Blog Posts</span>
                    </div>
                    <span className="font-medium">{stats.blogPosts}</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Forum Articles */}
        <div className="bg-white rounded-2xl shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold" style={{ color: "#166D86" }}>
              Forum Articles
            </h3>
            <button className="text-sm text-blue-600 hover:text-blue-800">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {isForumLoading ? (
              // Loading skeleton
              <>
                {[1, 2].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : forumPosts.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No forum articles found
              </div>
            ) : (
              forumPosts.map((article) => (
                <div
                  key={article.id}
                  className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
                >
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600 text-sm">📄</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900">
                      {article.title}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                      {article.Description.length > 100
                        ? `${article.Description.substring(0, 100)}...`
                        : article.Description}
                    </p>
                    <div className="flex items-center mt-2">
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                        Published
                      </span>
                      <span className="text-xs text-gray-400 ml-2">
                        {new Date(article.datePublished).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Blog Posts */}
        <div className="bg-white rounded-2xl shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold" style={{ color: "#166D86" }}>
              Blog
            </h3>
            <button className="text-sm text-blue-600 hover:text-blue-800">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {isBlogLoading ? (
              // Loading skeleton
              <>
                {[1, 2].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                        <div className="h-6 bg-gray-200 rounded w-16"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : blogPosts.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No blog posts found
              </div>
            ) : (
              blogPosts.map((post) => (
                <div
                  key={post.id}
                  className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
                >
                  <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden">
                    {post.imageUrl ? (
                      <img
                        src={post.imageUrl}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                        <span className="text-gray-500 text-xs">📝</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900">
                      {post.title}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                      {post.Description.length > 80
                        ? `${post.Description.substring(0, 80)}...`
                        : post.Description}
                    </p>
                    <div className="flex items-center mt-2">
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                        Published
                      </span>
                      <span className="text-xs text-gray-400 ml-2">
                        {new Date(post.datePublished).toLocaleDateString()}
                      </span>
                      <button className="text-xs text-blue-600 hover:text-blue-800 ml-auto">
                        Read More
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
