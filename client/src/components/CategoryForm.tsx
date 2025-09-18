"use client";

interface CategoryFormData {
  name: string;
}

interface CategoryFormProps {
  formData: CategoryFormData;
  setFormData: (data: CategoryFormData) => void;
  onSubmit: () => void;
  errors: Record<string, string>;
}

const CategoryForm = ({
  formData,
  setFormData,
  onSubmit,
  errors
}: CategoryFormProps) => {
  return (
    <div className="flex justify-center mb-8">
      <div className="container-bg px-6 py-8 w-full lg:w-1/2 flex items-center flex-col rounded-2xl">
        <div className="w-full lg:w-1/2">
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Category Name
          </label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3 py-2"
            required
          />
          {errors.name && <p className="text-sm">{errors.name}</p>}
        </div>

        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={onSubmit}
            className="px-6 py-2 rounded-lg primary-bg"
          >
            Add Category
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryForm;
