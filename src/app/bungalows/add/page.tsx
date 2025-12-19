"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Owner {
  ownerId: number;
  firstName: string;
  lastName: string;
}

export default function AddBungalowPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [owners, setOwners] = useState<Owner[]>([]);
  const [ownerLoading, setOwnerLoading] = useState(true);
  const [formData, setFormData] = useState({
    ownerId: "",
    dailyPrice: "",
    hasPool: false,
    roomCount: "",
    bedCount: "",
    bathroomCount: "",
  });

  useEffect(() => {
    fetchOwners();
  }, []);

  const fetchOwners = async () => {
    try {
      const response = await fetch("/api/owners");
      const data = await response.json();
      setOwners(data || []);
    } catch (err) {
      console.error("Sahipler yüklenemedi:", err);
    } finally {
      setOwnerLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!formData.ownerId || !formData.dailyPrice || !formData.roomCount || !formData.bedCount || !formData.bathroomCount) {
      setError("Tüm alanları doldurunuz");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/bungalows", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ownerId: parseInt(formData.ownerId),
          dailyPrice: parseFloat(formData.dailyPrice),
          hasPool: formData.hasPool,
          roomCount: parseInt(formData.roomCount),
          bedCount: parseInt(formData.bedCount),
          bathroomCount: parseInt(formData.bathroomCount),
          hasInternet: true,
          masterBedroomCount: 1,
          latitude: 36.8969,
          longitude: 30.7133,
        }),
      });

      if (response.ok) {
        router.push("/bungalows");
        router.refresh();
      } else {
        const data = await response.json();
        setError(data.error || "Bungalow eklenirken hata oluştu");
      }
    } catch (err) {
      setError("Bir hata oluştu. Lütfen tekrar deneyin.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-amber-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <div>
            <Link href="/bungalows" className="text-yellow-600 hover:text-yellow-800 text-sm mb-2">
              ← Geri Dön
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">➕ Yeni Bungalow Ekle</h1>
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sahip Seç <span className="text-red-500">*</span>
              </label>
              {ownerLoading ? (
                <p className="text-gray-500">Sahibler yükleniyor...</p>
              ) : owners.length === 0 ? (
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-yellow-700">Henüz sahip bulunmamaktadır.</p>
                  <Link href="/owners/add" className="text-yellow-600 hover:text-yellow-800 font-medium">
                    Yeni sahip ekleyin →
                  </Link>
                </div>
              ) : (
                <select
                  name="ownerId"
                  value={formData.ownerId}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                >
                  <option value="">Bir sahip seçin</option>
                  {owners.map((owner) => (
                    <option key={owner.ownerId} value={owner.ownerId}>
                      ID: {owner.ownerId} - {owner.firstName} {owner.lastName}
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Günlük Fiyat (₺) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="dailyPrice"
                  value={formData.dailyPrice}
                  onChange={handleChange}
                  step="0.01"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  placeholder="Örn: 150.00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Oda Sayısı <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="roomCount"
                  value={formData.roomCount}
                  onChange={handleChange}
                  min="1"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  placeholder="Örn: 3"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Yatak Sayısı <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="bedCount"
                  value={formData.bedCount}
                  onChange={handleChange}
                  min="1"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  placeholder="Örn: 6"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Banyo Sayısı <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="bathroomCount"
                  value={formData.bathroomCount}
                  onChange={handleChange}
                  min="1"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  placeholder="Örn: 2"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="hasPool"
                checked={formData.hasPool}
                onChange={handleChange}
                className="w-4 h-4 text-yellow-600 rounded focus:ring-2 focus:ring-yellow-500"
              />
              <label className="ml-3 text-sm font-medium text-gray-700">
                Havuzu var mı?
              </label>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading || ownerLoading || owners.length === 0}
                className="flex-1 bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-medium transition"
              >
                {loading ? "Ekleniyor..." : "Bungalow Ekle"}
              </button>
              <Link
                href="/bungalows"
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
