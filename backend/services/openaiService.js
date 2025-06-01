const axios = require('axios');

// Generate narrative from data without requiring OpenAI API
exports.generateNarrative = async (data) => {
  try {
    // Instead of calling OpenAI API, we'll generate a mock narrative based on the data
    console.log('Generating narrative for data:', JSON.stringify(data).substring(0, 100) + '...');
    
    // Create a simple mock narrative based on data patterns
    const mockNarrative = generateMockNarrative(data);
    
    return {
      title: 'Data Analysis Insights',
      content: mockNarrative.content,
      insights: mockNarrative.insights
    };
  } catch (error) {
    console.error('Narrative Generation Error:', error);
    throw new Error('Failed to generate narrative');
  }
};

// Helper function to generate mock narratives based on data patterns
function generateMockNarrative(data) {
  // Default narrative for when we can't extract meaningful patterns
  let content = 'The data shows several interesting patterns that warrant attention. There appears to be a positive trend in the main metrics, with some seasonal variations. Key segments are performing above average, while a few areas may need additional focus.';
  let insights = [
    'Overall positive trend in main performance indicators',
    'Seasonal variations affect metrics with predictable patterns',
    'Some segments consistently outperform others'
  ];
  
  // If we have actual data to analyze, try to extract some basic insights
  if (data && typeof data === 'object') {
    // Check if it's visualization data with datasets
    if (data.datasets && Array.isArray(data.datasets) && data.datasets.length > 0) {
      const dataset = data.datasets[0];
      if (dataset.data && Array.isArray(dataset.data)) {
        const values = dataset.data;
        
        // Calculate some basic statistics
        const sum = values.reduce((a, b) => a + b, 0);
        const avg = sum / values.length;
        const max = Math.max(...values);
        const maxIndex = values.indexOf(max);
        const increasing = values[values.length - 1] > values[0];
        
        // Generate narrative based on these statistics
        content = `The data analysis reveals an average value of ${avg.toFixed(2)} across the measured period. `;
        content += `The peak value of ${max} was observed at point ${maxIndex + 1}. `;
        content += increasing ? 
          'There is an overall upward trend, indicating positive growth.' : 
          'The trend appears to be stable or slightly declining over the period.';
        
        insights = [
          `Average value across period: ${avg.toFixed(2)}`,
          `Peak value of ${max} at point ${maxIndex + 1}`,
          increasing ? 'Overall upward trend detected' : 'Trend is stable or slightly declining'
        ];
      }
    }
  }
  
  return { content, insights };
}

// Helper function to extract key insights from the narrative
function extractInsights(narrative) {
  // Split the narrative into sentences
  const sentences = narrative.split(/[.!?]+/).filter(s => s.trim().length > 0);
  
  // Select up to 3 sentences as key insights
  return sentences.slice(0, 3).map(s => s.trim());
}