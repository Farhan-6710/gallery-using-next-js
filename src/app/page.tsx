// pages/index.tsx
import ImageGallery from "./components/ImageGallery";

export default function Home() {
  const images = [
    "/img-1-Landscape.jpeg",
    "/img-2-Landscape.jpeg",
    "/img-3-Landscape.jpeg",
  ];

  return (
    <main className="flex justify-center items-center min-h-screen bg-gray-100">
      <ImageGallery images={images} />
    </main>
  );
}
