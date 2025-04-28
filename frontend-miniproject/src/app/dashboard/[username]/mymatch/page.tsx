// "use client";

// import { useEffect, useState } from "react";
// import { useSearchParams } from "next/navigation";
// import axios from "@/lib/axios";
// import Image from "next/image";
// import Link from "next/link";
// import Marquee from "react-fast-marquee";

// interface IMatch {
//   id: number;
//   homeTeam: {
//     name: string;
//     flag: string;
//   };
//   awayTeam: {
//     name: string;
//     flag: string;
//   };
//   homeScore: number | null;
//   awayScore: number | null;
//   matchDate: string;
//   startTime: string;
//   endTime: string;
//   venue: string;
//   type: "upcoming" | "ended" | "friendly";
// }

// export default function MyMatchesPage() {
//   const [matches, setMatches] = useState<IMatch[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [tab, setTab] = useState<"upcoming" | "ended">("upcoming");

//   const searchParams = useSearchParams();
//   const searchQuery = searchParams.get("search")?.toLowerCase() || "";

//   useEffect(() => {
//     const fetchMatches = async () => {
//       try {
//         const response = await axios.get("/events");
//         setMatches(response.data.data);
//       } catch (error) {
//         console.error("Failed to fetch matches:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMatches();
//   }, []);

//   if (loading) {
//     return (
//       <div className="text-white text-center text-lg mt-10">Loading matches...</div>
//     );
//   }

//   const upcomingMatches = matches.filter(
//     (match) => new Date(match.matchDate) > new Date()
//   );

//   const filteredMatches = matches.filter((match) => {
//     const isUpcoming = new Date(match.matchDate) > new Date();
//     const matchesTab = tab === "upcoming" ? isUpcoming : !isUpcoming;
//     const matchesSearch =
//       match.homeTeam.name.toLowerCase().includes(searchQuery) ||
//       match.awayTeam.name.toLowerCase().includes(searchQuery);
//     return matchesTab && matchesSearch;
//   });

//   return (
//     <div className="p-5 md:p-10">
//       {/* Marquee for Upcoming Matches */}
//       {upcomingMatches.length > 0 && (
//         <>
//           <h2 className="text-2xl font-bold text-white mb-6 text-center">
//             Upcoming Matches
//           </h2>
//           <Marquee
//             direction="right"
//             pauseOnHover
//             gradient
//             gradientColor="rgb(0 0 0)"
//             gradientWidth={50}
//           >
//             <div className="flex gap-4 p-4">
//               {upcomingMatches.map((match) => (
//                 <div
//                   key={match.id}
//                   className="min-w-[300px] bg-purple-800 p-4 rounded-lg shadow-md flex flex-col items-center text-white"
//                 >
//                   <div className="flex items-center gap-2 mb-2">
//                     <Image
//                       src={match.homeTeam.flag}
//                       alt={match.homeTeam.name}
//                       width={40}
//                       height={30}
//                       className="rounded"
//                     />
//                     <span className="font-bold">{match.homeTeam.name}</span>
//                     <span className="font-bold">VS</span>
//                     <span className="font-bold">{match.awayTeam.name}</span>
//                     <Image
//                       src={match.awayTeam.flag}
//                       alt={match.awayTeam.name}
//                       width={40}
//                       height={30}
//                       className="rounded"
//                     />
//                   </div>
//                   <p className="text-sm">
//                     {new Date(match.matchDate).toLocaleDateString("en-US", {
//                       weekday: "short",
//                       day: "numeric",
//                       month: "short",
//                       year: "numeric",
//                     })}
//                   </p>
//                   <p className="text-xs">{match.startTime} - {match.endTime}</p>
//                   <p className="text-xs">{match.venue}</p>
//                 </div>
//               ))}
//             </div>
//           </Marquee>
//         </>
//       )}

//       {/* Tabs */}
//       <div className="flex gap-4 my-8 justify-center">
//         <button
//           onClick={() => setTab("upcoming")}
//           className={`px-6 py-2 rounded-full text-lg font-semibold transition-all ${
//             tab === "upcoming"
//               ? "bg-green-600 text-white"
//               : "bg-purple-700 text-white hover:bg-purple-800"
//           }`}
//         >
//           Upcoming Matches
//         </button>
//         <button
//           onClick={() => setTab("ended")}
//           className={`px-6 py-2 rounded-full text-lg font-semibold transition-all ${
//             tab === "ended"
//               ? "bg-green-600 text-white"
//               : "bg-purple-700 text-white hover:bg-purple-800"
//           }`}
//         >
//           Ended Matches
//         </button>
//       </div>

//       {/* Matches List */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         {filteredMatches.length > 0 ? (
//           filteredMatches.map((match) => (
//             <div
//               key={match.id}
//               className="rounded-2xl shadow-lg bg-purple-900 text-white overflow-hidden flex flex-col transition hover:scale-[1.02] hover:shadow-2xl"
//             >
//               <div className="flex justify-between items-center p-5">
//                 {/* Home Team */}
//                 <div className="flex flex-col items-center">
//                   <Image
//                     src={match.homeTeam.flag}
//                     alt={match.homeTeam.name}
//                     width={60}
//                     height={40}
//                     className="rounded"
//                   />
//                   <span className="mt-2 font-semibold">{match.homeTeam.name}</span>
//                 </div>

//                 {/* Score */}
//                 <div className="text-center">
//                   {match.homeScore !== null && match.awayScore !== null ? (
//                     <div className="text-4xl font-bold">
//                       {match.homeScore} - {match.awayScore}
//                     </div>
//                   ) : (
//                     <div className="text-2xl font-semibold">VS</div>
//                   )}
//                   {tab === "ended" && (
//                     <div className="text-sm mt-1 text-gray-300">Final</div>
//                   )}
//                 </div>

//                 {/* Away Team */}
//                 <div className="flex flex-col items-center">
//                   <Image
//                     src={match.awayTeam.flag}
//                     alt={match.awayTeam.name}
//                     width={60}
//                     height={40}
//                     className="rounded"
//                   />
//                   <span className="mt-2 font-semibold">{match.awayTeam.name}</span>
//                 </div>
//               </div>

//               {/* Match Info */}
//               <div className="bg-purple-800 p-5 flex flex-col gap-2">
//                 <h3 className="text-xl font-bold">{match.venue}</h3>
//                 <p className="text-sm text-gray-300">
//                   {new Date(match.matchDate).toLocaleDateString("en-US", {
//                     weekday: "long",
//                     day: "numeric",
//                     month: "long",
//                     year: "numeric",
//                   })}
//                 </p>
//                 <p className="text-sm text-gray-300">
//                   {match.startTime} - {match.endTime}
//                 </p>
//                 {tab === "upcoming" && (
//                   <Link href={`/tickets/${match.id}`} className="mt-4">
//                     <button className="w-full bg-green-600 hover:bg-green-700 transition-all py-2 rounded-full text-white font-semibold">
//                       Add Ticket
//                     </button>
//                   </Link>
//                 )}
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="text-white text-center col-span-full text-lg">
//             No matches found
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
