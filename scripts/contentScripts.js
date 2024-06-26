browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "parseAccounts") {
      const accounts = parseAWSAccounts();
      sendResponse(accounts);
    }
  });
  
  function parseAWSAccounts() {
    const accounts = [];
    const accountDivs = document.querySelectorAll('.saml-account');
  
    accountDivs.forEach((accountDiv) => {
      const accountNameElement = accountDiv.querySelector('.saml-account-name');
      if (!accountNameElement) return;
  
      const accountNameMatch = accountNameElement.textContent.match(/Account: (.+) \((\d+)\)/);
      if (!accountNameMatch) return;
  
      const account = {
        accountName: accountNameMatch[1],
        accountId: accountNameMatch[2],
        roles: [],
      };
  
      const roleDivs = accountDiv.querySelectorAll('.saml-role');
      roleDivs.forEach((roleDiv) => {
        const roleInput = roleDiv.querySelector('input[type="radio"]');
        const roleLabel = roleDiv.querySelector('label');
        
        if (roleInput && roleLabel) {
          account.roles.push({
            roleName: roleLabel.textContent || '',
            roleArn: roleInput.value,
          });
        }
      });
  
      accounts.push(account);
    });
  
    return accounts;
  }

  console.log('contentScripts.js loaded');