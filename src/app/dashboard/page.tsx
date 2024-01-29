import { Metadata } from "next";
import Dashboard from "../../components/dashboard/Dashboard";

export const metadata: Metadata = {
    title: 'Dashboard - Tunefy',
    description: 'Dashboard - Your Central Hub for Insights and Analytics',
}

export default function Page() {

  return <Dashboard/>
}
