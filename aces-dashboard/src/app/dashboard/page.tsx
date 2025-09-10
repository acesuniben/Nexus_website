"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
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
  const router = useRouter();

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
              <Image
                src="/registeredUsersIcon.png"
                alt="Registered Users"
                width={24}
                height={24}
                className="text-red-500"
              />
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
              <Image
                src="/mhsIcon.png"
                alt="MHS Articles"
                width={24}
                height={24}
                className="text-blue-500"
              />
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
              <Image
                src="/forumIcon.png"
                alt="Forum Articles"
                width={24}
                height={24}
                className="text-teal-500"
              />
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
              <Image
                src="/blogIcon.png"
                alt="Blog Posts"
                width={24}
                height={24}
                className="text-orange-500"
              />
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

          <div className="flex flex-col items-center justify-center h-full py-4">
            {isLoading ? (
              <div className="animate-pulse">
                <div className="w-32 h-32 bg-gray-200 rounded-full mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-20"></div>
              </div>
            ) : (
              <>
                {/* Circular Progress */}
                <div className="relative w-40 h-40 mb-8">
                  <div className="group relative w-40 h-40 mb-8 flex items-center justify-center">
                    <svg
                      className="w-40 h-40 transform -rotate-90"
                      viewBox="0 0 144 144"
                    >
                      {/* Background Circle */}
                      <circle
                        cx="72"
                        cy="72"
                        r="64"
                        stroke="#f1f5f9"
                        strokeWidth="12"
                        fill="none"
                      />
                      {/* Progress Circle */}
                      <circle
                        cx="72"
                        cy="72"
                        r="64"
                        stroke="#166D86"
                        strokeWidth="12"
                        fill="none"
                        strokeDasharray="402.12"
                        strokeDashoffset={
                          402.12 - (Math.abs(uploadPercentage) / 100) * 402.12
                        }
                        strokeLinecap="round"
                        className="transition-all duration-1000 ease-out"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span
                        className="text-3xl font-bold"
                        style={{ color: "#166D86" }}
                      >
                        {uploadPercentage}%
                      </span>
                      <span className="text-sm text-gray-500 mt-1">
                        Uploads
                      </span>
                    </div>
                    {/* Tooltip on hover */}
                    <div className="absolute left-1/2 -bottom-10 -translate-x-1/2 z-10 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200">
                      <div
                        className="flex items-center gap-2 px-4 py-2 rounded-lg shadow-xl border border-[#0f4c5c] whitespace-nowrap text-xs font-medium"
                        style={{
                          background: "#166D86",
                          color: "#fff",
                          borderColor:
                            uploadPercentage < 0 ? "#e53e3e" : "#16a34a",
                        }}
                      >
                        {uploadPercentage < 0 ? (
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 20 20"
                            fill="none"
                            className="inline-block mr-1"
                            style={{ color: "#e53e3e" }}
                          >
                            <path
                              d="M10 15V5M10 15l-4-4m4 4l4-4"
                              stroke="#e53e3e"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        ) : (
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 20 20"
                            fill="none"
                            className="inline-block mr-1"
                            style={{ color: "#16a34a" }}
                          >
                            <path
                              d="M10 5v10m0-10l-4 4m4-4l4 4"
                              stroke="#16a34a"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                        <span>
                          {uploadPercentage < 0
                            ? "Percentage decrease as opposed to the previous week"
                            : "Percentage increase as opposed to the previous week"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Stats */}
                <div className="flex items-center justify-between w-full text-sm">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-teal-500 rounded-full mr-2"></div>
                    <div className="flex flex-col">
                      <span className="text-gray-600 font-medium">MHS</span>
                      <span className="font-bold text-gray-900 text-base">
                        {stats.mhsArticles}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <div className="flex flex-col">
                      <span className="text-gray-600 font-medium">Forum</span>
                      <span className="font-bold text-gray-900 text-base">
                        {stats.forumArticles}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
                    <div className="flex flex-col">
                      <span className="text-gray-600 font-medium">Blog</span>
                      <span className="font-bold text-gray-900 text-base">
                        {stats.blogPosts}
                      </span>
                    </div>
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
          </div>
          <div className="overflow-hidden">
            {isForumLoading ? (
              // Loading skeleton
              <div className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="animate-pulse flex items-center py-3 border-b border-gray-100"
                  >
                    <div className="w-8 h-4 bg-gray-200 rounded mr-4"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded w-1/3 mb-1"></div>
                      <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                    </div>
                    <div className="w-12 h-6 bg-gray-200 rounded"></div>
                  </div>
                ))}
              </div>
            ) : forumPosts.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No forum articles found
              </div>
            ) : (
              <>
                {/* Table Header */}
                <div className="flex items-center py-3 border-b border-gray-200 text-sm font-medium text-gray-500">
                  <div className="w-8"></div>
                  <div className="flex-1 px-2">Name</div>
                  <div className="flex-1 px-2">Description</div>
                  <div className="w-16"></div>
                </div>

                {/* Table Rows */}
                <div className="space-y-0">
                  {forumPosts.map((article, index) => (
                    <div
                      key={article.id}
                      className="flex items-center py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <div className="w-8 text-sm text-gray-400 font-medium">
                        {String(index + 1).padStart(2, "0")}
                      </div>
                      <div className="flex-1 px-2">
                        <h4 className="text-sm font-medium text-gray-900 truncate">
                          {article.title}
                        </h4>
                      </div>
                      <div className="flex-1 px-2">
                        <p className="text-sm text-gray-500 truncate">
                          {article.Description.length > 50
                            ? `${article.Description.substring(0, 50)}...`
                            : article.Description || "Anticipate the aces week"}
                        </p>
                      </div>
                      <div className="w-16">
                        <button
                          onClick={() => router.push("/dashboard/forum")}
                          className="px-3 py-1 text-xs font-medium text-teal-600 border border-teal-200 rounded-md hover:bg-teal-50 transition-colors"
                        >
                          View
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Blog Posts */}
        <div className="bg-white rounded-2xl shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold" style={{ color: "#166D86" }}>
              Blog
            </h3>
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
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-400">
                        {new Date(post.datePublished).toLocaleDateString()}
                      </span>
                      <button
                        onClick={() => router.push("/dashboard/blog")}
                        className="px-3 py-1 text-xs font-medium text-teal-600 border border-teal-200 rounded-md hover:bg-teal-50 transition-colors"
                      >
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
