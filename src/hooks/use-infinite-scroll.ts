import { useState, useEffect, useCallback, useRef } from 'react'

export function useInfiniteScroll<T>(
  fetchData: (page: number) => Promise<T[]>
) {
  const [data, setData] = useState<T[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return

    setLoading(true)
    setError(null)
    
    try {
      const newData = await fetchData(page)
      if (newData.length === 0) {
        setHasMore(false)
      } else {
        setData(prev => [...prev, ...newData])
        setPage(prev => prev + 1)
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to load data')
    } finally {
      setLoading(false)
    }
  }, [fetchData, page, loading, hasMore])

  const reset = useCallback(() => {
    setData([])
    setPage(1)
    setHasMore(true)
    setError(null)
  }, [])

  useEffect(() => {
    loadMore()
  }, [loadMore])

  const lastElementRef = useCallback((node: HTMLElement | null) => {
    if (loading) return
    
    if (observerRef.current) {
      observerRef.current.disconnect()
    }
    
    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMore()
      }
    })
    
    if (node) {
      observerRef.current.observe(node)
    }
  }, [loading, hasMore, loadMore])

  return { 
    data, 
    loading, 
    hasMore, 
    error, 
    loadMore, 
    reset, 
    lastElementRef 
  }
}
