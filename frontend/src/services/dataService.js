import api from './api';

// Upload data file
export const uploadData = async (formData) => {
  const response = await api.post('/data/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

// Get all data sources
export const getDataSources = async () => {
  const response = await api.get('/data/sources');
  return response.data;
};

// Preview data from a source
export const previewData = async (sourceId) => {
  const response = await api.get(`/data/preview/${sourceId}`);
  return response.data;
};

// Analyze data
export const analyzeData = async (sourceId, analysisType) => {
  const response = await api.post('/data/analyze', { sourceId, analysisType });
  return response.data;
};