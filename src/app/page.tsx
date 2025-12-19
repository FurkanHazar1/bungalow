"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Stats {
  customers: number;
  owners: number;
  bungalows: number;
  rentals: number;
}

export default function Home() {
  const [stats, setStats] = useState<Stats>({
    customers: 0,
    owners: 0,
    bungalows: 0,
    rentals: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [customersRes, ownersRes, bungalowsRes, rentalsRes] = await Promise.all([
          fetch("/api/customers"),
          fetch("/api/owners"),
          fetch("/api/bungalows"),
          fetch("/api/rentals"),
        ]);

        const customers = await customersRes.json();
        const owners = await ownersRes.json();
        const bungalows = await bungalowsRes.json();
        const rentals = await rentalsRes.json();

        setStats({
          customers: Array.isArray(customers) ? customers.length : 0,
          owners: Array.isArray(owners) ? owners.length : 0,
          bungalows: Array.isArray(bungalows) ? bungalows.length : 0,
          rentals: Array.isArray(rentals) ? rentals.length : 0,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">🏡 Bungalov Kiralama Sistemi</h1>
          <p className="text-gray-600 mt-2">Bungalow yönetim paneli</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Müşteriler</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {loading ? "-" : stats.customers}
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <span className="text-2xl">👤</span>
              </div>
            </div>
            <Link
              href="/customers"
              className="mt-4 inline-block text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Yönet →
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Sahibler</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {loading ? "-" : stats.owners}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <span className="text-2xl">🔑</span>
              </div>
            </div>
            <Link
              href="/owners"
              className="mt-4 inline-block text-green-600 hover:text-green-800 text-sm font-medium"
            >
              Yönet →
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Bungalowlar</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {loading ? "-" : stats.bungalows}
                </p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <span className="text-2xl">🏠</span>
              </div>
            </div>
            <Link
              href="/bungalows"
              className="mt-4 inline-block text-yellow-600 hover:text-yellow-800 text-sm font-medium"
            >
              Yönet →
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Kiralamalar</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {loading ? "-" : stats.rentals}
                </p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <span className="text-2xl">📋</span>
              </div>
            </div>
            <Link
              href="/rentals"
              className="mt-4 inline-block text-purple-600 hover:text-purple-800 text-sm font-medium"
            >
              Yönet →
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Hızlı İşlemler</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/customers"
              className="flex items-center justify-center p-4 bg-blue-50 hover:bg-blue-100 rounded-lg text-blue-700 font-medium transition"
            >
              ➕ Müşterileri Yönet
            </Link>
            <Link
              href="/owners"
              className="flex items-center justify-center p-4 bg-green-50 hover:bg-green-100 rounded-lg text-green-700 font-medium transition"
            >
              ➕ Sahipleri Yönet
            </Link>
            <Link
              href="/bungalows"
              className="flex items-center justify-center p-4 bg-yellow-50 hover:bg-yellow-100 rounded-lg text-yellow-700 font-medium transition"
            >
              ➕ Bungalow'ları Yönet
            </Link>
            <Link
              href="/rentals"
              className="flex items-center justify-center p-4 bg-purple-50 hover:bg-purple-100 rounded-lg text-purple-700 font-medium transition"
            >
              ➕ Kiralamalar Yönet
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
