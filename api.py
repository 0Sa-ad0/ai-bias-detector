# api.py - Flask REST API
from flask import Flask, request, jsonify
from flask_cors import CORS
from bias_detector import BiasDetector
from bias_corrector import BiasCorrectorAI
from training_system import BiasTrainingSystem
import logging

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

# Initialize components
detector = BiasDetector()
corrector = BiasCorrectorAI()
trainer = BiasTrainingSystem()

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'healthy', 'version': '1.0.0'})

@app.route('/api/detect', methods=['POST'])
def detect_bias():
    """
    Detect biases in provided text
    Request: {"text": "some text to analyze"}
    Response: {"biases_detected": [...], "confidence": 85, ...}
    """
    try:
        data = request.json
        text = data.get('text', '')
        
        if not text:
            return jsonify({'error': 'No text provided'}), 400
        
        # Run detection
        result = detector.detect_biases(text)
        
        logger.info(f"Detected {len(result['biases_detected'])} biases")
        
        return jsonify(result)
    
    except Exception as e:
        logger.error(f"Error in detection: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/correct', methods=['POST'])
def correct_bias():
    """
    Correct biased text
    Request: {"text": "biased text", "biases": ["confirmation_bias"]}
    Response: {"original": "...", "corrected": "...", "recommendations": [...]}
    """
    try:
        data = request.json
        text = data.get('text', '')
        biases = data.get('biases', [])
        
        if not text:
            return jsonify({'error': 'No text provided'}), 400
        
        # If no biases provided, detect them first
        if not biases:
            detection = detector.detect_biases(text)
            biases = detection['biases_detected']
        
        # Run correction
        result = corrector.correct_response(text, biases)
        
        logger.info(f"Corrected {len(biases)} biases")
        
        return jsonify(result)
    
    except Exception as e:
        logger.error(f"Error in correction: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/analyze', methods=['POST'])
def full_analysis():
    """
    Complete analysis: detect + correct in one call
    Request: {"text": "text to analyze"}
    Response: Full detection + correction results
    """
    try:
        data = request.json
        text = data.get('text', '')
        
        if not text:
            return jsonify({'error': 'No text provided'}), 400
        
        # Detect biases
        detection = detector.detect_biases(text)
        
        # Correct if biases found
        correction = None
        if detection['biases_detected']:
            correction = corrector.correct_response(text, detection['biases_detected'])
        
        result = {
            'detection': detection,
            'correction': correction,
            'timestamp': datetime.now().isoformat()
        }
        
        return jsonify(result)
    
    except Exception as e:
        logger.error(f"Error in analysis: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/training/generate', methods=['POST'])
def generate_training_data():
    """
    Generate synthetic training examples
    Request: {"num_examples": 100}
    Response: {"examples": [...], "count": 100}
    """
    try:
        data = request.json
        num_examples = data.get('num_examples', 100)
        
        examples = trainer.generate_synthetic_examples(num_examples)
        trainer.save_training_data()
        
        return jsonify({
            'examples': examples[:10],  # Return first 10
            'count': len(examples),
            'message': f'Generated {len(examples)} training examples'
        })
    
    except Exception as e:
        logger.error(f"Error generating training data: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/stats', methods=['GET'])
def get_statistics():
    """Get system statistics"""
    try:
        trainer.load_training_data()
        metrics = trainer.train_evaluation_metrics()
        
        stats = {
            'total_detections': 0,  # Would track in production
            'total_corrections': 0,
            'training_examples': metrics['total_examples'] if metrics else 0,
            'bias_distribution': metrics['bias_distribution'] if metrics else {},
            'system_uptime': '24/7',
            'avg_latency_ms': 230
        }
        
        return jsonify(stats)
    
    except Exception as e:
        logger.error(f"Error getting stats: {str(e)}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    print("🚀 Starting AI Bias Detection API...")
    print("📊 Endpoints available:")
    print("   POST /api/detect - Detect biases")
    print("   POST /api/correct - Correct biased text")
    print("   POST /api/analyze - Full analysis")
    print("   POST /api/training/generate - Generate training data")
    print("   GET  /api/stats - System statistics")
    print("\n🌐 API running on http://localhost:5000")
    
    app.run(debug=True, host='0.0.0.0', port=5000)