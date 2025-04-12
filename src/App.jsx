import { useState, useEffect, useRef } from "react";
import "./App.css";
import config from "./config";
import Swal from "sweetalert2";
import axios from "axios";
import { Heart, ChevronLeft, ChevronRight, Gift } from "lucide-react";
import confetti from "canvas-confetti";

function App() {
  const [images, setImages] = useState([
    "/4E9FF4A1-29FC-4BF6-A136-FB0F701A0098.jpg",
    "/IMG_2384.JPG",
    "/IMG_2382.JPG",
    "/IMG_1793.JPG",
    "/IMG_9912.PNG",
    "/IMG_3113.JPG",
    "/IMG_8373.JPG",
    "/IMG_2387.JPG",
  ]);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const carouselRef = useRef(null);
  const [videoVisible, setVideoVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            triggerConfetti();
            setVideoVisible(true);
          }
        });
      },
      { threshold: 0.5 }
    );

    const videoSection = document.getElementById("video-section");
    if (videoSection) {
      observer.observe(videoSection);
    }

    return () => {
      if (videoSection) {
        observer.unobserve(videoSection);
      }
    };
  }, []);

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const scrollToNext = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({
        left: carouselRef.current.scrollLeft + 300,
        behavior: "smooth",
      });
    }
  };

  const scrollToPrev = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({
        left: carouselRef.current.scrollLeft - 300,
        behavior: "smooth",
      });
    }
  };

  const showBirthdayMessage = () => {
    Swal.fire({
      title: "ยูกิก็มา Happy Birthday ด้วยนะ !!",
      text: "u i i r i u u i i r i",
      imageUrl: "/yuki.png",
      imageWidth: 200,
      imageHeight: 200,
      confirmButtonText: "Meaow",
      background: "linear-gradient(to right, #87CEEB, #B0C4DE)",
      backdrop: `
    rgba(0,0,123,0.4)
    url("https://sweetalert2.github.io/images/nyan-cat.gif")
    left top
    no-repeat
  `,
      color: "#fff",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-100">
      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(/IMG_2387.JPG)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.6) blur(4px)",
          }}
        ></div>
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-pulse">
            Happy Birthday To <span className="text-pink-300">Meng</span>!
          </h1>
          <p className="text-xl md:text-2xl text-white mb-8">
            Today is all about celebrating you 🎉🎂
          </p>
          <button
            onClick={showBirthdayMessage}
            className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition hover:scale-105 flex items-center mx-auto"
          >
            <Gift className="mr-2 animate-bounce" size={20} />
            เหม่งมาดูนี่ๆๆๆๆ
          </button>
        </div>
      </header>

      {/* Photo Gallery Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            Our <span className="text-pink-500">Beautiful</span> Memories
          </h2>

          <div className="relative">
            <button
              onClick={scrollToPrev}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
            >
              <ChevronLeft size={24} className="text-pink-500" />
            </button>

            <div
              ref={carouselRef}
              className="flex overflow-x-auto gap-4 pb-4 hide-scrollbar snap-x"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {images.map((image, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-72 h-80 snap-center rounded-lg overflow-hidden shadow-lg transform transition hover:scale-105"
                >
                  <img
                    src={image}
                    alt={`Memory ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            <button
              onClick={scrollToNext}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
            >
              <ChevronRight size={24} className="text-pink-500" />
            </button>
          </div>
        </div>
      </section>

      {/* Birthday Message Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-purple-200 via-pink-200 to-red-200">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative bg-white p-8 md:p-12 rounded-xl shadow-2xl">
            <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
              <Heart className="text-pink-500 w-10 h-10 fill-current" />
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
              My Birthday Wish For You
            </h2>

            <p className="text-lg md:text-xl text-gray-600 mb-6 leading-relaxed">
              ปีนี้อายุ 22 ขวบแล้วนะเหม่งปีนี้จะได้เป็นพี่ปี 4 แล้วเก่งมาก ๆ เบย
              อ่าน นส. บ้างนอนดูซีรีย์บ้าง แต่ก็เกรดตึง เก่งฝุดๆ
              ปีนี้เหม่งเป็นพี่ใหญ่ในมอแล้วต้องเข้มแข็งมากๆนะ
              ถึงแม้ไม่มีเค้าพาไปกินข้าว พาไปซื้อของ พาไปขี่รถเล่น
              แต่เค้าเชื่อว่าเหม่งสามารถอยู่ได้แน่นอน เค้าเป็นกำลังใจให้นะ
              ชวนเพื่อนๆ ออกไปเที่ยวบ่อยๆ ด้วยละ จะได้ไม่เหงา
              มีอะไรโทรหาเค้าได้ตลอดเลยนะ เค้าจะอยู่กับเหม่งตรงนี้ไม่ไปไหนแน่นอน
              !! ที่ผ่านมาขอบคุณนะที่อยู่เคียงข้างเค้ามาตลอด
              ขอให้เหม่งสุขภาพร่างกายแข็งแรงอยู่กับเค้าไปนานนานนนน
              เค้าย้ากเหม่งมักๆ จุ้บๆ
            </p>

            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
              May this new year of your life be filled with joy, success, love,
              and all the beautiful things that you deserve. Happy Birthday, my
              love
            </p>

            <div className="flex justify-center space-x-2">
              {[...Array(5)].map((_, i) => (
                <Heart
                  key={i}
                  className="text-pink-500 w-6 h-6 fill-current animate-pulse"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section id="video-section" className="py-16 px-4 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Our <span className="text-pink-400">Special</span> Moments
          </h2>

          {videoVisible && (
            <div className="rounded-lg overflow-hidden shadow-2xl transform transition hover:scale-102 flex justify-center">
              <video
                className="h-auto max-h-screen w-auto"
                controls
              >
                <source src="video_hbd.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <div className="py-8 px-4 bg-gray-900 text-white text-center">
        <p>Made with ❤️ just for you</p>
        <p className="text-sm text-gray-400 mt-2">
          © {new Date().getFullYear()}
        </p>
      </div>

      <section className="py-16 px-4 bg-gradient-to-r from-purple-200 via-pink-200 to-red-200">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative bg-white p-8 md:p-12 rounded-xl shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
              ขอบคุณที่เกิดมานะ ❤️
            </h2>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
