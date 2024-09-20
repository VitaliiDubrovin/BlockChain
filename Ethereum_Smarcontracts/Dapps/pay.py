from ethtoken.abi import EIP20_ABI
from web3.auto import w3
import json
import sys

from config import *

w3myaddress = w3.toChecksumAddress(myaddress)
w3contractaddress = w3.toChecksumAddress(contract)
w3contract = w3.eth.contract(address=w3contractaddress, abi=EIP20_ABI)

# Call:
# pay.py <ammount> <nonce> <destination>

i = int(sys.argv[len(sys.argv)-3])
nonce = (sys.argv[len(sys.argv)-2])
dest = (sys.argv[len(sys.argv)-1])

w3dest = w3.toChecksumAddress(dest)
h = hex(i)[2:].zfill(32)
data = "0x07154b4400000000000000000000000000000000"+h.zfill(32)+"000000000000000000000000"+w3dest[2:]

transaction = {
    "from": w3myaddress,
    "to": w3contractaddress,
    "gas": 90000,
    "gasPrice": w3.toWei('3', 'gwei'),
    "nonce" : nonce,
    "data": data
}

w3.eth.enable_unaudited_features()

signed_txn = w3.eth.account.signTransaction(transaction, private_key=privatekey)
print(w3.toHex(signed_txn.rawTransaction))
