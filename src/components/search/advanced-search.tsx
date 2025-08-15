"use client"

import { useState } from 'react'
import { Search, Filter, X, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SearchFilter } from '@/lib/validation'

interface AdvancedSearchProps {
  onSearch: (filters: SearchFilter[]) => void
  onQuickSearch: (term: string) => void
  entityType: 'customers' | 'deals' | 'activities'
}

const fieldOptions = {
  customers: [
    { value: 'name', label: 'Name' },
    { value: 'email', label: 'Email' },
    { value: 'company', label: 'Company' },
    { value: 'status', label: 'Status' },
    { value: 'phone', label: 'Phone' },
  ],
  deals: [
    { value: 'title', label: 'Deal Title' },
    { value: 'company', label: 'Company' },
    { value: 'contact', label: 'Contact' },
    { value: 'stage', label: 'Stage' },
    { value: 'value', label: 'Value' },
  ],
  activities: [
    { value: 'title', label: 'Activity Title' },
    { value: 'type', label: 'Type' },
    { value: 'customerName', label: 'Customer' },
    { value: 'description', label: 'Description' },
  ],
}

const operatorOptions = [
  { value: 'contains', label: 'Contains' },
  { value: 'equals', label: 'Equals' },
  { value: 'starts_with', label: 'Starts with' },
  { value: 'ends_with', label: 'Ends with' },
]

export function AdvancedSearch({ onSearch, onQuickSearch, entityType }: AdvancedSearchProps) {
  const [filters, setFilters] = useState<SearchFilter[]>([])
  const [isAdvanced, setIsAdvanced] = useState(false)
  const [quickSearchTerm, setQuickSearchTerm] = useState('')

  const availableFields = fieldOptions[entityType]

  const addFilter = () => {
    setFilters([...filters, { 
      field: availableFields[0].value, 
      operator: 'contains', 
      value: '' 
    }])
  }

  const removeFilter = (index: number) => {
    setFilters(filters.filter((_, i) => i !== index))
  }

  const updateFilter = (index: number, filter: Partial<SearchFilter>) => {
    setFilters(filters.map((f, i) => i === index ? { ...f, ...filter } : f))
  }

  const handleQuickSearch = (term: string) => {
    setQuickSearchTerm(term)
    onQuickSearch(term)
  }

  const handleAdvancedSearch = () => {
    onSearch(filters)
  }

  const activeFiltersCount = filters.filter(f => f.value.trim()).length

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Search {entityType}</CardTitle>
          <Button 
            variant="outline" 
            onClick={() => setIsAdvanced(!isAdvanced)}
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Advanced
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {activeFiltersCount}
              </Badge>
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Quick Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={`Quick search ${entityType}...`}
            value={quickSearchTerm}
            onChange={(e) => handleQuickSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Advanced Filters */}
        {isAdvanced && (
          <div className="space-y-4 p-4 border rounded-lg bg-muted/50">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Advanced Filters</h4>
              <Button variant="outline" size="sm" onClick={addFilter}>
                <Plus className="h-4 w-4 mr-2" />
                Add Filter
              </Button>
            </div>

            {filters.map((filter, index) => (
              <div key={index} className="flex gap-2 items-center">
                <select
                  value={filter.field}
                  onChange={(e) => updateFilter(index, { field: e.target.value })}
                  className="px-3 py-2 border rounded-md text-sm bg-background"
                >
                  {availableFields.map(field => (
                    <option key={field.value} value={field.value}>
                      {field.label}
                    </option>
                  ))}
                </select>
                
                <select
                  value={filter.operator}
                  onChange={(e) => updateFilter(index, { operator: e.target.value as SearchFilter['operator'] })}
                  className="px-3 py-2 border rounded-md text-sm bg-background"
                >
                  {operatorOptions.map(op => (
                    <option key={op.value} value={op.value}>
                      {op.label}
                    </option>
                  ))}
                </select>
                
                <Input
                  value={filter.value}
                  onChange={(e) => updateFilter(index, { value: e.target.value })}
                  placeholder="Value..."
                  className="flex-1"
                />
                
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => removeFilter(index)}
                  className="h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}

            {filters.length > 0 && (
              <div className="flex gap-2 pt-2">
                <Button onClick={handleAdvancedSearch} size="sm">
                  Apply Filters
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setFilters([])}
                >
                  Clear All
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
