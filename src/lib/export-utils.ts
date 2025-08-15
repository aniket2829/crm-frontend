export const exportToCSV = (data: Record<string, unknown>[], filename: string) => {
  if (data.length === 0) {
    console.warn('No data to export')
    return
  }

  const headers = Object.keys(data[0])
  const csvContent = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => {
        const value = row[header]
        // Escape quotes and wrap in quotes if contains comma or newline
        const escapedValue = String(value).replace(/"/g, '""')
        return `"${escapedValue}"`
      }).join(',')
    )
  ].join('\n')

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${filename}.csv`
  link.click()
  window.URL.revokeObjectURL(url)
}

export const importFromCSV = (file: File): Promise<Record<string, string>[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    
    reader.onload = (e) => {
      try {
        const csv = e.target?.result as string
        const lines = csv.split('\n').filter(line => line.trim())
        
        if (lines.length < 2) {
          throw new Error('CSV file must have at least a header row and one data row')
        }

        const headers = lines[0].split(',').map(h => h.replace(/"/g, '').trim())
        const data = lines.slice(1).map(line => {
          const values = line.split(',').map(v => v.replace(/"/g, '').trim())
          return headers.reduce((obj, header, index) => {
            obj[header] = values[index] || ''
            return obj
          }, {} as Record<string, string>)
        })
        
        resolve(data)
      } catch (error) {
        reject(new Error(`Failed to parse CSV: ${error}`))
      }
    }
    
    reader.onerror = () => {
      reject(new Error('Failed to read file'))
    }
    
    reader.readAsText(file)
  })
}

export const exportToJSON = (data: Record<string, unknown>[], filename: string) => {
  const jsonContent = JSON.stringify(data, null, 2)
  const blob = new Blob([jsonContent], { type: 'application/json' })
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${filename}.json`
  link.click()
  window.URL.revokeObjectURL(url)
}

export const importFromJSON = (file: File): Promise<Record<string, unknown>[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    
    reader.onload = (e) => {
      try {
        const json = e.target?.result as string
        const data = JSON.parse(json)
        
        if (!Array.isArray(data)) {
          throw new Error('JSON file must contain an array')
        }
        
        resolve(data)
      } catch (error) {
        reject(new Error(`Failed to parse JSON: ${error}`))
      }
    }
    
    reader.onerror = () => {
      reject(new Error('Failed to read file'))
    }
    
    reader.readAsText(file)
  })
}

// Customer interface for type safety
interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: string;
  lastContact: string;
  avatar: string;
}

// Deal interface for type safety
interface Deal {
  title: string;
  company: string;
  contact: string;
  value: number;
  stage: string;
  probability: number;
  expectedClose?: string;
}

// Format data for specific entity types
export const formatCustomerData = (customers: Customer[]) => {
  return customers.map(customer => ({
    Name: customer.name,
    Email: customer.email,
    Phone: customer.phone || '',
    Company: customer.company,
    Status: customer.status,
    'Last Contact': customer.lastContact || '',
  }))
}

export const formatDealData = (deals: Deal[]) => {
  return deals.map(deal => ({
    Title: deal.title,
    Company: deal.company,
    Contact: deal.contact,
    Value: `$${deal.value?.toLocaleString()}`,
    Stage: deal.stage,
    Probability: `${deal.probability}%`,
    'Expected Close': deal.expectedClose || '',
  }))
}
  