"use client";

// components/ImageGallery.tsx
import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface ImageGalleryProps {
  images: string[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openModal = (index: number) => {
    setCurrentIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const showPrevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const showNextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-wrap -mx-2">
        {images.map((image, index) => (
          <div key={index} className="lg:w-1/3 sm:w-1/2 w-full px-2 mb-4">
            <Image
              width={400}
              height={10}
              src={image}
              alt={`Image ${index + 1}`}
              className="cursor-pointer rounded-lg transition-transform duration-300 hover:scale-105 aspect-video object-cover"
              onClick={() => openModal(index)}
            />
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-3xl rounded-xl shadow-lg aspect-video overflow-hidden"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal content
          >
            <button
              className="absolute z-10 top-4 right-4 text-gray-300 hover:text-gray-400 duration-200"
              onClick={closeModal}
            >
              <X className="w-6 h-6" />
            </button>
            <div
              className="relative w-full h-full flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {images.map((image, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-full h-full relative"
                >
                  <Image
                    src={image}
                    alt={`Image ${index + 1}`}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>
              ))}
            </div>
            <button
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-700 hover:bg-slate-800 rounded-full p-2 duration-200"
              onClick={(e) => {
                e.stopPropagation();
                showPrevImage();
              }}
            >
              <ChevronLeft className="w-8 h-8 text-white" />
            </button>
            <button
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-700 hover:bg-slate-800 rounded-full p-2 duration-200"
              onClick={(e) => {
                e.stopPropagation();
                showNextImage();
              }}
            >
              <ChevronRight className="w-8 h-8 text-white" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
