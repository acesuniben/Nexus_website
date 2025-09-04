import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center relative">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/sign-in-background.png"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
      </div>
      
      {/* Signup Form */}
      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md z-10 relative mx-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-2">
            <Image
              src="/logo.png"
              alt="ACES Logo"
              width={40}
              height={40}
              className="object-contain mr-3"
            />
            <h1 className="text-2xl font-semibold text-gray-800">
              Sign in as an Admin
            </h1>
          </div>
          <p className="text-gray-500 text-sm text-center">
            Enter your Email and Password
          </p>
        </div>

        {/* Form */}
        <form className="space-y-6">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-3 border-2 border-teal-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
              placeholder=""
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-4 py-3 border-2 border-teal-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
              placeholder=""
            />
          </div>

          {/* Forgot Password Link */}
          <div className="text-right mb-6">
            <a href="#" className="text-sm text-teal-600 hover:text-teal-700 underline">
              Forgot Password?
            </a>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-teal-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 shadow-lg"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
