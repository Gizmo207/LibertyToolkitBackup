function doPost(e) {
  try {
    // Use your specific spreadsheet ID
    var spreadsheetId = "1jsxnHfLsAqnOpZB2gHbBr8r6vADhSSObcftUmwdCU7Q";
    var spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    var sheet = spreadsheet.getActiveSheet();

    // Parse the incoming data
    var data = JSON.parse(e.postData.contents);

    // Append the data as a new row
    sheet.appendRow([
      data.firstName,
      data.lastName,
      data.email,
      data.phone,
      data.student,
      data.cocAgreed,
      data.initials,
      new Date() // Timestamp
    ]);

    // Return success response with CORS headers
    return ContentService.createTextOutput(
      JSON.stringify({ result: "success", message: "Member data saved successfully" })
    ).setMimeType(ContentService.MimeType.JSON)
      .setHeader('Access-Control-Allow-Origin', '*')
      .setHeader('Access-Control-Allow-Methods', 'POST')
      .setHeader('Access-Control-Allow-Headers', 'Content-Type');

  } catch (error) {
    // Log the error
    console.error('Error saving member data:', error);

    // Return error response with CORS headers
    return ContentService.createTextOutput(
      JSON.stringify({ result: "error", message: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON)
      .setHeader('Access-Control-Allow-Origin', '*')
      .setHeader('Access-Control-Allow-Methods', 'POST')
      .setHeader('Access-Control-Allow-Headers', 'Content-Type');
  }
}

// Handle CORS preflight requests
function doOptions(e) {
  return ContentService.createTextOutput('')
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeader('Access-Control-Allow-Origin', '*')
    .setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
    .setHeader('Access-Control-Allow-Headers', 'Content-Type');
}
