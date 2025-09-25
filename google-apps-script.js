// Setup function to initialize the sheet with proper headers
function setupSheet() {
  var spreadsheetId = "1jsxnHfLsAqnOpZB2gHbBr8r6vADhSSObcftUmwdCU7Q";
  var spreadsheet = SpreadsheetApp.openById(spreadsheetId);
  var sheet = spreadsheet.getActiveSheet();

  // Get the total number of rows and delete them all except row 1
  var lastRow = sheet.getLastRow();
  if (lastRow > 1) {
    sheet.deleteRows(2, lastRow - 1);
  }

  // Clear everything in row 1 to ensure clean slate
  sheet.clear();
  sheet.clearContents();
  sheet.clearFormats();
  sheet.clearNotes();
  sheet.clearDataValidations();

  // Clear any existing filters
  if (sheet.getFilter() !== null) {
    sheet.getFilter().remove();
  }

  // Unprotect all protected ranges if any exist
  var protections = sheet.getProtections(SpreadsheetApp.ProtectionType.RANGE);
  for (var i = 0; i < protections.length; i++) {
    protections[i].remove();
  }

  // Clear all conditional formatting
  sheet.clearConditionalFormatRules();

  // Set headers at row 1
  sheet.getRange(1, 1, 1, 8).setValues([[
    "First Name",
    "Last Name",
    "Email",
    "Phone",
    "CoC Agreed",
    "Initials",
    "Status",
    "Timestamp"
  ]]);

  // Freeze the first row (headers)
  sheet.setFrozenRows(1);

  // Auto-resize columns for better readability
  sheet.autoResizeColumns(1, 9);

  // Make headers bold
  var headerRange = sheet.getRange(1, 1, 1, 9);
  headerRange.setFontWeight("bold");

  console.log("Sheet setup completed successfully!");
}

function doPost(e) {
  try {
    // Use your specific spreadsheet ID
    var spreadsheetId = "1jsxnHfLsAqnOpZB2gHbBr8r6vADhSSObcftUmwdCU7Q";
    var spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    var sheet = spreadsheet.getActiveSheet();

    // Parse the incoming data
    var data = JSON.parse(e.postData.contents);

    // Always mark members as Active (since Join is locked until CoC is signed)
    var status = "Active";

    // Format the timestamp: MM/DD/YYYY HH:mm:ss
    var timestamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "MM/dd/yyyy HH:mm:ss");

    // Append the data as a new row
    sheet.appendRow([
      data.firstName,
      data.lastName,
      data.email,
      data.phone,
      data.student,
      data.cocAgreed,
      data.initials,
      status,
      timestamp
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
