import xml.etree.ElementTree as ET
import argparse
from collections import namedtuple
import json

Word = namedtuple("Word", ["word", "desc", "context"])

parser = argparse.ArgumentParser()
parser.add_argument('filename', type=str)

args = parser.parse_args()

filename = args.filename

res = []

with open(filename, 'r') as f:
  tree = ET.parse(f)

  root = tree.getroot()
  top_level = root.find("./body/outline")

  def collect(node, path):
    text = node.attrib["text"]
    path.append(text)
    
    # detect leaf 
    if not node:
      if path:
        res.append(path.copy())

    for child in node:
      collect(child, path)

    path.pop()

  for child in top_level:
    collect(child, [])

res2 = []
for path in res:
  last = path[-1]
  tokens = last.split(" ")
  desc = " ".join(tokens[1:]).strip()
  if desc and desc[0] == "-":
    desc = desc[1:]
  desc = desc.strip()

  res2.append(Word(tokens[0], desc, ", ".join(path[:-1])))

print(json.dumps(res2))