import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api.ts";

interface Song {
  id: number;
  title: string;
  sheet_pdf?: string;
  audio_url?: string;
  video_url?: string;
  external_link?: string;
  view_count: number;
}

export default function Songs() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const res = await api.get("/allsongs");
        setSongs(res.data.data);
      } catch (error) {
        console.error("Failed to load songs", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading songs...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">🎵 Songs</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {songs.map((song) => (
          <div
            key={song.id}
            onClick={() => navigate(`/songs/${song.id}`)}
            className="bg-white rounded-xl shadow hover:shadow-lg transition cursor-pointer"
          >
            {/* PREVIEW */}
            <div className="h-48 bg-gray-100 rounded-t-xl flex items-center justify-center overflow-hidden">
              {song.video_url && (
                <video
                  src={song.video_url}
                  muted
                  className="w-full h-full object-cover"
                />
              )}

              {!song.video_url && song.external_link && (
                <iframe
                  src={song.external_link.replace("watch?v=", "embed/")}
                  className="w-full h-full"
                  allowFullScreen
                />
              )}

              {!song.video_url && !song.external_link && song.sheet_pdf && (
                <div className="text-center text-gray-600">
                  📄
                  <p className="text-sm mt-1">Sheet Music</p>
                </div>
              )}

              {!song.video_url &&
                !song.external_link &&
                !song.sheet_pdf &&
                song.audio_url && (
                  <div className="text-center text-gray-600">
                    🎧
                    <p className="text-sm mt-1">Audio</p>
                  </div>
                )}
            </div>

            {/* INFO */}
            <div className="p-4">
              <h2 className="font-semibold text-lg">{song.title}</h2>
            </div>
            <div className="details-count flex flex-row  mb-4">
              <span className="more_song_details text-sm text-gray-500 mb-2 px-4">Views: {song.view_count}</span>
              <span className="more_song_details text-sm text-gray-500 mb-2 px-4 float-left">likes: {song.view_count}</span>
              <span className="more_song_details text-sm text-gray-500 mb-2 px-4 float-right">comments: {song.view_count}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
