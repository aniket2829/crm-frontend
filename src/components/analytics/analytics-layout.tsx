import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Chart } from "./charts";
import { StatsCard } from "./stats-card";

export function AnalyticsLayout() {
    return (
        <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
                <TabsTrigger value="overview">
                    Overview
                </TabsTrigger>
                <TabsTrigger value="analytics">
                    Analytics
                </TabsTrigger>
                <TabsTrigger value="reports">
                    Reports
                </TabsTrigger>
                <TabsTrigger value="notifications">
                    Notifications
                </TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <StatsCard title="Total Revenue" value="$45,231.89" description="+20.1% from last month" />
                    <StatsCard title="Subscriptions" value="+2350" description="+180.1% from last month" />
                    <StatsCard title="Sales" value="+12,234" description="+19% from last month" />
                    <StatsCard title="Active Now" value="+573" description="+201 since last hour" />
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                    <Card className="col-span-4">
                        <CardHeader>
                            <CardTitle>Overview</CardTitle>
                        </CardHeader>
                        <CardContent className="pl-2">
                            <Chart />
                        </CardContent>
                    </Card>
                    <Card className="col-span-3">
                        <CardHeader>
                            <CardTitle>Recent Sales</CardTitle>
                            <CardDescription>
                                You made 265 sales this month.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {/* Recent Sales Component */}
                        </CardContent>
                    </Card>
                </div>
            </TabsContent>
        </Tabs>
    )
}
