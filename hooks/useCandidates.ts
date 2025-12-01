import { useState, useEffect, useCallback } from 'react';
import { getCandidates } from '../services/getCandidates';

interface Candidate {
  id: number;
  date_added: string;
  site_id: string;
  site_reg_status: string | null;
  site_type: string;
  expected_lease_amount: number | null;
  region: string;
  city: string;
}

interface CandidatesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Candidate[];
}

export const useCandidates = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(null);
  const [previousPageUrl, setPreviousPageUrl] = useState<string | null>(null);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchCandidates = useCallback(async (url?: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data: CandidatesResponse = await getCandidates(url);
      setCandidates(data.results);
      setNextPageUrl(data.next);
      setPreviousPageUrl(data.previous);
      setCount(data.count);
    } catch (err: any) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCandidates();
  }, [fetchCandidates]);

  const fetchNextPage = () => {
    if (nextPageUrl) {
      fetchCandidates(nextPageUrl);
      setCurrentPage(currentPage + 1);
    }
  };

  const fetchPreviousPage = () => {
    if (previousPageUrl) {
      fetchCandidates(previousPageUrl);
      setCurrentPage(currentPage - 1);
    }
  };

  return { 
    candidates, 
    isLoading, 
    error, 
    fetchNextPage, 
    fetchPreviousPage, 
    hasNextPage: !!nextPageUrl, 
    hasPreviousPage: !!previousPageUrl, 
    count, 
    currentPage 
  };
};
