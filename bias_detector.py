# bias_detector.py
from transformers import pipeline
from sentence_transformers import SentenceTransformer, util
import numpy as np
import re

class BiasDetector:
    def __init__(self):
        # Load semantic similarity model (FREE)
        self.semantic_model = SentenceTransformer('all-MiniLM-L6-v2')
        
        # Load sentiment analyzer
        self.sentiment = pipeline('sentiment-analysis')
        
        # Load pattern database
        from bias_patterns import BIAS_PATTERNS
        self.patterns = BIAS_PATTERNS
        
    def detect_biases(self, text):
        """
        Main detection function - analyzes text for cognitive biases
        Returns: dict with detected biases and confidence scores
        """
        results = {
            'text': text,
            'biases_detected': [],
            'severity': 'low',
            'confidence': 0,
            'reasoning': []
        }
        
        # 1. Keyword matching
        keyword_biases = self._detect_keywords(text)
        
        # 2. Phrase pattern matching
        phrase_biases = self._detect_phrases(text)
        
        # 3. Semantic analysis
        semantic_biases = self._detect_semantic_patterns(text)
        
        # 4. Linguistic analysis
        linguistic_biases = self._detect_linguistic_patterns(text)
        
        # Combine all detections
        all_biases = keyword_biases + phrase_biases + semantic_biases + linguistic_biases
        
        # Remove duplicates and calculate confidence
        unique_biases = list(set([b['type'] for b in all_biases]))
        
        if unique_biases:
            results['biases_detected'] = unique_biases
            results['confidence'] = min(95, len(all_biases) * 15)
            results['severity'] = self._calculate_severity(unique_biases)
            results['reasoning'] = self._generate_reasoning(all_biases, text)
        
        return results
    
    def _detect_keywords(self, text):
        """Detect bias through keyword presence"""
        detected = []
        text_lower = text.lower()
        
        for bias_type, config in self.patterns.items():
            if 'keywords' in config:
                for keyword in config['keywords']:
                    if keyword.lower() in text_lower:
                        detected.append({
                            'type': bias_type,
                            'method': 'keyword',
                            'match': keyword,
                            'severity': config['severity']
                        })
        
        return detected
    
    def _detect_phrases(self, text):
        """Detect bias through phrase patterns"""
        detected = []
        text_lower = text.lower()
        
        for bias_type, config in self.patterns.items():
            if 'phrases' in config:
                for phrase in config['phrases']:
                    if phrase.lower() in text_lower:
                        detected.append({
                            'type': bias_type,
                            'method': 'phrase',
                            'match': phrase,
                            'severity': config['severity']
                        })
        
        return detected
    
    def _detect_semantic_patterns(self, text):
        """Detect bias through semantic similarity to known biased patterns"""
        detected = []
        
        # Biased example sentences
        biased_examples = {
            'confirmation_bias': [
                "This definitely proves my point",
                "As everyone knows, this is obviously true",
                "It's clear that this always happens"
            ],
            'availability_heuristic': [
                "Given recent viral news, this trend is certain",
                "Everyone's been talking about this lately",
                "With what happened yesterday, we can conclude"
            ],
            'survivorship_bias': [
                "Looking at successful people, we see they all did this",
                "Every winner followed this exact path",
                "The best performers all share this trait"
            ]
        }
        
        # Encode input text
        text_embedding = self.semantic_model.encode(text, convert_to_tensor=True)
        
        # Compare with biased examples
        for bias_type, examples in biased_examples.items():
            example_embeddings = self.semantic_model.encode(examples, convert_to_tensor=True)
            similarities = util.pytorch_cos_sim(text_embedding, example_embeddings)
            
            max_similarity = float(similarities.max())
            
            # If high similarity to biased examples
            if max_similarity > 0.65:  # Threshold
                detected.append({
                    'type': bias_type,
                    'method': 'semantic',
                    'confidence': max_similarity,
                    'severity': self.patterns[bias_type]['severity']
                })
        
        return detected
    
    def _detect_linguistic_patterns(self, text):
        """Detect bias through linguistic analysis"""
        detected = []
        
        # Check for absolute language (sign of confirmation bias)
        absolute_words = ['always', 'never', 'everyone', 'nobody', 'all', 'none']
        absolute_count = sum(1 for word in absolute_words if word in text.lower())
        
        if absolute_count >= 2:
            detected.append({
                'type': 'confirmation_bias',
                'method': 'linguistic',
                'match': f'{absolute_count} absolute terms',
                'severity': 'high'
            })
        
        # Check for lack of uncertainty markers (problematic)
        uncertainty_markers = ['might', 'could', 'perhaps', 'possibly', 'approximately']
        has_uncertainty = any(marker in text.lower() for marker in uncertainty_markers)
        
        # Check for definitive predictions
        definitive_patterns = ['will definitely', 'certainly will', 'guaranteed to']
        has_definitive = any(pattern in text.lower() for pattern in definitive_patterns)
        
        if has_definitive and not has_uncertainty:
            detected.append({
                'type': 'confirmation_bias',
                'method': 'linguistic',
                'match': 'overconfident prediction',
                'severity': 'high'
            })
        
        return detected
    
    def _calculate_severity(self, bias_types):
        """Calculate overall severity"""
        severity_scores = {
            'critical': 4,
            'high': 3,
            'medium': 2,
            'low': 1
        }
        
        max_severity = 0
        for bias_type in bias_types:
            if bias_type in self.patterns:
                severity = self.patterns[bias_type]['severity']
                max_severity = max(max_severity, severity_scores.get(severity, 0))
        
        severity_map = {4: 'critical', 3: 'high', 2: 'medium', 1: 'low'}
        return severity_map.get(max_severity, 'low')
    
    def _generate_reasoning(self, all_biases, text):
        """Generate human-readable reasoning for detections"""
        reasoning = []
        
        for bias in all_biases[:4]:  # Top 4 reasons
            bias_type = bias['type']
            if bias_type in self.patterns:
                desc = self.patterns[bias_type]['description']
                method = bias['method']
                
                if 'match' in bias:
                    reasoning.append(
                        f"Detected {desc.lower()} through {method} analysis: '{bias['match']}'"
                    )
                else:
                    reasoning.append(
                        f"Detected {desc.lower()} through {method} analysis"
                    )
        
        return reasoning

# Test the detector
if __name__ == "__main__":
    detector = BiasDetector()
    
    test_cases = [
        "Based on recent trends, this investment will definitely succeed.",
        "Looking at successful startups, they all followed the same strategy.",
        "Everyone knows that this approach always works best."
    ]
    
    for text in test_cases:
        print(f"\nAnalyzing: {text}")
        result = detector.detect_biases(text)
        print(f"Biases: {result['biases_detected']}")
        print(f"Confidence: {result['confidence']}%")
        print(f"Reasoning: {result['reasoning']}")