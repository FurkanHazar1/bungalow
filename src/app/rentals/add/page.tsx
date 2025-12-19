"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Customer {
  customerId: number;
  firstName: string;
  lastName: string;
}

interface Bungalow {
  bungalowId: number;
  dailyPrice: string;
  owner: {
    firstName: string;
    lastName: string;
  };
}

export default function AddRentalPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [bungalows, setBungalows] = useState<Bungalow[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const [formData, setFormData] = useState({
    customerId: "",
    bungalowId: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [customersRes, bungalowsRes] = await Promise.all([
        fetch("/api/customers"),
        fetch("/api/bungalows"),
      ]);

      const customersData = await customersRes.json();
      const bungalowsData = await bungalowsRes.json();

      setCustomers(customersData || []);
      setBungalows(bungalowsData || []);
    } catch (err) {
      console.error("Veri yüklenemedi:", err);
    } finally {
      setDataLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Fiyat hesapla
    if (name === "bungalowId" || name === "startDate" || name === "endDate") {
      calculatePrice(
        name === "bungalowId" ? value : formData.bungalowId,
        name === "startDate" ? value : formData.startDate,
        name === "endDate" ? value : formData.endDate
      );
    }
  };

  const calculatePrice = (bungalowId: string, startDate: string, endDate: string) => {
    if (bungalowId && startDate && endDate) {
      const bungalow = bungalows.find((b) => b.bungalowId.toString() === bungalowId);
      if (bungalow) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
        const price = parseFloat(bungalow.dailyPrice) * Math.max(days, 1);
        setTotalPrice(price);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!formData.customerId || !formData.bungalowId || !formData.startDate || !formData.endDate) {
      setError("Tüm alanları doldurunuz");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/rentals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerId: parseInt(formData.customerId),
          bungalowId: parseInt(formData.bungalowId),
          startDate: new Date(formData.startDate).toISOString(),
          endDate: new Date(formData.endDate).toISOString(),
        }),
      });

      if (response.ok) {
        router.push("/rentals");
        router.refresh();
      } else {
        const data = await response.json();
        setError(data.error || "Kiralama eklenirken hata oluştu");
      }
    } catch (err) {
      setError("Bir hata oluştu. Lütfen tekrar deneyin.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-violet-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <div>
            <Link href="/rentals" className="text-purple-600 hover:text-purple-800 text-sm mb-2">
              ← Geri Dön
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">➕ Yeni Kiralama Oluştur</h1>
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
                Müşteri Seç <span className="text-red-500">*</span>
              </label>
              {dataLoading ? (
                <p className="text-gray-500">Müşteriler yükleniyor...</p>
              ) : customers.length === 0 ? (
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-yellow-700">Henüz müşteri bulunmamaktadır.</p>
                  <Link href="/customers/add" className="text-yellow-600 hover:text-yellow-800 font-medium">
                    Yeni müşteri ekleyin →
                  </Link>
                </div>
              ) : (
                <select
                  name="customerId"
                  value={formData.customerId}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Bir müşteri seçin</option>
                  {customers.map((customer) => (
                    <option key={customer.customerId} value={customer.customerId}>
                      ID: {customer.customerId} - {customer.firstName} {customer.lastName}
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bungalow Seç <span className="text-red-500">*</span>
              </label>
              {dataLoading ? (
                <p className="text-gray-500">Bungalowlar yükleniyor...</p>
              ) : bungalows.length === 0 ? (
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-yellow-700">Henüz bungalow bulunmamaktadır.</p>
                  <Link href="/bungalows/add" className="text-yellow-600 hover:text-yellow-800 font-medium">
                    Yeni bungalow ekleyin →
                  </Link>
                </div>
              ) : (
                <select
                  name="bungalowId"
                  value={formData.bungalowId}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Bir bungalow seçin</option>
                  {bungalows.map((bungalow) => (
                    <option key={bungalow.bungalowId} value={bungalow.bungalowId}>
                      ID: {bungalow.bungalowId} - {bungalow.owner.firstName} {bungalow.owner.lastName} (₺{bungalow.dailyPrice}/gün)
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Başlangıç Tarihi <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bitiş Tarihi <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            {totalPrice > 0 && (
              <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <p className="text-sm text-gray-600">Tahmini Toplam Fiyat</p>
                <p className="text-2xl font-bold text-purple-600">₺{totalPrice.toFixed(2)}</p>
              </div>
            )}

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading || dataLoading || (customers.length === 0 || bungalows.length === 0)}
                className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-medium transition"
              >
                {loading ? "Oluşturuluyor..." : "Kiralama Oluştur"}
              </button>
              <Link
                href="/rentals"
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
