import React, { useEffect, useState } from 'react';
import { Table, Card, Spinner } from 'react-bootstrap';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setActivities(results);
      })
      .catch(err => console.error('Error fetching activities:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title as="h2" className="mb-4">Activities</Card.Title>
        {loading ? (
          <div className="text-center"><Spinner animation="border" /></div>
        ) : activities.length === 0 ? (
          <div className="text-muted">No activities found.</div>
        ) : (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                {Object.keys(activities[0]).map((key) => (
                  <th key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {activities.map((activity, idx) => (
                <tr key={idx}>
                  {Object.values(activity).map((val, i) => (
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
export default Activities;
