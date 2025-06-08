/**
 * Custom hook for managing skip data
 */
import { useState, useEffect } from 'react';
import { Skip } from '../types';
import { SkipApiService } from '../services/api';

export function useSkips(postcode: string, area: string) {
  const [skips, setSkips] = useState<Skip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSkips = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await SkipApiService.fetchSkipsByLocation(postcode, area);
      setSkips(data);
    } catch (err) {
      setError('Failed to load skip options. Using demo data.');
      // Use fallback data on error
      setSkips(SkipApiService.getFallbackSkips());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (postcode && area) {
      fetchSkips();
    }
  }, [postcode, area]);

  return {
    skips,
    loading,
    error,
    refetch: fetchSkips
  };
}