# test_models.py - Verify your setup
from transformers import pipeline, AutoModelForCausalLM, AutoTokenizer
import torch

# Test 1: Text Generation (GPT-2)
print("Testing GPT-2...")
generator = pipeline('text-generation', model='gpt2')
result = generator("Based on recent trends", max_length=50)
print(result)

# Test 2: Sentiment Analysis
print("\nTesting Sentiment Analysis...")
sentiment = pipeline('sentiment-analysis')
print(sentiment("This investment will definitely succeed!"))

# Test 3: Question Answering
print("\nTesting Q&A...")
qa = pipeline('question-answering')
context = "AI systems can show bias through training data."
question = "What causes bias?"
print(qa(question=question, context=context))