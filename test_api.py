# test_api.py
import requests
import json

API_URL = "http://localhost:5000/api"

# Test 1: Health check
print("Testing health check...")
response = requests.get(f"{API_URL}/health")
print(response.json())

# Test 2: Detect bias
print("\n\nTesting bias detection...")
test_text = "Based on recent trends, this investment will definitely succeed. Everyone knows the market always goes up."
response = requests.post(
    f"{API_URL}/detect",
    json={"text": test_text}
)
result = response.json()
print(json.dumps(result, indent=2))

# Test 3: Full analysis (detect + correct)
print("\n\nTesting full analysis...")
response = requests.post(
    f"{API_URL}/analyze",
    json={"text": test_text}
)
result = response.json()
print(json.dumps(result, indent=2))