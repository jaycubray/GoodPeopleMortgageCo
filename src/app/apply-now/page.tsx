import { redirect } from "next/navigation";
import { COMPANY } from "@/lib/constants";

export default function ApplyNowPage() {
  redirect(COMPANY.applyUrl);
}
