import { ApiResult } from '../interface/result';

interface ResultTableProps {
  result: ApiResult[];
}

const ResultTable = ({ result }: ResultTableProps) => {
  return (
    <table className="min-w-full bg-white border border-gray-200 mt-10">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 border-b border-gray-200 text-left text-2xl font-semibold text-gray-700 tracking-wider">
            Location
          </th>
          <th className="px-6 py-3 border-b border-gray-200 text-left text-2xl font-semibold text-gray-700 tracking-wider">
            State
          </th>
          <th className="px-6 py-3 border-b border-gray-200 text-left text-2xl font-semibold text-gray-700 tracking-wider">
            Post Code
          </th>
          <th className="px-6 py-3 border-b border-gray-200 text-left text-2xl font-semibold text-gray-700 tracking-wider">
            Category
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {result.length === 0 ? (
          <tr>
            <td colSpan={4} className="text-center text-gray-900 py-4">
              No results found
            </td>
          </tr>
        ) : (
          result.map((item: any) => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {item.location}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {item.state}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {item.postcode}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {item.category}
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default ResultTable;
