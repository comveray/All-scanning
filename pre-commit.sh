#!/usr/bin/bash
# Check if gitleaks is enabled, if yes then run gitleaks
if [ -n "$(git config --bool hooks.gitleaks)" ]; then
    gitleaks protect --verbose --redact --staged 
    exit_code=$?

    if [ $exit_code -eq 1 ]; then
        echo ""
        echo "Please review and remove the secret. If this is a false positive, please run: git commit -m "skip gitleaks" --no-verify"
        echo "To disable the gitleaks precommit hook, run the following command: git config hooks.gitleaks false"
        exit 1
    fi
else
    echo "gitleaks precommit hook disabled. Please enable with 'git config hooks.gitleaks true"
fi
