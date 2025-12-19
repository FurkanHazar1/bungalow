"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

interface Owner {
  ownerId: number;
  firstName: string;
  lastName: string;
  email: string;
  nationalId: string;
}

export default function EditOwnerPage() {
  const router = useRouter();
  const params = useParams();
  const ownerId = params.id as string;

  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    nationalId: "",
    email: "",
  });

  useEffect(() => {
    fetchOwner();
  }, [ownerId]);

  const fetchOwner = async () => {
    try {
      const response = await fetch(`/api/owners/${ownerId}`);
      if (response.ok) {
        const data: Owner = await response.json();
        setFormData({
          firstName: data.firstName,
          lastName: data.lastName,
          nationalId: data.nationalId,
          email: data.email,
        });
      } else {
        setError("Sahip bulunamadı");
      }
    } catch (err) {
      setError("Sahip yükleme hatası");
      console.error(err);
    } finally {
      setDataLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!formData.firstName || !formData.lastName || !formData.nationalId || !formData.email) {
      setError("Tüm alanları doldurunuz");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`/api/owners/${ownerId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push("/owners");
        router.refresh();
      } else {
        const data = await response.json();
        setError(data.error || "Sahip güncellenirken hata oluştu");
      }
    } catch (err) {
      setError("Bir hata oluştu. Lütfen tekrar deneyin.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (dataLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg text-gray-600">Sahip bilgileri yükleniyor...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <div>
            <Link href="/owners" className="text-green-600 hover:text-green-800 text-sm mb-2">
              ← Geri Dön
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">✏️ Sahip Güncelle</h1>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-md p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  İlk Ad <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Örn: Mehmet"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Soyadı <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Örn: Arslan"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kimlik Numarası <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="nationalId"
                value={formData.nationalId}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Örn: 12345678901"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Örn: mehmet@example.com"
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-medium transition"
              >
                {loading ? "Güncelleniyor..." : "Sahip Güncelle"}
              </button>
              <Link
                href="/owners"
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-medium transition text-center"
              >
                İptal
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
