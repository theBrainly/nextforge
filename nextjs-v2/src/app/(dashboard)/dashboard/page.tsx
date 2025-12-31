import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getDashboardMetrics } from '@/features/dashboard/service';

export default function DashboardPage() {
  const metrics = getDashboardMetrics();

  return (
    <section className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Active Users</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-semibold">{metrics.activeUsers}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Monthly Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-semibold">{metrics.monthlyRevenue}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Churn Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-semibold">{metrics.churnRate}</p>
        </CardContent>
      </Card>
    </section>
  );
}
