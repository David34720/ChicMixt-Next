import React from "react";

interface DisplayState {
  key: string;
  label: string;
}

interface AdminHeaderProps {
  displayState: DisplayState[];
  setDisplay: React.Dispatch<React.SetStateAction<string>>;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({
  displayState,
  setDisplay,
}) => {
  return (
    <nav className="bg-white shadow-md py-4">
      <div className="container-header mx-auto flex justify-center space-x-4">
        {displayState.map((state) => (
          <button
            key={state.key}
            onClick={() => setDisplay(state.key)}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded"
          >
            {state.label}
          </button>
        ))}
        <a href="/" className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded" target="_blank">Voir le site</a>
      </div>
    </nav>
  );
};

export default AdminHeader;
