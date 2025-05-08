import VideoList from "@/components/YoutubeVideos";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white p-8 ">
      <h1 className="text-4xl font-bold text-center mb-6 mt-10">Webwiz Creation Videos</h1>
<VideoList/>    </div>
  );
}
