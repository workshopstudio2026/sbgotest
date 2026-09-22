# Setting up Google Sheets & Email for the Contact Form

To make the contact form save directly to your Google Sheet and send an email to `franchise@sbgo.in`, follow these exact steps to create a Google Apps Script Webhook.

## 1. Create the Google Sheet
1. Go to [Google Sheets](https://sheets.google.com) and create a new blank spreadsheet.
2. Name it something like "SB-GO Franchise Enquiries".
3. In the first row, add these headers in columns A through G:
   `Date`, `Name`, `Mobile`, `Email`, `City`, `Experience`, `Message`

## 2. Add the Apps Script
1. In your Google Sheet, click on **Extensions > Apps Script** in the top menu.
2. Delete any code in the editor and paste the following script:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    // Append the row to the sheet
    sheet.appendRow([
      new Date(),
      data.name || "",
      data.mobile || "",
      data.email || "",
      data.city || "",
      data.experience || "",
      data.message || ""
    ]);
    
    // Send an email notification
    MailApp.sendEmail({
      to: "franchise@sbgo.in",
      subject: "New Franchise Enquiry from " + (data.name || "Website"),
      body: "A new franchise enquiry has been submitted:\n\n" +
            "Name: " + (data.name || "N/A") + "\n" +
            "Mobile: " + (data.mobile || "N/A") + "\n" +
            "Email: " + (data.email || "N/A") + "\n" +
            "City: " + (data.city || "N/A") + "\n" +
            "Experience: " + (data.experience || "N/A") + "\n" +
            "Message: " + (data.message || "N/A")
    });
    
    // Return a success response to the website
    return ContentService.createTextOutput(JSON.stringify({ "result": "success" }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return the error to the website
    return ContentService.createTextOutput(JSON.stringify({ "result": "error", "error": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

## 3. Deploy the Script as a Web App
1. Click the blue **Deploy** button in the top right corner and select **New deployment**.
2. Click the gear icon next to "Select type" and choose **Web app**.
3. Fill in the deployment details:
   - **Description**: Contact Form Webhook
   - **Execute as**: Me (your email)
   - **Who has access**: Anyone
4. Click **Deploy**.
5. *Note: You will be prompted to authorize access. Click "Review permissions", choose your account, click "Advanced", and then "Go to project (unsafe)". Finally, click "Allow".*
6. Copy the **Web app URL** that is provided (it ends in `/exec`).

## 4. Connect the Webhook to the App
Take the Web app URL you copied in the previous step and set it as an environment variable in your project by adding it to your `.env` file (or configuring it in your hosting platform's environment variables):

```env
VITE_CONTACT_WEBHOOK_URL="https://script.google.com/macros/s/.../exec"
```

Once this environment variable is set, the frontend contact form will automatically send all submissions to your Google Sheet and email.
