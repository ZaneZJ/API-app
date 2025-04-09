import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export const PlanCard = () => {
  const [totalUsage, setTotalUsage] = useState(0);
  const [totalLimit, setTotalLimit] = useState(0);

  useEffect(() => {
    const fetchApiKeys = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data, error } = await supabase
          .from('api_keys')
          .select('usage, usage_limit')
          .eq('user_id', user.id);

        if (error) throw error;

        const totalUsage = data.reduce((sum, key) => sum + key.usage, 0);
        const totalLimit = data.reduce((sum, key) => sum + key.usage_limit, 0);
        
        setTotalUsage(totalUsage);
        setTotalLimit(totalLimit);
      } catch (error) {
        console.error('Error fetching API keys:', error);
      }
    };

    fetchApiKeys();
  }, []);

  return (
    <div className="rounded-xl p-8 bg-gradient-to-r from-rose-200 via-purple-200 to-blue-200">
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="text-sm font-medium mb-2">CURRENT PLAN</div>
          <h1 className="text-3xl font-bold">Researcher</h1>
        </div>
        <button className="bg-white/90 px-4 py-2 rounded-lg text-sm font-medium hover:bg-white transition-colors">
          Manage Plan
        </button>
      </div>
      
      <div className="mt-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">API Usage</span>
          <span className="text-sm">{totalUsage.toLocaleString()} / {totalLimit.toLocaleString()} Credits</span>
        </div>
        <div className="h-2 bg-white/30 rounded-full overflow-hidden">
          <div 
            className="h-full bg-white/90 rounded-full transition-all duration-300" 
            style={{ 
              width: `${Math.min((totalUsage / totalLimit) * 100, 100)}%`,
              backgroundColor: (totalUsage / totalLimit) > 0.9 
                ? 'rgb(239, 68, 68)' 
                : (totalUsage / totalLimit) > 0.7 
                  ? 'rgb(234, 179, 8)' 
                  : 'rgb(168, 85, 247)'
            }} 
          />
        </div>
      </div>
    </div>
  );
}; 