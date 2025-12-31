import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { dashboardHighlights } from '@/features/dashboard/service';

export default function DashboardPage() {
  const highlights = dashboardHighlights();

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {highlights.map((highlight) => (
        <Card key={highlight}>
          <CardHeader>
            <CardTitle>{highlight}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              This capability is pre-wired to accelerate product and infrastructure delivery.
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
