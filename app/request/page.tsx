import Link from "next/link"

export default function RequestPage() {
  return (
    <main>
      <nav className="p-4">
        <Link
          href="/"
          className="text-green-700 font-semibold hover:underline"
        >
          ← Back to Home
        </Link>
      </nav>
      <iframe
        src="https://tally.so/embed/RGLO94"
        width="100%"
        height="900"
        title="Flower Request Form"
      />
    </main>
  )
}