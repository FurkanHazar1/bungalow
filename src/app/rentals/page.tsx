"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Rental {
  rentalId: number;
  bungalowId: number;
  customerId: number;
  startDate: string;
  endDate: string;
  bungalow: {
    dailyPrice: string;
    owner: {
      firstName: string;
      lastName: string;
    };
  };
  customer: {
    firstName: string;
    lastName: string;
    email: string;
  };
}

export default function RentalsPage() {
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRentals();
  }, []);

  const fetchRentals = async () => {
    try {
      const response = await fetch("/api/rentals");
      const data = await response.json();
      setRentals(data || []);
    } catch (error) {
      console.error("Error fetching rentals:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteRental = async (id: number) => {
    if (confirm("Bu kiralama işlemi silinecek. Emin misiniz?")) {
      try {
        await fetch(`/api/rentals/${id}`, { method: "DELETE" });
        fetchRentals();
      } catch (error) {
        console.error("Error deleting rental:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-violet-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <div>
            <Link href="/" className="text-purple-600 hover:text-purple-800 text-sm mb-2">
              ← Geri Dön
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">📋 Kiralama İşlemleri</h1>
          </div>
          <Link
            href="/rentals/add"
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium inline-block"
          >
            ➕ Yeni Kiralama
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="text-center text-gray-600">Yükleniyor...</div>
        ) : rentals.length === 0 ? (
          <div className="text-center text-gray-600 bg-white p-8 rounded-lg">
            Henüz kiralama işlemi bulunmamaktadır.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {rentals.map((rental) => {
              const startDate = new Date(rental.startDate);
              const endDate = new Date(rental.endDate);
              const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
              const totalPrice = parseFloat(rental.bungalow.dailyPrice) * days;

              return (
                <div key={rental.rentalId} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Kiralama #{rental.rentalId}
                  </h3>
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <p>
                      <strong>Müşteri:</strong> {rental.customer.firstName} {rental.customer.lastName}
                    </p>
                    <p>
                      <strong>Email:</strong> {rental.customer.email}
                    </p>
                    <p>
                      <strong>Bungalow Sahibi:</strong> {rental.bungalow.owner.firstName} {rental.bungalow.owner.lastName}
                    </p>
                    <p>
                      <strong>Başlangıç:</strong> {startDate.toLocaleDateString("tr-TR")}
                    </p>
                    <p>
                      <strong>Bitiş:</strong> {endDate.toLocaleDateString("tr-TR")}
                    </p>
                    <p>
                      <strong>Gün Sayısı:</strong> {days} gün
                    </p>
                    <p className="text-lg font-bold text-purple-600">
                      <strong>Toplam Fiyat:</strong> ₺{totalPrice.toFixed(2)}
                    </p>
                  </div>
                  <button
                    onClick={() => deleteRental(rental.rentalId)}
                    className="w-full bg-red-50 hover:bg-red-100 text-red-600 py-2 rounded font-medium text-sm"
                  >
                    Sil
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
