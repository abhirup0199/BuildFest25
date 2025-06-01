// Data Controller

// Upload data file
exports.uploadData = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'Please upload a file' });
    }

    // Create a new data source
    const dataSource = await DataSource.create({
      name: req.body.name || req.file.originalname,
      description: req.body.description || '',
      filePath: req.file.path,
      fileType: path.extname(req.file.originalname).substring(1),
      user: req.user.id, // This will come from auth middleware
      columns: [] // Will be populated after processing
    });

    // Process file to extract columns (for CSV files)
    if (dataSource.fileType === 'csv') {
      const columns = [];
      const columnTypes = {};
      
      // Read the first few rows to determine column types
      fs.createReadStream(req.file.path)
        .pipe(csv())
        .on('headers', (headers) => {
          headers.forEach(header => {
            columns.push({
              name: header,
              type: 'string', // Default type, will be updated
              description: ''
            });
          });
        })
        .on('data', (row) => {
          // Try to determine column types from data
          Object.keys(row).forEach(key => {
            const value = row[key];
            if (!isNaN(value) && value !== '') {
              columnTypes[key] = 'number';
            } else if (/^\d{4}-\d{2}-\d{2}/.test(value)) {
              columnTypes[key] = 'date';
            }
          });
        })
        .on('end', async () => {
          // Update column types
          columns.forEach(column => {
            if (columnTypes[column.name]) {
              column.type = columnTypes[column.name];
            }
          });
          
          // Update the data source with column information
          dataSource.columns = columns;
          await dataSource.save();
        });
    }

    res.status(201).json({
      success: true,
      data: dataSource
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// Get all data sources
exports.getDataSources = async (req, res) => {
  try {
    const dataSources = await DataSource.find({ user: req.user.id });
    
    res.status(200).json({
      success: true,
      count: dataSources.length,
      data: dataSources
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// Preview data from a source
exports.previewData = async (req, res) => {
  try {
    const dataSource = await DataSource.findById(req.params.sourceId);
    
    if (!dataSource) {
      return res.status(404).json({
        success: false,
        error: 'Data source not found'
      });
    }
    
    // Check if user owns the data source
    if (dataSource.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to access this data source'
      });
    }
    
    // Read and parse the file
    const results = [];
    
    if (dataSource.fileType === 'csv') {
      fs.createReadStream(dataSource.filePath)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
          // Return only the first 100 rows for preview
          res.status(200).json({
            success: true,
            data: results.slice(0, 100),
            columns: dataSource.columns
          });
        });
    } else {
      // Handle other file types if needed
      res.status(400).json({
        success: false,
        error: 'File type not supported for preview'
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// Analyze data
exports.analyzeData = async (req, res) => {
  try {
    const { sourceId, analysisType } = req.body;
    
    const dataSource = await DataSource.findById(sourceId);
    
    if (!dataSource) {
      return res.status(404).json({
        success: false,
        error: 'Data source not found'
      });
    }
    
    // Check if user owns the data source
    if (dataSource.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to access this data source'
      });
    }
    
    // Perform analysis based on analysisType
    // This would typically involve reading the data file and performing calculations
    
    // For demo purposes, return mock analysis results
    const analysisResults = {
      summary: {
        rowCount: 1000,
        columnCount: dataSource.columns.length,
        missingValues: 25,
      },
      insights: [
        'Sales have increased by 15% over the last quarter',
        'Customer retention is highest in the Western region',
        'Product A has the highest profit margin at 35%'
      ]
    };
    
    res.status(200).json({
      success: true,
      data: analysisResults
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};