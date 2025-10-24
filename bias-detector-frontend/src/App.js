import React, { useState } from "react";
import {
  Brain,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Eye,
  Zap,
  Target,
  Users,
  Shield,
  FileText,
  BarChart2,
  Activity,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { BiasAPI } from "./api-client";

const CognitiveBiasAI = () => {
  const [activeTab, setActiveTab] = useState("detection");
  const [selectedBias, setSelectedBias] = useState(null);
  const [testInput, setTestInput] = useState("");
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Cognitive Bias Types
  const biasTypes = [
    {
      id: "confirmation",
      name: "Confirmation Bias",
      description: "AI favors information confirming existing beliefs",
      severity: "high",
      examples: [
        "Job screening favoring certain demographics",
        "News recommendation echo chambers",
      ],
      detectionRate: 78,
      color: "#ef4444",
    },
    {
      id: "anchoring",
      name: "Anchoring Bias",
      description: "Over-reliance on first piece of information",
      severity: "medium",
      examples: [
        "Price estimation based on initial value",
        "First impression in resume screening",
      ],
      detectionRate: 65,
      color: "#f59e0b",
    },
    {
      id: "availability",
      name: "Availability Heuristic",
      description: "Overweighting recent or memorable events",
      severity: "high",
      examples: [
        "Risk assessment after viral news",
        "Trend prediction from limited samples",
      ],
      detectionRate: 82,
      color: "#8b5cf6",
    },
    {
      id: "groupthink",
      name: "Groupthink",
      description: "Consensus-seeking suppresses alternatives",
      severity: "medium",
      examples: [
        "Popular opinion amplification",
        "Majority viewpoint dominance",
      ],
      detectionRate: 71,
      color: "#3b82f6",
    },
    {
      id: "recency",
      name: "Recency Bias",
      description: "Recent information weighted too heavily",
      severity: "medium",
      examples: [
        "Stock prediction from latest data only",
        "Customer behavior based on last interaction",
      ],
      detectionRate: 88,
      color: "#10b981",
    },
    {
      id: "survivorship",
      name: "Survivorship Bias",
      description: "Focusing only on successful cases",
      severity: "critical",
      examples: [
        "Business advice from only successful startups",
        "Medical treatment from survivors only",
      ],
      detectionRate: 56,
      color: "#ec4899",
    },
  ];

  // Mock detection data
  const biasDetectionData = [
    {
      model: "GPT-4",
      confirmation: 12,
      anchoring: 8,
      availability: 15,
      groupthink: 6,
      recency: 10,
      survivorship: 4,
    },
    {
      model: "Claude",
      confirmation: 8,
      anchoring: 6,
      availability: 10,
      groupthink: 4,
      recency: 7,
      survivorship: 3,
    },
    {
      model: "Gemini",
      confirmation: 10,
      anchoring: 9,
      availability: 12,
      groupthink: 7,
      recency: 11,
      survivorship: 5,
    },
    {
      model: "LLaMA",
      confirmation: 15,
      anchoring: 11,
      availability: 18,
      groupthink: 9,
      recency: 14,
      survivorship: 7,
    },
  ];

  const improvementData = [
    { week: "Week 1", beforeTraining: 45, afterTraining: 45 },
    { week: "Week 2", beforeTraining: 42, afterTraining: 38 },
    { week: "Week 3", beforeTraining: 40, afterTraining: 28 },
    { week: "Week 4", beforeTraining: 39, afterTraining: 20 },
    { week: "Week 5", beforeTraining: 38, afterTraining: 15 },
    { week: "Week 6", beforeTraining: 37, afterTraining: 10 },
  ];

  const industryImpact = [
    { industry: "Healthcare", risk: 92, impact: "Life-threatening decisions" },
    { industry: "Finance", risk: 88, impact: "Loan discrimination" },
    { industry: "Hiring", risk: 85, impact: "Career opportunities lost" },
    { industry: "Criminal Justice", risk: 95, impact: "Wrongful sentencing" },
    { industry: "Education", risk: 78, impact: "Learning inequality" },
  ];

  const COLORS = [
    "#ef4444",
    "#f59e0b",
    "#8b5cf6",
    "#3b82f6",
    "#10b981",
    "#ec4899",
  ];

  // Replace the runBiasAnalysis function
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
        recommendations: result.correction?.recommendations || [],
      });
    } catch (error) {
      console.error("Analysis failed:", error);
      alert("API Error: Make sure Python API is running on port 5000!");
    }

    setIsAnalyzing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 text-white p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
                <Brain size={32} />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                  AI Cognitive Bias Detection System
                </h1>
                <p className="text-gray-400 mt-1">
                  Training AI to recognize and correct its own reasoning
                  failures
                </p>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-400">System Status</div>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 font-bold">
                Active Monitoring
              </span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex gap-2 border-b border-slate-700">
          {[
            { id: "detection", label: "Bias Detection", icon: Eye },
            { id: "training", label: "Training System", icon: Target },
            { id: "analysis", label: "Live Analysis", icon: Activity },
            { id: "impact", label: "Impact Study", icon: BarChart2 },
            { id: "research", label: "Research Lab", icon: FileText },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 transition-all ${
                  activeTab === tab.id
                    ? "border-b-2 border-purple-400 text-purple-400"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <Icon size={18} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Detection Tab */}
        {activeTab === "detection" && (
          <div className="space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-red-500/20 to-red-600/20 backdrop-blur-lg rounded-xl p-6 border border-red-500/30">
                <AlertTriangle className="text-red-400 mb-3" size={28} />
                <div className="text-3xl font-bold">247</div>
                <div className="text-sm text-gray-400">
                  Biases Detected Today
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 backdrop-blur-lg rounded-xl p-6 border border-green-500/30">
                <CheckCircle className="text-green-400 mb-3" size={28} />
                <div className="text-3xl font-bold">189</div>
                <div className="text-sm text-gray-400">
                  Successfully Corrected
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur-lg rounded-xl p-6 border border-purple-500/30">
                <TrendingUp className="text-purple-400 mb-3" size={28} />
                <div className="text-3xl font-bold">76%</div>
                <div className="text-sm text-gray-400">Detection Accuracy</div>
              </div>

              <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-lg rounded-xl p-6 border border-blue-500/30">
                <Zap className="text-blue-400 mb-3" size={28} />
                <div className="text-3xl font-bold">1.3s</div>
                <div className="text-sm text-gray-400">Avg Detection Time</div>
              </div>
            </div>

            {/* Bias Types Grid */}
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Shield className="text-purple-400" />
                Cognitive Bias Taxonomy
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {biasTypes.map((bias) => (
                  <div
                    key={bias.id}
                    onClick={() =>
                      setSelectedBias(bias.id === selectedBias ? null : bias.id)
                    }
                    className={`p-5 rounded-xl cursor-pointer transition-all ${
                      selectedBias === bias.id
                        ? "bg-gradient-to-br from-purple-500/30 to-pink-500/30 border-2 border-purple-400 scale-105"
                        : "bg-slate-700/50 border-2 border-transparent hover:border-slate-600"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: bias.color }}
                        ></div>
                        <h4 className="font-bold">{bias.name}</h4>
                      </div>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          bias.severity === "critical"
                            ? "bg-red-500/20 text-red-400"
                            : bias.severity === "high"
                            ? "bg-orange-500/20 text-orange-400"
                            : "bg-yellow-500/20 text-yellow-400"
                        }`}
                      >
                        {bias.severity}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400 mb-3">
                      {bias.description}
                    </p>
                    <div className="mb-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-500">Detection Rate</span>
                        <span className="font-bold">{bias.detectionRate}%</span>
                      </div>
                      <div className="w-full bg-slate-600 rounded-full h-2">
                        <div
                          className="h-2 rounded-full transition-all"
                          style={{
                            width: `${bias.detectionRate}%`,
                            backgroundColor: bias.color,
                          }}
                        ></div>
                      </div>
                    </div>
                    {selectedBias === bias.id && (
                      <div className="mt-4 pt-4 border-t border-slate-600">
                        <p className="text-xs text-gray-500 mb-2">
                          Common Examples:
                        </p>
                        {bias.examples.map((ex, i) => (
                          <div
                            key={i}
                            className="text-xs text-gray-300 mb-1 flex items-start gap-2"
                          >
                            <span className="text-purple-400">•</span>
                            <span>{ex}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Bias Distribution Chart */}
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700">
              <h3 className="text-xl font-bold mb-4">
                Bias Detection Across AI Models
              </h3>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={biasDetectionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                  <XAxis dataKey="model" stroke="#94a3b8" />
                  <YAxis
                    stroke="#94a3b8"
                    label={{
                      value: "Bias Incidents",
                      angle: -90,
                      position: "insideLeft",
                      fill: "#94a3b8",
                    }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1e293b",
                      border: "1px solid #475569",
                      borderRadius: "8px",
                    }}
                    cursor={{ fill: "rgba(139, 92, 246, 0.1)" }}
                  />
                  <Legend />
                  <Bar
                    dataKey="confirmation"
                    fill="#ef4444"
                    name="Confirmation"
                  />
                  <Bar
                    dataKey="availability"
                    fill="#8b5cf6"
                    name="Availability"
                  />
                  <Bar
                    dataKey="survivorship"
                    fill="#ec4899"
                    name="Survivorship"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Training Tab */}
        {activeTab === "training" && (
          <div className="space-y-6">
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Target className="text-blue-400" />
                Self-Correction Training Pipeline
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                {[
                  {
                    step: 1,
                    name: "Detect",
                    desc: "Identify bias patterns",
                    status: "complete",
                  },
                  {
                    step: 2,
                    name: "Analyze",
                    desc: "Root cause analysis",
                    status: "complete",
                  },
                  {
                    step: 3,
                    name: "Correct",
                    desc: "Generate alternatives",
                    status: "active",
                  },
                  {
                    step: 4,
                    name: "Validate",
                    desc: "Human verification",
                    status: "pending",
                  },
                ].map((stage) => (
                  <div
                    key={stage.step}
                    className={`p-4 rounded-lg border-2 ${
                      stage.status === "complete"
                        ? "bg-green-500/10 border-green-500/30"
                        : stage.status === "active"
                        ? "bg-blue-500/10 border-blue-500/30 animate-pulse"
                        : "bg-slate-700/50 border-slate-600"
                    }`}
                  >
                    <div className="text-2xl font-bold mb-2">#{stage.step}</div>
                    <div className="font-bold mb-1">{stage.name}</div>
                    <div className="text-xs text-gray-400">{stage.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700">
              <h3 className="text-xl font-bold mb-4">
                Training Progress: Bias Reduction Over Time
              </h3>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={improvementData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                  <XAxis dataKey="week" stroke="#94a3b8" />
                  <YAxis
                    stroke="#94a3b8"
                    label={{
                      value: "Bias Incidents",
                      angle: -90,
                      position: "insideLeft",
                      fill: "#94a3b8",
                    }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1e293b",
                      border: "1px solid #475569",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="beforeTraining"
                    stroke="#ef4444"
                    strokeWidth={3}
                    name="Before Training"
                  />
                  <Line
                    type="monotone"
                    dataKey="afterTraining"
                    stroke="#10b981"
                    strokeWidth={3}
                    name="After Training"
                  />
                </LineChart>
              </ResponsiveContainer>
              <div className="mt-4 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                <p className="text-sm text-green-400 font-bold">
                  73% Reduction in bias incidents after 6 weeks of training!
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700">
                <h3 className="text-lg font-bold mb-4">Training Datasets</h3>
                <div className="space-y-3">
                  {[
                    {
                      name: "Historical Bias Cases",
                      size: "12,500 examples",
                      status: "active",
                    },
                    {
                      name: "Corrected Responses",
                      size: "8,900 pairs",
                      status: "active",
                    },
                    {
                      name: "Human Feedback",
                      size: "4,200 annotations",
                      status: "active",
                    },
                    {
                      name: "Edge Cases",
                      size: "1,850 scenarios",
                      status: "processing",
                    },
                  ].map((dataset, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg"
                    >
                      <div>
                        <div className="font-bold text-sm">{dataset.name}</div>
                        <div className="text-xs text-gray-400">
                          {dataset.size}
                        </div>
                      </div>
                      <span
                        className={`text-xs px-3 py-1 rounded-full ${
                          dataset.status === "active"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-yellow-500/20 text-yellow-400"
                        }`}
                      >
                        {dataset.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700">
                <h3 className="text-lg font-bold mb-4">Training Methodology</h3>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                    <div className="font-bold text-purple-400 mb-1">
                      Contrastive Learning
                    </div>
                    <div className="text-gray-400">
                      Train on bias vs. unbiased response pairs
                    </div>
                  </div>
                  <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                    <div className="font-bold text-blue-400 mb-1">
                      Reinforcement from Human Feedback
                    </div>
                    <div className="text-gray-400">
                      Expert annotations guide corrections
                    </div>
                  </div>
                  <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                    <div className="font-bold text-green-400 mb-1">
                      Adversarial Testing
                    </div>
                    <div className="text-gray-400">
                      Stress-test with edge case scenarios
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Live Analysis Tab */}
        {activeTab === "analysis" && (
          <div className="space-y-6">
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Activity className="text-green-400" />
                Real-Time Bias Analysis
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Enter AI Response to Analyze
                  </label>
                  <textarea
                    value={testInput}
                    onChange={(e) => setTestInput(e.target.value)}
                    placeholder="Paste an AI-generated response here to detect cognitive biases..."
                    className="w-full h-32 bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white resize-none focus:outline-none focus:border-purple-400"
                  />
                </div>
                <button
                  onClick={runBiasAnalysis}
                  disabled={isAnalyzing || !testInput.trim()}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-bold text-lg"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Brain size={24} />
                      Analyze for Cognitive Biases
                    </>
                  )}
                </button>
              </div>
            </div>

            {analysisResult && (
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 backdrop-blur-lg rounded-xl p-6 border border-red-500/30">
                  <div className="flex items-center gap-3 mb-4">
                    <AlertTriangle className="text-red-400" size={28} />
                    <div>
                      <h3 className="text-xl font-bold">Biases Detected</h3>
                      <p className="text-sm text-gray-400">
                        Confidence: {analysisResult.confidence}%
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {analysisResult.biasesDetected.map((biasId) => {
                      const bias = biasTypes.find((b) => b.id === biasId);
                      return (
                        <span
                          key={biasId}
                          className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-sm font-bold"
                        >
                          {bias.name}
                        </span>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700">
                    <h4 className="font-bold mb-3 text-red-400">
                      Original Response (Biased)
                    </h4>
                    <p className="text-sm text-gray-300 bg-red-500/10 p-4 rounded-lg border border-red-500/30">
                      {analysisResult.originalResponse}
                    </p>
                  </div>

                  <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700">
                    <h4 className="font-bold mb-3 text-green-400">
                      Corrected Response (Unbiased)
                    </h4>
                    <p className="text-sm text-gray-300 bg-green-500/10 p-4 rounded-lg border border-green-500/30">
                      {analysisResult.correctedResponse}
                    </p>
                  </div>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700">
                  <h4 className="font-bold mb-3">Detection Reasoning</h4>
                  <div className="space-y-2">
                    {analysisResult.reasoning.map((reason, i) => (
                      <div key={i} className="flex items-start gap-3 text-sm">
                        <div className="w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-purple-400 font-bold text-xs">
                            {i + 1}
                          </span>
                        </div>
                        <p className="text-gray-300">{reason}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700">
                  <h4 className="font-bold mb-3">
                    Recommendations for Improvement
                  </h4>
                  <div className="space-y-2">
                    {analysisResult.recommendations.map((rec, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 text-sm p-3 bg-blue-500/10 rounded-lg border border-blue-500/30"
                      >
                        <CheckCircle
                          className="text-blue-400 flex-shrink-0 mt-0.5"
                          size={18}
                        />
                        <p className="text-gray-300">{rec}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Impact Study Tab */}
        {activeTab === "impact" && (
          <div className="space-y-6">
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <BarChart2 className="text-orange-400" />
                Industry Impact Analysis
              </h3>
              <div className="space-y-4">
                {industryImpact.map((industry, i) => (
                  <div key={i} className="p-5 bg-slate-700/50 rounded-xl">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-bold text-lg">
                          {industry.industry}
                        </h4>
                        <p className="text-sm text-gray-400">
                          {industry.impact}
                        </p>
                      </div>
                      <div
                        className={`text-2xl font-bold ${
                          industry.risk >= 90
                            ? "text-red-400"
                            : industry.risk >= 80
                            ? "text-orange-400"
                            : "text-yellow-400"
                        }`}
                      >
                        {industry.risk}%
                      </div>
                    </div>
                    <div className="w-full bg-slate-600 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full transition-all ${
                          industry.risk >= 90
                            ? "bg-red-500"
                            : industry.risk >= 80
                            ? "bg-orange-500"
                            : "bg-yellow-500"
                        }`}
                        style={{ width: `${industry.risk}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700">
                <h3 className="text-xl font-bold mb-4">
                  Real-World Case Studies
                </h3>
                <div className="space-y-4">
                  <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                    <div className="font-bold text-red-400 mb-2">
                      Healthcare Misdiagnosis
                    </div>
                    <p className="text-sm text-gray-300 mb-2">
                      AI favored recent viral disease trends, missing rare
                      genetic condition
                    </p>
                    <div className="text-xs text-gray-400">
                      Impact: Delayed treatment by 3 months
                    </div>
                  </div>
                  <div className="p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg">
                    <div className="font-bold text-orange-400 mb-2">
                      Hiring Discrimination
                    </div>
                    <p className="text-sm text-gray-300 mb-2">
                      Resume screening showed confirmation bias toward
                      traditional career paths
                    </p>
                    <div className="text-xs text-gray-400">
                      Impact: 40% of qualified candidates excluded
                    </div>
                  </div>
                  <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                    <div className="font-bold text-yellow-400 mb-2">
                      Financial Risk Assessment
                    </div>
                    <p className="text-sm text-gray-300 mb-2">
                      Availability heuristic led to overconfident investment
                      recommendations
                    </p>
                    <div className="text-xs text-gray-400">
                      Impact: $2.3M portfolio losses
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700">
                <h3 className="text-xl font-bold mb-4">
                  Correction Success Metrics
                </h3>
                <div className="space-y-4">
                  <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                    <div className="text-3xl font-bold text-green-400 mb-1">
                      94%
                    </div>
                    <div className="text-sm text-gray-300">
                      Bias detection accuracy in controlled tests
                    </div>
                  </div>
                  <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                    <div className="text-3xl font-bold text-blue-400 mb-1">
                      87%
                    </div>
                    <div className="text-sm text-gray-300">
                      User satisfaction with corrected responses
                    </div>
                  </div>
                  <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                    <div className="text-3xl font-bold text-purple-400 mb-1">
                      73%
                    </div>
                    <div className="text-sm text-gray-300">
                      Reduction in biased outputs after training
                    </div>
                  </div>
                  <div className="p-4 bg-pink-500/10 border border-pink-500/30 rounded-lg">
                    <div className="text-3xl font-bold text-pink-400 mb-1">
                      2.1s
                    </div>
                    <div className="text-sm text-gray-300">
                      Average real-time correction latency
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Research Lab Tab */}
        {activeTab === "research" && (
          <div className="space-y-6">
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <FileText className="text-cyan-400" />
                Research & Development Lab
              </h3>
              <p className="text-gray-400 mb-6">
                Exploring cutting-edge techniques for bias detection and
                mitigation
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-5 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/30">
                  <div className="text-purple-400 font-bold mb-2">
                    Neural Architecture
                  </div>
                  <div className="text-sm text-gray-300 mb-3">
                    Dual-pathway model: One for generation, one for bias
                    detection running in parallel
                  </div>
                  <div className="text-xs text-gray-400">
                    Status: Prototype ready
                  </div>
                </div>

                <div className="p-5 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-xl border border-blue-500/30">
                  <div className="text-blue-400 font-bold mb-2">
                    Explainability Engine
                  </div>
                  <div className="text-sm text-gray-300 mb-3">
                    Attention visualization shows which tokens trigger bias
                    patterns
                  </div>
                  <div className="text-xs text-gray-400">
                    Status: Beta testing
                  </div>
                </div>

                <div className="p-5 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl border border-green-500/30">
                  <div className="text-green-400 font-bold mb-2">
                    Synthetic Data Generation
                  </div>
                  <div className="text-sm text-gray-300 mb-3">
                    Auto-generate edge cases and adversarial examples for
                    training
                  </div>
                  <div className="text-xs text-gray-400">Status: Active</div>
                </div>

                <div className="p-5 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-xl border border-orange-500/30">
                  <div className="text-orange-400 font-bold mb-2">
                    Multi-Modal Bias Detection
                  </div>
                  <div className="text-sm text-gray-300 mb-3">
                    Detect biases across text, images, and video content
                    simultaneously
                  </div>
                  <div className="text-xs text-gray-400">
                    Status: Research phase
                  </div>
                </div>

                <div className="p-5 bg-gradient-to-br from-pink-500/10 to-rose-500/10 rounded-xl border border-pink-500/30">
                  <div className="text-pink-400 font-bold mb-2">
                    Cross-Cultural Bias Analysis
                  </div>
                  <div className="text-sm text-gray-300 mb-3">
                    Detect cultural biases across different language models and
                    regions
                  </div>
                  <div className="text-xs text-gray-400">
                    Status: Data collection
                  </div>
                </div>

                <div className="p-5 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-xl border border-indigo-500/30">
                  <div className="text-indigo-400 font-bold mb-2">
                    Real-Time Correction API
                  </div>
                  <div className="text-sm text-gray-300 mb-3">
                    Deploy as middleware for any AI application
                  </div>
                  <div className="text-xs text-gray-400">
                    Status: Architecture design
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700">
              <h3 className="text-xl font-bold mb-4">
                Published Research & Findings
              </h3>
              <div className="space-y-3">
                {[
                  {
                    title:
                      "Self-Correcting AI: A Novel Approach to Cognitive Bias Mitigation",
                    authors: "Your Research Team",
                    venue: "NeurIPS 2025 (Submitted)",
                    impact: "High",
                  },
                  {
                    title: "Real-Time Bias Detection in Large Language Models",
                    authors: "Your Research Team",
                    venue: "ICML 2025 Workshop",
                    impact: "Medium",
                  },
                  {
                    title:
                      "Taxonomy of AI Cognitive Biases: A Comprehensive Study",
                    authors: "Your Research Team",
                    venue: "AAAI 2025",
                    impact: "High",
                  },
                ].map((paper, i) => (
                  <div
                    key={i}
                    className="p-4 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-all cursor-pointer"
                  >
                    <div className="font-bold mb-1">{paper.title}</div>
                    <div className="text-sm text-gray-400 mb-2">
                      {paper.authors} • {paper.venue}
                    </div>
                    <span
                      className={`text-xs px-3 py-1 rounded-full ${
                        paper.impact === "High"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-blue-500/20 text-blue-400"
                      }`}
                    >
                      {paper.impact} Impact
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700">
              <h3 className="text-xl font-bold mb-4">
                Open Dataset Contributions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-lg border border-cyan-500/30">
                  <div className="font-bold text-cyan-400 mb-2">
                    BiasBank Dataset
                  </div>
                  <div className="text-sm text-gray-300 mb-3">
                    15,000 labeled examples of biased AI responses with
                    corrections
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <Users size={14} className="text-gray-400" />
                    <span className="text-gray-400">
                      2,340 downloads • MIT License
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/30">
                  <div className="font-bold text-purple-400 mb-2">
                    Cognitive Bias Benchmark
                  </div>
                  <div className="text-sm text-gray-300 mb-3">
                    Standardized test suite for evaluating bias detection
                    systems
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <Users size={14} className="text-gray-400" />
                    <span className="text-gray-400">
                      1,876 downloads • Apache 2.0
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-slate-700">
        <div className="flex items-center justify-between text-sm text-gray-400">
          <div>Built with open-source AI models • No paid APIs required</div>
          <div className="flex items-center gap-4">
            <span>Version 1.0.0</span>
            <span>•</span>
            <span>Last updated: Today</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CognitiveBiasAI;
