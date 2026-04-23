import React, { useEffect, useState } from 'react';
import { Table, Card, Spinner } from 'react-bootstrap';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setLeaderboard(results);
      })
      .catch(err => console.error('Error fetching leaderboard:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title as="h2" className="mb-4">Leaderboard</Card.Title>
        {loading ? (
          <div className="text-center"><Spinner animation="border" /></div>
        ) : leaderboard.length === 0 ? (
          <div className="text-muted">No leaderboard data found.</div>
        ) : (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                {Object.keys(leaderboard[0]).map((key) => (
                  <th key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry, idx) => (
                <tr key={idx}>
                  {Object.values(entry).map((val, i) => (
                    <td key={i}>{typeof val === 'object' ? JSON.stringify(val) : val}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card.Body>
    </Card>
  );
};
export default Leaderboard;
