import { useState, useEffect } from 'react';
import { getCandidateDetails } from '../services/candidateDetails';

export const useCandidateDetails = (candidateId: string) => {
  const [candidate, setCandidate] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const data = await getCandidateDetails(candidateId);
        console.log('Candidate Details Response:', data);
        setCandidate(data);
      } catch (err) {
        setError('Failed to fetch candidate details');
      } finally {
        setLoading(false);
      }
    };

    if (candidateId) {
      fetchDetails();
    }
  }, [candidateId]);

  return { candidate, loading, error };
};
