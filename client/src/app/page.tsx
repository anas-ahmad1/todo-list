"use client";

import { ProtectedRoute } from "@/components/AuthRedirects";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { BACKEND_ROUTES } from "@/utils/routes";
import { API_URL } from "@/utils/config";
import { useEffect, useState } from "react";
import axios from "axios";
import CategoryForm from "@/components/CategoryForm";
import Spinner from "@/components/Spinner";
import CategoryCard from "@/components/CategoryCard";

interface Category {
  _id: string;
  name: string;
}

export default function Home() {
  const router = useRouter();
  const { user } = useUser();

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({ name: "" });

  const url = API_URL + BACKEND_ROUTES.CATEGORIES;

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCategories(res.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCategorySubmit = async () => {
    try {
      const res = await axios.post(
        url,
        { name: formData.name },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const newCategory: Category = res.data;
      setCategories([...categories, newCategory]);
    } catch (err) {
      console.error("Error creating category:", (err as Error).message);
    }

    setFormData({ name: "" });
    setShowAddForm(false);
  };

  const deleteCategory = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${url}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCategories(categories.filter((cat) => cat._id !== id));
    } catch (err) {
      console.error("Error deleting category:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col mt-20 items-center px-6">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center">
          Welcome {user?.name ?? "Guest"}!
        </h1>
        <p className="text-lg md:text-2xl mb-8 text-center max-w-xl">
          Your personal productivity hub. Track your tasks and stay on top of
          your day!
        </p>

        <div className="w-full">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">My Categories</h2>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-4 py-2 rounded-lg shadow primary-bg"
            >
              {showAddForm ? "Cancel" : "Add Category"}
            </button>
          </div>

          {showAddForm && (
            <CategoryForm
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleCategorySubmit}
            />
          )}

          {loading ? (
            <Spinner />
          ) : categories.length === 0 ? (
            <p className="text-center">No categories yet. Add one above!</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-16">
              {categories.map((category) => (
                <CategoryCard
                  key={category._id}
                  id={category._id}
                  name={category.name}
                  onClick={() =>
                    router.push(
                      `/tasks?categoryId=${
                        category._id
                      }&categoryName=${encodeURIComponent(category.name)}`
                    )
                  }
                  onDelete={deleteCategory}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
