import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Veritabanı seed'leniyor...");

  // Müşteri oluştur
  const customer1 = await prisma.customer.create({
    data: {
      firstName: "Ahmet",
      lastName: "Yılmaz",
      nationalId: "12345678901",
      email: "ahmet@example.com",
      password: "sifre123",
    },
  });

  const customer2 = await prisma.customer.create({
    data: {
      firstName: "Ayşe",
      lastName: "Kaya",
      nationalId: "98765432109",
      email: "ayse@example.com",
      password: "sifre456",
    },
  });

  console.log("✓ 2 müşteri oluşturuldu");

  // Bungalow sahibi oluştur
  const owner1 = await prisma.bungalowOwner.create({
    data: {
      firstName: "Mehmet",
      lastName: "Öz",
      nationalId: "11111111111",
      email: "mehmet@owner.com",
      password: "ownerpass123",
    },
  });

  const owner2 = await prisma.bungalowOwner.create({
    data: {
      firstName: "Fatma",
      lastName: "Çetin",
      nationalId: "22222222222",
      email: "fatma@owner.com",
      password: "ownerpass456",
    },
  });

  console.log("✓ 2 bungalow sahibi oluşturuldu");

  // Bungalow oluştur
  const bungalow1 = await prisma.bungalow.create({
    data: {
      ownerId: owner1.ownerId,
      dailyPrice: 150.0,
      hasPool: true,
      poolSize: 50,
      roomCount: 3,
      hasInternet: true,
      masterBedroomCount: 1,
      bedCount: 4,
      bathroomCount: 2,
      latitude: 36.8969,
      longitude: 30.7133,
    },
  });

  const bungalow2 = await prisma.bungalow.create({
    data: {
      ownerId: owner2.ownerId,
      dailyPrice: 200.0,
      hasPool: false,
      poolSize: null,
      roomCount: 4,
      hasInternet: true,
      masterBedroomCount: 2,
      bedCount: 6,
      bathroomCount: 3,
      latitude: 37.0,
      longitude: 31.0,
    },
  });

  console.log("✓ 2 bungalow oluşturuldu");

  // Kiralama işlemi oluştur
  const rental1 = await prisma.rental.create({
    data: {
      bungalowId: bungalow1.bungalowId,
      customerId: customer1.customerId,
      startDate: new Date("2025-12-20"),
      endDate: new Date("2025-12-25"),
    },
  });

  const rental2 = await prisma.rental.create({
    data: {
      bungalowId: bungalow2.bungalowId,
      customerId: customer2.customerId,
      startDate: new Date("2025-12-22"),
      endDate: new Date("2025-12-27"),
    },
  });

  console.log("✓ 2 kiralama işlemi oluşturuldu");

  console.log("\n✅ Seed başarıyla tamamlandı!");
  console.log("\nOluşturulan veriler:");
  console.log(`- Müşteri: ${customer1.firstName} ${customer1.lastName}, ${customer2.firstName} ${customer2.lastName}`);
  console.log(`- Sahibi: ${owner1.firstName} ${owner1.lastName}, ${owner2.firstName} ${owner2.lastName}`);
  console.log(`- Bungalow: ${bungalow1.bungalowId}, ${bungalow2.bungalowId}`);
  console.log(`- Kiralama: ${rental1.rentalId}, ${rental2.rentalId}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
