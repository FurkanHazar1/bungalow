"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Owner {
  ownerId: number;
  firstName: string;
  lastName: string;
  email: string;
  nationalId: string;
}

export default function OwnersPage() {
  const [owners, setOwners] = useState<Owner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOwners();
  }, []);

  const fetchOwners = async () => {
    try {
      const response = await fetch("/api/owners");
      const data = await response.json();
      setOwners(data || []);
    } catch (error) {
      console.error("Error fetching owners:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteOwner = async (id: number) => {
    if (confirm("Bu sahip silinecek. Emin misiniz?")) {
      try {
        await fetch(`/api/owners/${id}`, { method: "DELETE" });
        fetchOwners();
      } catch (error) {
        console.error("Error deleting owner:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <div>
            <Link href="/" className="text-green-600 hover:text-green-800 text-sm mb-2">
              ← Geri Dön
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">🔑 Bungalow Sahipleri</h1>
          </div>
          <Link
            href="/owners/add"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium inline-block"
          >
            ➕ Yeni Sahip
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="text-center text-gray-600">Yükleniyor...</div>
        ) : owners.length === 0 ? (
          <div className="text-center text-gray-600 bg-white p-8 rounded-lg">
            Henüz sahip bulunmamaktadır.
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">ID</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Ad</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Soyad</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Kimlik No</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">İşlemler</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {owners.map((owner) => (
                  <tr key={owner.ownerId} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-semibold text-green-700 bg-green-50">{owner.ownerId}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{owner.firstName}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{owner.lastName}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{owner.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{owner.nationalId}</td>
                    <td className="px-6 py-4 text-sm">
                      <button
                        onClick={() => deleteOwner(owner.ownerId)}
                        className="text-red-600 hover:text-red-800 font-medium"
                      >
                        Sil
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
