import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const pledgesFilePath = path.join(process.cwd(), "public", "pledges.json");

function getPledges() {
  try {
    if (!fs.existsSync(pledgesFilePath)) {
      return [];
    }
    const data = fs.readFileSync(pledgesFilePath, "utf8");
    return JSON.parse(data || "[]");
  } catch (error) {
    console.error("Error reading pledges:", error);
    return [];
  }
}

function savePledges(pledges: any[]) {
  try {
    fs.writeFileSync(pledgesFilePath, JSON.stringify(pledges, null, 2), "utf8");
    return true;
  } catch (error) {
    console.error("Error writing pledges:", error);
    return false;
  }
}

export async function GET() {
  const pledges = getPledges();
  return NextResponse.json(pledges, {
    headers: {
      "Cache-Control": "no-store, max-age=0, must-revalidate",
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    const { email, tier, txId } = await req.json();

    if (!email || !tier || !txId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const pledges = getPledges();
    const newPledge = {
      email,
      tier,
      txId,
      timestamp: new Date().toISOString(),
    };

    pledges.push(newPledge);
    const success = savePledges(pledges);

    if (!success) {
      return NextResponse.json({ error: "Failed to save pledge" }, { status: 500 });
    }

    return NextResponse.json({ success: true, pledge: newPledge });
  } catch (error) {
    console.error("Error processing pledge POST request:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
