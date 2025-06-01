// Report Controller
const Report = require('../models/Report');
const DataSource = require('../models/DataSource');

// Create a new report
exports.createReport = async (req, res) => {
  try {
    const { title, description, dataSources, visualizations, narratives } = req.body;

    // Create report
    const report = await Report.create({
      title,
      description,
      dataSources,
      visualizations: visualizations || [],
      narratives: narratives || [],
      user: req.user.id
    });

    res.status(201).json({
      success: true,
      data: report
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// Get all reports
exports.getReports = async (req, res) => {
  try {
    const reports = await Report.find({ user: req.user.id });

    res.status(200).json({
      success: true,
      count: reports.length,
      data: reports
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// Get single report
exports.getReport = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id)
      .populate('dataSources');

    if (!report) {
      return res.status(404).json({
        success: false,
        error: 'Report not found'
      });
    }

    // Make sure user owns the report
    if (report.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to access this report'
      });
    }

    res.status(200).json({
      success: true,
      data: report
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// Update report
exports.updateReport = async (req, res) => {
  try {
    let report = await Report.findById(req.params.id);

    if (!report) {
      return res.status(404).json({
        success: false,
        error: 'Report not found'
      });
    }

    // Make sure user owns the report
    if (report.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to update this report'
      });
    }

    report = await Report.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: report
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// Delete report
exports.deleteReport = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);

    if (!report) {
      return res.status(404).json({
        success: false,
        error: 'Report not found'
      });
    }

    // Make sure user owns the report
    if (report.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to delete this report'
      });
    }

    await report.remove();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// Generate narrative
exports.generateNarrative = async (req, res) => {
  try {
    const { reportId, visualizationData } = req.body;

    // In a real implementation, this would call the OpenAI API
    // For demo purposes, return a mock narrative
    const narrative = {
      title: 'Sales Performance Analysis',
      content: 'The data shows a significant increase in sales during Q2, with a 15% growth compared to Q1. This growth is primarily driven by the Western region, which saw a 22% increase. Product A continues to be the top performer, accounting for 35% of total revenue.',
      insights: [
        'Q2 sales increased by 15% compared to Q1',
        'Western region is the top performer with 22% growth',
        'Product A accounts for 35% of total revenue'
      ]
    };

    // Update the report with the new narrative
    const report = await Report.findById(reportId);
    
    if (!report) {
      return res.status(404).json({
        success: false,
        error: 'Report not found'
      });
    }

    // Make sure user owns the report
    if (report.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to update this report'
      });
    }

    report.narratives.push(narrative);
    await report.save();

    res.status(200).json({
      success: true,
      data: narrative
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};