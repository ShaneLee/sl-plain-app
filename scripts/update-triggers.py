#!/usr/bin/env python3
import json
import re
import sys

# Read the triggers JSON from command line argument
if len(sys.argv) < 2:
    print("Usage: update-triggers.py <triggers_json>")
    sys.exit(1)

triggers_json = sys.argv[1]
triggers = json.loads(triggers_json)

# Read the current trigger.html file
with open('trigger.html', 'r') as f:
    html_content = f.read()

# Generate the new option elements (preserve all rest of form)
options_html = '            <option value="">Choose a trigger...</option>\n'
for trigger in triggers:
    options_html += f'            <option value="{trigger["keyword"]}">{trigger["description"]}</option>\n'

# Replace only the option elements, preserving everything else
# Match from first option to just before the form-group closing div
pattern = r'(<select id="trigger" name="trigger" required>\s*)<option value="">.*?</select>'
replacement = f'\\1{options_html}          </select>'
html_content = re.sub(pattern, replacement, html_content, flags=re.DOTALL)

# Write the updated HTML back to trigger.html
with open('trigger.html', 'w') as f:
    f.write(html_content)

print("✅ Updated trigger.html with new trigger options")
