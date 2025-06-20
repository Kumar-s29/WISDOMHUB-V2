// import React, { useContext, useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { AppContext } from "../context/AppContext";
// import { assets } from "../assets/assets";
// import RelatedMentors from "../components/RelatedMentors";
// import { toast } from "react-toastify";
// import axios from "axios";

// const Appointment = () => {
//   const { menId } = useParams();
//   const { mentors, currencySymbol, backendUrl, token, GetMentorsData } =
//     useContext(AppContext);
//   const daysOfSlots = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
//   const navigate = useNavigate();
//   const [menInfo, setMenInfo] = useState(null);

//   const [menSlots, setMenSlots] = useState([]);
//   const [slotIndex, setSlotIndex] = useState(0);
//   const [slotTime, setSlotTime] = useState("");

//   const getAvailableSlots = async () => {
//     const slots = [];

//     // getting current date
//     const today = new Date();

//     // getting next 7 days
//     for (let i = 0; i < 7; i++) {
//       // getting date with index
//       let currentDate = new Date(today);
//       currentDate.setDate(today.getDate() + i);

//       // setting end time of the date with index
//       let endTime = new Date();
//       endTime.setDate(today.getDate() + i);
//       endTime.setHours(21, 0, 0, 0);

//       // setting hours
//       if (today.getDate() === currentDate.getDate()) {
//         currentDate.setHours(
//           currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
//         );
//         currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
//       } else {
//         currentDate.setHours(10);
//         currentDate.setMinutes(0);
//       }

//       let timeSlots = [];

//       while (currentDate < endTime) {
//         let formattedTime = currentDate.toLocaleTimeString([], {
//           hour: "2-digit",
//           minute: "2-digit",
//         });

//         let day = currentDate.getDate();
//         let month = currentDate.getMonth() + 1;
//         let year = currentDate.getFullYear();

//         const slotDate = day + "_" + month + "_" + year;
//         const slotTime = formattedTime;

//         const isSlotAvvalable =
//           menInfo.slots_booked[slotDate] &&
//           menInfo.slots_booked[slotDate].includes(slotTime)
//             ? false
//             : true;

//         if (isSlotAvvalable) {
//           // add slot to array
//           timeSlots.push({
//             datetime: new Date(currentDate),
//             time: formattedTime,
//           });
//         }

//         // incrementing 30 minutes
//         currentDate.setMinutes(currentDate.getMinutes() + 30);
//       }

//       slots.push(timeSlots);
//     }
//     setMenSlots(slots);
//   };

//   const bookAppointment = async () => {
//     if (!token) {
//       toast.warn("Please login to book an appointment.");
//       return navigate("/login");
//     }
//     try {
//       const date = menSlots[slotIndex][0].datetime;
//       let day = date.getDate();
//       let month = date.getMonth() + 1;
//       let year = date.getFullYear();

//       const slotDate = day + "_" + month + "_" + year;

//       const { data } = await axios.post(
//         backendUrl + "/api/user/book-appointment",
//         {
//           userId: token,
//           menId: menId,
//           slotDate,
//           slotTime,
//         },
//         {
//           hwaders: {
//             token,
//           },
//         }
//       );
//       if (data.success) {
//         toast.success("Appointment booked successfully.");
//         GetMentorsData();
//         navigate("/my-appointments");
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.error("Error booking appointment:", error);
//       toast.error("Failed to book appointment.", error.message);
//     }
//   };

//   useEffect(() => {
//     if (mentors && menId) {
//       const menInfo = mentors.find((doc) => String(doc._id) === String(menId));
//       setMenInfo(menInfo);
//     }
//   }, [mentors, menId]);

//   useEffect(() => {
//     if (menInfo) {
//       getAvailableSlots();
//     }
//   }, [menInfo]);

//   if (!menInfo) {
//     return <p>Doctor not found.</p>;
//   }

//   return (
//     menInfo && (
//       <div>
//         {/* // ---------Mentor Details--------------- */}
//         <div className="flex flex-col sm:flex-row gap-4">
//           <div>
//             <img
//               className="bg-primary w-full sm:max-w-72 rounded-lg"
//               src={menInfo.image}
//               alt={menInfo.name || "Mentor"}
//             />
//           </div>
//           <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
//             <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
//               {menInfo.name}
//             </p>
//             <img className="w-5" src={assets.verified_icon} alt="" />
//             <div className="flex items-center gap-2 text-sm mt-1 text-gray-600 ">
//               <p>
//                 {menInfo.degree} - {menInfo.speciality}
//               </p>
//               <button className="py-0.5 px-2 border text-xs rounded-full ">
//                 {menInfo.experience}
//               </button>
//             </div>
//             {/* ---------Mentor About--------------- */}
//             <div>
//               <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
//                 About <img src={assets.info_icon} alt="" />{" "}
//               </p>
//               <p className="text-sm text-gray-500 max-w-[700px] mt-1">
//                 {menInfo.about}
//               </p>
//             </div>
//             <p className="text-gray-500 font-medium mt-4">
//               Appointment fee:{" "}
//               <span className="text-gray-600">
//                 {currencySymbol}
//                 {menInfo.fees}
//               </span>
//             </p>
//           </div>
//         </div>
//         {/* // ---------Appointment Slots--------------- */}
//         <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
//           <p>Booking Slots</p>
//           <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
//             {menSlots.length > 0 &&
//               menSlots.map((daySlots, index) => (
//                 <div
//                   onClick={() => setSlotIndex(index)}
//                   className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
//                     slotIndex === index
//                       ? "bg-primary text-white"
//                       : "border border-gray-200"
//                   }`}
//                   key={index}
//                 >
//                   <p>
//                     {daySlots[0] && daysOfSlots[daySlots[0].datetime.getDay()]}
//                   </p>
//                   <p>{daySlots[0] && daySlots[0].datetime.getDate()}</p>
//                 </div>
//               ))}
//           </div>
//           <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
//             {menSlots.length &&
//               menSlots[slotIndex].map((item, index) => (
//                 <p
//                   onClick={() => setSlotTime(item.time)}
//                   className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
//                     item.time === slotTime
//                       ? "bg-primary text-white"
//                       : "text-gray-400 border border-gray-300"
//                   }`}
//                   key={index}
//                 >
//                   {item.time.toLowerCase()}
//                 </p>
//               ))}
//           </div>
//           <button
//             onClick={bookAppointment}
//             className="bg-primary text-white text-sm font-light px-14 py-3 rounded-full"
//           >
//             Book an Session
//           </button>
//         </div>
//         {/* Listing related mentors
//          */}
//         <RelatedMentors menId={menId} speciality={menInfo.speciality} />
//       </div>
//     )
//   );
// };

// export default Appointment;
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import RelatedMentors from "../components/RelatedMentors";
import { toast } from "react-toastify";
import axios from "axios";

const Appointment = () => {
  const { menId } = useParams();
  const { mentors, currencySymbol, backendUrl, token, GetMentorsData } =
    useContext(AppContext);
  const daysOfSlots = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const navigate = useNavigate();
  const [menInfo, setMenInfo] = useState(null);
  const [menSlots, setMenSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  // Function to fetch available slots
  const getAvailableSlots = () => {
    if (!menInfo) return;

    const slots = [];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0);

      if (i === 0) {
        currentDate.setHours(Math.max(currentDate.getHours() + 1, 10));
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        let slotDate = `${currentDate.getDate()}_${
          currentDate.getMonth() + 1
        }_${currentDate.getFullYear()}`;

        let isSlotAvailable =
          !menInfo.slots_booked ||
          !menInfo.slots_booked[slotDate] ||
          !menInfo.slots_booked[slotDate].includes(formattedTime);

        if (isSlotAvailable) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime,
          });
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      slots.push(timeSlots);
    }
    setMenSlots(slots);
  };

  // Function to book an appointment
  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Please login to book an appointment.");
      return navigate("/login");
    }

    if (!menSlots[slotIndex] || !slotTime) {
      toast.error("Please select a valid slot.");
      return;
    }

    try {
      const date = menSlots[slotIndex][0].datetime;
      const slotDate = `${date.getDate()}_${
        date.getMonth() + 1
      }_${date.getFullYear()}`;

      const { data } = await axios.post(
        `${backendUrl}/api/user/book-appointment`,
        {
          userId: token,
          menId: menId,
          slotDate,
          slotTime,
        },
        {
          headers: {
            token,
          },
        }
      );

      if (data.success) {
        toast.success("Appointment booked successfully.");
        GetMentorsData();
        navigate("/my-appointments");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
      toast.error("Failed to book appointment.");
    }
  };

  useEffect(() => {
    if (mentors && menId) {
      const doctor = mentors.find((doc) => String(doc._id) === String(menId));
      setMenInfo(doctor);
    }
  }, [mentors, menId]);

  useEffect(() => {
    if (menInfo) {
      getAvailableSlots();
    }
  }, [menInfo]);

  if (!menInfo) {
    return <p>Mentor not found.</p>;
  }

  return (
    <div>
      {/* Mentor Details */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div>
          <img
            className="bg-primary w-full sm:max-w-72 rounded-lg"
            src={menInfo.image}
            alt={menInfo.name || "Mentor"}
          />
        </div>
        <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
          <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
            {menInfo.name}
          </p>
          <img className="w-5" src={assets.verified_icon} alt="" />
          <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
            <p>
              {menInfo.degree} - {menInfo.speciality}
            </p>
            <button className="py-0.5 px-2 border text-xs rounded-full">
              {menInfo.experience}
            </button>
          </div>
          <p className="text-gray-500 font-medium mt-4">
            Appointment fee:{" "}
            <span className="text-gray-600">
              {currencySymbol}
              {menInfo.fees}
            </span>
          </p>
        </div>
      </div>

      {/* Appointment Slots */}
      <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
        <p>Booking Slots</p>
        <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
          {menSlots.map((daySlots, index) => (
            <div
              key={index}
              onClick={() => setSlotIndex(index)}
              className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                slotIndex === index
                  ? "bg-primary text-white"
                  : "border border-gray-200"
              }`}
            >
              <p>{daysOfSlots[daySlots[0]?.datetime.getDay()]}</p>
              <p>{daySlots[0]?.datetime.getDate()}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
          {menSlots[slotIndex]?.map((item, index) => (
            <p
              key={index}
              onClick={() => setSlotTime(item.time)}
              className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
                item.time === slotTime
                  ? "bg-primary text-white"
                  : "text-gray-400 border border-gray-300"
              }`}
            >
              {item.time.toLowerCase()}
            </p>
          ))}
        </div>

        <button
          onClick={bookAppointment}
          className="bg-primary text-white text-sm font-light px-14 py-3 rounded-full"
        >
          Book a Session
        </button>
      </div>

      {/* Related Mentors */}
      <RelatedMentors menId={menId} speciality={menInfo.speciality} />
    </div>
  );
};

export default Appointment;
