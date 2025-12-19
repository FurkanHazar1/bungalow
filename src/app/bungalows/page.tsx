"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Bungalow {
  bungalowId: number;
  ownerId: number;
  dailyPrice: string;
  hasPool: boolean;
  roomCount: number;
  bedCount: number;
  bathroomCount: number;
  owner: {
    firstName: string;
    lastName: string;
  };
}

export default function BungalowsPage() {
  const [bungalows, setBungalows] = useState<Bungalow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBungalows();
  }, []);

  const fetchBungalows = async () => {
    try {
      const response = await fetch("/api/bungalows");
      const data = await response.json();
      setBungalows(data || []);
    } catch (error) {
      console.error("Error fetching bungalows:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteBungalow = async (id: number) => {
    if (confirm("Bu bungalow silinecek. Emin misiniz?")) {
      try {
        await fetch(`/api/bungalows/${id}`, { method: "DELETE" });
        fetchBungalows();
      } catch (error) {
        console.error("Error deleting bungalow:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-amber-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <div>
            <Link href="/" className="text-yellow-600 hover:text-yellow-800 text-sm mb-2">
              ← Geri Dön
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">🏠 Bungalowlar</h1>
          </div>
          <Link
            href="/bungalows/add"
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg font-medium inline-block"
          >
            ➕ Yeni Bungalow
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="text-center text-gray-600">Yükleniyor...</div>
        ) : bungalows.length === 0 ? (
          <div className="text-center text-gray-600 bg-white p-8 rounded-lg">
            Henüz bungalow bulunmamaktadır.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bungalows.map((bungalow) => (
              <div key={bungalow.bungalowId} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Bungalow #{bungalow.bungalowId}
                </h3>
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <p>
                    <strong>Sahibi:</strong> {bungalow.owner.firstName} {bungalow.owner.lastName}
                  </p>
                  <p>
                    <strong>Günlük Fiyat:</strong> ₺{bungalow.dailyPrice}
                  </p>
                  <p>
                    <strong>Odalar:</strong> {bungalow.roomCount} | <strong>Yataklar:</strong> {bungalow.bedCount}
                  </p>
                  <p>
                    <strong>Banyolar:</strong> {bungalow.bathroomCount}
                  </p>
                  <p>
                    <strong>Havuz:</strong> {bungalow.hasPool ? "✅ Var" : "❌ Yok"}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Link
                    href={`/bungalows/${bungalow.bungalowId}/edit`}
                    className="flex-1 bg-yellow-50 hover:bg-yellow-100 text-yellow-600 py-2 rounded font-medium text-sm text-center"
                  >
                    Düzenle
                  </Link>
                  <button
                    onClick={() => deleteBungalow(bungalow.bungalowId)}
                    className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 py-2 rounded font-medium text-sm"
                  >
                    Sil
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
