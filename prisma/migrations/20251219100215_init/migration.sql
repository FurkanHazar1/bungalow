-- CreateTable
CREATE TABLE "Customer" (
    "customerId" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "nationalId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("customerId")
);

-- CreateTable
CREATE TABLE "BungalowOwner" (
    "ownerId" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "nationalId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BungalowOwner_pkey" PRIMARY KEY ("ownerId")
);

-- CreateTable
CREATE TABLE "Bungalow" (
    "bungalowId" SERIAL NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "dailyPrice" DECIMAL(65,30) NOT NULL,
    "hasPool" BOOLEAN NOT NULL,
    "poolSize" DOUBLE PRECISION,
    "roomCount" INTEGER NOT NULL,
    "hasInternet" BOOLEAN NOT NULL,
    "masterBedroomCount" INTEGER NOT NULL,
    "bedCount" INTEGER NOT NULL,
    "bathroomCount" INTEGER NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Bungalow_pkey" PRIMARY KEY ("bungalowId")
);

-- CreateTable
CREATE TABLE "Rental" (
    "rentalId" SERIAL NOT NULL,
    "bungalowId" INTEGER NOT NULL,
    "customerId" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Rental_pkey" PRIMARY KEY ("rentalId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Customer_nationalId_key" ON "Customer"("nationalId");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_email_key" ON "Customer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "BungalowOwner_nationalId_key" ON "BungalowOwner"("nationalId");

-- CreateIndex
CREATE UNIQUE INDEX "BungalowOwner_email_key" ON "BungalowOwner"("email");

-- AddForeignKey
ALTER TABLE "Bungalow" ADD CONSTRAINT "Bungalow_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "BungalowOwner"("ownerId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rental" ADD CONSTRAINT "Rental_bungalowId_fkey" FOREIGN KEY ("bungalowId") REFERENCES "Bungalow"("bungalowId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rental" ADD CONSTRAINT "Rental_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("customerId") ON DELETE CASCADE ON UPDATE CASCADE;
