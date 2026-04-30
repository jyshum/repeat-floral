import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import path from "path";

const SHEET_ID = "1G0xVEP7OTtJjlXS7Gn-LsM1coSk2ImpOoAODXQW88xI";

const auth = new google.auth.GoogleAuth({
  keyFile: path.join(process.cwd(), "service-account.json"),
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

export async function POST(request: NextRequest) {
  const data = await request.json();
  const sheets = google.sheets({ version: "v4", auth });

  if (data.formType === "donate") {
    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: "Donations!A:G",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[
          new Date().toISOString(),
          data.name,
          data.email,
          data.eventDate,
          data.pickupAddress,
          data.flowerDescription,
          data.notes,
        ]],
      },
    });
  } else if (data.formType === "request") {
    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: "Requests!A:G",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[
          new Date().toISOString(),
          data.name,
          data.organization,
          data.deliveryAddress,
          data.bouquetCount,
          data.preferredDate,
          data.notes,
        ]],
      },
    });
  }

  return NextResponse.json({ status: "ok" });
}
