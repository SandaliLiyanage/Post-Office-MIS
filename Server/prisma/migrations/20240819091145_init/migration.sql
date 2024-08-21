-- CreateTable
CREATE TABLE "Employee" (
    "employee_id" TEXT NOT NULL,
    "employee_name" TEXT NOT NULL,
    "employee_category_id" TEXT NOT NULL,
    "post_office_id" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("employee_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Employee_email_key" ON "Employee"("email");
