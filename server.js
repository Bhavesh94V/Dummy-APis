// server.js
const express = require('express');
const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());

// 1. Dashboard Summary
app.get('/api/summary/metrics', (req, res) => {
    res.json({
        totalRevenue: 125670,
        commissionEarned: 12567,
        totalPayouts: 89340,
        pendingPayments: 23,
        totalUsers: 5800,
        totalDrivers: 1100
    });
});

// 2. Fleet Management
app.get('/api/fleet/list', (req, res) => {
    res.json([
        { id: 'VH001', model: 'Toyota Innova', status: 'Available', lastService: '2024-05-10' },
        { id: 'VH002', model: 'Honda City', status: 'In Use', lastService: '2024-04-22' },
        { id: 'VH003', model: 'Tata Tiago', status: 'Maintenance', lastService: '2024-05-01' },
        { id: 'VH004', model: 'Hyundai Creta', status: 'Available', lastService: '2024-03-15' },
        { id: 'VH005', model: 'Suzuki Swift', status: 'In Use', lastService: '2024-04-29' }
    ]);
});

// 3. Live Tracking
app.get('/api/vehicles/locations', (req, res) => {
    res.json([
        { vehicleId: 'VH001', lat: 28.6139, lng: 77.2090 },
        { vehicleId: 'VH002', lat: 28.6448, lng: 77.2167 },
        { vehicleId: 'VH003', lat: 28.5355, lng: 77.3910 },
        { vehicleId: 'VH004', lat: 28.4089, lng: 77.3178 },
        { vehicleId: 'VH005', lat: 28.7041, lng: 77.1025 }
    ]);
});

// 4. Complaints
app.get('/api/complaints', (req, res) => {
    res.json([
        { id: 'CMP001', user: 'John Doe', issue: 'Late driver', status: 'Open' },
        { id: 'CMP002', user: 'Jane Smith', issue: 'Wrong route taken', status: 'Resolved' },
        { id: 'CMP003', user: 'Akash Mehta', issue: 'Overcharged', status: 'Open' },
        { id: 'CMP004', user: 'Riya Jain', issue: 'Driver misbehaved', status: 'Investigating' },
        { id: 'CMP005', user: 'Amit Raj', issue: 'Ride cancellation without notice', status: 'Open' }
    ]);
});

// 5. Rides Management
app.get('/api/rides', (req, res) => {
    res.json([
        { id: 'RD001', user: 'John Doe', driver: 'Driver A', fare: 230, status: 'Completed' },
        { id: 'RD002', user: 'Jane Smith', driver: 'Driver B', fare: 180, status: 'Ongoing' },
        { id: 'RD003', user: 'Riya Jain', driver: 'Driver C', fare: 300, status: 'Cancelled' },
        { id: 'RD004', user: 'Amit Raj', driver: 'Driver D', fare: 250, status: 'Completed' },
        { id: 'RD005', user: 'Rahul Sinha', driver: 'Driver E', fare: 210, status: 'Ongoing' }
    ]);
});

// 6. User Management
app.get('/api/users', (req, res) => {
    res.json([
        { id: 'USR001', name: 'John Doe', role: 'Customer', status: 'Active' },
        { id: 'USR002', name: 'Jane Smith', role: 'Customer', status: 'Blocked' },
        { id: 'USR003', name: 'Akash Mehta', role: 'Driver', status: 'Active' },
        { id: 'USR004', name: 'Riya Jain', role: 'Customer', status: 'Active' },
        { id: 'USR005', name: 'Amit Raj', role: 'Driver', status: 'Suspended' }
    ]);
});

// 7. Payments
app.get('/api/payments', (req, res) => {
    res.json([
        { id: 'PAY001', user: 'John Doe', amount: 450, commission: 45, status: 'Completed', method: 'UPI' },
        { id: 'PAY002', user: 'Rajesh Kumar', amount: 2340, commission: 234, status: 'Processing', method: 'Bank Transfer' },
        { id: 'PAY003', user: 'Riya Jain', amount: 1250, commission: 125, status: 'Completed', method: 'Card' },
        { id: 'PAY004', user: 'Amit Raj', amount: 980, commission: 98, status: 'Refunded', method: 'Cash' },
        { id: 'PAY005', user: 'Jane Smith', amount: 1500, commission: 150, status: 'Completed', method: 'Wallet' }
    ]);
});

// 8. Analytics Report
app.get('/api/analytics/earnings', (req, res) => {
    res.json({
        totalEarnings: 328000,
        totalRides: 8400,
        avgPerRide: 390,
        cancelRate: 4.2
    });
});

app.get('/api/analytics/hourly', (req, res) => {
    res.json([
        { hour: '6AM', earnings: 2100 },
        { hour: '9AM', earnings: 4200 },
        { hour: '12PM', earnings: 6200 },
        { hour: '3PM', earnings: 4300 },
        { hour: '6PM', earnings: 6900 },
        { hour: '9PM', earnings: 4800 },
        { hour: '12AM', earnings: 1900 }
    ]);
});

// 9. Settings
app.get('/api/settings', (req, res) => {
    res.json({
        siteName: 'IdharUdhar Admin Panel',
        theme: 'dark',
        notifications: true,
        dataExport: true,
        timezone: 'Asia/Kolkata'
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Dummy API Server running on http://localhost:${PORT}`);
});
