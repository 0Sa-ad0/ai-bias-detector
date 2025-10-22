// api-client.js - Add to your React project
const API_BASE = 'http://localhost:5000/api';

export const BiasAPI = {
  // Detect biases in text
  detectBias: async (text) => {
    const response = await fetch(`${API_BASE}/detect`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });
    return response.json();
  },
  
  // Correct biased text
  correctBias: async (text, biases) => {
    const response = await fetch(`${API_BASE}/correct`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, biases })
    });
    return response.json();
  },
  
  // Full analysis
  fullAnalysis: async (text) => {
    const response = await fetch(`${API_BASE}/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });
    return response.json();
  },
  
  // Get statistics
  getStats: async () => {
    const response = await fetch(`${API_BASE}/stats`);
    return response.json();
  },
  
  // Generate training data
  generateTrainingData: async (numExamples) => {
    const response = await fetch(`${API_BASE}/training/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ num_examples: numExamples })
    });
    return response.json();
  }
};

// Update the React component to use real API
// Modify the runBiasAnalysis function:
const runBiasAnalysis = async () => {
  if (!testInput.trim()) return;
  
  setIsAnalyzing(true);
  
  try {
    // Call REAL API
    const result = await BiasAPI.fullAnalysis(testInput);
    
    setAnalysisResult({
      input: testInput,
      biasesDetected: result.detection.biases_detected,
      severity: result.detection.severity,
      confidence: result.detection.confidence,
      originalResponse: testInput,
      correctedResponse: result.correction?.corrected || testInput,
      reasoning: result.detection.reasoning,
      recommendations: result.correction?.recommendations || []
    });
  } catch (error) {
    console.error('Analysis failed:', error);
    alert('Failed to analyze. Make sure the API is running!');
  }
  
  setIsAnalyzing(false);
};