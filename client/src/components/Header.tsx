"use client";

interface HeaderProps {
  onAddTask: () => void;
  showAddForm: boolean;
}

const Header = ({ onAddTask, showAddForm }: HeaderProps) => {
  return (
    <div className="px-6 py-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">TASKS</h1>
        <button
          onClick={onAddTask}
          className="px-4 py-2 primary-bg rounded-lg transition-colors"
        >
          {showAddForm ? "Cancel" : "Add Task"}
        </button>
      </div>
    </div>
  );
};

export default Header;
