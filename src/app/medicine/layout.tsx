import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MediBridge China",
  description: "Cross-Border Medical Support Services",
  robots: { index: true, follow: true },
};

export default function MedicineLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
