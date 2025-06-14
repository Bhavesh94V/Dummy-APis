const express = require('express');
const app = express();
const PORT = 5000;
const http = require('http');
const cors = require('cors');
const socketIo = require('socket.io');

// Middleware
app.use(express.json());
app.use(cors());

const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: '*' } });

// Dummy Driver Data for Real-time Updates
let drivers = [
    { id: 'DR001', name: 'Rajesh Kumar', vehicle: 'Honda City - DL-01-AB-1234', lat: 28.6139, lng: 77.2090, location: 'Connaught Place, Delhi', status: 'En Route', eta: 8 },
    { id: 'DR002', name: 'Amit Singh', vehicle: 'Royal Enfield - DL-02-CD-5678', lat: 28.5355, lng: 77.3910, location: 'Sector 18, Noida', status: 'Pickup', eta: 12 },
    { id: 'DR003', name: 'Ravi Verma', vehicle: 'Hyundai Creta - DL-04-EF-9999', lat: 28.7041, lng: 77.1025, location: 'Rohini, Delhi', status: 'En Route', eta: 15 }
];

// Emit live location every 5 seconds
setInterval(() => {
    // Simulate location changes and ETA updates
    drivers = drivers.map(driver => {
        return {
            ...driver,
            lat: driver.lat + (Math.random() - 0.5) * 0.002,
            lng: driver.lng + (Math.random() - 0.5) * 0.002,
            eta: Math.max(1, driver.eta - 1)
        };
    });
    io.emit('liveLocationUpdate', drivers);
}, 5000);

// REST API Routes
app.get('/api/live-tracking/drivers', (req, res) => {
    res.json(drivers);
});

app.get('/api/summary/metrics', (req, res) => {
    res.json({
        todaysRides: 1247,
        totalDrivers: 342,
        todaysIncome: 45670,
        completedRides: 1189,
        cancelledRides: 58
    });
});

app.get('/api/rides', (req, res) => {
    res.json([
        { id: 'RD001', user: 'John Doe', fare: 250, status: 'Completed', type: 'Ride', time: '2 mins ago' },
        { id: 'RD002', user: 'Sarah Khan', fare: 180, status: 'In Progress', type: 'Food', time: '5 mins ago' },
        { id: 'RD003', user: 'Ajay Meena', fare: 130, status: 'Cancelled', type: 'Courier', time: '10 mins ago' }
    ]);
});

// Additional static endpoints already provided by you
app.get('/api/fleet/list', (req, res) => {
    res.json([
        { id: 'VH001', model: 'Toyota Innova', status: 'Available', lastService: '2024-05-10' },
        { id: 'VH002', model: 'Honda City', status: 'In Use', lastService: '2024-04-22' },
        { id: 'VH003', model: 'Tata Tiago', status: 'Maintenance', lastService: '2024-05-01' },
        { id: 'VH004', model: 'Hyundai Creta', status: 'Available', lastService: '2024-03-15' },
        { id: 'VH005', model: 'Suzuki Swift', status: 'In Use', lastService: '2024-04-29' }
    ]);
});

app.get('/api/complaints', (req, res) => {
    res.json([
        { id: 'CMP001', user: 'John Doe', issue: 'Late driver', status: 'Open' },
        { id: 'CMP002', user: 'Jane Smith', issue: 'Wrong route taken', status: 'Resolved' },
        { id: 'CMP003', user: 'Akash Mehta', issue: 'Overcharged', status: 'Open' },
        { id: 'CMP004', user: 'Riya Jain', issue: 'Driver misbehaved', status: 'Investigating' },
        { id: 'CMP005', user: 'Amit Raj', issue: 'Ride cancellation without notice', status: 'Open' }
    ]);
});

app.get('/api/users', (req, res) => {
    res.json([
        { id: 'USR001', name: 'John Doe', role: 'Customer', status: 'Active' },
        { id: 'USR002', name: 'Jane Smith', role: 'Customer', status: 'Blocked' },
        { id: 'USR003', name: 'Akash Mehta', role: 'Driver', status: 'Active' },
        { id: 'USR004', name: 'Riya Jain', role: 'Customer', status: 'Active' },
        { id: 'USR005', name: 'Amit Raj', role: 'Driver', status: 'Suspended' }
    ]);
});

app.get('/api/payments', (req, res) => {
    res.json([
        { id: 'PAY001', user: 'John Doe', amount: 450, commission: 45, status: 'Completed', method: 'UPI' },
        { id: 'PAY002', user: 'Rajesh Kumar', amount: 2340, commission: 234, status: 'Processing', method: 'Bank Transfer' },
        { id: 'PAY003', user: 'Riya Jain', amount: 1250, commission: 125, status: 'Completed', method: 'Card' },
        { id: 'PAY004', user: 'Amit Raj', amount: 980, commission: 98, status: 'Refunded', method: 'Cash' },
        { id: 'PAY005', user: 'Jane Smith', amount: 1500, commission: 150, status: 'Completed', method: 'Wallet' }
    ]);
});

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
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
