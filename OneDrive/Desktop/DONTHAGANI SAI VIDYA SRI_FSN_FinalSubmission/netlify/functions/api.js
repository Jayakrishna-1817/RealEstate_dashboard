let shipments = [
  {
    "id": 1,
    "trackingNumber": "CT2024001",
    "sender": "John Smith",
    "recipient": "Alice Johnson",
    "status": "In Transit",
    "currentLocation": "New York Distribution Center",
    "estimatedDelivery": "2024-12-28",
    "origin": "New York, NY",
    "destination": "Los Angeles, CA"
  },
  {
    "id": 2,
    "trackingNumber": "CT2024002",
    "sender": "Bob Wilson",
    "recipient": "Carol Davis",
    "status": "Delivered",
    "currentLocation": "Chicago Delivery Hub",
    "estimatedDelivery": "2024-12-25",
    "origin": "Chicago, IL",
    "destination": "Detroit, MI"
  },
  {
    "id": 3,
    "trackingNumber": "CT2024003",
    "sender": "Emma Thompson",
    "recipient": "Michael Brown",
    "status": "Processing",
    "currentLocation": "Miami Warehouse",
    "estimatedDelivery": "2024-12-30",
    "origin": "Miami, FL",
    "destination": "Orlando, FL"
  }
];

let users = [];
let nextId = 4;

exports.handler = async (event, context) => {
  const { httpMethod, path, body, queryStringParameters } = event;
  
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
  };

  if (httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    // Handle shipments endpoints
    if (path.includes('/shipments')) {
      if (httpMethod === 'GET') {
        if (path.includes('/shipments/')) {
          // Get single shipment
          const id = parseInt(path.split('/').pop());
          const shipment = shipments.find(s => s.id === id);
          if (!shipment) {
            return { statusCode: 404, headers, body: JSON.stringify({ error: 'Shipment not found' }) };
          }
          return { statusCode: 200, headers, body: JSON.stringify(shipment) };
        } else {
          // Get all shipments
          return { statusCode: 200, headers, body: JSON.stringify(shipments) };
        }
      }
      
      if (httpMethod === 'POST') {
        const newShipment = { ...JSON.parse(body), id: nextId++ };
        shipments.push(newShipment);
        return { statusCode: 201, headers, body: JSON.stringify(newShipment) };
      }
      
      if (httpMethod === 'PUT') {
        const id = parseInt(path.split('/').pop());
        const index = shipments.findIndex(s => s.id === id);
        if (index === -1) {
          return { statusCode: 404, headers, body: JSON.stringify({ error: 'Shipment not found' }) };
        }
        shipments[index] = { ...shipments[index], ...JSON.parse(body) };
        return { statusCode: 200, headers, body: JSON.stringify(shipments[index]) };
      }
      
      if (httpMethod === 'DELETE') {
        const id = parseInt(path.split('/').pop());
        const index = shipments.findIndex(s => s.id === id);
        if (index > -1) {
          shipments.splice(index, 1);
        }
        return { statusCode: 204, headers, body: '' };
      }
    }

    // Handle users endpoints
    if (path.includes('/users')) {
      if (httpMethod === 'POST') {
        const newUser = { ...JSON.parse(body), id: Date.now() };
        users.push(newUser);
        return { statusCode: 201, headers, body: JSON.stringify(newUser) };
      }
    }

    // Handle login endpoint
    if (path.includes('/login')) {
      if (httpMethod === 'POST') {
        const { email, password } = JSON.parse(body);
        const user = users.find(u => u.email === email && u.password === password);
        if (!user) {
          return { statusCode: 401, headers, body: JSON.stringify({ error: 'Invalid credentials' }) };
        }
        return { statusCode: 200, headers, body: JSON.stringify(user) };
      }
    }
    
    return { statusCode: 404, headers, body: JSON.stringify({ error: 'Not Found' }) };
  } catch (error) {
    return { 
      statusCode: 500, 
      headers, 
      body: JSON.stringify({ error: error.message }) 
    };
  }
};
