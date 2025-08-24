import { useState } from 'react';
import API from './api';
import './App.css';

export default function App() {
  const [rawHeaders, setRawHeaders] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeEmail = async () => {
    if (!rawHeaders.trim()) return alert('Please paste email headers');
    setLoading(true);
    try {
      const res = await API.post('/emails/analyze', { rawHeaders });
      setResult(res.data);
    } catch (err) {
      console.error(err);
      alert('Error analyzing email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center p-4'>
      <div className='bg-white shadow-xl rounded-2xl w-full max-w-3xl p-6'>
        <h1 className='text-2xl font-bold mb-4 text-center'>
          📧 Email Analyzer
        </h1>

        <textarea
          className='w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 mb-4'
          rows='10'
          placeholder="Paste only the email headers (from 'Delivered-To:' till before the HTML body)..."
          value={rawHeaders}
          onChange={(e) => setRawHeaders(e.target.value)}
        />

        <button
          onClick={analyzeEmail}
          disabled={loading}
          className='w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium'
        >
          {loading ? 'Analyzing...' : 'Analyze Email'}
        </button>

        {result && (
          <div className='mt-6'>
            <h2 className='text-xl font-semibold mb-4'>Results</h2>

            <p className='mb-4'>
              ESP Type:{' '}
              <span className='bg-green-200 px-2 py-1 rounded'>
                {result.espType}
              </span>
            </p>

            <h3 className='text-lg font-medium mb-2'>Receiving Chain</h3>
            <div className='overflow-x-auto'>
              <table className='min-w-full border border-gray-300'>
                <thead className='bg-gray-100'>
                  <tr>
                    <th className='px-3 py-2 border'>#</th>
                    <th className='px-3 py-2 border'>From</th>
                    <th className='px-3 py-2 border'>To</th>
                    <th className='px-3 py-2 border'>Protocol</th>
                    <th className='px-3 py-2 border'>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {result.receivingChain.map((hop, idx) => (
                    <tr key={idx} className='text-sm'>
                      <td className='px-3 py-2 border'>{idx}</td>
                      <td className='px-3 py-2 border'>{hop.from}</td>
                      <td className='px-3 py-2 border'>{hop.to}</td>
                      <td className='px-3 py-2 border'>{hop.protocol}</td>
                      <td className='px-3 py-2 border'>{hop.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
