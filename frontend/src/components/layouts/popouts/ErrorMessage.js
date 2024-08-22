import { useAuth } from "../../../contexts/AuthContext";
import ErrorIcon from "../../../images/remove.png"

export default function ErrorMessage() {
  const { error, setError } = useAuth();

  return (
    error && (
      <div className="fixed top-2 w-full h-full flex justify-center z-10">
        <div className="rounded w-1/4 h-12 bg-red-50 flex items-centre border border-red-600/50">
        <div className="flex">
        <button 
            className="ml-3 hover:cursor-pointer"
            onClick={() => setError('')}
          >
            <img src={ErrorIcon} alt='' className="w-5"/>
          </button>
          <div className="ml-3 mt-3">
            <h3 className="text-sm font-medium text-red-600">
              Error: {error}
            </h3>
          </div>
        </div>
        </div>
      </div>
    )
  );
}