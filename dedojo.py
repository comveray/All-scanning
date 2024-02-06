import requests

url = 'https://test3.appsec.npe.apse2.fmgawsdev.cloud:8443/api/v2/users'
headers = {'content-type': 'application/json',
            'Authorization': 'Token 01b69bab501c821f5a4d533c3205114bc140b03c'}
r = requests.get(url, headers=headers, verify=True) # set verify to False if ssl cert is self-signed

for key, value in r.__dict__.items():
  print(f"'{key}': '{value}'")
  print('------------------')