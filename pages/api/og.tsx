import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const config = {
  runtime: 'edge',
};

export default async function handler(req: NextRequest) {
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
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '40px' }}>
            <div
              style={{
                width: '24px',
                height: '24px',
                backgroundColor: '#E8672A',
                marginRight: '12px',
              }}
            />
            <span
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: '#E8672A',
                letterSpacing: '2px',
              }}
            >
              AI SYSTEMS ENGINEER
            </span>
          </div>

          {/* Divider */}
          <div
            style={{
              width: '1080px',
              height: '1px',
              backgroundColor: '#DEDAD5',
              marginBottom: '80px',
            }}
          />

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
                }}
              >
                ng
              </span>
            </div>
          </div>

          {/* Tagline */}
          <div style={{ display: 'flex', marginTop: '40px' }}>
            <span
              style={{
                fontSize: '20px',
                color: '#777777',
              }}
            >
              Building AI pipelines, LLM tools, and cloud infrastructure
            </span>
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
              fontSize: '12px',
              color: '#777777',
              fontFamily: 'monospace',
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
    }
  );
}
