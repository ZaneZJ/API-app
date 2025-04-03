export const PlanCard = () => {
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
          <span className="text-sm">0 / 1,000 Credits</span>
        </div>
        <div className="h-2 bg-white/30 rounded-full overflow-hidden">
          <div className="h-full bg-white/90 rounded-full" style={{ width: '0%' }} />
        </div>
      </div>
    </div>
  );
}; 