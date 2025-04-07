import DashboardLayout from '@/components/DashboardLayout';

export default function GitHubInsightsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
} 