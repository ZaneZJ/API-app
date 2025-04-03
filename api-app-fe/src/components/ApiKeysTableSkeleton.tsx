export const ApiKeysTableSkeleton = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm animate-pulse">
      <div className="p-6 border-b">
        <div className="flex justify-between items-center">
          <div className="h-8 w-32 bg-gray-200 rounded-lg"></div>
          <div className="h-10 w-28 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
      
      <div className="p-6">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="py-3 px-4 text-left">
                <div className="h-4 w-24 bg-gray-200 rounded"></div>
              </th>
              <th className="py-3 px-4 text-left">
                <div className="h-4 w-16 bg-gray-200 rounded"></div>
              </th>
              <th className="py-3 px-4 text-left">
                <div className="h-4 w-32 bg-gray-200 rounded"></div>
              </th>
              <th className="py-3 px-4 text-left">
                <div className="h-4 w-48 bg-gray-200 rounded"></div>
              </th>
              <th className="py-3 px-4"></th>
            </tr>
          </thead>
          <tbody>
            {[...Array(3)].map((_, index) => (
              <tr key={index} className="border-b">
                <td className="py-4 px-4">
                  <div className="h-6 w-32 bg-gray-200 rounded"></div>
                </td>
                <td className="py-4 px-4">
                  <div className="h-6 w-16 bg-gray-200 rounded"></div>
                </td>
                <td className="py-4 px-4">
                  <div className="space-y-2">
                    <div className="h-4 w-24 bg-gray-200 rounded"></div>
                    <div className="h-2 w-full bg-gray-200 rounded"></div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="h-6 w-48 bg-gray-200 rounded"></div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex justify-end gap-3">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="h-8 w-8 bg-gray-200 rounded-full"></div>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}; 