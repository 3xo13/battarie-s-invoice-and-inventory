import { google } from "googleapis";
import { auth } from "./auth";

// google sheets object
const sheets = google.sheets({ version: "v4", auth: await auth.getClient() })

export {sheets}