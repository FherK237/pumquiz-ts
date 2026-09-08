import { useNavigate } from "react-router-dom";


export default function AddTrivia() {
  const navigate = useNavigate();
  // ... lógica que va creciendo
  return ( 
    <div className='fixed cursor-pointer w-16 h-16 bg-purple-500 rounded-full shadow-md flex items-center justify-center text-white font-bold text-3xl right-5 bottom-20 hover:bg-purple-400 transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg'
    onClick={() => navigate(`/add-trivia`)}
    >
      + asd
    </div>
  )
}