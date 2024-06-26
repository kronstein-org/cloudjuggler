document.getElementById('parseButton').addEventListener('click', async () => {
    const tabs = await browser.tabs.query({active: true, currentWindow: true});
    try {
      const results = await browser.tabs.sendMessage(tabs[0].id, {action: "parseAccounts"});
      displayAccounts(results);
    } catch (error) {
      console.error('Error:', error);
      document.getElementById('accountList').textContent = 'Error parsing accounts. Make sure you are on the AWS SAML login page.';
    }
  });
  
  function displayAccounts(accounts) {
    const accountList = document.getElementById('accountList');
    accountList.innerHTML = '';
    
    accounts.forEach(account => {
      const accountDiv = document.createElement('div');
      accountDiv.innerHTML = `
        <h3>${account.accountName} (${account.accountId})</h3>
        <ul>
          ${account.roles.map(role => `<li>${role.roleName}: ${role.roleArn}</li>`).join('')}
        </ul>
      `;
      accountList.appendChild(accountDiv);
    });
  }