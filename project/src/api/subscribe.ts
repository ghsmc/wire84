// This file can be removed as we're using Campaignzee
export async function POST(request: Request) {
  return new Response(
    JSON.stringify({ success: true }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
}