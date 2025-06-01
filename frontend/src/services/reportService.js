import api from './api';

// Create a new report
export const createReport = async (reportData) => {
  const response = await api.post('/reports', reportData);
  return response.data;
};

// Get all reports
export const getReports = async () => {
  const response = await api.get('/reports');
  return response.data;
};

// Get single report
export const getReport = async (id) => {
  const response = await api.get(`/reports/${id}`);
  return response.data;
};

// Update report
export const updateReport = async (id, reportData) => {
  const response = await api.put(`/reports/${id}`, reportData);
  return response.data;
};

// Delete report
export const deleteReport = async (id) => {
  const response = await api.delete(`/reports/${id}`);
  return response.data;
};

// Generate narrative
export const generateNarrative = async (reportId, visualizationData) => {
  const response = await api.post('/reports/narrative', {
    reportId,
    visualizationData
  });
  return response.data;
};