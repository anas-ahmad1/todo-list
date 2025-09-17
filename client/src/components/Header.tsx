"use client";

interface HeaderProps {
  onAddTask: () => void;
  showAddForm: boolean;
}

const Header = ({ onAddTask, showAddForm }: HeaderProps) => {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">TASKS</h1>
        <button
          onClick={onAddTask}
          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
        >
          {showAddForm ? "Cancel" : "Add Task"}
        </button>
      </div>
    </div>
  );
};

export default Header;
