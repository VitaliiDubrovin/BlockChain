from ethtoken.abi import EIP20_ABI
from web3.auto import w3
import json
import sys

from config import *

w3myaddress = w3.toChecksumAddress(myaddress)
w3contractaddress = w3.toChecksumAddress(contract)
w3contract = w3.eth.contract(address=w3contractaddress, abi=EIP20_ABI)

i = int(sys.argv[len(sys.argv)-2])
nonce = (sys.argv[len(sys.argv)-1])
h = hex(i)[2:].zfill(32)
data = "0xa79b1eb800000000000000000000000000000000"+h.zfill(32)


transaction = {
    "from": w3myaddress,
    "to": w3contractaddress,
    "gas": 50000,
    "gasPrice": w3.toWei('3', 'gwei'),
    "nonce" : nonce,
    "data": data
}

w3.eth.enable_unaudited_features()

signed_txn = w3.eth.account.signTransaction(transaction, private_key=privatekey)
print(w3.toHex(signed_txn.rawTransaction))
