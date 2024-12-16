const JIRA_BASE_URL = ''; // Jira Base URL
const JIRA_PROJECT_KEY = ''; // Jira Project Key
const JIRA_EMAIL = ''; // Your Jira Email
const JIRA_API_TOKEN = ''; // Jira API Token

function onFormSubmit(e) {
  const rowData = e.values; 
  const briefDescription = rowData[2]; 
  const businessJustification = rowData[3]; 
  const reportReceiverEmailList = rowData[4]; 
  const reportSchedule = rowData[5]; 
  const reportGenerationTime = rowData[6]; 
  const reportInputs = rowData[7]; 
  const reportFormat = rowData[8]; 
  const noDataScenario = rowData[9]; 
  const requestingTeam = rowData[10]; 

  if (briefDescription) {
    const description = `
      *Business Justification:* ${businessJustification || 'N/A'}
      *Report Receiver Email List:* ${reportReceiverEmailList || 'N/A'}
      *Report Schedule:* ${reportSchedule || 'N/A'}
      *Report Generation Time:* ${reportGenerationTime || 'N/A'}
      *Report Inputs:* ${reportInputs || 'N/A'}
      *Report Format:* ${reportFormat || 'N/A'}
      *No Data Scenario:* ${noDataScenario || 'N/A'}
      *Requesting Team:* ${requestingTeam || 'N/A'}
    `;

    createJiraIssue(briefDescription, description);
  }
}

function createJiraIssue(summary, description) {
  const url = `${JIRA_BASE_URL}/rest/api/2/issue`;

  const payload = {
    fields: {
      project: { key: JIRA_PROJECT_KEY },
      summary: summary, 
      description: description, 
      issuetype: { name: 'Task' },
    },
  };

  const options = {
    method: 'post',
    contentType: 'application/json',
    headers: {
      Authorization: `Basic ${Utilities.base64Encode(`${JIRA_EMAIL}:${JIRA_API_TOKEN}`)}`,
    },
    payload: JSON.stringify(payload),
  };

  try {
    const response = UrlFetchApp.fetch(url, options);
    Logger.log(`Issue created successfully: ${response.getContentText()}`);
  } catch (error) {
    Logger.log(`Error creating issue: ${error.message}`);
  }
}












