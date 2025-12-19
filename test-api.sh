#!/bin/bash

BASE_URL="http://localhost:3000/api"

echo "=========================================="
echo "Bungalov Kiralama Sistemi - API Test"
echo "=========================================="
echo ""

# Test 1: Tüm müşterileri getir
echo "1️⃣  GET /api/customers - Tüm müşterileri getir"
curl -s -X GET "$BASE_URL/customers" | jq '.' 
echo ""
echo ""

# Test 2: Spesifik müşteri getir
echo "2️⃣  GET /api/customers/1 - Müşteri ID 1 getir"
curl -s -X GET "$BASE_URL/customers/1" | jq '.'
echo ""
echo ""

# Test 3: Tüm sahipleri getir
echo "3️⃣  GET /api/owners - Tüm sahipleri getir"
curl -s -X GET "$BASE_URL/owners" | jq '.'
echo ""
echo ""

# Test 4: Tüm bungalowları getir
echo "4️⃣  GET /api/bungalows - Tüm bungalowları getir"
curl -s -X GET "$BASE_URL/bungalows" | jq '.'
echo ""
echo ""

# Test 5: Tüm kiralama işlemlerini getir
echo "5️⃣  GET /api/rentals - Tüm kiralama işlemlerini getir"
curl -s -X GET "$BASE_URL/rentals" | jq '.'
echo ""
echo ""

# Test 6: Yeni müşteri oluştur
echo "6️⃣  POST /api/customers - Yeni müşteri oluştur"
curl -s -X POST "$BASE_URL/customers" \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Ali",
    "lastName": "Demir",
    "nationalId": "33333333333",
    "email": "ali@example.com",
    "password": "alipass123"
  }' | jq '.'
echo ""
echo ""

# Test 7: Müşteri güncelle
echo "7️⃣  PUT /api/customers/1 - Müşteri güncelle"
curl -s -X PUT "$BASE_URL/customers/1" \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "AhmetGüncellendi"
  }' | jq '.'
echo ""
echo ""

echo "=========================================="
echo "✅ Test tamamlandı!"
echo "=========================================="
