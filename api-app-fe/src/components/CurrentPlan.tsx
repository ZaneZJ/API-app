export function CurrentPlan() {
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
    </div>
  );
} 