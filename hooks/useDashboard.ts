import { useEffect, useState } from 'react';
import { getDashboard } from '../services/getDashboard';

export const useDashboard = () => {
  const [dashboardData, setDashboardData] = useState<{
    total_candidates: number;
    vacant_candidates: number;
    live_candidates: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const data = await getDashboard();
        setDashboardData(data);
      } catch (err) {
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return { dashboardData, loading, error };
};
