"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Building2, 
  Plus, 
  Search, 
  Filter,
  DollarSign,
  Calendar,
  User
} from "lucide-react";

export default function Deals() {
  const [searchTerm, setSearchTerm] = useState("");
  const [stageFilter, setStageFilter] = useState("all");

  const deals = [
    {
      id: 1,
      title: "Enterprise Software License",
      company: "Acme Corp",
      contact: "John Doe",
      value: 50000,
      stage: "proposal",
      probability: 75,
      expectedClose: "2024-02-15",
      lastActivity: "2 hours ago",
      avatar: "/api/placeholder/32/32",
    },
    {
      id: 2,
      title: "Consulting Services",
      company: "Tech Solutions",
      contact: "Jane Smith",
      value: 25000,
      stage: "negotiation",
      probability: 60,
      expectedClose: "2024-01-30",
      lastActivity: "1 day ago",
      avatar: "/api/placeholder/32/32",
    },
    {
      id: 3,
      title: "Product Implementation",
      company: "Global Industries",
      contact: "Mike Johnson",
      value: 75000,
      stage: "qualified",
      probability: 40,
      expectedClose: "2024-03-01",
      lastActivity: "3 days ago",
      avatar: "/api/placeholder/32/32",
    },
    {
      id: 4,
      title: "Annual Support Contract",
      company: "Innovation Labs",
      contact: "Sarah Wilson",
      value: 15000,
      stage: "closed-won",
      probability: 100,
      expectedClose: "2024-01-20",
      lastActivity: "1 week ago",
      avatar: "/api/placeholder/32/32",
    },
    {
      id: 5,
      title: "Custom Development",
      company: "Creative Agency",
      contact: "David Brown",
      value: 35000,
      stage: "discovery",
      probability: 25,
      expectedClose: "2024-02-28",
      lastActivity: "5 days ago",
      avatar: "/api/placeholder/32/32",
    },
  ];

  const getStageBadge = (stage: string) => {
    const variants: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
      "discovery": "outline",
      "qualified": "secondary",
      "proposal": "default",
      "negotiation": "default",
      "closed-won": "default",
      "closed-lost": "destructive",
    };
    return <Badge variant={variants[stage] || "outline"}>{stage.replace("-", " ")}</Badge>;
  };

  const filteredDeals = deals.filter(deal => {
    const matchesSearch = deal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         deal.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         deal.contact.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStage = stageFilter === "all" || deal.stage === stageFilter;
    return matchesSearch && matchesStage;
  });

  const totalPipelineValue = filteredDeals.reduce((sum, deal) => sum + deal.value, 0);
  const weightedValue = filteredDeals.reduce((sum, deal) => sum + (deal.value * deal.probability / 100), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Deals</h1>
          <p className="text-muted-foreground">
            Track and manage your sales pipeline and opportunities.
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Deal
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Deal</DialogTitle>
              <DialogDescription>
                Add a new deal to your sales pipeline.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="title" className="text-right">
                  Deal Title
                </label>
                <Input
                  id="title"
                  placeholder="Enter deal title"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="company" className="text-right">
                  Company
                </label>
                <Input
                  id="company"
                  placeholder="Enter company name"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="value" className="text-right">
                  Value
                </label>
                <Input
                  id="value"
                  type="number"
                  placeholder="Enter deal value"
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Create Deal</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Pipeline Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pipeline</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalPipelineValue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {filteredDeals.length} active deals
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Weighted Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${Math.round(weightedValue).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Probability adjusted
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Deal Size</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${filteredDeals.length > 0 ? Math.round(totalPipelineValue / filteredDeals.length).toLocaleString() : 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Per deal average
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {filteredDeals.length > 0 ? Math.round((filteredDeals.filter(d => d.stage === "closed-won").length / filteredDeals.length) * 100) : 0}%
            </div>
            <p className="text-xs text-muted-foreground">
              Closed won deals
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Deals List */}
      <Card>
        <CardHeader>
          <CardTitle>Deal Pipeline</CardTitle>
          <CardDescription>
            Track your sales opportunities and manage the pipeline
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search deals..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={stageFilter}
                onChange={(e) => setStageFilter(e.target.value)}
                className="px-3 py-2 border border-input bg-background rounded-md text-sm"
              >
                <option value="all">All Stages</option>
                <option value="discovery">Discovery</option>
                <option value="qualified">Qualified</option>
                <option value="proposal">Proposal</option>
                <option value="negotiation">Negotiation</option>
                <option value="closed-won">Closed Won</option>
                <option value="closed-lost">Closed Lost</option>
              </select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="hidden sm:table-cell">Deal</TableHead>
                  <TableHead className="sm:hidden">Deal</TableHead>
                  <TableHead className="hidden md:table-cell">Company</TableHead>
                  <TableHead className="hidden lg:table-cell">Contact</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Stage</TableHead>
                  <TableHead className="hidden lg:table-cell">Expected Close</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDeals.map((deal) => (
                  <TableRow key={deal.id}>
                    <TableCell className="hidden sm:table-cell">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={deal.avatar} />
                          <AvatarFallback>
                            {deal.company.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{deal.title}</div>
                          <div className="text-sm text-muted-foreground md:hidden">
                            {deal.company}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="sm:hidden">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={deal.avatar} />
                          <AvatarFallback>
                            {deal.company.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{deal.title}</div>
                          <div className="text-sm text-muted-foreground">
                            {deal.company}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{deal.company}</TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <div className="flex items-center space-x-1">
                        <User className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">{deal.contact}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">${deal.value.toLocaleString()}</TableCell>
                    <TableCell>{getStageBadge(deal.stage)}</TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">{deal.expectedClose}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
