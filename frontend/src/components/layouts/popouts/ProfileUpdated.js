import { useAuth } from "../../../contexts/AuthContext"
import CheckIcon from "../../../images/check.png"

export default function SignInMessage() {
    const { profileUpdateSuccess } = useAuth();

    return (
        profileUpdateSuccess && (
            <div className="fixed top-16 w-screen h-12 flex justify-around z-1">
                <div className="rounded w-1/4 min-w-60 h-full bg-green-100 border border-green-600/50 z-10">
                <div className="flex">
                    <div className="ml-3 mt-3">
                        <img src={CheckIcon} alt='' className="w-5"/>
                    </div>
                    <div className="ml-3 mt-3">
                    <h3 className="text-sm font-medium text-green-600">
                        Profile updated!
                    </h3>
                    </div>
                </div>
                </div>
            </div>
        )
    )
}