-- CreateTable
CREATE TABLE "project" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(30) NOT NULL,
    "description" VARCHAR(100) NOT NULL,
    "url" VARCHAR(50) NOT NULL,
    "lastMaintenance" TIMESTAMP(3),
    "nextMaintenance" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "maintenance" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "hours" INTEGER NOT NULL DEFAULT 3,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "maintenance_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "project_name_key" ON "project"("name");

-- AddForeignKey
ALTER TABLE "maintenance" ADD CONSTRAINT "maintenance_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
