# bias_patterns.py
BIAS_PATTERNS = {
    'confirmation_bias': {
        'keywords': [
            'definitely', 'certainly', 'always', 'never',
            'obviously', 'clearly', 'without doubt'
        ],
        'phrases': [
            'based on recent trends',
            'everyone knows',
            'it\'s obvious that',
            'studies show' # without citation
        ],
        'severity': 'high',
        'description': 'Overconfident assertions without evidence'
    },
    
    'availability_heuristic': {
        'keywords': [
            'recent', 'lately', 'nowadays', 'trending',
            'viral', 'popular', 'everyone\'s talking'
        ],
        'phrases': [
            'given recent events',
            'with what\'s happening now',
            'based on current trends'
        ],
        'severity': 'high',
        'description': 'Overweighting recent or memorable information'
    },
    
    'anchoring_bias': {
        'keywords': [
            'compared to', 'relative to', 'starting from',
            'based on initial', 'first impression'
        ],
        'phrases': [
            'relative to the original',
            'compared to our first estimate',
            'anchored at'
        ],
        'severity': 'medium',
        'description': 'Over-reliance on initial information'
    },
    
    'survivorship_bias': {
        'keywords': [
            'successful', 'winners', 'survivors', 'top performers',
            'those who made it', 'the best'
        ],
        'phrases': [
            'looking at successful cases',
            'based on winners',
            'top performers show that'
        ],
        'severity': 'critical',
        'description': 'Ignoring failures, focusing only on successes'
    },
    
    'recency_bias': {
        'keywords': [
            'latest', 'most recent', 'just now', 'yesterday',
            'this week', 'currently'
        ],
        'severity': 'medium',
        'description': 'Disproportionate weight on recent data'
    },
    
    'groupthink': {
        'keywords': [
            'everyone agrees', 'consensus is', 'commonly accepted',
            'widely believed', 'general opinion'
        ],
        'phrases': [
            'most people think',
            'conventional wisdom says',
            'it\'s generally agreed'
        ],
        'severity': 'medium',
        'description': 'Suppressing alternative viewpoints'
    }
}