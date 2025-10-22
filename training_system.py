# training_system.py
import json
import pandas as pd
from datetime import datetime
import random

class BiasTrainingSystem:
    def __init__(self):
        self.training_data = []
        self.performance_log = []
        
    def generate_synthetic_examples(self, num_examples=1000):
        """
        Generate synthetic biased text examples for training
        This is KEY - creating your own training data!
        """
        
        # Templates for each bias type
        templates = {
            'confirmation_bias': [
                "Based on {recent_event}, it's obvious that {conclusion} always happens.",
                "Everyone knows that {claim} is definitely true.",
                "{Topic} certainly proves that {assertion} without any doubt.",
                "It's clear that {statement} - the evidence overwhelmingly supports this."
            ],
            
            'availability_heuristic': [
                "Given the recent {event}, we can conclude that {prediction}.",
                "With what happened {timeframe}, it's certain that {outcome}.",
                "Following the viral {incident}, clearly {generalization}.",
                "Since {recent_news}, obviously {extrapolation}."
            ],
            
            'survivorship_bias': [
                "Looking at successful {group}, they all {pattern}.",
                "Every top {profession} did {action} to succeed.",
                "The best {category} all share {trait}, so you should too.",
                "Winners in {field} universally {behavior}."
            ],
            
            'anchoring_bias': [
                "Compared to the initial estimate of {value}, {new_value} seems reasonable.",
                "Starting from {reference_point}, {conclusion} makes sense.",
                "Relative to {anchor}, this {outcome} is acceptable.",
                "Based on our first impression of {initial}, {judgment}."
            ],
            
            'recency_bias': [
                "This week's {data} shows that {trend} will continue.",
                "Yesterday's {event} confirms that {pattern}.",
                "The latest {statistics} prove {conclusion}.",
                "Current {conditions} indicate {prediction}."
            ],
            
            'groupthink': [
                "Most experts agree that {consensus}.",
                "The general opinion is that {belief}.",
                "It's widely accepted that {statement}.",
                "Conventional wisdom says {assertion}."
            ]
        }
        
        # Fillers for templates
        fillers = {
            'recent_event': ['the stock market crash', 'Tesla\'s success', 'COVID-19', 'the tech boom'],
            'conclusion': ['risks are minimal', 'growth is guaranteed', 'this strategy works'],
            'claim': ['AI will replace all jobs', 'startups always fail', 'education guarantees success'],
            'topic': ['This study', 'The data', 'Research', 'Statistics'],
            'assertion': ['our approach is superior', 'alternatives don\'t work', 'this is the only way'],
            'statement': ['innovation requires risk', 'experience matters most', 'luck plays no role'],
            'event': ['election results', 'product launch', 'market volatility'],
            'prediction': ['similar outcomes are inevitable', 'the pattern will repeat', 'this is the new normal'],
            'timeframe': ['this month', 'last quarter', 'recently'],
            'outcome': ['trends will continue indefinitely', 'changes are permanent'],
            'incident': ['social media campaign', 'celebrity endorsement', 'news story'],
            'generalization': ['everyone thinks this way', 'the market has changed forever'],
            'recent_news': ['the announcement', 'that viral post', 'the controversy'],
            'extrapolation': ['everything has changed', 'old rules don\'t apply'],
            'group': ['entrepreneurs', 'CEOs', 'investors', 'athletes'],
            'pattern': ['worked 80-hour weeks', 'dropped out of college', 'took big risks'],
            'profession': ['founder', 'executive', 'scientist'],
            'action': ['network extensively', 'fail multiple times', 'think differently'],
            'category': ['companies', 'performers', 'leaders'],
            'trait': ['aggressive ambition', 'unwavering confidence', 'early adoption'],
            'field': ['business', 'technology', 'sports'],
            'behavior': ['embrace failure', 'challenge norms', 'trust intuition'],
            'value': ['$100', '5 years', '50 units'],
            'new_value': ['$120', '6 years', '60 units'],
            'reference_point': ['market average', 'competitor pricing', 'last year'],
            'conclusion': ['this outcome', 'our strategy', 'this approach'],
            'anchor': ['the initial proposal', 'first quote', 'original estimate'],
            'judgment': ['seems fair', 'looks optimal', 'appears reasonable'],
            'data': ['sales figures', 'user engagement', 'performance metrics'],
            'trend': ['upward momentum', 'customer interest', 'market growth'],
            'statistics': ['numbers', 'results', 'findings'],
            'conditions': ['market sentiment', 'economic indicators', 'consumer behavior'],
            'consensus': ['remote work is better', 'AI is dangerous', 'markets are efficient'],
            'belief': ['quality always wins', 'first-mover advantage matters', 'brand loyalty is dead'],
            'initial': ['quality', 'potential', 'capabilities']
        }
        
        examples = []
        
        for _ in range(num_examples):
            # Randomly select a bias type and template
            bias_type = random.choice(list(templates.keys()))
            template = random.choice(templates[bias_type])
            
            # Fill in template with random fillers
            text = template
            for placeholder in fillers.keys():
                if f'{{{placeholder}}}' in text:
                    text = text.replace(
                        f'{{{placeholder}}}',
                        random.choice(fillers[placeholder])
                    )
            
            # Generate corrected version
            corrected = self._auto_correct(text, bias_type)
            
            examples.append({
                'biased_text': text,
                'corrected_text': corrected,
                'bias_type': bias_type,
                'severity': random.choice(['medium', 'high', 'critical']),
                'timestamp': datetime.now().isoformat()
            })
        
        self.training_data.extend(examples)
        return examples
    
    def _auto_correct(self, biased_text, bias_type):
        """Auto-generate corrected version"""
        corrected = biased_text
        
        # Apply corrections based on bias type
        corrections = {
            'definitely': 'likely',
            'always': 'often',
            'never': 'rarely',
            'everyone knows': 'research suggests',
            'obviously': 'evidence indicates',
            'certainly': 'probably',
            'without any doubt': 'with reasonable confidence',
            'it\'s clear': 'data suggests',
            'overwhelmingly': 'substantially',
            'universally': 'commonly',
            'all': 'many',
            'every': 'most',
            'will': 'may',
            'proves': 'suggests',
            'confirms': 'indicates',
            'guarantee': 'expectation'
        }
        
        for biased, unbiased in corrections.items():
            corrected = corrected.replace(biased, unbiased)
        
        # Add context based on bias type
        if bias_type == 'availability_heuristic':
            corrected = f"While recent events are notable, historical patterns show {corrected}"
        elif bias_type == 'survivorship_bias':
            corrected = f"Though successful cases show this pattern, failure rates should be considered: {corrected}"
        elif bias_type == 'confirmation_bias':
            corrected = f"Evidence suggests (with limitations): {corrected}"
        
        return corrected
    
    def save_training_data(self, filename='bias_training_data.json'):
        """Save generated training data"""
        with open(filename, 'w') as f:
            json.dump(self.training_data, f, indent=2)
        print(f"Saved {len(self.training_data)} training examples to {filename}")
    
    def load_training_data(self, filename='bias_training_data.json'):
        """Load training data"""
        try:
            with open(filename, 'r') as f:
                self.training_data = json.load(f)
            print(f"Loaded {len(self.training_data)} training examples")
        except FileNotFoundError:
            print("No training data found. Generate new data first.")
    
    def train_evaluation_metrics(self):
        """Calculate training effectiveness metrics"""
        if not self.training_data:
            return None
        
        metrics = {
            'total_examples': len(self.training_data),
            'bias_distribution': {},
            'avg_correction_length': 0,
            'unique_patterns': 0
        }
        
        # Count bias types
        for example in self.training_data:
            bias = example['bias_type']
            metrics['bias_distribution'][bias] = metrics['bias_distribution'].get(bias, 0) + 1
        
        # Calculate average correction length difference
        length_diffs = []
        for example in self.training_data:
            orig_len = len(example['biased_text'])
            corr_len = len(example['corrected_text'])
            length_diffs.append(corr_len - orig_len)
        
        metrics['avg_correction_length'] = sum(length_diffs) / len(length_diffs)
        
        return metrics

# Generate training data
if __name__ == "__main__":
    trainer = BiasTrainingSystem()
    
    print("Generating synthetic training examples...")
    examples = trainer.generate_synthetic_examples(num_examples=500)
    
    print(f"\nGenerated {len(examples)} examples")
    print("\nSample:")
    sample = examples[0]
    print(f"Biased: {sample['biased_text']}")
    print(f"Corrected: {sample['corrected_text']}")
    print(f"Bias Type: {sample['bias_type']}")
    
    # Save data
    trainer.save_training_data()
    
    # Show metrics
    metrics = trainer.train_evaluation_metrics()
    print(f"\nTraining Data Metrics:")
    print(f"Total examples: {metrics['total_examples']}")
    print(f"Bias distribution: {metrics['bias_distribution']}")