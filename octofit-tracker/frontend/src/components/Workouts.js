import React, { useEffect, useState } from 'react';
import { Table, Card, Spinner } from 'react-bootstrap';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setWorkouts(results);
      })
      .catch(err => console.error('Error fetching workouts:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title as="h2" className="mb-4">Workouts</Card.Title>
        {loading ? (
          <div className="text-center"><Spinner animation="border" /></div>
        ) : workouts.length === 0 ? (
          <div className="text-muted">No workouts found.</div>
        ) : (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                {Object.keys(workouts[0]).map((key) => (
                  <th key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {workouts.map((workout, idx) => (
                <tr key={idx}>
                  {Object.values(workout).map((val, i) => (
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
export default Workouts;
