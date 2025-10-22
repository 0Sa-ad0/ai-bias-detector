# bias_corrector.py
from transformers import AutoModelForCausalLM, AutoTokenizer, pipeline
import torch

class BiasCorrectorAI:
    def __init__(self):
        # Load free text generation model
        model_name = "microsoft/DialoGPT-medium"  # FREE alternative
        # Or use: "gpt2-medium", "distilgpt2"
        
        self.tokenizer = AutoTokenizer.from_pretrained(model_name)
        self.model = AutoModelForCausalLM.from_pretrained(model_name)
        
        # Set padding token
        if self.tokenizer.pad_token is None:
            self.tokenizer.pad_token = self.tokenizer.eos_token
    
    def correct_response(self, biased_text, detected_biases):
        """
        Generate corrected, unbiased version of the text
        """
        # Create correction prompt
        prompt = self._create_correction_prompt(biased_text, detected_biases)
        
        # Generate corrected response
        corrected = self._generate_correction(prompt)
        
        # Generate recommendations
        recommendations = self._generate_recommendations(detected_biases)
        
        return {
            'original': biased_text,
            'corrected': corrected,
            'biases_removed': detected_biases,
            'recommendations': recommendations
        }
    
    def _create_correction_prompt(self, text, biases):
        """Create prompt for correction model"""
        bias_descriptions = ', '.join(biases)
        
        prompt = f"""Rewrite this text to remove {bias_descriptions}:
Original: {text}

Requirements:
1. Add uncertainty where appropriate
2. Include alternative perspectives
3. Cite evidence or acknowledge limitations
4. Remove absolute language
5. Quantify claims with probabilities

Corrected version:"""
        
        return prompt
    
    def _generate_correction(self, prompt):
        """Generate corrected text using language model"""
        
        # For demonstration, use rule-based corrections
        # In production, you'd fine-tune a model on bias correction examples
        
        corrections = {
            'definitely': 'likely',
            'will succeed': 'has potential to succeed',
            'always': 'often',
            'never': 'rarely',
            'everyone knows': 'research suggests',
            'obviously': 'evidence indicates',
            'certainly': 'probably',
            'guaranteed': 'expected',
            'based on recent trends': 'considering both historical and recent data'
        }
        
        corrected = prompt.split("Corrected version:")[0].split("Original:")[1].strip()
        
        for biased, unbiased in corrections.items():
            corrected = corrected.replace(biased, unbiased)
        
        # Add uncertainty quantification
        if 'will' in corrected and 'likely' not in corrected:
            corrected = corrected.replace('will', 'may')
        
        # Add evidence markers
        if not any(marker in corrected.lower() for marker in ['study', 'data', 'research', 'evidence']):
            corrected = f"Based on available data, {corrected.lower()}"
        
        return corrected
    
    def _generate_recommendations(self, biases):
        """Generate actionable recommendations"""
        recommendations = []
        
        if 'confirmation_bias' in biases:
            recommendations.append(
                "Include counter-evidence and alternative explanations"
            )
            recommendations.append(
                "Replace absolute language with probability ranges"
            )
        
        if 'availability_heuristic' in biases:
            recommendations.append(
                "Reference historical data, not just recent events"
            )
            recommendations.append(
                "Acknowledge that memorable ≠ representative"
            )
        
        if 'survivorship_bias' in biases:
            recommendations.append(
                "Include failure rates and unsuccessful cases"
            )
            recommendations.append(
                "Present base rates and selection effects"
            )
        
        if 'anchoring_bias' in biases:
            recommendations.append(
                "Consider multiple reference points"
            )
            recommendations.append(
                "Justify why initial value is appropriate"
            )
        
        if 'recency_bias' in biases:
            recommendations.append(
                "Weight historical patterns equally with recent data"
            )
        
        if 'groupthink' in biases:
            recommendations.append(
                "Present contrarian viewpoints"
            )
            recommendations.append(
                "Explain why consensus might be wrong"
            )
        
        return recommendations

# Test corrector
if __name__ == "__main__":
    from bias_detector import BiasDetector
    
    detector = BiasDetector()
    corrector = BiasCorrectorAI()
    
    test_text = "Based on recent trends, this investment will definitely succeed. Everyone knows the market always goes up."
    
    # Detect biases
    detection = detector.detect_biases(test_text)
    print(f"Original: {test_text}")
    print(f"\nDetected biases: {detection['biases_detected']}")
    
    # Correct biases
    correction = corrector.correct_response(test_text, detection['biases_detected'])
    print(f"\nCorrected: {correction['corrected']}")
    print(f"\nRecommendations:")
    for rec in correction['recommendations']:
        print(f"  • {rec}")