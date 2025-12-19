"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Customer {
  customerId: number;
  firstName: string;
  lastName: string;
  email: string;
  nationalId: string;
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await fetch("/api/customers");
      const data = await response.json();
      setCustomers(data || []);
    } catch (error) {
      console.error("Error fetching customers:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteCustomer = async (id: number) => {
    if (confirm("Bu müşteri silinecek. Emin misiniz?")) {
      try {
        await fetch(`/api/customers/${id}`, { method: "DELETE" });
        fetchCustomers();
      } catch (error) {
        console.error("Error deleting customer:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <div>
            <Link href="/" className="text-blue-600 hover:text-blue-800 text-sm mb-2">
              ← Geri Dön
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">👤 Müşteriler</h1>
          </div>
          <Link
            href="/customers/add"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium inline-block"
          >
            ➕ Yeni Müşteri
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="text-center text-gray-600">Yükleniyor...</div>
        ) : customers.length === 0 ? (
          <div className="text-center text-gray-600 bg-white p-8 rounded-lg">
            Henüz müşteri bulunmamaktadır.
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
                {customers.map((customer) => (
                  <tr key={customer.customerId} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-semibold text-blue-700 bg-blue-50">{customer.customerId}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{customer.firstName}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{customer.lastName}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{customer.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{customer.nationalId}</td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex gap-2">
                        <Link
                          href={`/customers/${customer.customerId}/edit`}
                          className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                          Düzenle
                        </Link>
                        <button
                          onClick={() => deleteCustomer(customer.customerId)}
                          className="text-red-600 hover:text-red-800 font-medium"
                        >
                          Sil
                        </button>
                      </div>
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
