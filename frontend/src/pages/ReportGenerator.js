import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Chip,
  Divider,
  Card,
  CardContent,
  CardActions,
  Switch,
  FormControlLabel,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  Description as DescriptionIcon,
  PictureAsPdf as PdfIcon,
  InsertDriveFile as DocIcon,
  Slideshow as PptIcon,
} from '@mui/icons-material';

const ReportGenerator = () => {
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [reportConfig, setReportConfig] = useState({
    title: '',
    dataSource: '',
    timeRange: 'last30days',
    metrics: [],
    includeExecutiveSummary: true,
    includeRecommendations: true,
    includeCharts: true,
    format: 'pdf',
  });

  const handleChange = (event) => {
    const { name, value, checked } = event.target;
    setReportConfig({
      ...reportConfig,
      [name]: event.target.type === 'checkbox' ? checked : value,
    });
  };

  const handleMetricsChange = (event) => {
    setReportConfig({
      ...reportConfig,
      metrics: event.target.value,
    });
  };

  const handleGenerateReport = () => {
    setLoading(true);
    // Simulate report generation
    setTimeout(() => {
      setLoading(false);
      setGenerated(true);
    }, 3000);
  };

  const dataSources = [
    { value: 'sales_data', label: 'Sales Data (Q1-Q2 2023)' },
    { value: 'marketing_data', label: 'Marketing Campaign Results' },
    { value: 'customer_data', label: 'Customer Demographics' },
    { value: 'financial_data', label: 'Financial Performance' },
  ];

  const timeRanges = [
    { value: 'last7days', label: 'Last 7 Days' },
    { value: 'last30days', label: 'Last 30 Days' },
    { value: 'last90days', label: 'Last 90 Days' },
    { value: 'lastYear', label: 'Last Year' },
    { value: 'custom', label: 'Custom Range' },
  ];

  const metrics = [
    { value: 'sales', label: 'Sales' },
    { value: 'revenue', label: 'Revenue' },
    { value: 'profit', label: 'Profit' },
    { value: 'customers', label: 'Customer Count' },
    { value: 'conversion', label: 'Conversion Rate' },
    { value: 'retention', label: 'Customer Retention' },
    { value: 'cac', label: 'Customer Acquisition Cost' },
    { value: 'ltv', label: 'Customer Lifetime Value' },
  ];

  const reportTemplates = [
    {
      title: 'Executive Dashboard',
      description: 'High-level overview of business performance',
      icon: <DescriptionIcon fontSize="large" />,
    },
    {
      title: 'Sales Performance',
      description: 'Detailed analysis of sales metrics and trends',
      icon: <DescriptionIcon fontSize="large" />,
    },
    {
      title: 'Marketing ROI',
      description: 'Analysis of marketing campaign effectiveness',
      icon: <DescriptionIcon fontSize="large" />,
    },
    {
      title: 'Customer Insights',
      description: 'Deep dive into customer behavior and segments',
      icon: <DescriptionIcon fontSize="large" />,
    },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        AI Report Generator
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom>
              Report Configuration
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Report Title"
                  name="title"
                  value={reportConfig.title}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="data-source-label">Data Source</InputLabel>
                  <Select
                    labelId="data-source-label"
                    id="data-source"
                    name="dataSource"
                    value={reportConfig.dataSource}
                    label="Data Source"
                    onChange={handleChange}
                  >
                    {dataSources.map((source) => (
                      <MenuItem key={source.value} value={source.value}>
                        {source.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="time-range-label">Time Range</InputLabel>
                  <Select
                    labelId="time-range-label"
                    id="time-range"
                    name="timeRange"
                    value={reportConfig.timeRange}
                    label="Time Range"
                    onChange={handleChange}
                  >
                    {timeRanges.map((range) => (
                      <MenuItem key={range.value} value={range.value}>
                        {range.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="metrics-label">Metrics to Include</InputLabel>
                  <Select
                    labelId="metrics-label"
                    id="metrics"
                    multiple
                    value={reportConfig.metrics}
                    onChange={handleMetricsChange}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip 
                            key={value} 
                            label={metrics.find(m => m.value === value)?.label} 
                            size="small" 
                          />
                        ))}
                      </Box>
                    )}
                  >
                    {metrics.map((metric) => (
                      <MenuItem key={metric.value} value={metric.value}>
                        {metric.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  Report Content
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={reportConfig.includeExecutiveSummary}
                          onChange={handleChange}
                          name="includeExecutiveSummary"
                        />
                      }
                      label="Executive Summary"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={reportConfig.includeRecommendations}
                          onChange={handleChange}
                          name="includeRecommendations"
                        />
                      }
                      label="AI Recommendations"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={reportConfig.includeCharts}
                          onChange={handleChange}
                          name="includeCharts"
                        />
                      }
                      label="Data Visualizations"
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  Export Format
                </Typography>
                <Grid container spacing={2}>
                  <Grid item>
                    <Button
                      variant={reportConfig.format === 'pdf' ? 'contained' : 'outlined'}
                      startIcon={<PdfIcon />}
                      onClick={() => setReportConfig({ ...reportConfig, format: 'pdf' })}
                    >
                      PDF
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant={reportConfig.format === 'docx' ? 'contained' : 'outlined'}
                      startIcon={<DocIcon />}
                      onClick={() => setReportConfig({ ...reportConfig, format: 'docx' })}
                    >
                      Word
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant={reportConfig.format === 'pptx' ? 'contained' : 'outlined'}
                      startIcon={<PptIcon />}
                      onClick={() => setReportConfig({ ...reportConfig, format: 'pptx' })}
                    >
                      PowerPoint
                    </Button>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ mt: 2 }}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={handleGenerateReport}
                    disabled={loading || !reportConfig.title || !reportConfig.dataSource || reportConfig.metrics.length === 0}
                    fullWidth
                  >
                    {loading ? (
                      <CircularProgress size={24} color="inherit" sx={{ mr: 1 }} />
                    ) : (
                      'Generate AI Report'
                    )}
                  </Button>
                </Box>
              </Grid>

              {generated && (
                <Grid item xs={12}>
                  <Alert severity="success">
                    Report generated successfully! Click the download button to save it.
                  </Alert>
                  <Box sx={{ mt: 2, textAlign: 'center' }}>
                    <Button
                      variant="contained"
                      color="success"
                      startIcon={reportConfig.format === 'pdf' ? <PdfIcon /> : reportConfig.format === 'docx' ? <DocIcon /> : <PptIcon />}
                    >
                      Download {reportConfig.format.toUpperCase()} Report
                    </Button>
                  </Box>
                </Grid>
              )}
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom>
              Report Templates
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {reportTemplates.map((template, index) => (
                <Card key={index} variant="outlined">
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      {template.icon}
                      <Typography variant="h6" sx={{ ml: 1 }}>
                        {template.title}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {template.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Use Template</Button>
                    <Button size="small">Preview</Button>
                  </CardActions>
                </Card>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ReportGenerator;