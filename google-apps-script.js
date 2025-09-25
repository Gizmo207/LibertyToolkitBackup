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

    // Return success response
    return ContentService.createTextOutput(
      JSON.stringify({ result: "success", message: "Member data saved successfully" })
    ).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Log the error
    console.error('Error saving member data:', error);

    // Return error response
    return ContentService.createTextOutput(
      JSON.stringify({ result: "error", message: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
