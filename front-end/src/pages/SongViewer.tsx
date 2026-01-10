import { useParams } from "react-router-dom";

export default function SongViewer() {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="w-full max-w-5xl">
        <h1 className="text-xl font-bold mb-4">
          Song Preview #{id}
        </h1>

        {/* This can be video / pdf / youtube */}
        <video
          controls
          className="w-full rounded-xl"
          src="/sample.mp4"
        />
      </div>
    </div>
  );
}
