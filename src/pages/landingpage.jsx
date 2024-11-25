import { Link } from "react-router-dom";
import { Card } from "../components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "../components/ui/avatar";
import { useRef, useState, useEffect } from "react";

export function Header({ scrollToSection, refs }) {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center">
      <div className="flex items-center justify-center">
        <Link to="#">
          <MountainIcon className="h-6 w-6" />
          <span className="sr-only">AI Travel Planner</span>
        </Link>
      </div>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        {/* Update each nav item to call scrollToSection with the correct ref */}
        <div
          onClick={() => scrollToSection(refs.heroRef)}
          className="cursor-pointer text-sm font-medium hover:underline underline-offset-4"
        >
          Home
        </div>
        <div
          onClick={() => scrollToSection(refs.featuresRef)}
          className="cursor-pointer text-sm font-medium hover:underline underline-offset-4"
        >
          Features
        </div>
        <div
          onClick={() => scrollToSection(refs.testimonialsRef)}
          className="cursor-pointer text-sm font-medium hover:underline underline-offset-4"
        >
          Testimonials
        </div>
        <div
          onClick={() => scrollToSection(refs.contactRef)}
          className="cursor-pointer text-sm font-medium hover:underline underline-offset-4"
        >
          Contact
        </div>
      </nav>
    </header>
  );
}

export  function HeroSection() {
  return (
    <section className="w-full py-12 sm:py-24 lg:py-32 bg-gradient-to-r from-[#6366F1] to-[#EC4899]">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter text-white sm:text-5xl xl:text-6xl/none">
                Unlock the World with AI Travel Planner
              </h1>
              <p className="max-w-[600px] text-white/80 md:text-xl">
                Effortlessly plan your dream vacation with our AI-powered travel
                planner. Personalized itineraries, cost-saving recommendations,
                and explore the places on Google Maps
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link
                to="/signup"
                className="inline-flex h-10 items-center justify-center rounded-md bg-white px-8 text-sm font-medium text-[#6366F1] shadow transition-colors hover:bg-white/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                Get Started
              </Link>
            </div>
          </div>
          <img
            src="./Navigation.svg"
            width="550"
            height="550"
            alt="Hero"
            className="mx-auto aspect-square overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
          />
        </div>
      </div>
    </section>
  );
}

// components/FeaturesSection.jsx
export  function FeaturesSection() {
  const features = [
    {
      title: "Personalized Itineraries",
      description:
        "Our AI analyzes your preferences and creates a custom travel plan tailored to your needs.",
    },
    {
      title: "Cost-Saving Recommendations",
      description:
        "Discover the best deals on flights, hotels, and activities to maximize your travel budget.",
    },
    {
      title: "Real-Time Visualization",
      description:
        "Explore your destination with Google Maps integration and get directions to your favorite spots.",
    },
  ];

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter text-foreground sm:text-5xl">
              Effortless Travel Planning
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our AI-powered travel planner takes the hassle out of vacation
              planning. From personalized itineraries to cost-saving
              recommendations, we've got you covered.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
          <div className="relative max-w-full max-h-full overflow-hidden rounded-xl">
            <img
              src="./digital_nomad.svg"
              alt="Image"
              className="w-full h-auto object-contain"
            />
          </div>
          <div className="flex flex-col justify-center space-y-4">
            <ul className="grid gap-6">
              {features.map((feature) => (
                <li key={feature.title}>
                  <div className="grid gap-1">
                    <h3 className="text-xl font-bold text-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}



export  function TestimonialsSection() {
  const testimonials = [
    {
      name: "John Doe",
      title: "Satisfied Customer",
      feedback:
        "The AI travel planner made planning my vacation a breeze. I was able to find the perfect itinerary and save a ton of money on my trip.",
    },
    {
      name: "Jane Smith",
      title: "Happy Traveler",
      feedback:
        "I loved how easy it was to use the AI travel planner. It took care of everything, and I was able to relax and enjoy my vacation without any stress.",
    },
    {
      name: "David Lee",
      title: "Frequent Flyer",
      feedback:
        "The AI travel planner is a game-changer. It found the best deals on flights and hotels, and I saved so much time and money.",
    },
  ];

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter text-foreground sm:text-5xl">
              What Our Customers Say
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Hear from real people who have used our AI travel planner to plan
              their dream vacations.
            </p>
          </div>
          <div className="grid w-full max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name} className="p-6 bg-background shadow-sm">
                <div className="flex items-start space-x-4">
                  <Avatar>
                    <AvatarImage src="/placeholder-user.jpg" alt="User" />
                    <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <h4 className="text-lg font-semibold">{testimonial.name}</h4>
                    <p className="text-muted-foreground">{testimonial.title}</p>
                  </div>
                </div>
                <p className="mt-4 text-muted-foreground">{testimonial.feedback}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


export  function CallToActionSection() {
  return (
    <section className="w-full py-12 sm:py-24 lg:py-32 bg-gradient-to-r from-[#6366F1] to-[#EC4899]">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-5xl">
              Ready to Start Your Adventure?
            </h2>
            <p className="max-w-[900px] text-white/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Sign up today and experience the future of travel planning with
              our AI travel planner.
            </p>
          </div>
          <Link
            to="/signup"
            className="inline-flex h-10 items-center justify-center rounded-md bg-white px-8 text-sm font-medium text-[#6366F1] shadow transition-colors hover:bg-white/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          >
            Get Started
          </Link>
        </div>
      </div>
    </section>
  );
}

export  function Footer() {
  return (
    <footer className="flex h-24 items-center justify-center bg-white">
      <p className="text-sm text-gray-600">© 2024 AI Travel Planner. All rights reserved.</p>
    </footer>
  );
}

export default function LandingPage() {
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const testimonialsRef = useRef(null);
  const contactRef = useRef(null);

  const scrollToSection = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <Header
        scrollToSection={scrollToSection}
        refs={{ heroRef, featuresRef, testimonialsRef, contactRef }}
      />
      <main>
        <div ref={heroRef}>
          <HeroSection />
        </div>
        <div ref={featuresRef}>
          <FeaturesSection />
        </div>
        <div ref={testimonialsRef}>
          <TestimonialsSection />
        </div>
        <div ref={contactRef}>
          <CallToActionSection />
        </div>
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}


export  function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 p-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          ↑
        </button>
      )}
    </div>
  );
}




function MountainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
