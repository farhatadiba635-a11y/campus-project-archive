import { Temporal } from "@js-temporal/polyfill";

(globalThis as any).Temporal = Temporal;

import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import postgres from "@prisma/orm-postgres/runtime";
import type { Contract } from "./contract.d";
import contractJson from "./contract.json" with { type: "json" };

async function main() {
  const db = postgres<Contract>({
    contractJson,
    url: process.env.DATABASE_URL!,
  });

  const departments = await db.orm.public.Department.where({
    code: "CSE",
  });

  const department =
    departments[0] ??
    (await db.orm.public.Department.create({
      name: "Computer Science and Engineering",
      code: "CSE",
    }));

  const project = await db.orm.public.Project.create({
    title: "Smart Campus IoT Monitoring",
    description:
      "Demo project for testing the campus admin review workflow.",
    departmentId: department.id,
    academicYear: "2025-2026",
    category: "IOT",
    technologies: ["Next.js", "PostgreSQL", "IoT"],
    status: "SUBMITTED",
  });

  console.log("Demo data created successfully!");
  console.log("Project ID:", project.id);
  console.log("Project:", project.title);

  await db.close();
}

main().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});
