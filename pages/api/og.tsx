import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const config = {
  runtime: 'edge',
};

export default async function handler(req: NextRequest) {
  // Load Inter fonts
  const [interBlack, interRegular, interSemiBold] = await Promise.all([
    fetch(new URL('https://fonts.cdnfonts.com/s/19795/Inter-Black.woff')).then((res) => res.arrayBuffer()),
    fetch(new URL('https://fonts.cdnfonts.com/s/19795/Inter-Regular.woff')).then((res) => res.arrayBuffer()),
    fetch(new URL('https://fonts.cdnfonts.com/s/19795/Inter-SemiBold.woff')).then((res) => res.arrayBuffer()),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          backgroundColor: '#F5F2EE',
          padding: '60px',
        }}
      >
        {/* Top Section */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {/* Label with dash */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '50px' }}>
            <div
              style={{
                width: '20px',
                height: '1px',
                backgroundColor: '#E8672A',
                marginRight: '10px',
              }}
            />
            <span
              style={{
                fontSize: '11px',
                fontWeight: 400,
                color: '#E8672A',
                letterSpacing: '1.6px',
                fontFamily: 'monospace',
                textTransform: 'uppercase',
              }}
            >
              AI SYSTEMS ENGINEER
            </span>
          </div>

          {/* Name */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span
              style={{
                fontSize: '120px',
                fontWeight: 900,
                color: '#1A1A1A',
                lineHeight: 1,
                marginBottom: '20px',
                letterSpacing: '-4px',
                fontFamily: 'Inter',
              }}
            >
              Elwin
            </span>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span
                style={{
                  fontSize: '120px',
                  fontWeight: 900,
                  color: '#1A1A1A',
                  lineHeight: 1,
                  letterSpacing: '-4px',
                  fontFamily: 'Inter',
                }}
              >
                Chi
              </span>
              <span
                style={{
                  fontSize: '120px',
                  fontWeight: 900,
                  color: '#E8672A',
                  lineHeight: 1,
                  letterSpacing: '-4px',
                  fontFamily: 'Inter',
                }}
              >
                o
              </span>
              <span
                style={{
                  fontSize: '120px',
                  fontWeight: 900,
                  color: '#1A1A1A',
                  lineHeight: 1,
                  letterSpacing: '-4px',
                  fontFamily: 'Inter',
                }}
              >
                ng
              </span>
            </div>
          </div>

          {/* Tagline */}
          <div style={{ display: 'flex', marginTop: '40px', maxWidth: '720px', flexWrap: 'wrap', gap: '8px' }}>
            <span style={{ fontSize: '18px', color: '#6a6a6a', fontFamily: 'Inter', fontWeight: 400 }}>Building</span>
            <span style={{ fontSize: '18px', color: '#1A1A1A', fontFamily: 'Inter', fontWeight: 600 }}>AI pipelines,</span>
            <span style={{ fontSize: '18px', color: '#1A1A1A', fontFamily: 'Inter', fontWeight: 600 }}>LLM tools,</span>
            <span style={{ fontSize: '18px', color: '#6a6a6a', fontFamily: 'Inter', fontWeight: 400 }}>and</span>
            <span style={{ fontSize: '18px', color: '#1A1A1A', fontFamily: 'Inter', fontWeight: 600 }}>cloud infrastructure</span>
            <span style={{ fontSize: '18px', color: '#6a6a6a', fontFamily: 'Inter', fontWeight: 400 }}>that ship to production and scale.</span>
          </div>
        </div>

        {/* Bottom Section */}
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <div
            style={{
              width: '1080px',
              height: '1px',
              backgroundColor: '#DEDAD5',
              marginBottom: '20px',
            }}
          />
          <span
            style={{
              fontSize: '11px',
              color: '#6a6a6a',
              fontFamily: 'monospace',
              fontWeight: 400,
            }}
          >
            portfolio-elwinc2799.vercel.app
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Inter',
          data: interBlack,
          weight: 900,
          style: 'normal',
        },
        {
          name: 'Inter',
          data: interRegular,
          weight: 400,
          style: 'normal',
        },
        {
          name: 'Inter',
          data: interSemiBold,
          weight: 600,
          style: 'normal',
        },
      ],
    }
  );
}
