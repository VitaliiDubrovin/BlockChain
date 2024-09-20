#!/bin/bash

ADDR=$1

RES=$(curl -X POST -s --data '{"jsonrpc":"2.0","method":"eth_getTransactionCount","params":["'$ADDR'","latest"],"id":1}' https://ropsten.infura.io/ZwIpa5uHKUa6OCRfOm4q)

echo $RES | sed "s:\"}$::" | sed "s:^.*\"::"
