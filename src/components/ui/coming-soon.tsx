export default function ComingSoon({ text }: { text: string }) {
  return (
    <div className="flex items-center justify-center bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 p-10 rounded-sm">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4 animate-pulse">
          🚀 Coming Soon 🚀
        </h1>
        <p className="text-lg text-gray-300 max-w-md mx-auto">
          {`We're working hard to bring you the best experience. Check back soon for updates on ${text}`}
        </p>
        <div className="mt-8">
          <p className="text-sm text-gray-400 italic">
            Stay tuned for something amazing...
          </p>
        </div>
      </div>
    </div>
  );
}
