"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Plus, MessageSquare, Phone, Mail, Calendar, Clock, User } from 'lucide-react'
import { ActivityFormData } from '@/lib/validation'

interface Activity {
  id: string
  type: 'call' | 'email' | 'meeting' | 'note'
  title: string
  description: string
  timestamp: Date
  user: {
    name: string
    avatar: string
  }
  customer: {
    name: string
    company: string
  }
  scheduledAt?: Date
}

interface ActivityTimelineProps {
  customerId: string
  customerName: string
  activities: Activity[]
  onAddActivity: (activity: ActivityFormData) => void
}

export function ActivityTimeline({ customerId, customerName, activities, onAddActivity }: ActivityTimelineProps) {
  const [showAddForm, setShowAddForm] = useState(false)
  const [newActivity, setNewActivity] = useState<Partial<ActivityFormData>>({
    type: 'note',
    title: '',
    description: '',
  })

  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'call': return <Phone className="h-4 w-4" />
      case 'email': return <Mail className="h-4 w-4" />
      case 'meeting': return <Calendar className="h-4 w-4" />
      case 'note': return <MessageSquare className="h-4 w-4" />
    }
  }

  const getActivityColor = (type: Activity['type']) => {
    switch (type) {
      case 'call': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'email': return 'bg-green-100 text-green-800 border-green-200'
      case 'meeting': return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'note': return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const handleSubmit = () => {
    if (newActivity.title && newActivity.type) {
      onAddActivity({
        ...newActivity,
        title: newActivity.title,
        type: newActivity.type,
        customerId,
        description: newActivity.description || '',
      } as ActivityFormData)
      
      setNewActivity({ type: 'note', title: '', description: '' })
      setShowAddForm(false)
    }
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Activity Timeline</CardTitle>
            <p className="text-sm text-muted-foreground">
              Track interactions with {customerName}
            </p>
          </div>
          <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Activity
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Activity</DialogTitle>
                <DialogDescription>
                  Record a new interaction with {customerName}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="type" className="text-right">
                    Type
                  </label>
                  <select
                    id="type"
                    value={newActivity.type}
                    onChange={(e) => setNewActivity({ ...newActivity, type: e.target.value as any })}
                    className="col-span-3 px-3 py-2 border rounded-md text-sm"
                  >
                    <option value="note">Note</option>
                    <option value="call">Call</option>
                    <option value="email">Email</option>
                    <option value="meeting">Meeting</option>
                  </select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="title" className="text-right">
                    Title
                  </label>
                  <Input
                    id="title"
                    value={newActivity.title}
                    onChange={(e) => setNewActivity({ ...newActivity, title: e.target.value })}
                    placeholder="Activity title"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="description" className="text-right">
                    Description
                  </label>
                  <Textarea
                    id="description"
                    value={newActivity.description}
                    onChange={(e) => setNewActivity({ ...newActivity, description: e.target.value })}
                    placeholder="Activity details..."
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="scheduledAt" className="text-right">
                    Scheduled
                  </label>
                  <Input
                    id="scheduledAt"
                    type="datetime-local"
                    onChange={(e) => setNewActivity({ ...newActivity, scheduledAt: e.target.value })}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowAddForm(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSubmit}>
                  Add Activity
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {activities.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No activities yet</p>
              <p className="text-sm">Start by adding your first interaction</p>
            </div>
          ) : (
            activities.map((activity) => (
              <div key={activity.id} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={activity.user.avatar} />
                    <AvatarFallback>
                      {activity.user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="w-px h-full bg-border mt-2" />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge className={`${getActivityColor(activity.type)} border`}>
                      {getActivityIcon(activity.type)}
                      {activity.type}
                    </Badge>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {formatDate(activity.timestamp)}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium">{activity.title}</h4>
                    {activity.description && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {activity.description}
                      </p>
                    )}
                    <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                      <User className="h-3 w-3" />
                      {activity.user.name}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
