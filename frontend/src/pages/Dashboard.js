import React, { useState, useEffect } from 'react';
import { 
  Grid, 
  Paper, 
  Typography, 
  Box, 
  Card, 
  CardContent,
  CardHeader,
  Divider,
  CircularProgress
} from '@mui/material';
import { Bar, Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [narrative, setNarrative] = useState('');
  
  // Sample data for charts
  const salesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Sales 2023',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue 2023',
        data: [33, 25, 35, 51, 54, 76],
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
      },
    ],
  };

  const marketShareData = {
    labels: ['Product A', 'Product B', 'Product C', 'Product D'],
    datasets: [
      {
        label: 'Market Share',
        data: [12, 19, 3, 5],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Sample AI-generated narrative
  useEffect(() => {
    // Simulate API call to get AI-generated narrative
    setTimeout(() => {
      setNarrative(
        "Based on the current data, sales have fluctuated significantly in the first half of 2023, with a peak in February followed by a sharp decline in March. However, revenue has shown a consistent upward trend, indicating higher profit margins or additional revenue streams beyond direct sales. Product B currently holds the largest market share at 49%, suggesting it's your most successful offering. Consider investigating the factors behind March's sales drop while capitalizing on the strategies driving revenue growth."
      );
      setLoading(false);
    }, 1500);
  }, []);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Business Performance Dashboard
      </Typography>
      
      {/* AI Narrative Section */}
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          AI-Generated Business Insights
        </Typography>
        <Divider sx={{ mb: 2 }} />
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Typography variant="body1">{narrative}</Typography>
        )}
      </Paper>

      {/* Charts Section */}
      <Grid container spacing={4}>
        {/* Sales Chart */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Monthly Sales" />
            <CardContent>
              <Bar data={salesData} />
            </CardContent>
          </Card>
        </Grid>
        
        {/* Revenue Chart */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Monthly Revenue" />
            <CardContent>
              <Line data={revenueData} />
            </CardContent>
          </Card>
        </Grid>
        
        {/* Market Share Chart */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Product Market Share" />
            <CardContent>
              <Pie data={marketShareData} />
            </CardContent>
          </Card>
        </Grid>
        
        {/* KPI Summary */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Key Performance Indicators" />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Paper elevation={2} sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h6">Total Sales</Typography>
                    <Typography variant="h4" color="primary">$44,000</Typography>
                    <Typography variant="body2" color="text.secondary">+12% from last month</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper elevation={2} sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h6">Conversion Rate</Typography>
                    <Typography variant="h4" color="primary">3.2%</Typography>
                    <Typography variant="body2" color="text.secondary">+0.5% from last month</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper elevation={2} sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h6">Avg. Order Value</Typography>
                    <Typography variant="h4" color="primary">$156</Typography>
                    <Typography variant="body2" color="text.secondary">-$12 from last month</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper elevation={2} sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h6">Customer Retention</Typography>
                    <Typography variant="h4" color="primary">68%</Typography>
                    <Typography variant="body2" color="text.secondary">+2% from last month</Typography>
                  </Paper>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;