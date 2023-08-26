// import React from 'react';
// import { GrSend } from '@react-icons/all-files/gr/GrSend';
// import sendBtn from '/public/send_btn.svg';
// import Image from 'next/image';
// import { RiSendPlaneFill } from '@react-icons/all-files/ri/RiSendPlaneFill';
// import { cn } from '@/utils/extendClass';
// import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
// type Props = {
//   input: string;
//   handleInputChange: (input: string) => void;
//   handleSubmit: () => void;
//   characterId : string;
// };

// const bg_colors = ['bg-bomi', 'bg-yermi', 'bg-gauri', 'bg-gyeouri'];

// export default function ChatFooter({
//   input,
//   handleInputChange,
//   handleSubmit,
//   characterId,
// }: Props) {
//   return (
//     <div className='w-full h-[calc(100vh*0.1)] px-6 py-4 flex justify-between items-center space-x-2 rounded-t-2xl bg-white shadow-2xl shadow-[#6d6d6dd9]'>
//       <form
//             onSubmit={handleSubmit}
//             className='flex justify-between items-center space-x-2'
//           >
//             <input
//               placeholder='입력'
//               className='grow border-none bg-[#F1F1F1] rounded-full h-10 pl-6'
//               value={input}
//               onChange={handleInputChange}
//             />
//             <button
//               className={cn(
//                 'rounded-full relative w-10 h-10 flex justify-center items-center',
//                 bg_colors[Number(characterId)]
//               )}
//               disabled={isLoading}
//               type='submit'
//             >
//               <PaperAirplaneIcon className='w-6 h-6 text-white' />
//             </button>
//           </form>
//     </div>
//   );
// }
