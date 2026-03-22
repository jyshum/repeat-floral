import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen bg-green-50 flex flex-col items-center justify-center px-6">
      <div className="max-w-2xl text-center">
        <h1 className="text-5xl font-bold text-green-800 mb-4">
          Repeat Floral
        </h1>
        <p className="text-xl text-green-700 mb-2">
          Donating flowers to seniors and community homes across Vancouver.
        </p>
        <p className="text-md text-gray-500 mb-10">
          No flower should go to waste. No senior should feel forgotten.
        </p>
        <Link
          href="/request"
          className="bg-green-700 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-800 transition"
        >
          Request Flowers
        </Link>
      </div>
    </main>
  )
}
