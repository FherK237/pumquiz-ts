import { useAuth } from "../context/AuthContext"
import AddTrivia from "../components/AddTrivia"


export default function AddTriviaPage() {
  const { user } = useAuth();
  return (
    <div className="bg-gray-50 px-4 py-8 rounded-2xl m-5">
      <h1>AGREGAR TRIVIA</h1>
        <div>
          {user?.role === 'ADMIN' && (
            <AddTrivia/>
          )}
        </div>
      
      
    </div>

  )

}