import { Fragment, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationIcon } from "@heroicons/react/outline";

import { useAuth } from "../../contexts/AuthContext";

export default function Logout({ modal, setModal }) {
  const cancelButtonRef = useRef(null);
  const navigate = useNavigate();

  const { logout, setError } = useAuth();

  async function handleLogout() {
    try {
      setError("");
      await logout();
      setModal(false);
      navigate("/login");
    } catch (e) {
      setError("Failed to logout");
    }
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
        <button
            type="button"
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={() => handleLogout()}
        >
            Logout
        </button>
        <button
            type="button"
            className="mt-3 w-full inline-flex justify-center shadow-sm px-4 py-2  sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm
            rounded-md border border-gray-300 bg-white text-gray-500 text-base font-medium hover:bg-gray-100 focus:outline-none focus:ring-gray-200 focus:ring-2 focus:ring-offset-2 hover:text-gray-900 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600
            "
            onClick={() => setModal(false)}
            ref={cancelButtonRef}
        >
            Cancel
        </button>
    </div>
  );
}