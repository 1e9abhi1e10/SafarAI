import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import axios from "axios";
import 'react-datepicker/dist/react-datepicker.css';
import { TravelItinerary } from "../model/ItineraryResponse";
import { useNavigate } from 'react-router-dom';
import Lottie from "lottie-react";
import travelLoaderAnimation from "../assets/loading_.json"
import { Card } from "../components/ui/card";

export default function PlannerPage() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [destinationPlace, setDestinationPlace] = useState('');
  const [budget, setBudget] = useState('');
  const [travelStyle, setTravelStyle] = useState('');
  const [interestsNew, setInterestsNew] = useState('Nature,Adventure,Famous Landmarks');
  const [accommodationType, setAccommodationType] = useState('Hotel');
  const [transportationType, setTransportationType] = useState('Public Transport');
  const [activityType, setActivityType] = useState('');
  const [cuisineType, setCuisineType] = useState('');
  const [tripDuration, setTripDuration] = useState('');
  const [language, setLanguage] = useState('English');
  const navigate = useNavigate(); // Hook to navigate
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('token');
  console.log('Retrieved Token:', token);

  const [selectedBadges, setSelectedBadges] = useState([]);
  const countDays = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading animation

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/getPlaces`,
        {
          destinationCountry: destinationPlace,
          budget,
          travelStyle,
          interestsNew,
          accommodationType,
          transportationType,
          activityType,
          cuisineType,
          tripDuration,
          language
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      const itineraryData = new TravelItinerary(response.data);
      setItinerary(itineraryData);
      if (itineraryData) {
        const serializedData = encodeURIComponent(JSON.stringify(extractJsonString(itineraryData.choices[0].message.content)));
        navigate(`/travel?data=${serializedData}`);
      }
    } catch (error) {
      console.error('Error fetching itinerary:', error);
    } finally {
      setLoading(false); // Stop loading animation
    }
  };

  const LoadingAnimation = () => {
    return (
      <div className="flex items-center justify-center">
        <Lottie
          animationData={travelLoaderAnimation}
          loop
          play
          className="w-60 h-60" // Adjust size as needed
        />
      </div>
    );
  };

  const handleBadgeClick = (badge) => {
    const newSelectedBadges = selectedBadges.includes(badge)
      ? selectedBadges.filter((item) => item !== badge)
      : [...selectedBadges, badge];
    
    setSelectedBadges(newSelectedBadges);
    setActivityType(newSelectedBadges.join(', '));
  };

  const [peopleCount, setPeopleCount] = useState(1);

  const increaseCount = (e) => {
    e.preventDefault();
    setPeopleCount(prevCount => prevCount + 1);
  };

  const decreaseCount = (e) => {
    e.preventDefault();
    setPeopleCount(prevCount => Math.max(prevCount - 1, 1)); // Ensure the count doesn't go below 1
  };

  const badgeData = [
    { id: 'kidFriendly', icon: <BabyIcon className="mr-2 h-4 w-4" />, label: 'Kid Friendly' },
    { id: 'museums', icon: <LibraryIcon className="mr-2 h-4 w-4" />, label: 'Museums' },
    { id: 'shopping', icon: <ShoppingCartIcon className="mr-2 h-4 w-4" />, label: 'Shopping' },
    { id: 'historical', icon: <CalendarIcon className="mr-2 h-4 w-4" />, label: 'Historical' },
    { id: 'outdoorAdventures', icon: <MountainIcon className="mr-2 h-4 w-4" />, label: 'Outdoor Adventures' },
    { id: 'artCultural', icon: <PaletteIcon className="mr-2 h-4 w-4" />, label: 'Art & Cultural' },
    { id: 'amusementParks', icon: <RollerCoasterIcon className="mr-2 h-4 w-4" />, label: 'Amusement Parks' },
  ];

  const imageUri = "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.dev/svgjs' width='1432' height='560' preserveAspectRatio='none' viewBox='0 0 1432 560'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1041%26quot%3b)' fill='none'%3e%3cpath d='M1036.419%2c411.391C1070.158%2c410.491%2c1102.687%2c398.596%2c1121.67%2c370.689C1143.468%2c338.643%2c1156.188%2c297.071%2c1137.142%2c263.317C1117.864%2c229.153%2c1075.621%2c218.186%2c1036.419%2c219.603C999.918%2c220.923%2c966.357%2c238.851%2c947.566%2c270.171C928.195%2c302.457%2c922.861%2c343.587%2c942.912%2c375.455C961.971%2c405.747%2c1000.643%2c412.345%2c1036.419%2c411.391' fill='rgba(28%2c 83%2c 142%2c 0.4)' class='triangle-float1'%3e%3c/path%3e%3cpath d='M799.5394756077759-50.329848635791166L656.6028458657114-22.545782359425058 684.3869121420776 120.39084738263941 827.3235418841421 92.6067811062733z' fill='rgba(28%2c 83%2c 142%2c 0.4)' class='triangle-float3'%3e%3c/path%3e%3cpath d='M1012.016%2c288.68C1055.552%2c289.318%2c1096.036%2c266.887%2c1118.658%2c229.684C1142.222%2c190.931%2c1146.549%2c142.792%2c1124.986%2c102.891C1102.364%2c61.031%2c1059.598%2c32.174%2c1012.016%2c32.352C964.712%2c32.529%2c922.379%2c61.791%2c900.498%2c103.73C880.118%2c142.793%2c887.902%2c188.904%2c910.653%2c226.636C932.577%2c262.997%2c969.562%2c288.058%2c1012.016%2c288.68' fill='rgba(28%2c 83%2c 142%2c 0.4)' class='triangle-float3'%3e%3c/path%3e%3cpath d='M1149.21 451.07 a148.67 148.67 0 1 0 297.34 0 a148.67 148.67 0 1 0 -297.34 0z' fill='rgba(28%2c 83%2c 142%2c 0.4)' class='triangle-float3'%3e%3c/path%3e%3cpath d='M930.63 421.68 a98.51 98.51 0 1 0 197.02 0 a98.51 98.51 0 1 0 -197.02 0z' fill='rgba(28%2c 83%2c 142%2c 0.4)' class='triangle-float3'%3e%3c/path%3e%3cpath d='M423.28 378.73 a144.24 144.24 0 1 0 288.48 0 a144.24 144.24 0 1 0 -288.48 0z' fill='rgba(28%2c 83%2c 142%2c 0.4)' class='triangle-float3'%3e%3c/path%3e%3cpath d='M471.844%2c102.833C502.693%2c102.139%2c525.213%2c76.214%2c539.118%2c48.667C551.53%2c24.077%2c550.621%2c-3.892%2c538.101%2c-28.427C524.144%2c-55.778%2c502.55%2c-83.262%2c471.844%2c-83.171C441.235%2c-83.08%2c420.786%2c-54.982%2c406.267%2c-28.035C392.681%2c-2.82%2c386.283%2c26.21%2c399.114%2c51.817C413.333%2c80.193%2c440.113%2c103.547%2c471.844%2c102.833' fill='rgba(28%2c 83%2c 142%2c 0.4)' class='triangle-float3'%3e%3c/path%3e%3cpath d='M964.6787919463916 279.831816178311L823.2064433007587 277.2275376204228 881.2753973183487 386.4393562562836z' fill='rgba(28%2c 83%2c 142%2c 0.4)' class='triangle-float3'%3e%3c/path%3e%3cpath d='M28.58 71.96 a170.94 170.94 0 1 0 341.88 0 a170.94 170.94 0 1 0 -341.88 0z' fill='rgba(28%2c 83%2c 142%2c 0.4)' class='triangle-float3'%3e%3c/path%3e%3cpath d='M704.61 501.11 a138.59 138.59 0 1 0 277.18 0 a138.59 138.59 0 1 0 -277.18 0z' fill='rgba(28%2c 83%2c 142%2c 0.4)' class='triangle-float1'%3e%3c/path%3e%3cpath d='M207.418%2c730.765C264.404%2c730.842%2c303.23%2c679.872%2c331.284%2c630.27C358.77%2c581.672%2c376.41%2c525.506%2c351.871%2c475.356C324.441%2c419.297%2c269.826%2c376.611%2c207.418%2c377.125C145.72%2c377.633%2c94.072%2c422.245%2c67.027%2c477.702C43.037%2c526.895%2c57.578%2c582.077%2c84.129%2c629.937C111.733%2c679.694%2c150.517%2c730.688%2c207.418%2c730.765' fill='rgba(28%2c 83%2c 142%2c 0.4)' class='triangle-float1'%3e%3c/path%3e%3cpath d='M94.93253815230075 268.9065557899094L100.07435248133744 121.66425832988952-47.167944978682456 116.52244400085283-52.30975930771915 263.7647414608727z' fill='rgba(28%2c 83%2c 142%2c 0.4)' class='triangle-float3'%3e%3c/path%3e%3cpath d='M601.709%2c263.803C634.236%2c262.191%2c660.203%2c239.141%2c675.629%2c210.459C690.17%2c183.422%2c691.142%2c151.579%2c676.61%2c124.537C661.225%2c95.908%2c634.206%2c73.444%2c601.709%2c72.907C568.39%2c72.356%2c539.602%2c93.452%2c522.391%2c121.987C504.519%2c151.618%2c497.021%2c188.271%2c513.912%2c218.471C531.144%2c249.28%2c566.451%2c265.55%2c601.709%2c263.803' fill='rgba(28%2c 83%2c 142%2c 0.4)' class='triangle-float1'%3e%3c/path%3e%3cpath d='M1022.0359496170752 381.229275538853L1076.8440429847142 484.30830725054443 1179.9230746964056 429.5002138829054 1125.1149813287666 326.421182171214z' fill='rgba(28%2c 83%2c 142%2c 0.4)' class='triangle-float1'%3e%3c/path%3e%3cpath d='M1160.59 146.11 a168.9 168.9 0 1 0 337.8 0 a168.9 168.9 0 1 0 -337.8 0z' fill='rgba(28%2c 83%2c 142%2c 0.4)' class='triangle-float2'%3e%3c/path%3e%3cpath d='M550.0073098915153-13.317292108267978L477.497664873276 43.33345132758682 606.6580533273701 59.19235290997136z' fill='rgba(28%2c 83%2c 142%2c 0.4)' class='triangle-float3'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1041'%3e%3crect width='1432' height='560' fill='white'%3e%3c/rect%3e%3c/mask%3e%3cstyle%3e %40keyframes float1 %7b 0%25%7btransform: translate(0%2c 0)%7d 50%25%7btransform: translate(-10px%2c 0)%7d 100%25%7btransform: translate(0%2c 0)%7d %7d .triangle-float1 %7b animation: float1 5s infinite%3b %7d %40keyframes float2 %7b 0%25%7btransform: translate(0%2c 0)%7d 50%25%7btransform: translate(-5px%2c -5px)%7d 100%25%7btransform: translate(0%2c 0)%7d %7d .triangle-float2 %7b animation: float2 4s infinite%3b %7d %40keyframes float3 %7b 0%25%7btransform: translate(0%2c 0)%7d 50%25%7btransform: translate(0%2c -10px)%7d 100%25%7btransform: translate(0%2c 0)%7d %7d .triangle-float3 %7b animation: float3 6s infinite%3b %7d %3c/style%3e%3c/defs%3e%3c/svg%3e";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4"
      style={{
        backgroundImage: `url(./bg1.svg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <h1 className="text-2xl font-bold text-center mb-4">Plan your next adventure</h1>
      <Card className="relative w-full max-w-3xl p-6 bg-white bg-opacity-100">
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="city">Where do you want to go?</Label>
              <Select
                id="city"
                value={destinationPlace}
                onValueChange={(value) => setDestinationPlace(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a city" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="delhi">Delhi</SelectItem>
                  <SelectItem value="mumbai">Mumbai</SelectItem>
                  <SelectItem value="bangalore">Bangalore</SelectItem>
                  <SelectItem value="goa">Goa</SelectItem>
                  <SelectItem value="paris">Paris</SelectItem>
                  <SelectItem value="london">London</SelectItem>
                  <SelectItem value="Punjab">Punjab</SelectItem>
                  <SelectItem value="new-york">New York</SelectItem>
                  <SelectItem value="los-angeles">Los Angeles</SelectItem>
                  <SelectItem value="chicago">Chicago</SelectItem>
                  <SelectItem value="san-francisco">San Francisco</SelectItem>
                  <SelectItem value="seattle">Seattle</SelectItem>
                  <SelectItem value="miami">Miami</SelectItem>
                  <SelectItem value="las-vegas">Las Vegas</SelectItem>
                  <SelectItem value="orlando">Orlando</SelectItem>
                  <SelectItem value="hawaii">Hawaii</SelectItem>
                  <SelectItem value="tokyo">Tokyo</SelectItem>
                  <SelectItem value="kyoto">Kyoto</SelectItem>
                  <SelectItem value="osaka">Osaka</SelectItem>
                  <SelectItem value="nara">Nara</SelectItem>
                  <SelectItem value="hokkaido">Hokkaido</SelectItem>
                  <SelectItem value="okinawa">Okinawa</SelectItem>
                  <SelectItem value="seoul">Seoul</SelectItem>
                  <SelectItem value="busan">Busan</SelectItem>
                  <SelectItem value="jeju">Jeju</SelectItem>
                  <SelectItem value="jeonju">Jeonju</SelectItem>
                  <SelectItem value="gangneung">Gangneung</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="budget">What's your budget?</Label>
              <Input
                id="budget"
                type="number"
                placeholder="Enter your budget in $"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cuisine">What kind of cuisine do you prefer?</Label>
              <Select
                id="cuisine"
                value={cuisineType}
                onValueChange={(value) => setCuisineType(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select cuisine type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="american">American</SelectItem>
                  <SelectItem value="italian">Italian</SelectItem>
                  <SelectItem value="asian">Asian</SelectItem>
                  <SelectItem value="mexican">Mexican</SelectItem>
                  <SelectItem value="vegetarian">Vegetarian</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="travel-style">What kind of travel style do you prefer?</Label>
              <Select
                id="travel-style"
                value={travelStyle}
                onValueChange={(value) => setTravelStyle(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select travel style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="adventure">Adventure</SelectItem>
                  <SelectItem value="relaxation">Relaxation</SelectItem>
                  <SelectItem value="cultural">Cultural</SelectItem>
                  <SelectItem value="family">Family</SelectItem>
                  <SelectItem value="solo">Solo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Select the kind of activities you want to do</Label>
              <div className="flex flex-wrap gap-2">
                {badgeData.map((badge) => (
                  <Badge
                    key={badge.id}
                    variant={selectedBadges.includes(badge.id) ? 'default' : 'secondary'}
                    className={selectedBadges.includes(badge.id) ? 'opacity-100' : 'opacity-50'}
                    onClick={() => handleBadgeClick(badge.id)}
                  >
                    {badge.icon}
                    {badge.label}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          <div className="flex-1 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="start-date">When do you want to go?</Label>
              <div className="flex space-x-2">
                <Input
                  id="start-date"
                  type="date"
                  placeholder="Start Date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <Input
                  id="end-date"
                  type="date"
                  placeholder="End Date"
                  value={endDate}
                  onChange={(e) => {
                    setEndDate(e.target.value);
                    setTripDuration(countDays(startDate, e.target.value));
                  }}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="people">How many people are going?</Label>
              <div className="flex items-center space-x-2">
                <Button variant="outline" onClick={decreaseCount}>-</Button>
                <Input
                  id="people"
                  value={peopleCount}
                  readOnly
                  className="w-12 text-center"
                />
                <Button variant="outline" onClick={increaseCount}>+</Button>
                <span>Person{peopleCount > 1 ? 's' : ''}</span>
              </div>
            </div>
            {/* Empty div to take up vertical space */}
            <div className="flex-1"></div>
          </div>
        </form>
        <Button type="submit" className="w-full bg-green-600 text-white mt-6" onClick={handleSubmit}>Create New Trip</Button>
        <p className="mt-4 text-sm text-center text-muted-foreground">
          By clicking Create New Trip, you agree to our{" "}
          <a href="#" className="text-red-500">
            Terms and Conditions
          </a>{" "}
          and{" "}
          <a href="#" className="text-red-500">
            Privacy Policy
          </a>
          .
        </p>
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-60">
            <LoadingAnimation />
          </div>
        )}
      </Card>
    </div>
  );
  

}


// SVG Icons as Functional Components
function BabyIcon(props) {
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
      <path d="M9 12h.01" />
      <path d="M15 12h.01" />
      <path d="M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5" />
      <path d="M19 6.3a9 9 0 0 1 1.8 3.9 2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1" />
    </svg>
  );
}

function CalendarIcon(props) {
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
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}

function extractJsonString(inputString) {
  let startIndex = inputString.indexOf('{');
  if (startIndex === -1) return null; // No opening brace found

  let endIndex = startIndex;
  let braceCount = 0;

  for (let i = startIndex; i < inputString.length; i++) {
    if (inputString[i] === '{') {
      braceCount++;
    } else if (inputString[i] === '}') {
      braceCount--;
      if (braceCount === 0) {
        endIndex = i;
        break;
      }
    }
  }

  if (braceCount !== 0) return null; // Unmatched braces

  return inputString.substring(startIndex, endIndex + 1);
}



function LibraryIcon(props) {
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
      <path d="m16 6 4 14" />
      <path d="M12 6v14" />
      <path d="M8 8v12" />
      <path d="M4 4v16" />
    </svg>
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

function PaletteIcon(props) {
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
      <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
      <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
      <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
      <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
    </svg>
  );
}

function PlusIcon(props) {
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
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function RollerCoasterIcon(props) {
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
      <path d="M6 19V5" />
      <path d="M10 19V6.8" />
      <path d="M14 19v-7.8" />
      <path d="M18 5v4" />
      <path d="M18 19v-6" />
      <path d="M22 19V9" />
      <path d="M2 19V9a4 4 0 0 1 4-4c2 0 4 1.33 6 4s4 4 6 4a4 4 0 1 0-3-6.65" />
    </svg>
  );
}

function ShoppingCartIcon(props) {
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
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  );
}
