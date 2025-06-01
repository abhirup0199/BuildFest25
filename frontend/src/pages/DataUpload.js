import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Stepper,
  Step,
  StepLabel,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Alert,
  CircularProgress,
} from '@mui/material';
import { CloudUpload as CloudUploadIcon } from '@mui/icons-material';

const steps = ['Select Data Source', 'Configure Data', 'Upload & Process'];

const DataUpload = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [dataSource, setDataSource] = useState('');
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [dataConfig, setDataConfig] = useState({
    dateColumn: '',
    valueColumns: [],
    categoryColumns: [],
  });

  const handleNext = () => {
    if (activeStep === 0 && !dataSource) {
      setError('Please select a data source');
      return;
    }
    
    if (activeStep === 0 && dataSource === 'file' && !file) {
      setError('Please select a file to upload');
      return;
    }
    
    setError('');
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    
    // Simulate processing on the final step
    if (activeStep === 2) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setSuccess(true);
      }, 2000);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setError('');
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
      setError('');
    }
  };

  const handleDataSourceChange = (event) => {
    setDataSource(event.target.value);
    setError('');
  };

  const handleConfigChange = (event) => {
    setDataConfig({
      ...dataConfig,
      [event.target.name]: event.target.value,
    });
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ mt: 4 }}>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel id="data-source-label">Data Source</InputLabel>
              <Select
                labelId="data-source-label"
                id="data-source"
                value={dataSource}
                label="Data Source"
                onChange={handleDataSourceChange}
              >
                <MenuItem value="file">File Upload (CSV, Excel, JSON)</MenuItem>
                <MenuItem value="database">Database Connection</MenuItem>
                <MenuItem value="api">API Integration</MenuItem>
              </Select>
            </FormControl>

            {dataSource === 'file' && (
              <Box sx={{ textAlign: 'center', py: 3 }}>
                <Button
                  variant="contained"
                  component="label"
                  startIcon={<CloudUploadIcon />}
                >
                  Select File
                  <input
                    type="file"
                    hidden
                    accept=".csv,.xlsx,.json"
                    onChange={handleFileChange}
                  />
                </Button>
                {fileName && (
                  <Typography variant="body1" sx={{ mt: 2 }}>
                    Selected file: {fileName}
                  </Typography>
                )}
              </Box>
            )}

            {dataSource === 'database' && (
              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Database URL"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Username"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            )}

            {dataSource === 'api' && (
              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="API Endpoint"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="API Key"
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            )}
          </Box>
        );
      case 1:
        return (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              Configure Data Mapping
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="date-column-label">Date Column</InputLabel>
                  <Select
                    labelId="date-column-label"
                    id="date-column"
                    name="dateColumn"
                    value={dataConfig.dateColumn}
                    label="Date Column"
                    onChange={handleConfigChange}
                  >
                    <MenuItem value="date">Date</MenuItem>
                    <MenuItem value="timestamp">Timestamp</MenuItem>
                    <MenuItem value="created_at">Created At</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="value-columns-label">Value Columns</InputLabel>
                  <Select
                    labelId="value-columns-label"
                    id="value-columns"
                    name="valueColumns"
                    multiple
                    value={dataConfig.valueColumns}
                    label="Value Columns"
                    onChange={handleConfigChange}
                  >
                    <MenuItem value="sales">Sales</MenuItem>
                    <MenuItem value="revenue">Revenue</MenuItem>
                    <MenuItem value="profit">Profit</MenuItem>
                    <MenuItem value="quantity">Quantity</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="category-columns-label">Category Columns</InputLabel>
                  <Select
                    labelId="category-columns-label"
                    id="category-columns"
                    name="categoryColumns"
                    multiple
                    value={dataConfig.categoryColumns}
                    label="Category Columns"
                    onChange={handleConfigChange}
                  >
                    <MenuItem value="product">Product</MenuItem>
                    <MenuItem value="region">Region</MenuItem>
                    <MenuItem value="customer">Customer</MenuItem>
                    <MenuItem value="channel">Channel</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        );
      case 2:
        return (
          <Box sx={{ mt: 4, textAlign: 'center' }}>
            {loading ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <CircularProgress size={60} sx={{ mb: 3 }} />
                <Typography variant="h6">Processing your data...</Typography>
                <Typography variant="body1" color="text.secondary">
                  This may take a few moments
                </Typography>
              </Box>
            ) : success ? (
              <Box>
                <Alert severity="success" sx={{ mb: 3 }}>
                  Data uploaded and processed successfully!
                </Alert>
                <Typography variant="body1">
                  Your data is now ready for analysis and reporting.
                </Typography>
                <Button
                  variant="contained"
                  sx={{ mt: 3 }}
                  onClick={() => window.location.href = '/'}
                >
                  Go to Dashboard
                </Button>
              </Box>
            ) : (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Ready to Upload and Process
                </Typography>
                <Typography variant="body1" paragraph>
                  Click "Process Data" to upload and analyze your data.
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  This will upload your data to our secure servers and prepare it for AI analysis.
                </Typography>
              </Box>
            )}
          </Box>
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Data Upload & Configuration
      </Typography>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {error && <Alert severity="error" sx={{ mt: 3 }}>{error}</Alert>}

        {renderStepContent(activeStep)}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button
            disabled={activeStep === 0 || loading || success}
            onClick={handleBack}
          >
            Back
          </Button>
          <Button
            variant="contained"
            onClick={handleNext}
            disabled={loading || success}
          >
            {activeStep === steps.length - 1 ? 'Process Data' : 'Next'}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default DataUpload;