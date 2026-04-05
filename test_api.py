import requests

url = "https://payment.free.beeceptor.com/agreement-payment/debit-account-payment"

data = {
    "amount": 1500,
    "account": "12345"
}

response = requests.post(url, json=data)

print(response.status_code)
print(response.text)